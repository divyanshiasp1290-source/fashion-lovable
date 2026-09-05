import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight } from "three";
import { experienceRuntime, storyBeats } from "@/lib/experience/story";
import { useScrollRef } from "./ExperienceContext";

export function ExperienceLighting() {
  const scrollRef = useScrollRef();
  const key = useRef<DirectionalLight>(null);
  const fill = useRef<DirectionalLight>(null);

  useFrame((_, delta) => {
    const light = key.current;
    const soft = fill.current;
    if (!light) return;
    const intro = experienceRuntime.intro;
    const { hang, taut, detail, recede } = storyBeats(scrollRef.current.story, scrollRef.current.hero);
    const enter = Math.min(1, intro);
    light.position.set(3.4 - taut * 0.25, 5.2 + hang * 0.12, 2.4 + detail * 0.2);
    const intensity = (0.12 + enter * 1.65 + hang * 0.1 + taut * 0.16) * (1 - recede * 0.78);
    light.intensity += (intensity - light.intensity) * (1 - Math.exp(-delta * 2.8));
    light.color.set("#f3e4cc");
    if (soft) {
      const fillI = (0.06 + enter * 0.32 + detail * 0.08) * (1 - recede * 0.7);
      soft.intensity += (fillI - soft.intensity) * (1 - Math.exp(-delta * 2.6));
    }
  });

  return (
    <>
      <hemisphereLight args={["#f4eee6", "#bdb3a6", 0.42]} />
      <ambientLight intensity={0.18} color="#ece4d8" />
      <directionalLight ref={key} color="#f3e4cc" intensity={0.08} position={[3.4, 5.2, 2.4]} />
      <directionalLight ref={fill} color="#e8ddd0" intensity={0.06} position={[-2.6, 2.2, 3.4]} />
    </>
  );
}
