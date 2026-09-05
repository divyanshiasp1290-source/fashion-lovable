export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function remap(v: number, a: number, b: number) {
  return clamp01((v - a) / Math.max(b - a, 1e-6));
}

/** Triangle peak: 0 at edges, 1 at midpoint. */
export function peak(v: number, a: number, b: number) {
  const mid = (a + b) * 0.5;
  if (v <= a || v >= b) return 0;
  return v < mid ? remap(v, a, mid) : remap(v, b, mid);
}

export type StoryBeats = {
  hang: number;
  settle: number;
  taut: number;
  open: number;
  detail: number;
  ivoire: number;
  noir: number;
  heritage: number;
  atelier: number;
  recede: number;
};

/**
 * Scroll choreography for The Muslin.
 * Same object throughout the pinned atelier stage — no scene swaps.
 */
export function storyBeats(story: number, _hero = 0): StoryBeats {
  void _hero;
  return {
    hang: remap(story, 0.0, 0.16),
    open: remap(story, 0.12, 0.34),
    settle: remap(story, 0.22, 0.4),
    taut: remap(story, 0.36, 0.58),
    detail: remap(story, 0.54, 0.74),
    ivoire: peak(story, 0.52, 0.64),
    noir: peak(story, 0.6, 0.72),
    heritage: peak(story, 0.68, 0.8),
    atelier: peak(story, 0.74, 0.86),
    recede: remap(story, 0.72, 0.98),
  };
}

export const experienceRuntime = {
  intro: 0,
};
