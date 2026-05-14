import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const techs = [
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'MongoDB', icon: '🍃', color: '#47a248' },
  { name: 'Firebase', icon: '🔥', color: '#ffca28' },
  { name: 'TensorFlow', icon: '🧠', color: '#ff6f00' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#06b6d4' },
  { name: 'Git / GitHub', icon: '🐙', color: '#f05032' },
  { name: 'Docker', icon: '🐳', color: '#2496ed' },
  { name: 'Linux', icon: '🐧', color: '#fcc624' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'FastAPI', icon: '🚀', color: '#009688' },
  { name: 'AWS', icon: '☁️', color: '#ff9900' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'GraphQL', icon: '🕸️', color: '#e10098' },
];

function Word({ tech, position }) {
  const ref = useRef();
  
  useFrame(({ camera }) => {
    // Make the HTML label always face the camera
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group position={position} ref={ref}>
      <Html center zIndexRange={[100, 0]}>
        <div style={{
          background: 'rgba(6, 13, 26, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${tech.color}40`,
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#e2e8f0',
          fontSize: '0.9rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          boxShadow: `0 0 15px ${tech.color}20`,
          pointerEvents: 'auto',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${tech.color}`;
            e.currentTarget.style.boxShadow = `0 0 30px ${tech.color}80, inset 0 0 15px ${tech.color}30`;
            e.currentTarget.style.transform = 'scale(1.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.border = `1px solid ${tech.color}40`;
            e.currentTarget.style.boxShadow = `0 0 15px ${tech.color}20`;
            e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          <span style={{ fontSize: '1.25rem' }}>{tech.icon}</span>
          {tech.name}
        </div>
      </Html>
    </group>
  );
}

function Cloud({ count, radius }) {
  const group = useRef();
  
  // Create a spherical distribution of points (Fibonacci sphere)
  const words = useMemo(() => {
    const temp = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      temp.push({
          position: new THREE.Vector3(x * radius, y * radius, z * radius),
          tech: techs[i % techs.length]
      });
    }
    return temp;
  }, [count, radius]);

  useFrame((state, delta) => {
    // Slowly rotate the entire cloud
    if (group.current) {
        group.current.rotation.y += delta * 0.15;
        group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      {words.map((word, i) => (
        <Word key={i} position={word.position} tech={word.tech} />
      ))}
    </group>
  );
}

export default function TechCloud() {
  return (
    <div style={{ width: '100%', height: '550px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
        <fog attach="fog" args={['#020409', 5, 15]} />
        <ambientLight intensity={0.5} />
        <Cloud count={techs.length} radius={3.8} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
