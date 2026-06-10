import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartTotal, updateQty, removeFromCart } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col bg-ivory text-ink"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="eyebrow">Shopping Bag</div>
              <button onClick={() => setCartOpen(false)} aria-label="Close">
                <X className="h-5 w-5" strokeWidth={1} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="font-display text-3xl">Your bag is empty.</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Discover the new season and add pieces to your bag.
                </p>
                <Link
                  to="/collection/$slug"
                  params={{ slug: "atelier-ss26" }}
                  onClick={() => setCartOpen(false)}
                  className="eyebrow link-underline"
                >
                  Discover the collection
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <ul className="space-y-6">
                    {cart.map((line) => (
                      <li
                        key={line.slug + line.size}
                        className="flex gap-4 border-b border-border pb-6"
                      >
                        <img src={line.image} alt={line.name} className="h-32 w-24 object-cover" />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="font-display text-lg leading-tight">{line.name}</div>
                            <div className="eyebrow mt-1 text-muted-foreground">
                              {line.color} · Size {line.size}
                            </div>
                          </div>
                          <div className="flex items-end justify-between">
                            <div className="inline-flex items-center border border-border">
                              <button
                                className="grid h-8 w-8 place-items-center"
                                onClick={() => updateQty(line.slug, line.size, line.qty - 1)}
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" strokeWidth={1} />
                              </button>
                              <span className="w-8 text-center text-sm">{line.qty}</span>
                              <button
                                className="grid h-8 w-8 place-items-center"
                                onClick={() => updateQty(line.slug, line.size, line.qty + 1)}
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" strokeWidth={1} />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-display">
                                {formatPrice(line.price * line.qty)}
                              </div>
                              <button
                                onClick={() => removeFromCart(line.slug, line.size)}
                                className="eyebrow mt-1 text-muted-foreground link-underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Subtotal</span>
                    <span className="font-display text-2xl">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <Link
                    to="/cart"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 flex w-full items-center justify-center bg-ink py-4 eyebrow text-ivory hover:bg-shadow"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-3 block w-full eyebrow link-underline"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
