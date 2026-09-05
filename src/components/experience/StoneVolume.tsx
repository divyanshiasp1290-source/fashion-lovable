function QuietPlane({ color }: { color: string }) {
  return <meshBasicMaterial color={color} />;
}

const ROOM = "#d4cec4";

export function StoneVolume() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0.2]}>
        <planeGeometry args={[28, 28]} />
        <QuietPlane color={ROOM} />
      </mesh>
      <mesh position={[0.15, 2.4, -5.6]}>
        <planeGeometry args={[28, 9]} />
        <QuietPlane color={ROOM} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8.2, 2.2, -0.3]}>
        <planeGeometry args={[16, 8]} />
        <QuietPlane color={ROOM} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8.2, 2.2, -0.3]}>
        <planeGeometry args={[16, 8]} />
        <QuietPlane color={ROOM} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.1, 5.6, -0.5]}>
        <planeGeometry args={[28, 18]} />
        <QuietPlane color={ROOM} />
      </mesh>
    </group>
  );
}
