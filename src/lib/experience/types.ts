export type QualityTier = "high" | "medium" | "low";

export type WebGLCapability = {
  supported: boolean;
  webgl2: boolean;
};

export type ExperienceUiValue = {
  ready: boolean;
  atelier: boolean;
};

export type ScrollProgressValue = {
  /** 0–1 through the pinned atelier stage */
  hero: number;
  /** 0–1 narrative along The Muslin (hero → house → seasons) */
  story: number;
};

export type PointerValue = {
  /** 0–1 within the hero stage */
  x: number;
  y: number;
  active: boolean;
  overInteractive: boolean;
  /** Smoothed 0–1 pointer speed for fabric / light response */
  speed: number;
};
