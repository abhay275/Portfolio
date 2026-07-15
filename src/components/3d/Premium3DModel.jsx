import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, TorusKnot } from '@react-three/drei';

function AbstractShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#FF5A36"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[0.8, 64, 64]} position={[-1.5, 1, -2]}>
        <meshStandardMaterial
          color="#22C55E"
          roughness={0.1}
          metalness={1}
          emissive="#22C55E"
          emissiveIntensity={2}
          wireframe={true}
          transparent={true}
          opacity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export default function Premium3DModel() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AbstractShape />
        <GlowingSphere />
      </Canvas>
    </div>
  );
}
