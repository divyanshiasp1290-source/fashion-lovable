import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import { dprCap } from "@/hooks/useDeviceQuality";
import { experienceRuntime } from "@/lib/experience/story";
import { pointerRuntime } from "@/lib/experience/pointer";
import type { PointerValue, QualityTier, ScrollProgressValue } from "@/lib/experience/types";
import { ExperienceCamera } from "./ExperienceCamera";
import { PointerContext, QualityContext, ScrollRefContext } from "./ExperienceContext";
import { ExperienceLighting } from "./ExperienceLighting";
import { StoneVolume } from "./StoneVolume";
import { TheLength } from "./TheLength";

type Props = {
  quality: Exclude<QualityTier, "low">;
  visible: boolean;
  scrollRef: MutableRefObject<ScrollProgressValue>;
  pointerRef: MutableRefObject<PointerValue>;
  onReady: () => void;
  onDegrade: () => void;
};

function PointerBridge({ pointerRef }: { pointerRef: MutableRefObject<PointerValue> }) {
  useFrame(() => {
    const r = pointerRuntime;
    const p = pointerRef.current;
    p.x = r.frameX;
    p.y = r.frameY;
    p.active = r.active && r.mode !== "form";
    p.overInteractive = r.mode === "form";
    p.speed = r.speed;
  });
  return null;
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const sent = useRef(false);
  useFrame(() => {
    if (sent.current) return;
    sent.current = true;
    onReady();
  });
  return null;
}

function FpsGuard({ onDegrade }: { onDegrade: () => void }) {
  const samples = useRef(0);
  const bad = useRef(0);
  const fired = useRef(false);
  const warmed = useRef(0);

  useFrame((_, delta) => {
    if (fired.current) return;
    warmed.current += 1;
    if (warmed.current < 420) return;
    samples.current += 1;
    if (delta > 1 / 22) bad.current += 1;
    if (samples.current >= 300) {
      if (bad.current > 220) {
        fired.current = true;
        onDegrade();
      }
      samples.current = 0;
      bad.current = 0;
    }
  });
  return null;
}

export default function ExperienceCanvas({
  quality,
  visible,
  scrollRef,
  pointerRef,
  onReady,
  onDegrade,
}: Props) {
  useEffect(() => {
    experienceRuntime.intro = 0;
    return () => {
      experienceRuntime.intro = 0;
    };
  }, []);

  return (
    <QualityContext.Provider value={quality}>
      <ScrollRefContext.Provider value={scrollRef}>
        <PointerContext.Provider value={pointerRef}>
          <Canvas
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
            dpr={[1, dprCap(quality)]}
            gl={{
              antialias: quality === "high",
              alpha: false,
              powerPreference: quality === "high" ? "high-performance" : "default",
              stencil: false,
              depth: true,
            }}
            shadows={false}
            frameloop={visible ? "always" : "never"}
            onCreated={({ gl }) => {
              gl.setClearColor("#d4cec4", 1);
              gl.toneMappingExposure = 1.02;
            }}
          >
            <Suspense fallback={null}>
              <ExperienceCamera />
              <ExperienceLighting />
              <StoneVolume />
              <TheLength />
              <PointerBridge pointerRef={pointerRef} />
              <ReadySignal onReady={onReady} />
              <FpsGuard onDegrade={onDegrade} />
            </Suspense>
          </Canvas>
        </PointerContext.Provider>
      </ScrollRefContext.Provider>
    </QualityContext.Provider>
  );
}
