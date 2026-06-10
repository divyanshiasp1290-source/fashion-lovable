import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { collections, products, images } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Makeeva — Atelier SS26" },
      {
        name: "description",
        content:
          "Discover Atelier SS26 by Maison Makeeva — sculpted silhouettes, considered tailoring and quiet craftsmanship.",
      },
      { property: "og:title", content: "Maison Makeeva — Atelier SS26" },
      {
        property: "og:description",
        content: "The new chapter — Atelier Spring/Summer 2026.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestSellers = products.filter((p) => p.bestSeller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <SiteLayout transparentHeader>
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-ink text-ivory">
        <motion.img
          src={images.hero1}
          alt="Atelier SS26 campaign"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="max-w-3xl"
          >
            <div className="eyebrow text-ivory/75">Atelier — Spring / Summer 2026</div>
            <h1 className="mt-6 font-display text-[14vw] leading-[0.95] tracking-tight lg:text-[8.5rem]">
              The Quiet
              <br />
              <em className="font-light">Hour</em>
            </h1>
            <p className="mt-8 max-w-xl text-base text-ivory/80 leading-relaxed lg:text-lg">
              A meditation on stillness — sculpted silhouettes in ivory silk, draped against the
              warmth of late afternoon light.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <Link
                to="/collection/$slug"
                params={{ slug: "atelier-ss26" }}
                className="inline-flex items-center bg-ivory px-8 py-4 eyebrow text-ink hover:bg-bone"
              >
                Discover the Collection
              </Link>
              <Link to="/lookbook" className="eyebrow link-underline">
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 eyebrow text-ivory/60 [writing-mode:vertical-rl]">
          Scroll · 01 / 06
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-border bg-bone py-5">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-16 px-8">
              {[
                "Made in Italy",
                "Atelier Spring / Summer 2026",
                "Complimentary Global Delivery",
                "Designed in Dubai",
                "Hand-finished",
                "An Independent Fashion House",
              ].map((t) => (
                <span key={t} className="eyebrow flex items-center gap-16">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-ink/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Brand intro */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="eyebrow text-muted-foreground">— The House</div>
          </div>
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-4xl leading-[1.08] lg:text-6xl"
            >
              Maison Makeeva is an independent fashion house dedicated to the quiet pursuit of craft
              —{" "}
              <em className="font-light text-shadow">
                considered silhouettes, fluent tailoring, and the slow art of dressing.
              </em>
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Featured collections */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <div className="eyebrow text-muted-foreground">— Collections</div>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl">The Seasons</h2>
            </div>
            <Link
              to="/collection/$slug"
              params={{ slug: "atelier-ss26" }}
              className="eyebrow link-underline hidden lg:block"
            >
              View All Collections
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {collections.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
              >
                <Link to="/collection/$slug" params={{ slug: c.slug }} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                      <div className="eyebrow opacity-80">{c.tagline}</div>
                      <div className="mt-2 font-display text-2xl">{c.name}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial split campaign */}
      <section className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <img
            src={images.lb1}
            alt="Editorial campaign"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-ink px-8 py-20 text-ivory lg:px-20 lg:py-32">
          <div className="max-w-xl">
            <div className="eyebrow text-ivory/60">— Campaign 01</div>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] lg:text-7xl">
              An architecture
              <br />
              of <em>silence.</em>
            </h2>
            <p className="mt-8 text-ivory/75 leading-relaxed">
              Photographed in a marble interior at golden hour. The new season looks to ancient
              drapery and the precision of modern tailoring — two languages, one quiet voice.
            </p>
            <Link
              to="/lookbook"
              className="mt-10 inline-flex items-center border border-ivory/30 px-8 py-4 eyebrow text-ivory hover:bg-ivory hover:text-ink transition"
            >
              View the Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="eyebrow text-muted-foreground">— Iconic Pieces</div>
            <h2 className="mt-5 font-display text-5xl lg:text-6xl">House Best Sellers</h2>
          </div>
          <Link to="/search" className="eyebrow link-underline hidden lg:block">
            Shop All
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-bone py-28 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="eyebrow text-muted-foreground">— Just Arrived</div>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl">New This Season</h2>
            </div>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {newArrivals.slice(0, 3).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook preview */}
      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-3">
          {[images.lb1, images.lb2, images.lb3].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: i * 0.15 }}
              className={i === 1 ? "lg:translate-y-16" : i === 2 ? "lg:translate-y-32" : ""}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                <img
                  src={src}
                  alt={`Lookbook ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 eyebrow text-muted-foreground">Look 0{i + 1}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 flex justify-center">
          <Link
            to="/lookbook"
            className="inline-flex items-center border border-ink px-10 py-5 eyebrow hover:bg-ink hover:text-ivory transition"
          >
            View The Full Lookbook
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-ink py-28 text-ivory lg:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <div className="eyebrow text-ivory/55">— Philosophy</div>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] lg:text-6xl">
              The slow
              <br />
              <em>art of making.</em>
            </h2>
          </div>
          <div className="grid gap-12 lg:col-span-8 lg:grid-cols-2">
            {[
              {
                t: "Considered Design",
                d: "Each silhouette is studied, drawn and re-drawn — until only the necessary remains.",
              },
              {
                t: "Italian Craftsmanship",
                d: "Cut and hand-finished in family-run ateliers across northern Italy.",
              },
              {
                t: "Noble Materials",
                d: "Silk crêpe, double-faced wool, fine cashmere — sourced from heritage mills.",
              },
              {
                t: "Permanent Pieces",
                d: "Designed to outlast the season — the camel coat, the bias slip, the tailored trouser.",
              },
            ].map((b) => (
              <div key={b.t}>
                <div className="hairline mb-5" />
                <div className="font-display text-2xl">{b.t}</div>
                <p className="mt-3 text-ivory/70 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
