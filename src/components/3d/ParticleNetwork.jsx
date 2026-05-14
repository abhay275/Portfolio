import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 3000 }) {
  const points = useRef();

  // Generate random positions and velocities for the particles within a sphere
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Add very slow random velocity to each particle
      velocities[i * 3] = (Math.random() - 0.5) * 0.08;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return { positions, velocities };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    
    // 1. Move each individual particle
    const posArray = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] * delta;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * delta;
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * delta;
      
      // If a particle drifts too far (radius > 12), reverse its velocity to keep it in view
      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      const z = posArray[i * 3 + 2];
      const dist = Math.sqrt(x*x + y*y + z*z);
      if (dist > 12) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    // Flag the buffer attribute to be re-rendered
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // 2. Continually rotate the entire sphere slowly
    points.current.rotation.x -= delta / 25;
    points.current.rotation.y -= delta / 30;
    
    // 3. Interactive mouse parallax effect
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    points.current.rotation.x += (mouseY - points.current.rotation.x) * 0.05;
    points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.05;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ParticleNetwork() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: 'auto' }}>
        <ParticleField count={4000} />
      </Canvas>
    </div>
  );
}
