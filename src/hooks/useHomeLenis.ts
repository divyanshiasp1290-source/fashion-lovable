import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";

type LenisInstance = {
  raf: (time: number) => void;
  start: () => void;
  stop: () => void;
  destroy: () => void;
};

/**
 * Smooth scroll for the homepage immersive stage only.
 * Disabled on mobile, reduced-motion, and while the cart drawer is open.
 */
export function useHomeLenis(enabled: boolean) {
  const { cartOpen } = useStore();
  const lenisRef = useRef<LenisInstance | null>(null);
  const cartOpenRef = useRef(cartOpen);
  cartOpenRef.current = cartOpen;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let rafId = 0;

    const boot = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.075,
        wheelMultiplier: 0.82,
        touchMultiplier: 1,
        autoRaf: false,
      }) as unknown as LenisInstance;

      lenisRef.current = lenis;
      if (cartOpenRef.current) lenis.stop();

      const loop = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    void boot();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (cartOpen) lenis.stop();
    else lenis.start();
  }, [cartOpen]);
}
