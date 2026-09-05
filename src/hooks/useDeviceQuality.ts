import { useEffect, useState } from "react";
import type { QualityTier, WebGLCapability } from "@/lib/experience/types";

const MOBILE_MAX = 768;
const TABLET_MAX = 1024;

function resolveTier(capability: WebGLCapability | null, reducedMotion: boolean): QualityTier {
  if (reducedMotion || !capability?.supported) return "low";

  const width = window.innerWidth;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData === true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  if (saveData || memory <= 2) return "low";
  if (width < MOBILE_MAX || (coarse && width < TABLET_MAX && cores <= 4)) return "low";
  if (width < TABLET_MAX || !capability.webgl2 || cores < 6 || memory <= 4) return "medium";
  return "high";
}

export function useDeviceQuality(capability: WebGLCapability | null, reducedMotion: boolean) {
  const [tier, setTier] = useState<QualityTier>("low");

  useEffect(() => {
    const apply = () => setTier(resolveTier(capability, reducedMotion));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [capability, reducedMotion]);

  return tier;
}

export function dprCap(tier: QualityTier) {
  if (tier === "high") return 1.35;
  if (tier === "medium") return 1.15;
  return 1;
}
