import { createContext, useContext, type MutableRefObject } from "react";
import type {
  ExperienceUiValue,
  PointerValue,
  QualityTier,
  ScrollProgressValue,
} from "@/lib/experience/types";

export const defaultScroll: ScrollProgressValue = { hero: 0, story: 0 };

export const defaultPointer: PointerValue = {
  x: 0.62,
  y: 0.42,
  active: false,
  overInteractive: false,
  speed: 0,
};

export const defaultExperienceUi: ExperienceUiValue = { ready: false, atelier: false };

export const ScrollProgressContext = createContext<ScrollProgressValue>(defaultScroll);

export const ExperienceUiContext = createContext<ExperienceUiValue>(defaultExperienceUi);

export const ScrollRefContext = createContext<MutableRefObject<ScrollProgressValue> | null>(null);

export const PointerContext = createContext<MutableRefObject<PointerValue> | null>(null);

export const QualityContext = createContext<QualityTier>("low");

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}

export function useExperienceUi() {
  return useContext(ExperienceUiContext);
}

export function useScrollRef() {
  const ref = useContext(ScrollRefContext);
  if (!ref) {
    throw new Error("useScrollRef must be used within the atelier experience");
  }
  return ref;
}

export function usePointerRef() {
  const ref = useContext(PointerContext);
  if (!ref) {
    throw new Error("usePointerRef must be used within the hero experience");
  }
  return ref;
}

export function useExperienceQuality() {
  return useContext(QualityContext);
}
