import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  category?: string;
  price: number; // Base price in USD
  image: string;
  quantity: number;
  size?: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  price: number; // Base price in USD
  originalPrice?: number;
  subtitle?: string;
  description: string;
  images: string[];
  editionInfo?: string;
  stockLeft?: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: "MNT" | "USD";
  paymentMethod: string;
  qpayInvoiceNo?: string;
  status: "PAID" | "DELIVERED" | "PROCESSING";
  customerName: string;
  shippingAddress: string;
}

export type PageView = "home" | "shop" | "product" | "gallery" | "about" | "account" | "checkout" | "studio";

export type Currency = "MNT" | "USD";

const MNT_RATE = 3450;

interface ToastNotification {
  show: boolean;
  title: string;
  message?: string;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  giftWrap: boolean;
  setGiftWrap: (wrap: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedProduct: ProductDetail | null;
  setSelectedProduct: (product: ProductDetail | null) => void;
  openProductDetail: (product: ProductDetail) => void;
  subtotal: number;
  totalItems: number;

  // New Features
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => Order;

  toast: ToastNotification;
  showToast: (title: string, message?: string, image?: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: "fern-print",
    name: "Fern Cyanotype Print",
    subtitle: "A2 · Framed",
    category: "Art Print",
    price: 42, // USD
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600&h=800",
    quantity: 1,
  },
  {
    id: "prussian-tote",
    name: "Prussian Canvas Tote",
    subtitle: "One Size · Natural",
    category: "Tote Bag",
    price: 26, // USD
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600&h=800",
    quantity: 1,
  },
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: "LEO-2026-8812",
    date: "2026-08-01",
    items: [
      {
        id: "prussian-tee",
        name: "МОНГОЛ ДҮРСЭЛ — OVERSIZED T-SHIRT",
        subtitle: "Size M · Oversized Tee",
        price: 55,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600&h=800",
        quantity: 1,
      },
    ],
    subtotal: 55,
    shipping: 0,
    total: 55,
    currency: "MNT",
    paymentMethod: "QPay (Хаан Банк)",
    qpayInvoiceNo: "QPAY-INV-99214",
    status: "DELIVERED",
    customerName: "Лхагва Отгон",
    shippingAddress: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо",
  },
];

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [giftWrap, setGiftWrap] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<PageView>("home");
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  
  // New States
  const [currency, setCurrency] = useState<Currency>("MNT");
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("leo_wishlist");
      return saved ? JSON.parse(saved) : ["001", "004"];
    } catch {
      return ["001", "004"];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("leo_orders");
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  const [toast, setToast] = useState<ToastNotification>({ show: false, title: "" });

  useEffect(() => {
    try {
      localStorage.setItem("leo_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("leo_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Could not save orders", e);
    }
  }, [orders]);

  const showToast = (title: string, message?: string, image?: string) => {
    setToast({ show: true, title, message, image });
    setTimeout(() => {
      setToast({ show: false, title: "" });
    }, 4000);
  };

  const hideToast = () => setToast({ show: false, title: "" });

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "MNT" ? "USD" : "MNT"));
  };

  const convertPrice = (amountInUSD: number): number => {
    if (currency === "MNT") {
      return Math.round(amountInUSD * MNT_RATE);
    }
    return amountInUSD;
  };

  const formatPrice = (amountInUSD: number): string => {
    if (currency === "MNT") {
      const mntValue = Math.round(amountInUSD * MNT_RATE);
      return `${mntValue.toLocaleString()} ₮`;
    }
    return `$${amountInUSD.toFixed(0)}`;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Wishlist-ээс хасагдлаа", "Бүтээгдэхүүн хүслийн жагсаалтаас хасагдлаа.");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Wishlist-д нэмэгдлээ ❤️", "Бүтээгдэхүүн хүслийн жагсаалтад хадгалагдлаа.");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast("Сагсанд нэмэгдлээ! 🛍️", `${item.name} амжилттай нэмэгдлээ.`, item.image);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openProductDetail = (product: ProductDetail) => {
    setSelectedProduct(product);
    setActivePage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addOrder = (orderData: Omit<Order, "id" | "date">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `LEO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        giftWrap,
        setGiftWrap,
        isCartOpen,
        setIsCartOpen,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        openProductDetail,
        subtotal,
        totalItems,
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        convertPrice,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        addOrder,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
