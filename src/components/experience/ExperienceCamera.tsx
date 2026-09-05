import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { pointerRuntime } from "@/lib/experience/pointer";
import { experienceRuntime, storyBeats } from "@/lib/experience/story";
import { useScrollRef } from "./ExperienceContext";

const YAW = THREE.MathUtils.DEG2RAD * 4.5;
const PITCH = THREE.MathUtils.DEG2RAD * 2.6;
const _look = new THREE.Vector3();
const _wantLook = new THREE.Vector3();
const _wantPos = new THREE.Vector3();

export function ExperienceCamera() {
  const camera = useThree((state) => state.camera);
  const scrollRef = useScrollRef();
  const look = useRef(new THREE.Vector3(0.58, 0.64, 0));

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.fov = 36;
    camera.near = 0.1;
    camera.far = 36;
    camera.position.set(-0.08, 0.96, 5.02);
    camera.lookAt(0.58, 0.64, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((_, delta) => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const { hang, taut, open, detail, recede } = storyBeats(scrollRef.current.story, scrollRef.current.hero);
    const intro = experienceRuntime.intro;

    const r = pointerRuntime;
    const live = r.active && r.mode !== "form";
    const nx = live ? r.clientX / Math.max(window.innerWidth, 1) - 0.5 : 0;
    const ny = live ? r.clientY / Math.max(window.innerHeight, 1) - 0.5 : 0;

    _wantPos.set(
      -0.08 + recede * 0.1 + nx * 0.18,
      0.96 + taut * 0.03 + detail * 0.03 - open * 0.02 - recede * 0.02 - ny * 0.09,
      5.02 - intro * 0.1 - hang * 0.03 - open * 0.05 - taut * 0.07 - detail * 0.3 + recede * 1.05,
    );

    _wantLook.set(
      0.58 - (live ? nx * 2 * Math.tan(YAW) : 0) + open * 0.03 - recede * 0.08,
      0.64 - (live ? ny * 2 * Math.tan(PITCH) : 0) + taut * 0.02 + detail * 0.04 - hang * 0.02,
      0 + taut * 0.04 - recede * 0.1,
    );

    const kPos = 1 - Math.exp(-delta * 3.05);
    const kLook = 1 - Math.exp(-delta * 3.2);
    camera.position.lerp(_wantPos, kPos);
    look.current.lerp(_wantLook, kLook);
    _look.copy(look.current);
    camera.lookAt(_look);
  });

  return null;
}
