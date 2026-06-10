import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — Maison Makeeva" },
      { name: "description", content: "Your Maison Makeeva shopping bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, cartTotal, updateQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const discount = applied ? Math.round(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 800 ? 0 : 35;
  const total = cartTotal - discount + (cart.length ? shipping : 0);

  return (
    <SiteLayout>
      <section className="px-6 pt-40 pb-12 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow text-muted-foreground">— Step 01 / 03</div>
          <h1 className="mt-6 font-display text-6xl lg:text-8xl">Shopping Bag</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-16 px-6 pb-32 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          {cart.length === 0 ? (
            <div className="border border-border p-16 text-center">
              <p className="font-display text-4xl">Your bag is empty.</p>
              <Link
                to="/collection/$slug"
                params={{ slug: "atelier-ss26" }}
                className="mt-8 inline-block eyebrow link-underline"
              >
                Discover the collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {cart.map((line) => (
                <li key={line.slug + line.size} className="grid grid-cols-12 gap-6 py-8">
                  <img
                    src={line.image}
                    alt={line.name}
                    className="col-span-3 aspect-[4/5] w-full object-cover lg:col-span-2"
                  />
                  <div className="col-span-9 flex flex-col justify-between lg:col-span-10">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="eyebrow text-muted-foreground">
                          {line.color} · Size {line.size}
                        </div>
                        <Link
                          to="/product/$slug"
                          params={{ slug: line.slug }}
                          className="mt-2 inline-block font-display text-2xl lg:text-3xl link-underline"
                        >
                          {line.name}
                        </Link>
                      </div>
                      <div className="font-display text-xl">
                        {formatPrice(line.price * line.qty)}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button
                          onClick={() => updateQty(line.slug, line.size, line.qty - 1)}
                          className="grid h-10 w-10 place-items-center"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1} />
                        </button>
                        <span className="w-10 text-center text-sm">{line.qty}</span>
                        <button
                          onClick={() => updateQty(line.slug, line.size, line.qty + 1)}
                          className="grid h-10 w-10 place-items-center"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(line.slug, line.size)}
                        className="eyebrow link-underline text-muted-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="border border-border p-8 lg:sticky lg:top-32">
            <div className="eyebrow text-muted-foreground">— Order Summary</div>
            <div className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={formatPrice(cartTotal)} />
              {applied && <Row label="Promotion (HOUSE10)" value={`− ${formatPrice(discount)}`} />}
              <Row
                label="Shipping"
                value={
                  cart.length === 0 ? "—" : shipping === 0 ? "Complimentary" : formatPrice(shipping)
                }
              />
              <div className="hairline my-4" />
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Total</span>
                <span className="font-display text-3xl">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-8">
              <label className="eyebrow text-muted-foreground">Promotion Code</label>
              <div className="mt-3 flex border-b border-border">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
                />
                <button onClick={() => setApplied(true)} className="eyebrow link-underline">
                  Apply
                </button>
              </div>
              {applied && (
                <div className="mt-2 text-xs text-shadow">
                  Code HOUSE10 applied — 10% off your order.
                </div>
              )}
            </div>

            <button
              disabled={cart.length === 0}
              className="mt-8 w-full bg-ink py-5 eyebrow text-ivory hover:bg-shadow disabled:opacity-40"
            >
              Proceed to Checkout
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure checkout · Shopify Payments
            </p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
