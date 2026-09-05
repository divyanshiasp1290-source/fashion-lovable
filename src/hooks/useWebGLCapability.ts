import { useEffect, useState } from "react";
import type { WebGLCapability } from "@/lib/experience/types";

function probe(): WebGLCapability {
  try {
    const canvas = document.createElement("canvas");
    const gl2 =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("webgl2");
    if (gl2) {
      gl2.getExtension("WEBGL_lose_context")?.loseContext();
      return { supported: true, webgl2: true };
    }
    const gl =
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("experimental-webgl", { failIfMajorPerformanceCaveat: true });
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
      return { supported: true, webgl2: false };
    }
    return { supported: false, webgl2: false };
  } catch {
    return { supported: false, webgl2: false };
  }
}

export function useWebGLCapability() {
  const [capability, setCapability] = useState<WebGLCapability | null>(null);

  useEffect(() => {
    setCapability(probe());
  }, []);

  return capability;
}
