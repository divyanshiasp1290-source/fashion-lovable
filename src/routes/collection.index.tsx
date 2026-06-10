import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { collections, categories } from "@/lib/products";

export const Route = createFileRoute("/collection/")({
  head: () => ({
    meta: [
      { title: "Collections — Maison Makeeva" },
      {
        name: "description",
        content: "Explore the seasonal and permanent collections of Maison Makeeva.",
      },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <SiteLayout>
      <section className="px-6 pt-40 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow text-muted-foreground">— The House Archive</div>
          <h1 className="mt-6 font-display text-6xl lg:text-8xl">Collections</h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 pb-32 lg:px-10">
        <div className="mb-12 flex gap-6 eyebrow text-muted-foreground">
          <span>Filter:</span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="link-underline text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-16 lg:grid-cols-2">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="group block"
            >
              <div className="relative aspect-[5/6] overflow-hidden bg-bone">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="eyebrow text-muted-foreground">Chapter 0{i + 1}</div>
                  <div className="mt-2 font-display text-3xl">{c.name}</div>
                  <div className="mt-1 italic text-muted-foreground">{c.tagline}</div>
                </div>
                <span className="eyebrow link-underline">Discover →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
