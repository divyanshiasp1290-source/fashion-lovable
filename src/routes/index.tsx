import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HouseMark } from "@/components/marks";
import { useExperienceUi, useScrollProgress } from "@/components/experience/ExperienceContext";
import { HomeHeroExperience } from "@/components/experience/HomeHeroExperience";
import { ImagePlate } from "@/components/site/ImagePlate";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { storyBeats } from "@/lib/experience/story";
import type { HouseMarkType } from "@/lib/marks";
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
  const reduced = useReducedMotion();

  return (
    <SiteLayout transparentHeader>
      <HomeHeroExperience story={<AtelierStory />}>
        <HeroCopy />
      </HomeHeroExperience>

      <section className="bg-[var(--house-paper)] pb-20 pt-6 lg:pb-28 lg:pt-10">
        <div className="lg:px-10">
          <Link
            to="/lookbook"
            data-cursor="explore"
            aria-label="View the Campaign — Atelier SS26 Lookbook"
            className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <ImagePlate
              src={images.lb1}
              alt="Campaign 01 — Atelier SS26, photographed in a marble interior at golden hour"
              aspectRatio="16 / 10"
              objectPosition="50% 22%"
              reveal={!reduced}
              mark="frame"
              markReveal="inview"
              sizes="100vw"
            />
          </Link>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1600px] flex-col gap-8 px-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-xl">
            <p className="look-note">Campaign 01 · MM-01</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] lg:text-6xl">
              An architecture of <em>silence.</em>
            </h2>
            <p className="mt-5 max-w-md text-shadow leading-relaxed">
              Photographed in a marble interior at golden hour. The new season looks to ancient
              drapery and the precision of modern tailoring — two languages, one quiet voice.
            </p>
          </div>
          <Link
            to="/lookbook"
            data-cursor="explore"
            className="eyebrow link-underline shrink-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            View the Campaign
          </Link>
        </div>
      </section>

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

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 max-w-lg">
          <p className="look-note">The book</p>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl">Eight plates. One season.</h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <LookEntry
            src={images.hero2}
            alt="Lookbook plate 01"
            label="Look 01"
            mark="line"
            reduced={reduced}
            className="lg:col-span-7"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <LookEntry
            src={images.lb2}
            alt="Lookbook plate 02"
            label="Look 02"
            mark="circle"
            reduced={reduced}
            className="lg:col-span-4 lg:col-start-9 lg:pt-20"
            sizes="(max-width: 1024px) 100vw, 32vw"
          />
          <LookEntry
            src={images.lb3}
            alt="Lookbook plate 03"
            label="Look 03"
            mark="arrow"
            reduced={reduced}
            className="lg:col-span-5 lg:col-start-2"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
        <div className="mt-20">
          <Link
            to="/lookbook"
            data-cursor="look"
            className="eyebrow link-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            View the Lookbook
          </Link>
        </div>
      </section>

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
                <div className="hairline mb-5 border-ivory/20" />
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

