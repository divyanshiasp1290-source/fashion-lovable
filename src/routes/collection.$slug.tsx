import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import {
  categories,
  getCollection,
  products,
  productsByCategory,
  productsByCollection,
} from "@/lib/products";

export const Route = createFileRoute("/collection/$slug")({
  head: ({ params }) => {
    const c = getCollection(params.slug);
    const title = c ? `${c.name} — Maison Makeeva` : "Collection — Maison Makeeva";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: c?.description ?? "Maison Makeeva collection.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: c?.description ?? "Maison Makeeva collection.",
        },
        ...(c?.image ? [{ property: "og:image", content: c.image }] : []),
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);
  const categoryMatch = categories.find((c) => c.slug === slug);

  const items = collection
    ? productsByCollection(slug)
    : categoryMatch
      ? productsByCategory(slug)
      : [];

  if (!collection && !categoryMatch) throw notFound();

  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const sorted = [...items].sort((a, b) =>
    sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0,
  );

  const heroTitle = collection?.name ?? categoryMatch?.name ?? "";
  const heroLine = collection?.tagline ?? "The House Archive";
  const heroDesc =
    collection?.description ?? `All ${categoryMatch?.name.toLowerCase()} from Maison Makeeva.`;
  const heroImg = collection?.image ?? items[0]?.image ?? products[0].image;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[70svh] w-full overflow-hidden bg-ink text-ivory">
        <motion.img
          src={heroImg}
          alt={heroTitle}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="eyebrow text-ivory/70">{heroLine}</div>
          <h1 className="mt-4 font-display text-6xl lg:text-[8rem] leading-[0.95]">{heroTitle}</h1>
          <p className="mt-6 max-w-xl text-ivory/80">{heroDesc}</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-20 z-20 border-y border-border bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-6 px-6 py-4 eyebrow lg:px-10">
          <span className="text-muted-foreground">{sorted.length} pieces</span>
          <div className="ml-auto flex items-center gap-6">
            <span className="text-muted-foreground">Categories:</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className="link-underline"
              >
                {c.name}
              </Link>
            ))}
            <span className="text-muted-foreground">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent eyebrow focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price · Low to High</option>
              <option value="high">Price · High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-28">
        {sorted.length === 0 ? (
          <p className="font-display text-3xl">No pieces in this edit yet.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
