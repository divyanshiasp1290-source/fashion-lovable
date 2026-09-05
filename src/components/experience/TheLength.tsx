import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { experienceRuntime, storyBeats } from "@/lib/experience/story";
import { useExperienceQuality, usePointerRef, useScrollRef } from "./ExperienceContext";
import { SilkMaterial } from "./SilkMaterial";

const COLOR_MUSLIN = new THREE.Color("#f3eadc");
const COLOR_WARM = new THREE.Color("#f6e6cc");
const WARM_LIT = new THREE.Color("#fff1dc");
const SHADOW_MUSLIN = new THREE.Color("#8a7764");
const _targetColor = new THREE.Color();
const _light = new THREE.Vector3();

export function TheLength() {
  const quality = useExperienceQuality();
  const scrollRef = useScrollRef();
  const pointerRef = usePointerRef();
  const groupRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const pointerStrength = useRef(0);
  const color = useRef(COLOR_MUSLIN.clone());
  const warm = useRef(WARM_LIT.clone());
  const shadow = useRef(SHADOW_MUSLIN.clone());

  const geometry = useMemo(() => {
    const wide = quality === "high" ? 2.08 : 1.92;
    const tall = quality === "high" ? 2.92 : 2.78;
    const segs = quality === "high" ? ([72, 156] as const) : ([40, 88] as const);
    return new THREE.PlaneGeometry(wide, tall, segs[0], segs[1]);
  }, [quality]);

  const material = useMemo(() => {
    const mat = new SilkMaterial();
    mat.side = THREE.DoubleSide;
    mat.uShell = 0;
    const wide = quality === "high" ? 2.08 : 1.92;
    const tall = quality === "high" ? 2.92 : 2.78;
    mat.uSize.set(wide, tall);
    return mat;
  }, [quality]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    const intro = Math.min(1, experienceRuntime.intro + delta * 0.78);
    experienceRuntime.intro = intro;
    material.uIntro = intro;
    material.uTime += delta;

    const { hang, settle, taut, open, detail, recede } = storyBeats(
      scrollRef.current.story,
      scrollRef.current.hero,
    );

    material.uGravity = 0.4 + hang * 0.22 + open * 0.2 - taut * 0.24 + recede * 0.12;
    material.uTension = THREE.MathUtils.clamp(
      0.06 + settle * 0.08 + taut * 0.72 - open * 0.18 - recede * 0.35,
      0,
      1,
    );
    material.uFold =
      (quality === "high" ? 1.32 : 1.12) *
      (1 + hang * 0.08 + open * 0.12 + taut * 0.08 + detail * 0.1 - recede * 0.2);
    material.uMovement = (quality === "high" ? 0.28 : 0.12) * (1 - recede * 0.9);
    material.uSheen = 0.36 + taut * 0.08 + detail * 0.06 - recede * 0.12;
    material.uLightResponse = 0.92 + hang * 0.06 + detail * 0.08 - recede * 0.35;
    material.uOpen = open;

    _light.set(0.4 + taut * 0.06, 0.7 + hang * 0.04, 0.52 + detail * 0.06).normalize();
    material.uLightDir.copy(_light);

    _targetColor.copy(COLOR_MUSLIN).lerp(COLOR_WARM, taut * 0.35);
    color.current.lerp(_targetColor, 1 - Math.exp(-delta * 3.0));
    material.uColor.copy(color.current);
    warm.current.lerp(WARM_LIT, 1 - Math.exp(-delta * 2.4));
    shadow.current.lerp(SHADOW_MUSLIN, 1 - Math.exp(-delta * 2.4));
    material.uWarm.copy(warm.current);
    material.uShadow.copy(shadow.current);

    const p = pointerRef.current;
    const vel = THREE.MathUtils.clamp(p.speed, 0, 1);
    const allow = p.active && !p.overInteractive;
    const target = allow ? 0.28 + vel * 0.22 : 0;
    pointerStrength.current = THREE.MathUtils.damp(pointerStrength.current, target, 2.4, delta);
    material.uPointer.set(
      THREE.MathUtils.damp(material.uPointer.x, p.x, 2.6, delta),
      THREE.MathUtils.damp(material.uPointer.y, 1 - p.y, 2.6, delta),
    );
    material.uPointerStrength = pointerStrength.current * (1 - recede) * (quality === "high" ? 1 : 0.55);

    const group = groupRef.current;
    if (group) {
      group.position.x = THREE.MathUtils.damp(group.position.x, 0.78 - open * 0.04 - recede * 0.52, 2.05, delta);
      group.position.y = THREE.MathUtils.damp(
        group.position.y,
        0.42 - hang * 0.05 - taut * 0.04 + open * 0.03 - recede * 0.05,
        1.9,
        delta,
      );
      group.position.z = THREE.MathUtils.damp(
        group.position.z,
        0.04 - taut * 0.06 - detail * 0.08 + recede * 1.35,
        2.0,
        delta,
      );
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, 0.05 + taut * 0.04 - open * 0.02, 1.8, delta);
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, -0.18 + open * 0.06 + taut * 0.04, 1.9, delta);
      group.rotation.z = THREE.MathUtils.damp(group.rotation.z, 0.05 - taut * 0.03, 1.9, delta);
      const s = 1.0 - recede * 0.2;
      const next = THREE.MathUtils.damp(group.scale.x, s, 1.8, delta);
      group.scale.setScalar(next);
      group.visible = recede < 0.985;
    }

    const blob = shadowRef.current;
    if (blob && group) {
      blob.position.x = group.position.x + 0.12;
      blob.position.z = group.position.z + 0.42;
      const cover = THREE.MathUtils.clamp(intro * (1 - recede) * (0.28 + hang * 0.1 + taut * 0.06), 0, 0.16);
      const mat = blob.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, cover, 2.4, delta);
      blob.scale.set(1.05 + taut * 0.18 + open * 0.28, 1, 0.48 + taut * 0.12);
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0.78, 0.42, 0.04]} rotation={[0.05, -0.16, 0.04]}>
        <mesh geometry={geometry} material={material} frustumCulled={false} />
      </group>
      <mesh
        ref={shadowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.9, -0.11, 0.5]}
        renderOrder={-1}
        frustumCulled={false}
      >
        <circleGeometry args={[1.05, 24]} />
        <meshBasicMaterial color="#c4bdb2" transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}
