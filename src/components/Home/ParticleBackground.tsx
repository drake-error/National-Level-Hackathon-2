'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 8000 }) => {
  const points = useRef<THREE.Points>(null);

  // Generate a cylindrical distribution of particles
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Random angle around cylinder
        const theta = Math.random() * 2 * Math.PI;
        // Random height
        const y = (Math.random() - 0.5) * 15; 
        // Radius clustered in a shell with inner variance
        const r = 4 + Math.random() * 1.5;

        pos[i3] = r * Math.cos(theta); // x
        pos[i3 + 1] = y;               // y
        pos[i3 + 2] = r * Math.sin(theta); // z

        initPos[i3] = pos[i3];
        initPos[i3 + 1] = pos[i3 + 1];
        initPos[i3 + 2] = pos[i3 + 2];
    }
    return [pos, initPos];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    
    // Slowly rotate the entire cylinder
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1; // Gentle wobble

    // Add a gentle ripple/wave to individual particles
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = initialPositions[i3];
        const z = initialPositions[i3 + 2];
        const angle = Math.atan2(z, x);
        // Create a wave traveling up the cylinder length via the sine function
        const yOffset = Math.sin(angle * 4 + initialPositions[i3 + 1] * 0.5 + time * 2) * 0.3;
        
        positions[i3 + 1] = initialPositions[i3 + 1] + yOffset;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        color="#a100ff"
        transparent 
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-[1500ms]">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <Particles count={8000} />
            </Canvas>
        </div>
    );
};
