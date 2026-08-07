import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, MapPin, Truck, CreditCard, ShoppingBag, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { useCart, Order } from "../context/CartContext";
import logoImage from "@/assets/images/Asset 2@3x.png";

interface CheckoutViewProps {
  onOpenQPay: (amountMNT: number) => void;
}

export default function CheckoutView({ onOpenQPay }: CheckoutViewProps) {
  const { cart, subtotal, setActivePage, clearCart, formatPrice, convertPrice, currency, addOrder } = useCart();

  const [email, setEmail] = useState("you@example.com");
  const [firstName, setFirstName] = useState("Leonardo");
  const [lastName, setLastName] = useState("Vinci");
  const [address, setAddress] = useState("123 Gallery Lane");
  const [city, setCity] = useState("Florence");
  const [postalCode, setPostalCode] = useState("50100");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentTab, setPaymentTab] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [expiry, setExpiry] = useState("MM/YY");
  const [cvc, setCvc] = useState("123");
  const [billingSame, setBillingSame] = useState(true);
  const [saveInfo, setSaveInfo] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discountUSD, setDiscountUSD] = useState(0);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const shippingCostUSD = shippingMethod === "express" ? 18 : 8;
  const taxUSD = Math.round(subtotal * 0.08);
  const grandTotalUSD = Math.max(0, subtotal - discountUSD + shippingCostUSD + taxUSD);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "LEO10") {
      setDiscountUSD(15);
    } else if (promoCode.trim().length > 0) {
      setDiscountUSD(5);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    const order = addOrder({
      items: [...cart],
      subtotal,
      shipping: shippingCostUSD,
      total: grandTotalUSD,
      currency,
      paymentMethod: paymentTab === "card" ? "Credit Card" : "PayPal",
      status: "PAID",
      customerName: `${firstName} ${lastName}`,
      shippingAddress: `${address}, ${city} ${postalCode}`,
    });
    setCreatedOrder(order);
    clearCart();
  };

  if (createdOrder) {
    return (
      <div className="bg-slate-50 text-slate-900 min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 border border-slate-200 rounded-2xl shadow-xl space-y-6 text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Захиалга амжилттай!</h1>
            <p className="text-xs text-slate-500 font-sans">
              Захиалгын дугаар: <span className="font-mono font-bold text-slate-900">#{createdOrder.id.slice(0, 8)}</span>
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-sans space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>Захиалагч:</span>
              <span className="font-semibold text-slate-900">{createdOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Нийт төлсөн:</span>
              <span className="font-bold text-[#0b4d82]">{formatPrice(createdOrder.total)}</span>
            </div>
          </div>

          <button
            onClick={() => setActivePage("shop")}
            className="w-full py-4 bg-[#0b4d82] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-slate-900 transition-colors rounded-xl shadow"
          >
            Үргэлжлүүлэн худалдан авалт хийх
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32 text-slate-900 font-sans">
      {/* Top Header Bar matching Screenshot 2 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
        <button onClick={() => setActivePage("home")} className="flex items-center">
          <img src={logoImage} alt="LEO STUDIO" className="h-7 w-auto object-contain brightness-0" />
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">
        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Main Column (8 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-900">Checkout</h1>
              <p className="text-sm text-slate-500 mt-1">Complete your order in a few simple steps.</p>
            </div>

            {/* Section 1: CONTACT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-800">
                <Mail className="w-4 h-4 text-[#0b4d82]" />
                <span>CONTACT</span>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                />
              </div>
            </div>

            {/* Section 2: SHIPPING ADDRESS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-800">
                <MapPin className="w-4 h-4 text-[#0b4d82]" />
                <span>SHIPPING ADDRESS</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Last name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Street address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Postal code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: SHIPPING METHOD */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-800">
                <Truck className="w-4 h-4 text-[#0b4d82]" />
                <span>SHIPPING METHOD</span>
              </div>
              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer bg-white transition-all ${
                    shippingMethod === "standard" ? "border-[#0b4d82] ring-1 ring-[#0b4d82]" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={shippingMethod === "standard"} readOnly className="w-4 h-4 text-[#0b4d82]" />
                    <div>
                      <div className="font-semibold text-sm text-slate-900">Standard</div>
                      <div className="text-xs text-slate-400">5–7 business days</div>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$8.00</span>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer bg-white transition-all ${
                    shippingMethod === "express" ? "border-[#0b4d82] ring-1 ring-[#0b4d82]" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={shippingMethod === "express"} readOnly className="w-4 h-4 text-[#0b4d82]" />
                    <div>
                      <div className="font-semibold text-sm text-slate-900">Express</div>
                      <div className="text-xs text-slate-400">1–2 business days</div>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$18.00</span>
                </label>
              </div>
            </div>

            {/* Section 4: PAYMENT */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-800">
                  <CreditCard className="w-4 h-4 text-[#0b4d82]" />
                  <span>PAYMENT</span>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Encrypted
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl bg-white p-6 space-y-4">
                {/* Payment Tabs */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-700">
                  <button
                    type="button"
                    onClick={() => setPaymentTab("card")}
                    className={`py-2 rounded-md transition-all ${paymentTab === "card" ? "bg-white text-slate-900 shadow-sm" : ""}`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab("paypal")}
                    className={`py-2 rounded-md transition-all ${paymentTab === "paypal" ? "bg-white text-slate-900 shadow-sm" : ""}`}
                  >
                    PayPal
                  </button>
                </div>

                {paymentTab === "card" && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">Card number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Expiry</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1.5">CVC</label>
                        <input
                          type="text"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full p-3.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0b4d82]"
                        />
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-900 block">Billing same as shipping</span>
                        <span className="text-[11px] text-slate-400">Use the shipping address for billing</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBillingSame(!billingSame)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${billingSame ? "bg-[#0b4d82]" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${billingSame ? "translate-x-5" : ""}`} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4 text-[#0b4d82] rounded border-slate-300"
                />
                <label htmlFor="saveInfo" className="text-xs text-slate-600 cursor-pointer">
                  Save my information for a faster checkout next time
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card (5 Cols, Sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-serif font-bold text-slate-900">Order Summary</h3>
                <ShoppingBag className="w-4 h-4 text-slate-400" />
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400">Сагсанд бараа байхгүй байна.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-slate-100" />
                        <div>
                          <h4 className="text-xs font-serif font-semibold text-slate-900">{item.name}</h4>
                          <span className="text-[11px] text-slate-400 font-sans">{item.subtitle || item.category || "Atelier Artwork"}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:border-[#0b4d82]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 border border-slate-200 text-xs font-bold text-[#0b4d82] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-2 text-xs font-sans text-slate-500 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">{formatPrice(shippingCostUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-slate-900">{formatPrice(taxUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-slate-900 border-t border-slate-100 pt-3">
                  <span>Total</span>
                  <span className="text-[#0b4d82] font-sans">{formatPrice(grandTotalUSD)}</span>
                </div>
              </div>
            </div>

            {/* Pay Securely Button */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-4 bg-[#0b4d82] hover:bg-slate-900 text-white text-xs font-sans font-bold tracking-wider uppercase transition-all rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Pay Securely</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenQPay(convertPrice(grandTotalUSD))}
                className="w-full py-3.5 bg-slate-900 text-white text-xs font-sans font-bold tracking-wider uppercase hover:bg-[#0b4d82] transition-colors rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <span>QPay Монгол төлбөрөөр төлөх</span>
              </button>
            </div>

            {/* Security Badges (Matches Screenshot 2) */}
            <div className="flex items-center justify-around text-[10px] text-slate-400 font-sans pt-2 border-t border-slate-200">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" /> SSL Secured
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-600" /> 256-bit Encryption
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" /> Easy Returns
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
