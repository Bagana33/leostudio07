import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory invoice store for QPay fallback/demo tracking
interface QPayInvoiceStore {
  invoice_id: string;
  sender_invoice_no: string;
  amount: number;
  item_name: string;
  customer_phone?: string;
  status: "PENDING" | "PAID";
  created_at: number;
  qr_text: string;
  qr_image: string;
  urls: Array<{
    name: string;
    description: string;
    logo: string;
    link: string;
  }>;
}

const activeInvoices = new Map<string, QPayInvoiceStore>();

// Helper to generate SVG QR code base64 as fallback visual
function generateFallbackQrSvgBase64(text: string): string {
  // SVG representation of a sleek QPay styled QR matrix
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#FFFFFF" rx="12"/>
    <rect x="15" y="15" width="50" height="50" fill="#0A2A66"/>
    <rect x="25" y="25" width="30" height="30" fill="#FFFFFF"/>
    <rect x="32" y="32" width="16" height="16" fill="#0A2A66"/>
    <rect x="135" y="15" width="50" height="50" fill="#0A2A66"/>
    <rect x="145" y="25" width="30" height="30" fill="#FFFFFF"/>
    <rect x="152" y="32" width="16" height="16" fill="#0A2A66"/>
    <rect x="15" y="135" width="50" height="50" fill="#0A2A66"/>
    <rect x="25" y="145" width="30" height="30" fill="#FFFFFF"/>
    <rect x="32" y="152" width="16" height="16" fill="#0A2A66"/>
    
    <!-- Data pattern -->
    <rect x="75" y="20" width="12" height="12" fill="#BFA46A"/>
    <rect x="95" y="20" width="24" height="12" fill="#0A2A66"/>
    <rect x="75" y="40" width="20" height="12" fill="#0A2A66"/>
    <rect x="105" y="40" width="14" height="12" fill="#BFA46A"/>
    
    <rect x="20" y="75" width="15" height="15" fill="#0A2A66"/>
    <rect x="45" y="75" width="20" height="15" fill="#BFA46A"/>
    <rect x="75" y="75" width="50" height="50" fill="#0A2A66" rx="6"/>
    <circle cx="100" cy="100" r="16" fill="#BFA46A"/>
    <text x="100" y="105" font-family="sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF" text-anchor="middle">q</text>
    
    <rect x="135" y="75" width="20" height="15" fill="#0A2A66"/>
    <rect x="165" y="75" width="15" height="15" fill="#BFA46A"/>
    
    <rect x="75" y="135" width="20" height="15" fill="#BFA46A"/>
    <rect x="105" y="135" width="24" height="15" fill="#0A2A66"/>
    <rect x="140" y="135" width="40" height="15" fill="#0A2A66"/>
    <rect x="80" y="160" width="45" height="20" fill="#0A2A66"/>
    <rect x="135" y="160" width="45" height="20" fill="#BFA46A"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Default Mongolian Bank Deeplinks
const DEFAULT_BANK_APPS = [
  {
    name: "Khan Bank (Хаан Банк)",
    description: "Хаан Банкны эпп-ээр төлөх",
    logo: "https://qpay.mn/qpay_v2/khanbank.png",
    link: "khanbank://q?qPay_qr_string=",
  },
  {
    name: "Golomt Bank (Голомт Банк)",
    description: "SocialPay & Голомт эпп",
    logo: "https://qpay.mn/qpay_v2/golomt.png",
    link: "golomtbank://q?qPay_qr_string=",
  },
  {
    name: "State Bank (Төрийн Банк)",
    description: "Gerege & Төрийн Банк эпп",
    logo: "https://qpay.mn/qpay_v2/statebank.png",
    link: "statebank://q?qPay_qr_string=",
  },
  {
    name: "XacBank (Хас Банк)",
    description: "Хас Банкны дижитал эпп",
    logo: "https://qpay.mn/qpay_v2/xacbank.png",
    link: "xacbank://q?qPay_qr_string=",
  },
  {
    name: "Trade and Development Bank (TDB)",
    description: "Худалдаа Хөгжлийн Банк",
    logo: "https://qpay.mn/qpay_v2/tdb.png",
    link: "tdb://q?qPay_qr_string=",
  },
  {
    name: "MBank (М Банк)",
    description: "М Банк дижитал",
    logo: "https://qpay.mn/qpay_v2/mbank.png",
    link: "mbank://q?qPay_qr_string=",
  },
  {
    name: "MostMoney",
    description: "MostMoney хэтэвч",
    logo: "https://qpay.mn/qpay_v2/mostmoney.png",
    link: "mostmoney://q?qPay_qr_string=",
  },
  {
    name: "Capitron Bank (Капитрон Банк)",
    description: "Капитрон Банк эпп",
    logo: "https://qpay.mn/qpay_v2/capitron.png",
    link: "capitronbank://q?qPay_qr_string=",
  }
];

// Helper to authenticate with QPay official API if credentials exist
async function getQPayAccessToken(): Promise<string | null> {
  const username = process.env.QPAY_USERNAME;
  const password = process.env.QPAY_PASSWORD;

  if (!username || !password) {
    return null;
  }

  try {
    const authHeader = Buffer.from(`${username}:${password}`).toString("base64");
    const response = await fetch("https://merchant.qpay.mn/v2/auth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn("QPay auth token failed:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.access_token || null;
  } catch (error) {
    console.warn("Error getting QPay access token:", error);
    return null;
  }
}

// API Routes

// 1. Create QPay Invoice
app.post("/api/qpay/create-invoice", async (req, res) => {
  try {
    const { amount, item_name, customer_phone, order_id } = req.body;

    const invoiceNo = order_id || `LEO-${Date.now()}`;
    const invoiceCode = process.env.QPAY_INVOICE_CODE || "LEO_STUDIO_INVOICE";
    const paymentAmount = Number(amount) || 189000;

    const token = await getQPayAccessToken();

    if (token) {
      // Call official QPay API
      const qpayResponse = await fetch("https://merchant.qpay.mn/v2/invoice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_code: invoiceCode,
          sender_invoice_no: invoiceNo,
          invoice_receiver_code: customer_phone || "terminal",
          invoice_description: `LEO STUDIO — ${item_name || "Захиалга"}`,
          amount: paymentAmount,
          callback_url: `${process.env.APP_URL || "https://leostudio.mn"}/api/qpay/callback?order_id=${invoiceNo}`,
        }),
      });

      if (qpayResponse.ok) {
        const qpayData = await qpayResponse.json();
        const invoiceData: QPayInvoiceStore = {
          invoice_id: qpayData.invoice_id,
          sender_invoice_no: invoiceNo,
          amount: paymentAmount,
          item_name: item_name || "LEO STUDIO Wearable Art",
          customer_phone,
          status: "PENDING",
          created_at: Date.now(),
          qr_text: qpayData.qr_text,
          qr_image: qpayData.qr_image ? `data:image/png;base64,${qpayData.qr_image}` : generateFallbackQrSvgBase64(qpayData.qr_text),
          urls: qpayData.urls || DEFAULT_BANK_APPS,
        };

        activeInvoices.set(qpayData.invoice_id, invoiceData);

        return res.json({
          success: true,
          mode: "live",
          invoice: invoiceData,
        });
      }
    }

    // Fallback / Demo Mode QPay Invoice Creation
    const mockInvoiceId = `QPAY_INV_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const qrText = `qpay://payment?invoice_id=${mockInvoiceId}&amount=${paymentAmount}&merchant=LEO_STUDIO`;

    const bankApps = DEFAULT_BANK_APPS.map((bank) => ({
      ...bank,
      link: `${bank.link}${encodeURIComponent(qrText)}`,
    }));

    const mockInvoice: QPayInvoiceStore = {
      invoice_id: mockInvoiceId,
      sender_invoice_no: invoiceNo,
      amount: paymentAmount,
      item_name: item_name || "LEO STUDIO Wearable Art",
      customer_phone,
      status: "PENDING",
      created_at: Date.now(),
      qr_text: qrText,
      qr_image: generateFallbackQrSvgBase64(qrText),
      urls: bankApps,
    };

    activeInvoices.set(mockInvoiceId, mockInvoice);

    return res.json({
      success: true,
      mode: "test",
      message: "QPay invoice created (Test/Demo Mode). Real credentials can be set in QPAY_USERNAME & QPAY_PASSWORD.",
      invoice: mockInvoice,
    });
  } catch (error) {
    console.error("Error creating QPay invoice:", error);
    return res.status(500).json({ success: false, error: "QPay invoice creation failed" });
  }
});

