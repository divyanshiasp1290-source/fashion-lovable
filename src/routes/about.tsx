import { createFileRoute, Link } from "@tanstack/react-router";
import { ImagePlate } from "@/components/site/ImagePlate";
import { SiteLayout } from "@/components/site/Layout";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const reduced = useReducedMotion();

  return (
    <SiteLayout>
      <header className="mx-auto max-w-[1600px] px-6 pb-8 pt-36 lg:px-10 lg:pb-10 lg:pt-40">
        <p className="look-note">01 · The House</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.92] tracking-[-0.03em] lg:text-[7.5rem]">
          A quiet
          <br />
          <em>language.</em>
        </h1>
      </header>

      <section className="pb-10 lg:px-10 lg:pb-16">
        <ImagePlate
          src={images.hero1}
          alt="Maison Makeeva — a draped silhouette in late light"
          aspectRatio="16 / 10"
          objectPosition="50% 18%"
          priority
          reveal={!reduced}
          mark="figure"
          markReveal="inview"
          sizes="100vw"
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-36">
        <p className="max-w-xl font-display text-2xl leading-[1.28] lg:col-span-7 lg:col-start-5 lg:text-3xl">
          Maison Makeeva was founded on a single conviction —{" "}
          <em>that elegance is a slow thing</em>. A house dedicated to considered design, fluent
          tailoring, and the quiet pleasure of a well-made garment.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-28 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-40">
        <div className="lg:col-span-5 lg:pt-4">
          <p className="text-shadow leading-relaxed">
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
        <div className="mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:pt-24" aria-hidden>
          <div className="hairline max-w-xs" />
          <p className="look-note mt-6">MM · House</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-12 lg:px-10">
        <p className="look-note">02 · The Hand</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.05] lg:text-6xl">
          The hand
          <br />
          <em>and the cloth.</em>
        </h2>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-10 lg:grid lg:grid-cols-12 lg:px-10 lg:pb-16">
        <div className="lg:col-span-8 lg:col-start-5">
          <ImagePlate
            src={images.atelier}
            alt="Atelier craftsmanship — garments in the house studio"
            aspectRatio="4 / 5"
            objectPosition="50% 30%"
            reveal={!reduced}
            mark="line"
            markReveal="inview"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-28 lg:grid lg:grid-cols-12 lg:px-10 lg:pb-40">
        <p className="max-w-md text-shadow leading-relaxed lg:col-span-5">
          Every Maison Makeeva piece begins on a table in Como, in conversation between a
          pattern-maker and a length of silk. The hands that finish our garments have spent decades
          doing only this. We believe that is felt — even when nothing is said.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16 lg:px-10 lg:pb-20">
        <p className="look-note">03 · The Line</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.05] lg:text-5xl">House codes</h2>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-12 lg:grid lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <ImagePlate
            src={images.editorial1}
            alt="Editorial study — a considered silhouette"
            aspectRatio="3 / 4"
            objectPosition="center"
            reveal={!reduced}
            mark="circle"
            markReveal="inview"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
        <div className="mt-16 flex flex-col gap-14 lg:col-span-6 lg:col-start-7 lg:mt-8 lg:pt-12">
          <div>
            <p className="look-note">01 · Vision</p>
            <h3 className="mt-3 font-display text-3xl">Vision</h3>
            <p className="mt-4 max-w-sm text-shadow leading-relaxed">
              A wardrobe that quietly endures — designed for the woman who already knows herself.
            </p>
          </div>
          <div>
            <p className="look-note">02 · Craft</p>
            <h3 className="mt-3 font-display text-3xl">Craft</h3>
            <p className="mt-4 max-w-sm text-shadow leading-relaxed">
              Hand-finished in family-run ateliers across Italy. Half-canvas construction, French
              seams, hand-linked knits.
            </p>
          </div>
          <div>
            <p className="look-note">03 · Permanence</p>
            <h3 className="mt-3 font-display text-3xl">Permanence</h3>
            <p className="mt-4 max-w-sm text-shadow leading-relaxed">
              Heritage pieces — the camel coat, the bias slip, the tailored trouser — re-issued,
              never replaced.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10 lg:py-36">
        <blockquote className="max-w-2xl lg:ml-[18%]">
          <p className="font-display italic text-3xl leading-[1.25] lg:text-4xl">
            "I wanted to build a house where the garment came first, the conversation second, and
            the noise — not at all."
          </p>
          <p className="look-note mt-10">Anna Makeeva, Founder & Creative Director</p>
        </blockquote>
        <div className="mt-16 lg:ml-[18%]">
          <Link
            to="/lookbook"
            data-cursor="look"
            className="eyebrow link-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            View the Lookbook
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
