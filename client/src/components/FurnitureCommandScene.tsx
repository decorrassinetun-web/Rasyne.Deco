import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { Suspense } from "react";

export type FurnitureCommandSceneProps = {
  width: number;
  depth: number;
  comfort: number;
  material: "boucle" | "leather" | "velvet";
  accent: string;
  exploded: boolean;
};

const materialColors = {
  boucle: "#e7ddcb",
  leather: "#7b3f2e",
  velvet: "#84533f",
} as const;

function SofaAssembly({ width, depth, comfort, material, accent, exploded }: FurnitureCommandSceneProps) {
  const upholstery = materialColors[material];
  const cushionHeight = 0.28 + comfort * 0.012;
  const split = exploded ? 0.18 : 0;
  const armHeight = 0.74 + comfort * 0.012;

  return (
    <group rotation={[0.04, -0.55, 0]} position={[0, -0.55, 0]}>
      <RoundedBox args={[width + 0.22, 0.34, depth + 0.1]} radius={0.08} smoothness={5} position={[0, 0.13, 0]}>
        <meshStandardMaterial color="#201714" roughness={0.72} metalness={0.04} />
      </RoundedBox>
      <RoundedBox args={[width, cushionHeight, depth * 0.52]} radius={0.11} smoothness={5} position={[0, 0.46 + split, -depth * 0.09]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      <RoundedBox args={[width * 0.47, cushionHeight, depth * 0.52]} radius={0.11} smoothness={5} position={[-width * 0.255, 0.48 + split, -depth * 0.09]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      <RoundedBox args={[width * 0.47, cushionHeight, depth * 0.52]} radius={0.11} smoothness={5} position={[width * 0.255, 0.48 + split, -depth * 0.09]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      <RoundedBox args={[width, 0.66, depth * 0.2]} radius={0.1} smoothness={5} position={[0, 0.92 + split * 1.6, depth * 0.28]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      <RoundedBox args={[0.28, armHeight, depth]} radius={0.1} smoothness={5} position={[-width / 2 - 0.02 - split, armHeight / 2 + 0.18, 0]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      <RoundedBox args={[0.28, armHeight, depth]} radius={0.1} smoothness={5} position={[width / 2 + 0.02 + split, armHeight / 2 + 0.18, 0]}>
        <meshStandardMaterial color={upholstery} roughness={material === "leather" ? 0.46 : 0.82} metalness={material === "leather" ? 0.04 : 0} />
      </RoundedBox>
      {[-1, 1].flatMap(side => [-1, 1].map(front => (
        <mesh key={`${side}-${front}`} position={[side * (width / 2 - 0.2), -0.16, front * (depth / 2 - 0.18)]} rotation={[0, 0, side * 0.08]}>
          <cylinderGeometry args={[0.045, 0.07, 0.48, 20]} />
          <meshStandardMaterial color={accent} metalness={0.25} roughness={0.36} />
        </mesh>
      )))}
      {exploded && <>
        <mesh position={[0, 1.5, 0]} rotation={[0.1, 0.1, 0]}>
          <torusGeometry args={[width * 0.45, 0.009, 8, 64]} />
          <meshStandardMaterial color="#d8a367" emissive="#633424" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 1.52, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 2.6, 16]} />
          <meshStandardMaterial color="#d8a367" emissive="#633424" emissiveIntensity={0.4} />
        </mesh>
      </>}
    </group>
  );
}

export default function FurnitureCommandScene(props: FurnitureCommandSceneProps) {
  return (
    <Canvas camera={{ position: [3.8, 2.6, 5.6], fov: 38 }} dpr={[1, 1.75]}>
      <color attach="background" args={["#130f0e"]} />
      <fog attach="fog" args={["#130f0e", 6, 14]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 4]} intensity={3.1} color="#ffe6c9" castShadow />
      <pointLight position={[-3, 1.5, -2]} intensity={20} color="#a84b31" distance={6} />
      <Suspense fallback={null}>
        <SofaAssembly {...props} />
        <ContactShadows position={[0, -0.72, 0]} opacity={0.58} scale={8} blur={2.8} far={4} color="#000000" />
        <OrbitControls enablePan={false} minDistance={3.9} maxDistance={8.6} minPolarAngle={0.6} maxPolarAngle={1.45} target={[0, 0.35, 0]} />
      </Suspense>
    </Canvas>
  );
}
