
"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NetworkScene() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const { nodes, geometry } = useMemo(() => {
    const points: [number, number, number][] = [];
    const count = 95;

    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996;
      const radius = Math.sqrt(i / count) * 10;

      points.push([
        Math.cos(angle) * radius * 1.3,
        Math.sin(angle) * radius * 0.85,
        Math.sin(i * 1.7) * 1.3,
      ]);
    }

    const positions: number[] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = new THREE.Vector3(...points[i]);
        const b = new THREE.Vector3(...points[j]);

        if (a.distanceTo(b) < 2.5) {
          positions.push(...points[i], ...points[j]);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    return { nodes: points, geometry: lineGeometry };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state, delta) => {
    if (!group.current) return;

    pointer.current.x = THREE.MathUtils.damp(
      pointer.current.x, target.current.x, 3, delta
    );
    pointer.current.y = THREE.MathUtils.damp(
      pointer.current.y, target.current.y, 3, delta
    );

    const time = state.clock.elapsedTime;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.18 + Math.sin(time * 0.2) * 0.04,
      2,
      delta
    );

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.12,
      2,
      delta
    );

    group.current.position.y = Math.sin(time * 0.35) * 0.12;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#b49a68"
          transparent
          opacity={0.28}
        />
      </lineSegments>

      {nodes.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry
            args={[i % 7 === 0 ? 0.09 : 0.045, 12, 12]}
          />
          <meshBasicMaterial
            color={i % 7 === 0 ? "#5288a7" : "#17283c"}
            transparent
            opacity={i % 7 === 0 ? 0.8 : 0.48}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NetworkBackground() {
  return (
    <div className="network-background" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
