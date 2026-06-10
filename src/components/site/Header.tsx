import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { collections, categories } from "@/lib/products";

export function Header({ transparent }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const alwaysSolid = !transparent;
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen, wishlist } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "New In", key: "new" },
    { label: "Collections", key: "collections" },
    { label: "Ready to Wear", key: "rtw" },
    { label: "Atelier", key: "atelier" },
    { label: "Lookbook", key: "lookbook", to: "/lookbook" },
    { label: "House", key: "house", to: "/about" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || megaOpen || alwaysSolid
          ? "bg-ivory text-ink border-b border-border"
          : "bg-transparent text-ivory"
      }`}
      onMouseLeave={() => setMegaOpen(null)}
    >
      {/* announcement bar */}
      <div
        className={`overflow-hidden border-b transition-all ${
          scrolled || megaOpen || alwaysSolid ? "border-border h-9" : "border-ivory/15 h-9"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center px-6 eyebrow opacity-80">
          Complimentary global delivery on orders above € 800
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-[1600px] items-center px-6 lg:px-10">
        {/* left nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-9 lg:flex">
          {navItems.map((n) => (
            <button
              key={n.key}
              onMouseEnter={() =>
                ["collections", "rtw", "new"].includes(n.key)
                  ? setMegaOpen(n.key)
                  : setMegaOpen(null)
              }
              className="eyebrow link-underline"
            >
              {n.to ? (
                <Link to={n.to}>{n.label}</Link>
              ) : n.key === "lookbook" ? (
                <Link to="/lookbook">{n.label}</Link>
              ) : (
                n.label
              )}
            </button>
          ))}
        </nav>

        <button className="lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" strokeWidth={1} />
        </button>

        {/* logo */}
        <Link to="/" className="flex-1 text-center" onMouseEnter={() => setMegaOpen(null)}>
          <span className="font-display text-2xl tracking-[0.18em] lg:text-[28px]">
            MAISON&nbsp;MAKEEVA
          </span>
        </Link>

        {/* right icons */}
        <div className="flex flex-1 items-center justify-end gap-5 lg:gap-6">
          <Link to="/search" aria-label="Search" className="hidden lg:block">
            <Search className="h-[18px] w-[18px]" strokeWidth={1} />
          </Link>
          <Link to="/account" aria-label="Account" className="hidden lg:block">
            <User className="h-[18px] w-[18px]" strokeWidth={1} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart className="h-[18px] w-[18px]" strokeWidth={1} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-ivory">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative">
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-ivory">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="hidden border-t border-border bg-ivory text-ink lg:block"
          >
            <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-12 px-10 py-12">
              <div className="col-span-3">
                <div className="eyebrow mb-5 text-muted-foreground">Collections</div>
                <ul className="space-y-3">
                  {collections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/collection/$slug"
                        params={{ slug: c.slug }}
                        className="font-display text-2xl link-underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-3">
                <div className="eyebrow mb-5 text-muted-foreground">Categories</div>
                <ul className="space-y-3 font-display text-xl">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/collection/$slug"
                        params={{ slug: c.slug }}
                        className="link-underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6">
                <Link to="/lookbook" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={collections[0].image}
                      alt="Featured collection"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="eyebrow text-muted-foreground">The new chapter</div>
                      <div className="mt-1 font-display text-2xl">
                        Atelier SS26 — The Quiet Hour
                      </div>
                    </div>
                    <span className="eyebrow link-underline">Discover →</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-[60] bg-ivory text-ink lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-xl tracking-[0.18em]">MAISON MAKEEVA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-5 w-5" strokeWidth={1} />
              </button>
            </div>
            <div className="px-6 pt-8">
              <ul className="space-y-5">
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/collection/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-4xl"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-12 space-y-4 eyebrow">
                <Link to="/lookbook" onClick={() => setMobileOpen(false)} className="block">
                  Lookbook
                </Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="block">
                  The House
                </Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="block">
                  Contact
                </Link>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="block">
                  Account
                </Link>
                <Link to="/search" onClick={() => setMobileOpen(false)} className="block">
                  Search
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
