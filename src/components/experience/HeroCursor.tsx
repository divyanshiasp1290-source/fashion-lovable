import { useEffect, useRef, useState } from "react";
import {
  classifyPointerTarget,
  isInkSurface,
  pointerRuntime,
  updateStagePointer,
} from "@/lib/experience/pointer";

const TRACE = 16;
const FINE = "(pointer: fine) and (hover: hover)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function canUseSilkCursor() {
  return window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
}

export function HeroCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const apply = () => setLive(canUseSilkCursor());
    apply();
    const fine = window.matchMedia(FINE);
    const reduce = window.matchMedia(REDUCE);
    fine.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      fine.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!live) {
      delete document.documentElement.dataset.silkCursor;
      return;
    }

    const canvas = canvasRef.current;
    const mark = markRef.current;
    const glow = glowRef.current;
    const labelEl = labelRef.current;
    if (!canvas || !mark || !glow || !labelEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = Array.from({ length: TRACE }, () => ({ x: 0, y: 0 }));
    const cursor = { x: 0, y: 0 };
    const glowPos = { x: 0, y: 0 };
    const labelPos = { x: 0, y: 0 };
    let seeded = false;
    let lastX = 0;
    let lastY = 0;
    let lastMove = 0;
    let lastStamp = performance.now();
    let frame = 0;
    let dpr = 1;
    let vis = 0;
    let glowAmt = 0;
    let labelAmt = 0;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastStamp, 8);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const inst = Math.min(Math.hypot(dx, dy) / (dt * 0.85), 1);
      pointerRuntime.clientX = e.clientX;
      pointerRuntime.clientY = e.clientY;
      pointerRuntime.vx += (dx - pointerRuntime.vx) * 0.35;
      pointerRuntime.vy += (dy - pointerRuntime.vy) * 0.35;
      pointerRuntime.speed += (inst - pointerRuntime.speed) * 0.22;
      pointerRuntime.active = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastStamp = now;
      lastMove = now;

      const hit = classifyPointerTarget(e.target);
      pointerRuntime.mode = hit.mode;
      pointerRuntime.label = hit.label;
      pointerRuntime.ink = isInkSurface(e.target);
      updateStagePointer(e.clientX, e.clientY);

      document.documentElement.dataset.silkCursor = hit.native ? "native" : "custom";

      if (!seeded) {
        cursor.x = glowPos.x = labelPos.x = e.clientX;
        cursor.y = glowPos.y = labelPos.y = e.clientY;
        for (const p of points) {
          p.x = e.clientX;
          p.y = e.clientY;
        }
        seeded = true;
      }
    };

    const onLeave = () => {
      pointerRuntime.active = false;
      pointerRuntime.overStage = false;
      pointerRuntime.mode = "free";
      pointerRuntime.label = "";
      document.documentElement.dataset.silkCursor = "native";
    };

    const tick = (now: number) => {
      const r = pointerRuntime;
      if (now - lastMove > 40) {
        r.speed += (0 - r.speed) * 0.08;
        r.vx *= 0.9;
        r.vy *= 0.9;
      }

      const native = r.mode === "form" || !r.active;
      const hover = r.mode === "link" || r.mode === "editorial" || r.mode === "product";
      vis += ((native ? 0 : 1) - vis) * 0.18;

      cursor.x += (r.clientX - cursor.x) * 0.22;
      cursor.y += (r.clientY - cursor.y) * 0.22;
      glowPos.x += (r.clientX - glowPos.x) * 0.11;
      glowPos.y += (r.clientY - glowPos.y) * 0.11;
      labelPos.x += (r.clientX - labelPos.x) * 0.14;
      labelPos.y += (r.clientY - labelPos.y) * 0.14;

      points[0].x += (cursor.x - points[0].x) * 0.28;
      points[0].y += (cursor.y - points[0].y) * 0.28;
      for (let i = 1; i < TRACE; i += 1) {
        const follow = 0.22 - i * 0.006;
        points[i].x += (points[i - 1].x - points[i].x) * follow;
        points[i].y += (points[i - 1].y - points[i].y) * follow;
      }

      const speed = r.speed;
      const ink = r.ink;
      glowAmt += ((native ? 0 : speed * 0.72) - glowAmt) * 0.1;
      const showLabel = !native && r.label.length > 0;
      labelAmt += ((showLabel ? 1 : 0) - labelAmt) * 0.16;

      mark.style.opacity = String(vis);
      mark.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`;
      mark.dataset.hover = hover ? "true" : "false";
      mark.dataset.ink = ink ? "true" : "false";

      glow.style.opacity = String(glowAmt * vis * 0.55);
      glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;
      glow.dataset.ink = ink ? "true" : "false";

      labelEl.textContent = r.label;
      labelEl.style.opacity = String(labelAmt * vis);
      labelEl.style.transform = `translate3d(${labelPos.x + 18}px, ${labelPos.y + 10}px, 0)`;
      labelEl.dataset.ink = ink ? "true" : "false";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const trail = vis * (hover ? 0.28 : 0.42 + speed * 0.38);
      if (trail > 0.02 && seeded) {
        const span = hover ? 7 : Math.round(8 + speed * 7);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < span; i += 1) {
          const a = points[i];
          const b = points[Math.min(i + 1, span - 1)];
          const nx = -r.vy;
          const ny = r.vx;
          const nlen = Math.hypot(nx, ny) || 1;
          const bend = (speed * 0.22 * (i / span)) / nlen;
          const mx = (a.x + b.x) * 0.5 + nx * bend;
          const my = (a.y + b.y) * 0.5 + ny * bend;
          ctx.quadraticCurveTo(a.x, a.y, mx, my);
        }
        ctx.strokeStyle = ink ? "rgba(245,238,226,0.38)" : "rgba(38,33,28,0.32)";
        ctx.lineWidth = 0.55 + speed * 0.7;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = trail;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      canvas.style.opacity = String(vis);
      frame = requestAnimationFrame(tick);
    };

    size();
    document.documentElement.dataset.silkCursor = "native";
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", size);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", size);
      delete document.documentElement.dataset.silkCursor;
    };
  }, [live]);

  if (!live) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden data-silk-layer>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" />
      <div
        ref={glowRef}
        className="silk-cursor-glow absolute left-0 top-0 h-8 w-8 opacity-0"
      />
      <div ref={markRef} className="silk-cursor-mark absolute left-0 top-0 opacity-0">
        <span className="silk-cursor-ring" />
        <span className="silk-cursor-hair silk-cursor-hair-n" />
        <span className="silk-cursor-hair silk-cursor-hair-s" />
        <span className="silk-cursor-hair silk-cursor-hair-w" />
        <span className="silk-cursor-hair silk-cursor-hair-e" />
        <span className="silk-cursor-dot" />
      </div>
      <div ref={labelRef} className="silk-cursor-label absolute left-0 top-0 opacity-0" />
    </div>
  );
}
