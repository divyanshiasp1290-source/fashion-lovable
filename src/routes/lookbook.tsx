import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HouseMark } from "@/components/marks";
import { ImagePlate } from "@/components/site/ImagePlate";
import { SiteLayout } from "@/components/site/Layout";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { HouseMarkType } from "@/lib/marks";
import { getProduct, images } from "@/lib/products";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — Maison Makeeva SS26" },
      {
        name: "description",
        content: "The Atelier SS26 lookbook — a visual study of the new season.",
      },
      { property: "og:title", content: "Lookbook — Maison Makeeva SS26" },
      { property: "og:image", content: images.lb1 },
    ],
  }),
  component: LookbookPage,
});

const ease = [0.22, 0.68, 0.2, 1] as const;
const view = { once: true, amount: 0.35, margin: "0px 0px -8% 0px" } as const;

type Chapter = {
  id: string;
  src: string;
  alt: string;
  look: string;
  role: string;
  title: string;
  line: string;
  mark: HouseMarkType;
  objectPosition?: string;
  productSlug?: string;
};

const chapters: Chapter[] = [
  {
    id: "01",
    src: images.hero1,
    alt: "Look 01 — Ivoire Draped Gown in late light",
    look: "01",
    role: "ATELIER",
    title: "Ivoire Draped Gown",
    line: "Hand-draped silk crêpe. The season’s opening length.",
    mark: "frame",
    objectPosition: "50% 18%",
    productSlug: "ivoire-draped-gown",
  },
  {
    id: "02",
    src: images.lb1,
    alt: "Look 02 — sculpted bodice in heavy crêpe",
    look: "02",
    role: "FORM",
    title: "Quiet Power",
    line: "Strapless bodice, held by cut rather than ornament.",
    mark: "line",
    objectPosition: "50% 30%",
  },
  {
    id: "03",
    src: images.hero2,
    alt: "Look 03 — Noir Tailored Coat",
    look: "03",
    role: "LINE",
    title: "Noir Tailored Coat",
    line: "Double-faced wool. Peak lapel. The house outerwear.",
    mark: "arrow",
    objectPosition: "center",
    productSlug: "noir-tailored-coat",
  },
  {
    id: "04",
    src: images.lb2,
    alt: "Look 04 — evening bijoux against black",
    look: "04",
    role: "PIECE",
    title: "Bijoux",
    line: "A single evening note. Crystal, set by hand.",
    mark: "circle",
    objectPosition: "50% 40%",
  },
  {
    id: "05",
    src: images.lb3,
    alt: "Look 05 — full-length wool in evening light",
    look: "05",
    role: "NOIR",
    title: "Noir Promenade",
    line: "Wool at full length. Light taken from the side.",
    mark: "line",
    objectPosition: "60% 20%",
    productSlug: "noir-tailored-coat",
  },
  {
    id: "06",
    src: images.p1,
    alt: "Look 06 — Ivoire Slip Dress, bias silk",
    look: "06",
    role: "IVOIRE",
    title: "Ivoire Slip Dress",
    line: "Bias satin. The house slip, unaltered.",
    mark: "figure",
    objectPosition: "50% 15%",
    productSlug: "ivoire-slip-dress",
  },
  {
    id: "07",
    src: images.p2,
    alt: "Look 07 — Noir Evening Cape",
    look: "07",
    role: "FORM",
    title: "Noir Evening Cape",
    line: "Hand-pleated chiffon, made to order.",
    mark: "frame",
    objectPosition: "center top",
    productSlug: "noir-evening-cape",
  },
  {
    id: "08",
    src: images.p4,
    alt: "Look 08 — Camel Architect Coat",
    look: "08",
    role: "HERITAGE",
    title: "Camel Architect Coat",
    line: "The enduring silhouette, cut again for the season.",
    mark: "arrow",
    objectPosition: "50% 25%",
    productSlug: "camel-architect-coat",
  },
];

