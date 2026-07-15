import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 1800 }) {
  const points = useRef();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      velocities[i * 3] = (Math.random() - 0.5) * 0.06;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
    }
    return { positions, velocities };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const posArray = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] * delta;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;

      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      const z = posArray[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 12) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    points.current.rotation.x -= delta / 35;
    points.current.rotation.y -= delta / 40;

    const mouseX = (state.pointer.x * Math.PI) / 12;
    const mouseY = (state.pointer.y * Math.PI) / 12;
    points.current.rotation.x += (mouseY - points.current.rotation.x) * 0.03;
    points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.03;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </Points>
  );
}

export default function ParticleNetwork() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 1.5]}
      >
        <ParticleField count={1800} />
      </Canvas>
    </div>
  );
}
