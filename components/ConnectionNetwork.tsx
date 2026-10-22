
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function NetworkScene({ pointer }: { pointer: React.MutableRefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<[number, number, number][]>(() => {
    return Array.from({ length: 42 }, (_, i) => {
      const angle = i * 2.39996;
      const radius = 0.35 + Math.sqrt(i / 42) * 2.35;

      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.72,
        Math.sin(i * 1.4) * 0.3,
      ];
    });
  }, []);

  const connections = useMemo(() => {
    const positions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = new THREE.Vector3(...nodes[i]).distanceTo(
          new THREE.Vector3(...nodes[j])
        );

        if (distance < 1.65) {
          positions.push(...nodes[i], ...nodes[j]);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    return geometry;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    // Higher sensitivity: rotation responds strongly to small cursor movements.
    const targetX = -pointer.current.y * 0.48;
    const targetY = pointer.current.x * 0.65;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX + Math.sin(time * 0.35) * 0.035,
      5,
      delta
    );

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY + Math.sin(time * 0.25) * 0.06,
      5,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={1.8} />
      <pointLight position={[2, 3, 5]} intensity={35} color="#fff1d4" />
      <pointLight position={[-3, -2, 4]} intensity={20} color="#4d91ff" />

      <group ref={group}>
        <lineSegments geometry={connections}>
          <lineBasicMaterial
            color="#b49a68"
            transparent
            opacity={0.62}
          />
        </lineSegments>

        {nodes.map((point, i) => (
          <mesh key={i} position={point}>
            <sphereGeometry
              args={[i % 6 === 0 ? 0.085 : 0.052, 16, 16]}
            />
            <meshStandardMaterial
              color={i % 6 === 0 ? "#2879c7" : "#14243a"}
              emissive={i % 6 === 0 ? "#155ba1" : "#14243a"}
              emissiveIntensity={i % 6 === 0 ? 1.3 : 0.35}
              metalness={0.25}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function ConnectionNetwork() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }

  function resetPointer() {
    pointer.current.x = 0;
    pointer.current.y = 0;
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <NetworkScene pointer={pointer} />
      </Canvas>
    </div>
  );
}