// 2. Check QPay Payment Status
app.post("/api/qpay/check-payment", async (req, res) => {
  try {
    const { invoice_id } = req.body;

    if (!invoice_id) {
      return res.status(400).json({ success: false, error: "invoice_id is required" });
    }

    const storedInvoice = activeInvoices.get(invoice_id);

    // If stored status is already PAID
    if (storedInvoice && storedInvoice.status === "PAID") {
      return res.json({
        success: true,
        paid: true,
        status: "PAID",
        payment_info: {
          invoice_id,
          amount: storedInvoice.amount,
          paid_at: new Date().toISOString(),
        },
      });
    }

    // Try checking live QPay status if credentials exist
    const token = await getQPayAccessToken();
    if (token) {
      const qpayResponse = await fetch("https://merchant.qpay.mn/v2/payment/check", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object_type: "INVOICE",
          object_id: invoice_id,
        }),
      });

      if (qpayResponse.ok) {
        const qpayData = await qpayResponse.json();
        const isPaid = qpayData.count > 0 && qpayData.paid_amount >= (storedInvoice?.amount || 0);

        if (isPaid && storedInvoice) {
          storedInvoice.status = "PAID";
          activeInvoices.set(invoice_id, storedInvoice);
        }

        return res.json({
          success: true,
          paid: isPaid,
          status: isPaid ? "PAID" : "PENDING",
          qpay_raw: qpayData,
        });
      }
    }

    // Return stored status
    return res.json({
      success: true,
      paid: storedInvoice ? storedInvoice.status === "PAID" : false,
      status: storedInvoice ? storedInvoice.status : "PENDING",
    });
  } catch (error) {
    console.error("Error checking QPay payment:", error);
    return res.status(500).json({ success: false, error: "Payment verification failed" });
  }
});

// 3. Simulate Payment (Demo button for testing in sandbox/preview)
app.post("/api/qpay/simulate-payment", (req, res) => {
  const { invoice_id } = req.body;
  if (!invoice_id) {
    return res.status(400).json({ success: false, error: "invoice_id is required" });
  }

  const invoice = activeInvoices.get(invoice_id);
  if (invoice) {
    invoice.status = "PAID";
    activeInvoices.set(invoice_id, invoice);
    return res.json({ success: true, message: "Payment simulated successfully!", invoice });
  }

  // Create & mark as paid if not present
  activeInvoices.set(invoice_id, {
    invoice_id,
    sender_invoice_no: `LEO-${Date.now()}`,
    amount: 189000,
    item_name: "Simulated Item",
    status: "PAID",
    created_at: Date.now(),
    qr_text: "qpay://simulated",
    qr_image: "",
    urls: [],
  });

  return res.json({ success: true, message: "Invoice created & payment simulated!" });
});

// Start Express Server with Vite middleware in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
