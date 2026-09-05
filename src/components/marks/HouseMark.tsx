import type { CSSProperties } from "react";
import type { HouseMarkType } from "@/lib/marks";

type Props = {
  type: HouseMarkType;
  className?: string;
  size?: number | string;
  style?: CSSProperties;
  animated?: boolean;
};

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function HouseMark({ type, className = "", size = "100%", style, animated = true }: Props) {
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <svg
      viewBox="0 0 100 100"
      width={dim}
      height={dim}
      className={`house-mark pointer-events-none text-ink ${animated ? "house-mark-animated" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {type === "line" ? (
        <path {...stroke} pathLength={1} d="M8 71 C 22 62, 31 69, 44 64 C 58 59, 69 67, 92 58" />
      ) : type === "circle" ? (
        <path
          {...stroke}
          pathLength={1}
          d="M51 14 C 72 15, 86 30, 87 51 C 88 73, 73 88, 51 87 C 28 86, 14 70, 15 49 C 16 29, 31 13, 51 14"
        />
      ) : type === "arrow" ? (
        <path {...stroke} pathLength={1} d="M18 78 C 36 61, 54 44, 81 22 M 62 21 L 82 20 L 78 39" />
      ) : type === "figure" ? (
        <g {...stroke}>
          <path pathLength={1} d="M50 10 C 54 10, 57 14, 56 19 C 55 24, 51 26, 48 24 C 44 22, 44 16, 47 12 C 48 11, 49 10, 50 10" />
          <path pathLength={1} d="M50 26 L 49 38" />
          <path pathLength={1} d="M49 38 C 38 42, 32 58, 34 86" />
          <path pathLength={1} d="M49 38 C 62 41, 68 56, 64 86" />
          <path pathLength={1} d="M42 52 L 58 50" />
        </g>
      ) : (
        <path {...stroke} pathLength={1} d="M7 11 L 91 8 L 94 90 L 9 93 Z" />
      )}
    </svg>
  );
}
