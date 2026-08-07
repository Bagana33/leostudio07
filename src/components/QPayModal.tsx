import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, QrCode, RefreshCw, Smartphone, ExternalLink, ShieldCheck, AlertCircle, Award } from "lucide-react";
import { useCart } from "../context/CartContext";

interface QPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  amount?: number; // amount in MNT (e.g. 189000)
  orderId?: string;
  onSuccess?: () => void;
}

interface BankApp {
  name: string;
  description: string;
  logo: string;
  link: string;
}

interface InvoiceData {
  invoice_id: string;
  sender_invoice_no: string;
  amount: number;
  item_name: string;
  qr_text: string;
  qr_image: string;
  urls: BankApp[];
  status: "PENDING" | "PAID";
}

export default function QPayModal({
  isOpen,
  onClose,
  productName = "LEO STUDIO Wearable Art",
  amount = 189000,
  orderId,
  onSuccess,
}: QPayModalProps) {
  const { cart, clearCart, addOrder, currency, setActivePage } = useCart();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [mode, setMode] = useState<"test" | "live">("test");

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setInvoice(null);
      setIsPaid(false);
      setError(null);
      setLoading(false);
      setChecking(false);
    }
  }, [isOpen]);

  const completeOrderRecording = (inv: InvoiceData) => {
    // Record into orders list
    const orderItems = cart.length > 0 ? cart : [
      {
        id: `qpay-item-${Date.now()}`,
        name: inv.item_name || productName,
        subtitle: "QPay Шууд Захиалга",
        price: Math.round(inv.amount / 3450),
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600&h=800",
        quantity: 1,
      }
    ];

    addOrder({
      items: orderItems,
      subtotal: Math.round(inv.amount / 3450),
      shipping: 0,
      total: Math.round(inv.amount / 3450),
      currency: currency,
      paymentMethod: `QPay (${inv.sender_invoice_no})`,
      qpayInvoiceNo: inv.sender_invoice_no,
      status: "PAID",
      customerName: phone ? `Харилцагч (${phone})` : "VIP Collector",
      shippingAddress: "Улаанбаатар хот (QPay Захиалга)",
    });

    clearCart();
    if (onSuccess) onSuccess();
  };

  // Create invoice handler
  const handleCreateInvoice = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/qpay/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          item_name: productName,
          customer_phone: phone,
          order_id: orderId || `LEO-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data.success && data.invoice) {
        setInvoice(data.invoice);
        setMode(data.mode || "test");
      } else {
        setError(data.error || "QPay нэхэмжлэх үүсгэхэд алдаа гарлаа.");
      }
    } catch (err) {
      console.error(err);
      setError("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  // Poll for payment status if invoice exists and not paid yet
  useEffect(() => {
    if (!invoice || isPaid) return;

    const interval = setInterval(async () => {
      try {
        setChecking(true);
        const res = await fetch("/api/qpay/check-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoice_id: invoice.invoice_id }),
        });

        const data = await res.json();
        if (data.success && data.paid) {
          setIsPaid(true);
          completeOrderRecording(invoice);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("QPay polling check error:", err);
      } finally {
        setChecking(false);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [invoice, isPaid]);

  // Manual payment simulation for testing in preview
  const handleSimulatePayment = async () => {
    if (!invoice) return;
    setLoading(true);
    try {
      const res = await fetch("/api/qpay/simulate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoice.invoice_id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPaid(true);
        completeOrderRecording(invoice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-brand-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-brand-cream border border-brand-gold/30 w-full max-w-2xl p-6 md:p-10 relative shadow-2xl text-brand-black overflow-hidden my-auto rounded-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-brand-black/10 text-brand-black/60 hover:text-brand-black hover:bg-brand-black/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* QPay Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-black/10">
            <div className="w-10 h-10 rounded-lg bg-brand-prussian text-brand-gold flex items-center justify-center font-bold text-lg font-serif shadow-sm">
              q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-bold uppercase tracking-wide text-brand-black">QPay Төлбөр</h3>
                <span className="text-[9px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                  {mode === "live" ? "Шууд холболт" : "Туршилтын горим"}
                </span>
              </div>
              <p className="text-xs text-brand-black/60 font-sans">
                Монголын бүх банкны эпп-ээр QR код уншуулж хялбар төлөх
              </p>
            </div>
          </div>

          {/* Success / Paid State */}
          {isPaid ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif font-bold text-brand-black">Төлбөр амжилттай хийгдлээ!</h4>
                <p className="text-xs font-sans text-brand-black/70">
                  Таны захиалгын төлбөр баталгаажлаа. Захиалга таны цуглуулагчийн профайлд хадгалагдлаа.
                </p>
              </div>

              <div className="bg-brand-cream/80 border border-brand-black/10 p-5 rounded-lg text-left space-y-3 text-xs font-sans max-w-md mx-auto">
                <div className="flex justify-between border-b border-brand-black/5 pb-2">
                  <span className="text-brand-black/60">Бүтээгдэхүүн:</span>
                  <span className="font-bold text-brand-black">{invoice?.item_name || productName}</span>
                </div>
                <div className="flex justify-between border-b border-brand-black/5 pb-2">
                  <span className="text-brand-black/60">Төлсөн дүн:</span>
                  <span className="font-bold text-brand-cyan">{invoice?.amount.toLocaleString()} ₮</span>
                </div>
                <div className="flex justify-between border-b border-brand-black/5 pb-2">
                  <span className="text-brand-black/60">Нэхэмжлэхийн №:</span>
                  <span className="font-mono text-brand-gold">{invoice?.sender_invoice_no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-black/60">Огноо:</span>
                  <span>{new Date().toLocaleString("mn-MN")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-brand-gold text-brand-prussian text-[11px] tracking-[0.3em] font-sans font-bold uppercase hover:bg-brand-cream transition-colors shadow-lg flex items-center justify-center gap-2 rounded"
                >
                  <span>Баярлалаа, Хаах</span>
                </button>
              </div>
            </motion.div>
          ) : !invoice ? (
            /* Step 1: Input Details & Create Invoice */
            <div className="space-y-6">
              <div className="bg-brand-prussian/5 border border-brand-black/10 p-5 space-y-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-sans text-brand-black/60 uppercase tracking-wider">Захиалгын зүйл:</span>
                  <span className="text-sm font-serif font-bold text-brand-black uppercase">{productName}</span>
                </div>
                <div className="flex justify-between items-center border-t border-brand-black/10 pt-3">
                  <span className="text-xs font-sans text-brand-black/60 uppercase tracking-wider">Төлөх дүн:</span>
                  <span className="text-2xl font-serif font-bold text-brand-cyan">{amount.toLocaleString()} ₮</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase font-bold text-brand-black mb-2 tracking-wider">
                  Утасны дугаар (заавал биш):
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="88xxxxxx"
                  className="w-full bg-brand-cream border border-brand-black/20 p-3.5 text-sm font-mono focus:outline-none focus:border-brand-gold rounded"
                />
                <p className="text-[11px] text-brand-black/50 font-sans mt-1">
                  Банкны апп-д нэхэмжлэх очих эсвэл QR кодоор шууд төлөх боломжтой.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center gap-2 rounded">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleCreateInvoice}
                disabled={loading}
                className="w-full py-4 bg-brand-prussian text-brand-cream text-[11px] tracking-[0.4em] font-sans font-bold uppercase hover:bg-brand-gold hover:text-brand-black transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 rounded"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Нэхэмжлэх үүсгэж байна...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 text-brand-gold" />
                    <span>QPay QR Код Үүсгэх</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Step 2: Show QR Code & Bank App Links */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center bg-white p-6 border border-brand-black/10 rounded-lg shadow-sm">
                  <div className="relative mb-3">
                    <img
                      src={invoice.qr_image}
                      alt="QPay QR Code"
                      className="w-48 h-48 object-contain"
                    />
                    <div className="absolute inset-0 border-2 border-brand-gold/40 rounded pointer-events-none" />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-sans text-brand-black/70">
                    <RefreshCw className={`w-3.5 h-3.5 text-brand-gold ${checking ? "animate-spin" : ""}`} />
                    <span>Төлбөр шалгаж байна...</span>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-[10px] text-brand-black/50 font-mono block">Нэхэмжлэхийн ID:</span>
                    <span className="text-xs font-mono font-bold text-brand-black">{invoice.sender_invoice_no}</span>
                  </div>
                </div>

                {/* Direct Bank Links */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-brand-gold" />
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-black">
                      Банкны Апп-аар шууд төлөх:
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {invoice.urls.map((bank, index) => (
                      <a
                        key={index}
                        href={bank.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 bg-brand-cream border border-brand-black/10 hover:border-brand-gold hover:bg-brand-black/5 transition-all rounded group"
                      >
                        <div className="flex items-center gap-2.5">
                          {bank.logo ? (
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="w-6 h-6 object-contain rounded"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded bg-brand-prussian/10 text-brand-prussian flex items-center justify-center text-[10px] font-bold">
                              {bank.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-sans font-medium text-brand-black group-hover:text-brand-cyan transition-colors">
                            {bank.name}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-brand-black/40 group-hover:text-brand-cyan" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulation Banner for Sandbox / Preview */}
              <div className="bg-brand-gold/10 border-l-4 border-brand-gold p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans rounded-r-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                  <div>
                    <span className="font-bold text-brand-black block">QPay Системийн Төлөв:</span>
                    <span className="text-brand-black/80">
                      Банкны апп-аар QR кодоо уншуулж төлнө үү. (Туршилтын горимд дараах товчийг дарж төлбөрийг шууд баталгаажуулж болно).
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSimulatePayment}
                  className="px-4 py-2 bg-brand-black text-brand-cream hover:bg-brand-cyan text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors shadow rounded"
                >
                  Төлбөр төлөгдсөнөөр турших
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