function AtelierStory() {
  const { atelier } = useExperienceUi();
  const { story, hero } = useScrollProgress();
  const beats = storyBeats(story, hero);
  const ink = atelier;

  return (
    <>
      <section className={`relative px-6 py-28 lg:px-10 lg:py-36 ${ink ? "text-ink" : "text-ivory"}`}>
        <div className="mx-auto max-w-[1600px]">
          <div
            className={`mb-16 h-px origin-left ${ink ? "bg-ink/25" : "bg-ivory/30"}`}
            style={{ transform: `scaleX(${0.12 + beats.taut * 0.88})` }}
            aria-hidden
          />
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className={`eyebrow ${ink ? "text-ink/55" : "text-ivory/60"}`}>— The House</div>
            </div>
            <div className="lg:col-span-8 lg:col-start-4">
              <p className="eyebrow mb-8 max-w-xs">
                Made in Italy · Designed in Dubai · Hand-finished
              </p>
              <h2 className="max-w-4xl font-display text-[2.15rem] leading-[1.12] lg:text-5xl">
                Maison Makeeva is an independent fashion house dedicated to the quiet pursuit of
                craft —{" "}
                <em className={ink ? "font-light text-shadow" : "font-light text-ivory/75"}>
                  considered silhouettes, fluent tailoring, and the slow art of dressing.
                </em>
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative px-6 pb-32 pt-8 lg:px-10 lg:pb-40 ${ink ? "text-ink" : "text-ivory"}`}>
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <div className={`eyebrow ${ink ? "text-ink/55" : "text-ivory/60"}`}>— Collections</div>
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
          <div className="grid gap-px lg:grid-cols-4">
            {collections.map((c) => {
              const tension =
                c.slug === "ivoire"
                  ? beats.ivoire
                  : c.slug === "noir"
                    ? beats.noir
                    : c.slug === "heritage"
                      ? beats.heritage
                      : beats.atelier;
              return (
                <Link
                  key={c.slug}
                  to="/collection/$slug"
                  params={{ slug: c.slug }}
                  className="group relative block py-8 lg:px-6 lg:py-10"
                >
                  <div
                    className={`mb-8 h-px w-full origin-left transition-opacity ${ink ? "bg-ink/30" : "bg-ivory/35"}`}
                    style={{ transform: `scaleX(${0.22 + tension * 0.78})`, opacity: 0.45 + tension * 0.55 }}
                  />
                  <div className={`eyebrow ${ink ? "text-ink/50" : "text-ivory/55"}`}>{c.tagline}</div>
                  <div className="mt-3 font-display text-3xl lg:text-4xl">{c.name}</div>
                  <p
                    className={`mt-5 max-w-[16rem] text-sm leading-relaxed ${ink ? "text-ink/70" : "text-ivory/70"}`}
                  >
                    {c.description}
                  </p>
                  <span className="mt-8 inline-block eyebrow link-underline">Enter</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroCopy() {
  const { hero, story } = useScrollProgress();
  const { atelier } = useExperienceUi();
  const beats = storyBeats(story, hero);
  const ink = atelier;
  const beat =
    beats.recede > 0.2
      ? "Release"
      : beats.detail > 0.2
        ? "Detail"
        : beats.taut > 0.2
          ? "Tension"
          : beats.open > 0.2
            ? "Unfold"
            : "Arrival";

  return (
    <>
      <div
        className={`relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-20 lg:pt-24 ${
          ink ? "text-ink" : "text-ivory"
        }`}
        style={{
          opacity: 1 - Math.min(hero * 1.05, 1) * 0.96,
          transform: `translate3d(0, ${hero * -12}px, 0)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-[26rem] lg:max-w-[28rem]"
        >
          <div className={`eyebrow ${ink ? "text-ink/60" : "text-ivory/70"}`}>
            Atelier — Spring / Summer 2026
          </div>
          <h1 className="mt-6 font-display text-5xl font-normal leading-[0.96] tracking-[-0.022em] text-current lg:text-7xl">
            The Quiet
            <br />
            <em className="font-light">Hour</em>
          </h1>
          <p className={`mt-8 max-w-md text-base leading-relaxed lg:text-[1.05rem] ${ink ? "text-ink/75" : "text-ivory/80"}`}>
            A muslin still being decided. Late light. The atelier before anyone arrives.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              to="/collection/$slug"
              params={{ slug: "atelier-ss26" }}
              className={`inline-flex items-center px-8 py-4 eyebrow transition ${
                ink
                  ? "border border-ink bg-transparent text-ink hover:bg-ink hover:text-ivory"
                  : "bg-ivory text-ink hover:bg-bone"
              }`}
            >
              Discover the Collection
            </Link>
            <Link to="/lookbook" className="eyebrow link-underline">
              View Lookbook
            </Link>
          </div>
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute right-[16%] top-[38%] z-10 hidden lg:block"
        aria-hidden
        style={{ opacity: Math.max(0, 0.5 - hero * 0.85) }}
      >
        <HouseMark type="line" size={92} animated={false} className={ink ? "text-ink/35" : "text-ivory/45"} />
      </div>
      <div
        className={`absolute bottom-8 right-8 z-10 eyebrow [writing-mode:vertical-rl] ${ink ? "text-ink/45" : "text-ivory/55"}`}
        style={{ opacity: 1 - hero }}
      >
        Scroll · {beat}
      </div>
    </>
  );
}

function LookEntry({
  src,
  alt,
  label,
  mark,
  reduced,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  label: string;
  mark: HouseMarkType;
  reduced: boolean;
  className: string;
  sizes: string;
}) {
  return (
    <article className={className}>
      <Link
        to="/lookbook"
        data-cursor="look"
        aria-label={`${label} — View the Lookbook`}
        className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <ImagePlate
          src={src}
          alt={alt}
          aspectRatio="4 / 5"
          reveal={!reduced}
          mark={mark}
          markReveal="inview"
          sizes={sizes}
        />
      </Link>
      <p className="look-note mt-3">{label}</p>
    </article>
  );
}
