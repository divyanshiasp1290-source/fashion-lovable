export function ExperienceLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[2] bg-[#d4cec4] transition-opacity duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!visible}
    />
  );
}
