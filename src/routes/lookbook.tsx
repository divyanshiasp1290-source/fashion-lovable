import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { images } from "@/lib/products";

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

function LookbookPage() {
  const looks = [
    {
      src: images.hero1,
      label: "Look 01 — Ivoire Draped Gown",
      caption: "Hand-draped silk crêpe, golden hour.",
    },
    {
      src: images.lb1,
      label: "Look 02 — Quiet Power",
      caption: "Strapless sculpted bodice in heavy crêpe.",
    },
    {
      src: images.hero2,
      label: "Look 03 — The Tailored Coat",
      caption: "Double-faced wool, peak lapel.",
    },
    {
      src: images.lb2,
      label: "Look 04 — Bijoux",
      caption: "Hand-set crystal earring, evening edit.",
    },
    {
      src: images.lb3,
      label: "Look 05 — Noir Promenade",
      caption: "Full-length wool, evening light.",
    },
    { src: images.p1, label: "Look 06 — Silk Study", caption: "Draped silk in ateliér." },
  ];

  return (
    <SiteLayout transparentHeader>
      <section className="relative h-[100svh] w-full overflow-hidden bg-ink text-ivory">
        <img
          src={images.lb3}
          alt="SS26 Lookbook"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            <div className="eyebrow text-ivory/70">— Spring / Summer 2026</div>
            <h1 className="mt-6 font-display text-7xl leading-[0.95] lg:text-[10rem]">
              The Lookbook
            </h1>
            <p className="mt-8 max-w-lg text-ivory/75 text-lg">
              Twelve looks. One quiet narrative. Photographed by Adelina Voss in a stripped marble
              interior, Milano, January 2026.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="grid gap-x-6 gap-y-24 lg:grid-cols-2">
          {looks.map((l, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              className={i % 2 === 1 ? "lg:translate-y-32" : ""}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                <img
                  src={l.src}
                  alt={l.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                <span className="eyebrow text-muted-foreground">{l.label}</span>
                <span className="italic text-shadow">{l.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-ivory">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display italic text-3xl leading-[1.3] lg:text-4xl">
            "Light, drape, and the quiet space between gestures — this season we listened more than
            we spoke."
          </p>
          <div className="mt-8 eyebrow text-ivory/60">Anna Makeeva — Creative Director</div>
        </div>
      </section>
    </SiteLayout>
  );
}
