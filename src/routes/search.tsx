import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, collections } from "@/lib/products";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Maison Makeeva" },
      { name: "description", content: "Search the Maison Makeeva archive." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.collection.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term),
    );
  }, [q]);

  const matchingCollections = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return collections.filter(
      (c) => c.name.toLowerCase().includes(term) || c.tagline.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <SiteLayout>
      <section className="border-b border-border px-6 pt-36 pb-10 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow text-muted-foreground">— Search</div>
          <div className="mt-6 flex items-center gap-6 border-b border-ink pb-4">
            <Search className="h-6 w-6" strokeWidth={1} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pieces, collections, materials…"
              className="w-full bg-transparent font-display text-4xl placeholder:text-muted-foreground/50 focus:outline-none lg:text-6xl"
            />
          </div>
          <div className="mt-4 eyebrow text-muted-foreground">
            {results.length} pieces · {matchingCollections.length} collections
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        {matchingCollections.length > 0 && (
          <div className="mb-16">
            <div className="eyebrow mb-6 text-muted-foreground">Collections</div>
            <div className="grid gap-6 lg:grid-cols-3">
              {matchingCollections.map((c) => (
                <div key={c.slug} className="aspect-[16/9] relative overflow-hidden bg-bone">
                  <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-ivory font-display text-2xl">
                    {c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        {results.length === 0 && (
          <p className="font-display text-3xl">No pieces match this search.</p>
        )}
      </section>
    </SiteLayout>
  );
}
