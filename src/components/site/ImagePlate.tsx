import { useInView } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { HouseMark } from "@/components/marks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { HouseMarkType } from "@/lib/marks";

type Interaction = "none" | "product";
type MarkReveal = "hover" | "inview";
type PlateTone = "paper" | "ink";

type Props = {
  src: string;
  alt: string;
  secondarySrc?: string;
  aspectRatio?: string;
  objectPosition?: string;
  priority?: boolean;
  interaction?: Interaction;
  mark?: HouseMarkType | "none";
  markReveal?: MarkReveal;
  tone?: PlateTone;
  reveal?: boolean;
  className?: string;
  sizes?: string;
};

const FINE_HOVER = "(pointer: fine) and (hover: hover)";

export function ImagePlate({
  src,
  alt,
  secondarySrc,
  aspectRatio = "4 / 5",
  objectPosition,
  priority = false,
  interaction = "none",
  mark = "none",
  markReveal = "hover",
  tone = "paper",
  reveal = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: Props) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.28, margin: "0px 0px -8% 0px" });
  const live = interaction === "product" && Boolean(secondarySrc) && secondarySrc !== src;
  const shown = !reveal || reduced || inView;

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || interaction !== "product" || reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia(FINE_HOVER).matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let hovering = false;
    let running = false;

    const tick = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      const settled = !hovering && Math.abs(curX) < 0.002 && Math.abs(curY) < 0.002;
      if (settled) {
        running = false;
        stage.style.transform = "";
        return;
      }
      const ry = curX * 3.2;
      const rx = -curY * 2.6;
      stage.style.transform = `translate3d(${curX * 5}px, ${curY * 4}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const ny = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      targetX = Math.max(-0.5, Math.min(0.5, nx));
      targetY = Math.max(-0.5, Math.min(0.5, ny));
      start();
    };

    const onEnter = () => {
      hovering = true;
      start();
    };

    const onLeave = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      start();
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      stage.style.transform = "";
    };
  }, [interaction, reduced]);

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  const imgStyle = objectPosition ? { objectPosition } : undefined;

  return (
    <div
      ref={rootRef}
      className={`image-plate ${live ? "image-plate-live" : ""} ${reduced ? "image-plate-static" : ""} ${reveal ? "image-plate-reveal" : ""} ${shown ? "image-plate-shown" : "image-plate-pending"} ${markReveal === "inview" ? "image-plate-mark-inview" : ""} image-plate-tone-${tone} ${className}`}
      data-interaction={interaction}
      data-mark={mark}
      style={{ aspectRatio, perspective: "1200px" } as CSSProperties}
    >
      <div ref={stageRef} className="image-plate-stage">
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          sizes={sizes}
          className="image-plate-primary"
          style={imgStyle}
        />
        {live ? (
          <img
            src={secondarySrc}
            alt=""
            loading="lazy"
            decoding="async"
            sizes={sizes}
            className="image-plate-secondary"
            aria-hidden
            style={imgStyle}
          />
        ) : null}
        {mark !== "none" ? (
          <div className={`image-plate-mark image-plate-mark-${mark}`} aria-hidden>
            <HouseMark type={mark} animated={!reduced} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
