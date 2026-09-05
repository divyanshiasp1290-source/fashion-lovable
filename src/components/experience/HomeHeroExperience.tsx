import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useHomeLenis } from "@/hooks/useHomeLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLCapability } from "@/hooks/useWebGLCapability";
import {
  defaultPointer,
  defaultScroll,
  ExperienceUiContext,
  ScrollProgressContext,
} from "./ExperienceContext";
import { ExperienceFallback } from "./ExperienceFallback";
import { ExperienceLoader } from "./ExperienceLoader";
import type { PointerValue, ScrollProgressValue } from "@/lib/experience/types";

type CanvasProps = {
  quality: "high" | "medium";
  visible: boolean;
  scrollRef: MutableRefObject<ScrollProgressValue>;
  pointerRef: MutableRefObject<PointerValue>;
  onReady: () => void;
  onDegrade: () => void;
};

export function HomeHeroExperience({
  children,
  story,
}: {
  children: ReactNode;
  story?: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const capability = useWebGLCapability();
  const quality = useDeviceQuality(capability, reducedMotion);
  const [forcedLow, setForcedLow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [scroll, setScroll] = useState<ScrollProgressValue>(defaultScroll);
  const [CanvasView, setCanvasView] = useState<ComponentType<CanvasProps> | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerValue>({ ...defaultPointer });
  const scrollRef = useRef<ScrollProgressValue>({ ...defaultScroll });

  const tier = forcedLow ? "low" : quality;
  const enable3D = mounted && !reducedMotion && (tier === "high" || tier === "medium");
  const lenisOn = enable3D && tier === "high";

  useHomeLenis(lenisOn);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enable3D) {
      setCanvasView(null);
      setReady(false);
      return;
    }
    let live = true;
    if (import.meta.env.SSR) return;
    void import("./ExperienceCanvas").then((mod) => {
      if (live) setCanvasView(() => mod.default);
    });
    return () => {
      live = false;
    };
  }, [enable3D]);

  useEffect(() => {
    const tone = enable3D ? "atelier" : "campaign";
    document.body.dataset.heroTone = tone;
    return () => {
      delete document.body.dataset.heroTone;
    };
  }, [enable3D]);

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio > 0.04),
      { threshold: [0, 0.04, 0.2, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const storyProgress = scrolled / total;
      const hero = Math.min(scrolled / Math.max(window.innerHeight, 1), 1);
      const next = { hero, story: storyProgress };
      scrollRef.current = next;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScroll(next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onDegrade = useCallback(() => {
    setForcedLow(true);
    setReady(false);
    setCanvasView(null);
  }, []);

  const showLoader = enable3D && !ready;
  const canvasLive = visible && pageVisible;
  const silkRoom = enable3D;
  const canvasReady = enable3D && ready;
  const ui = useMemo(() => ({ ready, atelier: silkRoom }), [ready, silkRoom]);

  return (
    <ScrollProgressContext.Provider value={scroll}>
      <ExperienceUiContext.Provider value={ui}>
        <div
          ref={stageRef}
          data-atelier-stage
          className={`relative ${silkRoom ? "bg-[#d4cec4] text-ink" : "bg-ink text-ivory"}`}
        >
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden" data-atelier-frame>
            <ExperienceFallback dimmed={canvasReady} silkHint={!enable3D} />

            {CanvasView && enable3D ? (
              <CanvasView
                quality={tier}
                visible={canvasLive}
                scrollRef={scrollRef}
                pointerRef={pointerRef}
                onReady={onReady}
                onDegrade={onDegrade}
              />
            ) : null}

            <ExperienceLoader visible={showLoader} />
          </div>

          <div className="relative z-10 -mt-[100svh]">
            <div className="relative h-[100svh]">{children}</div>
            {story}
          </div>
        </div>
      </ExperienceUiContext.Provider>
    </ScrollProgressContext.Provider>
  );
}
