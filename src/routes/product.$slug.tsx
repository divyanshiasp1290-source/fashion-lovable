import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = getProduct(params.slug);
    const title = p ? `${p.name} — Maison Makeeva` : "Maison Makeeva";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "Maison Makeeva" },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: p?.description ?? "Maison Makeeva",
        },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) throw notFound();

  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const liked = wishlist.includes(product.slug);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <SiteLayout>
      <div className="pt-32 lg:pt-28">
        <div className="grid lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col">
            {product.gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="relative aspect-[4/5] bg-bone"
              >
                <img
                  src={src}
                  alt={`${product.name} view ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="px-6 py-16 lg:px-16 lg:py-24">
              <div className="eyebrow text-muted-foreground">{product.collection}</div>
              <h1 className="mt-4 font-display text-5xl lg:text-6xl">{product.name}</h1>
              <div className="mt-6 font-display text-2xl">{formatPrice(product.price)}</div>
              <p className="mt-8 max-w-md text-shadow leading-relaxed">{product.description}</p>

              {/* Color */}
              <div className="mt-10">
                <div className="eyebrow mb-3 text-muted-foreground">
                  Colour — <span className="text-ink">{color}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-4 py-2 eyebrow border transition ${
                        color === c
                          ? "border-ink bg-ink text-ivory"
                          : "border-border hover:border-ink"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="eyebrow text-muted-foreground">Size</span>
                  <button className="eyebrow link-underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-14 px-4 py-3 eyebrow border transition ${
                        size === s
                          ? "border-ink bg-ink text-ivory"
                          : "border-border hover:border-ink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + actions */}
              <div className="mt-10 flex items-stretch gap-3">
                <div className="inline-flex items-center border border-border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="grid h-12 w-12 place-items-center"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3 w-3" strokeWidth={1} />
                  </button>
                  <span className="w-10 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="grid h-12 w-12 place-items-center"
                    aria-label="Increase"
                  >
                    <Plus className="h-3 w-3" strokeWidth={1} />
                  </button>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      slug: product.slug,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      size,
                      color,
                      qty,
                    })
                  }
                  className="flex-1 bg-ink py-4 eyebrow text-ivory hover:bg-shadow"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.slug)}
                  aria-label="Wishlist"
                  className="grid h-12 w-12 place-items-center border border-border hover:border-ink"
                >
                  <Heart
                    className="h-4 w-4"
                    strokeWidth={1}
                    fill={liked ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Details */}
              <div className="mt-14 space-y-6">
                <Accordion title="The Piece" open>
                  <ul className="space-y-2 text-shadow">
                    {product.details.map((d) => (
                      <li key={d}>— {d}</li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Composition & Care">
                  <p className="text-shadow">{product.composition}</p>
                  <p className="mt-3 text-shadow">
                    Professional cleaning recommended. Store on a padded hanger in a breathable
                    garment bag.
                  </p>
                </Accordion>
                <Accordion title="Delivery & Returns">
                  <p className="text-shadow">
                    Complimentary global delivery on orders above € 800. Free returns within 30
                    days. Made-to-order pieces are final sale.
                  </p>
                </Accordion>
              </div>

              <div className="mt-12 eyebrow text-muted-foreground">
                Shipped from our atelier in Como. Need styling guidance?{" "}
                <Link to="/contact" className="text-ink link-underline">
                  Speak to a Client Advisor.
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <section className="bg-bone py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="eyebrow text-muted-foreground">— The Story</div>
            <p className="mt-8 font-display text-3xl italic leading-[1.25] lg:text-4xl">
              "{product.name} — drawn from the season's central study of light, drape and the
              architecture of the body."
            </p>
            <div className="mt-8 eyebrow">Anna Makeeva, Creative Director</div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10">
          <div className="mb-12">
            <div className="eyebrow text-muted-foreground">— You May Also Love</div>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl">Complete the look</h2>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

function Accordion({
  title,
  children,
  open: defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border pt-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between"
      >
        <span className="eyebrow">{title}</span>
        <span className="text-xl font-light">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-4 text-sm leading-relaxed">{children}</div>}
    </div>
  );
}
