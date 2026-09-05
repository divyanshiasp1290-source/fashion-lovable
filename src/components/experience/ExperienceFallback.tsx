import { motion } from "framer-motion";
import { HouseMark } from "@/components/marks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { images } from "@/lib/products";

export function ExperienceFallback({ dimmed, silkHint }: { dimmed?: boolean; silkHint?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 ${dimmed ? "invisible pointer-events-none" : ""}`}
      aria-hidden={dimmed ? true : undefined}
    >
      <motion.img
        src={images.hero1}
        alt={dimmed ? "" : "Atelier SS26 — a draped silhouette in late light"}
        initial={reduced ? false : { scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduced ? 0 : 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        className={`absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-opacity duration-[900ms] ${
          dimmed ? "opacity-0" : "opacity-100"
        }`}
      />
      {silkHint && !dimmed ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(212,206,196,0.08)_0%,transparent_28%,rgba(18,16,14,0.42)_100%)]" />
          <div className="pointer-events-none absolute bottom-[18%] left-6 text-ivory lg:left-10" aria-hidden>
            <HouseMark type="figure" size={72} animated={false} className="text-ivory/70" />
          </div>
        </>
      ) : null}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/50 transition-opacity duration-[900ms] ${
          dimmed ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
