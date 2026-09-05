export type PointerMode = "free" | "link" | "form" | "editorial" | "product";

export type PointerRuntime = {
  clientX: number;
  clientY: number;
  stageX: number;
  stageY: number;
  frameX: number;
  frameY: number;
  overStage: boolean;
  overFrame: boolean;
  active: boolean;
  speed: number;
  vx: number;
  vy: number;
  mode: PointerMode;
  label: string;
  ink: boolean;
};

export const pointerRuntime: PointerRuntime = {
  clientX: 0,
  clientY: 0,
  stageX: 0.62,
  stageY: 0.42,
  frameX: 0.62,
  frameY: 0.42,
  overStage: false,
  overFrame: false,
  active: false,
  speed: 0,
  vx: 0,
  vy: 0,
  mode: "free",
  label: "",
  ink: false,
};

const FORM =
  "input, textarea, select, option, [contenteditable='true'], [contenteditable=''], [contenteditable]";

export function classifyPointerTarget(target: EventTarget | null): {
  mode: PointerMode;
  label: string;
  native: boolean;
} {
  if (!(target instanceof Element)) {
    return { mode: "free", label: "", native: false };
  }

  const form = target.closest(FORM);
  if (form) {
    const type = form instanceof HTMLInputElement ? form.type : "";
    if (
      form instanceof HTMLInputElement &&
      (type === "hidden" || type === "submit" || type === "button" || type === "image")
    ) {
      return { mode: "link", label: "", native: false };
    }
    return { mode: "form", label: "", native: true };
  }

  if (target.closest("button") && target.closest("[data-cursor='piece']")) {
    return { mode: "link", label: "", native: false };
  }

  if (target.closest("[data-cursor='piece']")) {
    return { mode: "product", label: "View Piece", native: false };
  }

  const editorial = target.closest("[data-cursor='look'], [data-cursor='explore']");
  if (editorial instanceof HTMLElement) {
    const kind = editorial.dataset.cursor === "explore" ? "Explore" : "View";
    const custom = editorial.dataset.cursorLabel;
    return { mode: "editorial", label: custom || kind, native: false };
  }

  if (target.closest("a, button, label, [role='button'], [role='link'], summary")) {
    return { mode: "link", label: "", native: false };
  }

  return { mode: "free", label: "", native: false };
}

export function isInkSurface(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return document.body.dataset.heroTone === "campaign";
  }
  if (target.closest(".bg-ink, [data-cursor-ink]")) return true;
  if (target.closest("[data-atelier-stage]")) {
    return document.body.dataset.heroTone === "campaign";
  }
  const header = target.closest("[data-site-header]");
  if (header instanceof HTMLElement && header.dataset.headerSolid !== "true") {
    return document.body.dataset.heroTone !== "atelier";
  }
  return false;
}

export function updateStagePointer(clientX: number, clientY: number) {
  const stage = document.querySelector("[data-atelier-stage]");
  if (stage instanceof HTMLElement) {
    const rect = stage.getBoundingClientRect();
    pointerRuntime.overStage =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;
    if (pointerRuntime.overStage) {
      pointerRuntime.stageX = Math.min(Math.max((clientX - rect.left) / Math.max(rect.width, 1), 0), 1);
      pointerRuntime.stageY = Math.min(Math.max((clientY - rect.top) / Math.max(rect.height, 1), 0), 1);
    }
  } else {
    pointerRuntime.overStage = false;
  }

  const frame = document.querySelector("[data-atelier-frame]");
  if (frame instanceof HTMLElement) {
    const fr = frame.getBoundingClientRect();
    pointerRuntime.overFrame =
      clientX >= fr.left && clientX <= fr.right && clientY >= fr.top && clientY <= fr.bottom;
    pointerRuntime.frameX = Math.min(Math.max((clientX - fr.left) / Math.max(fr.width, 1), 0), 1);
    pointerRuntime.frameY = Math.min(Math.max((clientY - fr.top) / Math.max(fr.height, 1), 0), 1);
  } else {
    pointerRuntime.overFrame = true;
    pointerRuntime.frameX = Math.min(Math.max(clientX / Math.max(window.innerWidth, 1), 0), 1);
    pointerRuntime.frameY = Math.min(Math.max(clientY / Math.max(window.innerHeight, 1), 0), 1);
  }
}
