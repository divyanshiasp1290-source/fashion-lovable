import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { images } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The House — Maison Makeeva" },
      {
        name: "description",
        content:
          "The story, philosophy and craftsmanship of Maison Makeeva — an independent fashion house designed in Dubai, made in Italy.",
      },
      { property: "og:title", content: "The House — Maison Makeeva" },
      { property: "og:image", content: images.atelier },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-40 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="eyebrow text-muted-foreground">— The House</div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="mt-6 font-display text-6xl leading-[0.98] lg:text-[10rem]"
          >
            A quiet
            <br />
            <em>language.</em>
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-32 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <img src={images.hero1} alt="Maison Makeeva" className="w-full object-cover" />
        </div>
        <div className="lg:col-span-7 lg:pt-16">
          <p className="font-display text-3xl leading-[1.25] lg:text-4xl">
            Maison Makeeva was founded on a single conviction —{" "}
            <em>that elegance is a slow thing</em>. A house dedicated to considered design, fluent
            tailoring, and the quiet pleasure of a well-made garment.
          </p>
          <p className="mt-10 text-shadow leading-relaxed">
            Each season is a study, not a statement. Drawn in the studio, cut in the atelier,
            refined again on the body — until only what is necessary remains. Our materials are
            chosen for their honesty: silk crêpe from Como, double-faced wool from Biella, fine
            cashmere from the heritage mills of northern Italy.
          </p>
          <p className="mt-6 text-shadow leading-relaxed">
            The Maison is independent. There is no shareholder, no quarter to answer to. Only the
            work, and the women who wear it.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-bone py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-3 lg:px-10">
          {[
            {
              n: "01",
              t: "Vision",
              d: "A wardrobe that quietly endures — designed for the woman who already knows herself.",
            },
            {
              n: "02",
              t: "Craft",
              d: "Hand-finished in family-run ateliers across Italy. Half-canvas construction, French seams, hand-linked knits.",
            },
            {
              n: "03",
              t: "Permanence",
              d: "Heritage pieces — the camel coat, the bias slip, the tailored trouser — re-issued, never replaced.",
            },
          ].map((b) => (
            <div key={b.n} className="border-t border-ink/15 pt-6">
              <div className="eyebrow text-muted-foreground">— {b.n}</div>
              <div className="mt-4 font-display text-4xl">{b.t}</div>
              <p className="mt-4 text-shadow leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier */}
      <section className="grid lg:grid-cols-2">
        <div className="flex items-center bg-ink px-8 py-24 text-ivory lg:px-20 lg:py-32">
          <div className="max-w-xl">
            <div className="eyebrow text-ivory/60">— The Atelier</div>
            <h2 className="mt-6 font-display text-5xl lg:text-6xl">
              The hand
              <br />
              <em>and the cloth.</em>
            </h2>
            <p className="mt-8 text-ivory/75 leading-relaxed">
              Every Maison Makeeva piece begins on a table in Como, in conversation between a
              pattern-maker and a length of silk. The hands that finish our garments have spent
              decades doing only this. We believe that is felt — even when nothing is said.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <img
            src={images.atelier}
            alt="Atelier craftsmanship"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="eyebrow text-muted-foreground">— Founder</div>
        <p className="mt-8 font-display italic text-3xl leading-[1.25] lg:text-4xl">
          "I wanted to build a house where the garment came first, the conversation second, and the
          noise — not at all."
        </p>
        <div className="mt-8 eyebrow">Anna Makeeva, Founder & Creative Director</div>
      </section>
    </SiteLayout>
  );
}
