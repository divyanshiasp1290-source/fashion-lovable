import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (line: CartLine) => void;
  removeFromCart: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  toggleWishlist: (slug: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const StoreCtx = createContext<StoreState | null>(null);

const isBrowser = typeof window !== "undefined";

function load<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load("mm.cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("mm.wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (isBrowser) localStorage.setItem("mm.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (isBrowser) localStorage.setItem("mm.wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreState>(() => {
    return {
      cart,
      wishlist,
      cartOpen,
      setCartOpen,
      addToCart: (line) => {
        setCart((prev) => {
          const idx = prev.findIndex((l) => l.slug === line.slug && l.size === line.size);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + line.qty };
            return copy;
          }
          return [...prev, line];
        });
        setCartOpen(true);
      },
      removeFromCart: (slug, size) =>
        setCart((prev) => prev.filter((l) => !(l.slug === slug && l.size === size))),
      updateQty: (slug, size, qty) =>
        setCart((prev) =>
          prev.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, qty) } : l,
          ),
        ),
      toggleWishlist: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
      clearCart: () => setCart([]),
      cartCount: cart.reduce((a, b) => a + b.qty, 0),
      cartTotal: cart.reduce((a, b) => a + b.price * b.qty, 0),
    };
  }, [cart, wishlist, cartOpen]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
