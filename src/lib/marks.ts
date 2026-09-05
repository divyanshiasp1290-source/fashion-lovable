export type HouseMarkType = "line" | "circle" | "arrow" | "figure" | "frame";

const MARKS: HouseMarkType[] = ["frame", "line", "arrow", "figure", "circle"];

/** One mark per surface, stable for a given key. */
export function markForKey(key: string): HouseMarkType {
  let n = 0;
  for (let i = 0; i < key.length; i += 1) n = (n + key.charCodeAt(i) * (i + 3)) % 997;
  return MARKS[n % MARKS.length];
}

export const HOUSE_EASE = "cubic-bezier(0.22, 0.68, 0.2, 1)";