function LookbookPage() {
  const reduced = useReducedMotion();

  return (
    <SiteLayout>
      <header className="mx-auto max-w-[1600px] px-6 pb-10 pt-36 lg:px-10 lg:pb-14 lg:pt-40">
        <div className="flex items-end gap-6">
          <HouseMark type="line" size={72} animated={false} className="shrink-0 text-ink" />
          <div>
            <p className="look-note">Atelier SS26 · Milano</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.92] tracking-[-0.03em] lg:text-[7.5rem]">
              Lookbook
            </h1>
          </div>
        </div>
        <p className="mt-8 max-w-md text-shadow leading-relaxed lg:ml-[6rem]">
          Eight plates. One season. Photographed as a house book — not a catalogue.
        </p>
      </header>

      <section className="pb-16 lg:px-10 lg:pb-24">
        <OpeningPlate reduced={reduced} />
      </section>

      <LookChapter chapter={chapters[0]} layout="bleed" sizes="100vw" />

      <Pause>
        Drawn in the studio, cut in the atelier, refined on the body — until only the necessary
        remains.
      </Pause>

      <LookChapter chapter={chapters[1]} layout="offset" sizes="(max-width: 1024px) 100vw, 42vw" />

      <section className="mx-auto grid max-w-[1600px] gap-16 px-6 py-10 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-20">
        <div className="lg:col-span-7">
          <LookChapter chapter={chapters[2]} layout="nested" sizes="(max-width: 1024px) 100vw, 58vw" />
        </div>
        <div className="lg:col-span-5 lg:pt-28">
          <LookChapter chapter={chapters[3]} layout="nested" sizes="(max-width: 1024px) 100vw, 38vw" />
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-32" aria-hidden>
        <div className="hairline max-w-xs" />
        <p className="look-note mt-6">MM-01</p>
      </div>

      <LookChapter chapter={chapters[4]} layout="wide" sizes="(max-width: 1024px) 100vw, 85vw" />

      <section className="mx-auto grid max-w-[1600px] items-end gap-12 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-4 lg:pb-12">
          <LookChapter chapter={chapters[5]} layout="nested" sizes="(max-width: 1024px) 100vw, 32vw" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <LookChapter chapter={chapters[6]} layout="nested" sizes="(max-width: 1024px) 100vw, 55vw" />
        </div>
      </section>

      <LookChapter chapter={chapters[7]} layout="end" sizes="(max-width: 1024px) 100vw, 70vw" />

      <section className="px-6 py-24 lg:px-10 lg:py-36">
        <motion.blockquote
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
          viewport={view}
          transition={{ duration: reduced ? 0 : 0.8, ease }}
          className="mx-auto max-w-3xl"
        >
          <p className="font-display text-3xl leading-[1.22] lg:text-[2.65rem]">
            Light, drape, and the quiet space between gestures — this season we listened more than
            we spoke.
          </p>
          <footer className="look-note mt-10">Anna Makeeva — Creative Director</footer>
        </motion.blockquote>
      </section>
    </SiteLayout>
  );
}

function OpeningPlate({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <ImagePlate
        src={images.atelier}
        alt="Maison Makeeva atelier — garments in the house studio"
        aspectRatio="16 / 10"
        objectPosition="50% 30%"
        priority
        reveal={!reduced}
        mark="none"
        sizes="100vw"
        className="lg:mx-10"
      />
      <p className="look-note mt-4 px-6 lg:px-10">SS26 · Plate</p>
    </div>
  );
}

function Pause({ children }: { children: string }) {
  const reduced = useReducedMotion();
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10 lg:py-36">
      <motion.p
        initial={reduced ? false : { opacity: 0.35, clipPath: "inset(0 40% 0 0)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
        viewport={view}
        transition={{ duration: reduced ? 0 : 0.75, ease }}
        className="max-w-xl font-display text-2xl leading-[1.3] lg:ml-[18%] lg:text-3xl"
      >
        {children}
      </motion.p>
    </section>
  );
}

function LookChapter({
  chapter,
  layout,
  sizes,
}: {
  chapter: Chapter;
  layout: "bleed" | "offset" | "nested" | "wide" | "end";
  sizes: string;
}) {
  const reduced = useReducedMotion();
  const product = chapter.productSlug ? getProduct(chapter.productSlug) : undefined;
  const aspect =
    layout === "bleed" || layout === "wide" ? "4 / 5" : layout === "end" ? "5 / 6" : "4 / 5";
  const shell =
    layout === "bleed"
      ? "w-full"
      : layout === "offset"
        ? "mx-auto max-w-[1600px] px-6 lg:px-10 lg:w-[44%] lg:ml-[48%] lg:px-0"
        : layout === "wide"
          ? "mx-auto max-w-[1600px] px-6 lg:w-[88%] lg:px-10"
          : layout === "end"
            ? "mx-auto max-w-[1600px] px-6 pb-8 lg:w-[68%] lg:px-10"
            : "w-full";

  const plate = (
    <ImagePlate
      src={chapter.src}
      alt={chapter.alt}
      aspectRatio={aspect}
      objectPosition={chapter.objectPosition}
      reveal={!reduced}
      mark={chapter.mark}
      markReveal="inview"
      tone="paper"
      sizes={sizes}
    />
  );

  const copy = (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={view}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.18, ease }}
      className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="look-note">{chapter.look}</span>
          <span className="look-note">{chapter.role}</span>
        </div>
        <h2 className="mt-2 font-display text-2xl leading-tight lg:text-3xl">{chapter.title}</h2>
        <p className="look-footnote mt-2 max-w-sm">{chapter.line}</p>
      </div>
      {product ? (
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          data-cursor="piece"
          className="eyebrow link-underline shrink-0 pt-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          View Piece
        </Link>
      ) : null}
    </motion.div>
  );

  if (layout === "nested") {
    return (
      <article>
        {product ? (
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            data-cursor="piece"
            aria-label={`${chapter.title} — View Piece`}
            className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {plate}
          </Link>
        ) : (
          <div data-cursor="look">{plate}</div>
        )}
        {copy}
      </article>
    );
  }

  return (
    <article className={`${shell} ${layout === "bleed" ? "" : "py-8 lg:py-10"}`}>
      {product ? (
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          data-cursor="piece"
          aria-label={`${chapter.title} — View Piece`}
          className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {plate}
        </Link>
      ) : (
        <div data-cursor="look">{plate}</div>
      )}
      <div className={layout === "bleed" ? "mx-auto max-w-[1600px] px-6 lg:px-10" : ""}>{copy}</div>
    </article>
  );
}
