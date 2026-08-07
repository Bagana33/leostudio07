import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, ShieldCheck, Bell, Mail, Truck, Download, QrCode, Sparkles, Check, Edit3, ShoppingBag, Heart, Package, X, Award, ExternalLink } from "lucide-react";
import certificateImage from "@/assets/images/product-4.png";
import { useCart, Order } from "../context/CartContext";

interface AccountViewProps {
  onOpenQPay: () => void;
}

export default function AccountView({ onOpenQPay }: AccountViewProps) {
  const { orders, wishlist, toggleWishlist, addToCart, formatPrice, setActivePage } = useCart();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist">("orders");
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [deliveryPref, setDeliveryPref] = useState("Шуурхай хүргэлт");
  const [isEditing, setIsEditing] = useState(false);
  const [collectorName, setCollectorName] = useState("Лхагва Отгон");
  const [selectedCertOrder, setSelectedCertOrder] = useState<Order | null>(null);

  const sampleCertOrder: Order = {
    id: "LEO-2026-0001",
    date: "18 Гурав 2026",
    items: [
      {
        id: "001",
        name: "МОНГОЛ ДҮРСЭЛ — OVERSIZED T-SHIRT",
        subtitle: "Cyanotype Hand Exposure · Edition 1/50",
        price: 55,
        image: certificateImage,
        quantity: 1,
      },
    ],
    subtotal: 55,
    shipping: 0,
    total: 55,
    currency: "MNT",
    paymentMethod: "QPay (Хаан Банк)",
    qpayInvoiceNo: "QPAY-INV-88219",
    status: "DELIVERED",
    customerName: collectorName,
    shippingAddress: "Улаанбаатар хот",
  };

  const activeCertOrder = selectedCertOrder || (orders.length > 0 ? orders[0] : sampleCertOrder);

  return (
    <div className="bg-brand-cream text-brand-black min-h-screen pt-28 pb-24 px-6 lg:px-12 bg-paper">
      <div className="max-w-[1400px] mx-auto space-y-10">
        {/* Top Header */}
        <div className="border-b border-brand-black/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-2">
              — MEMBER PORTAL
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-black">Collector Profile & Certificate</h1>
          </div>
          <div className="flex items-center gap-2 bg-brand-prussian text-brand-gold px-4 py-2 rounded text-xs font-mono font-bold shadow">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>VERIFIED COLLECTOR № 001</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-3 border-b border-brand-black/10 pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-brand-black text-brand-cream shadow"
                : "bg-white text-brand-black/70 hover:bg-brand-black/10 border border-brand-black/10"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Захиалгын түүх ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
              activeTab === "wishlist"
                ? "bg-brand-black text-brand-cream shadow"
                : "bg-white text-brand-black/70 hover:bg-brand-black/10 border border-brand-black/10"
            }`}
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span>Хүслийн жагсаалт ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-brand-black text-brand-cream shadow"
                : "bg-white text-brand-black/70 hover:bg-brand-black/10 border border-brand-black/10"
            }`}
          >
            <User className="w-4 h-4 text-brand-gold" />
            <span>Профайл & Тохиргоо</span>
          </button>
        </div>

        {/* Tab 1: Order History */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-brand-black/10 text-center space-y-4 shadow-sm">
                <Package className="w-12 h-12 text-brand-black/30 mx-auto" />
                <h3 className="text-xl font-serif font-bold text-brand-black">Одоогоор захиалгын түүх хоосон байна</h3>
                <p className="text-xs text-brand-black/60 font-sans">
                  Та дэлгүүрээс эхний бүтээлээ захиалан цуглуулгадаа нэмээрэй.
                </p>
                <button
                  onClick={() => setActivePage("shop")}
                  className="px-6 py-3 bg-brand-black text-brand-cream text-xs font-bold uppercase tracking-widest rounded"
                >
                  Дэлгүүрээр зочлох
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-6 border border-brand-black/10 rounded-xl shadow-sm space-y-4 hover:border-brand-gold transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-black/10 pb-4 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest block">
                          № {order.id}
                        </span>
                        <span className="text-xs font-sans text-brand-black/60">{order.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-sans font-bold rounded-full uppercase tracking-wider">
                          {order.status === "PAID" ? "ТӨЛӨГДСӨН" : "ХҮРГЭГДСЭН"}
                        </span>
                        <span className="text-sm font-sans font-bold text-brand-cyan">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center bg-brand-cream/40 p-2.5 rounded border border-brand-black/5">
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded shrink-0" />
                          <div className="space-y-0.5 text-xs font-sans">
                            <p className="font-bold font-serif text-brand-black line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-brand-black/50">{item.subtitle}</p>
                            <p className="font-mono text-[10px] font-bold text-brand-cyan">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-brand-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                      <div className="text-brand-black/70 text-[11px]">
                        <span>Төлбөрийн хэлбэр: <strong>{order.paymentMethod}</strong></span>
                        {order.qpayInvoiceNo && <span className="ml-3 text-brand-gold font-mono">Invoice: {order.qpayInvoiceNo}</span>}
                      </div>

                      <button
                        onClick={() => setSelectedCertOrder(order)}
                        className="px-4 py-2 bg-brand-prussian text-brand-gold hover:bg-brand-gold hover:text-brand-prussian text-[10px] font-bold uppercase tracking-wider transition-colors rounded flex items-center gap-1.5 shadow shrink-0"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Гэрчилгээ Үзэх</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist Saved Items */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            {wishlist.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-brand-black/10 text-center space-y-4 shadow-sm">
                <Heart className="w-12 h-12 text-brand-black/30 mx-auto" />
                <h3 className="text-xl font-serif font-bold text-brand-black">Хүслийн жагсаалт хоосон байна</h3>
                <p className="text-xs text-brand-black/60 font-sans">
                  Та сонирхсон бүтээлийнхээ зүрхэн дээр дарж энд хадгалах боломжтой.
                </p>
                <button
                  onClick={() => setActivePage("shop")}
                  className="px-6 py-3 bg-brand-black text-brand-cream text-xs font-bold uppercase tracking-widest rounded"
                >
                  Дэлгүүрээр зочлох
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((id) => (
                  <div key={id} className="bg-white p-4 border border-brand-black/10 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="aspect-[3/4] bg-brand-grey/10 rounded overflow-hidden relative">
                        <img src={certificateImage} alt="Saved Artwork" className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist(id)}
                          className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-red-500 shadow"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-brand-black uppercase">Cyanotype Canvas Item #{id}</h4>
                    </div>

                    <div className="pt-2 border-t border-brand-black/10 flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-cyan">{formatPrice(48)}</span>
                      <button
                        onClick={() =>
                          addToCart({
                            id: `wishlist-item-${id}`,
                            name: `Cyanotype Piece #${id}`,
                            price: 48,
                            image: certificateImage,
                          })
                        }
                        className="px-3.5 py-2 bg-brand-black text-brand-cream text-[10px] font-bold uppercase rounded flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Сагслах</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Collector Profile & Settings */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Collector Profile Details */}
            <div className="lg:col-span-6 space-y-8">
              <div className="bg-white p-8 border border-brand-black/10 rounded-xl shadow-md space-y-6 relative overflow-hidden">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-brand-prussian text-brand-gold flex items-center justify-center font-serif font-bold text-2xl border-2 border-brand-gold shadow">
                    LO
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={collectorName}
                        onChange={(e) => setCollectorName(e.target.value)}
                        className="p-1 border border-brand-gold text-xl font-serif font-bold text-brand-black rounded mb-1"
                      />
                    ) : (
                      <h2 className="text-2xl font-serif font-bold text-brand-black">{collectorName}</h2>
                    )}
                    <p className="text-xs font-sans text-brand-black/60">Collector · 2026 оноос</p>
                    <span className="inline-block mt-2 text-[9px] bg-brand-gold/20 text-brand-gold font-bold px-2.5 py-0.5 rounded tracking-widest uppercase">
                      VIP Collector
                    </span>
                  </div>
                </div>

                {/* Preferences Form */}
                <div className="space-y-4 pt-4 border-t border-brand-black/10 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-brand-gold" />
                      <span className="font-bold text-brand-black">Мэдэгдэл авна</span>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        notifications ? "bg-brand-cyan" : "bg-brand-black/20"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-brand-gold" />
                      <span className="font-bold text-brand-black">Мэдээллийн захидал</span>
                    </div>
                    <button
                      onClick={() => setNewsletter(!newsletter)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        newsletter ? "bg-brand-cyan" : "bg-brand-black/20"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          newsletter ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="font-bold text-brand-black flex items-center gap-2">
                      <Truck className="w-4 h-4 text-brand-gold" />
                      <span>Хүргэлтийн сонголт:</span>
                    </label>
                    <select
                      value={deliveryPref}
                      onChange={(e) => setDeliveryPref(e.target.value)}
                      className="w-full p-2.5 border border-brand-black/20 rounded text-xs font-sans bg-brand-cream/30 focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Шуурхай хүргэлт">Шуурхай хүргэлт (24 цаг)</option>
                      <option value="Энгийн хүргэлт">Энгийн хүргэлт (48 цаг)</option>
                      <option value="Ательегээс авна">Ателье дээрээс биечлэн авах</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full py-3 bg-brand-black text-brand-cream text-xs font-sans font-bold tracking-widest uppercase hover:bg-brand-cyan hover:text-brand-prussian transition-colors rounded flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? "ХАДГАЛАХ" : "ПРОФАЙЛ ЗАСВАРЛАХ"}</span>
                </button>
              </div>
            </div>

            {/* QPay Integration Quick Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-brand-prussian text-brand-cream p-8 rounded-xl space-y-4 shadow-md">
                <h3 className="text-lg font-serif font-bold uppercase text-brand-gold">QPay Төлбөрийн Систем</h3>
                <p className="text-xs text-brand-cream/70 font-sans leading-relaxed">
                  Хаан Банк, Голомт, Төрийн Банк, Хас, М Банкны эпп-ээр QR код уншуулан ямар ч үед шууд нэхэмжлэх үүсгэн төлбөр шалгах боломжтой.
                </p>
                <button
                  onClick={onOpenQPay}
                  className="w-full py-3.5 bg-brand-gold text-brand-prussian text-xs font-sans font-bold uppercase tracking-widest hover:bg-brand-cream transition-colors rounded flex items-center justify-center gap-2 shadow"
                >
                  <QrCode className="w-4 h-4" />
                  <span>QPay Нэхэмжлэх Үүсгэх</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Certificate of Authenticity Section */}
        <div className="bg-white border-2 border-brand-gold/40 p-8 md:p-12 rounded-xl shadow-xl relative overflow-hidden space-y-8 bg-paper">
          <div className="flex justify-between items-start border-b border-brand-black/10 pb-6">
            <div>
              <span className="text-[10px] tracking-[0.5em] text-brand-gold font-bold font-sans uppercase block mb-1">
                DIGITAL CERTIFICATE OF AUTHENTICITY
              </span>
              <h2 className="text-3xl font-serif font-bold text-brand-black">Certificate of Authenticity</h2>
              <p className="text-xs text-brand-black/60 font-sans mt-1">Collection 01 — Wearable Art by LEO STUDIO</p>
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-brand-gold bg-brand-gold/10 flex items-center justify-center text-brand-gold font-serif font-bold text-xs uppercase tracking-tighter text-center p-2 shadow-inner">
              LEO CERT
            </div>
          </div>

          {/* Certificate Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Artwork Thumbnail */}
            <div className="aspect-[3/4] relative border border-brand-black/10 overflow-hidden rounded shadow-md group">
              <img
                src={activeCertOrder.items[0]?.image || certificateImage}
                alt="Cyanotype Artwork"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-multiply pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-brand-prussian/90 text-brand-cream text-[9px] font-mono px-2.5 py-1 rounded">
                SERIAL: {activeCertOrder.id}
              </div>
            </div>

            {/* Spec Details Table */}
            <div className="space-y-4 text-xs font-sans">
              <div className="border-b border-brand-black/10 pb-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block">ЭЗЭМШИГЧ (OWNER):</span>
                <span className="text-sm font-serif font-bold text-brand-black">{collectorName}</span>
              </div>

              <div className="border-b border-brand-black/10 pb-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block">БҮТЭЭЛ (ARTWORK):</span>
                <span className="text-sm font-serif font-bold text-brand-cyan">{activeCertOrder.items[0]?.name}</span>
              </div>

              <div className="border-b border-brand-black/10 pb-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block">ДУГААР (SERIAL NO):</span>
                <span className="text-sm font-mono font-bold text-brand-gold">{activeCertOrder.id}</span>
              </div>

              <div className="border-b border-brand-black/10 pb-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block">ОГНОО (DATE):</span>
                <span className="text-xs font-mono text-brand-black">{activeCertOrder.date}</span>
              </div>

              <div className="border-b border-brand-black/10 pb-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block">АРГА ТЕХНИК (TECHNIQUE):</span>
                <span className="text-xs font-sans font-bold text-brand-cyan">Cyanotype гар хэвлэл (100% Organic Fabric)</span>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-brand-black/50 uppercase font-mono block mb-1">
                  DIGITAL SIGNATURE HASH:
                </span>
                <div className="p-2 bg-brand-cream border border-brand-black/10 font-mono text-[10px] text-brand-black/70 rounded">
                  0xLEO·{activeCertOrder.id.replace(/-/g, "")}·CERT·SECURE
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge & Download Action */}
          <div className="pt-6 border-t border-brand-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <ShieldCheck className="w-4 h-4" />
              <span>🛡️ БАТАЛГААЖСАН ЦУГЛУУЛГА (AUTHENTICATED)</span>
            </div>

            <button
              onClick={() => alert(`Дижитал гэрчилгээ (${activeCertOrder.id}) хэвлэхэд бэлэн боллоо!`)}
              className="px-6 py-2.5 bg-brand-black text-brand-cream text-xs font-sans font-bold tracking-widest uppercase hover:bg-brand-cyan transition-colors rounded flex items-center gap-2 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ТАЦАХ PDF ГЭРЧИЛГЭЭ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
