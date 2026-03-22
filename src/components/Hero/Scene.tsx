'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Card } from './Card';
import { Environment, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';

export default function HeroScene({ timeline }: { timeline: gsap.core.Timeline | null }) {
  
  useEffect(() => {
    if (!timeline) return;
    
    // At exactly the sit point + small delay, toggle the canvas visibility off 
    // and SVG visibility on.
    timeline.call(() => {
      gsap.set(".hero-canvas-container", { opacity: 0 });
      gsap.set("#docking-logo", { opacity: 1 });
    }, undefined, "sit+=0.5");
    
    timeline.call(() => {
      gsap.set(".hero-canvas-container", { opacity: 1 });
      gsap.set("#docking-logo", { opacity: 0 });
    }, undefined, "reveal"); // In reverse, swap back

  }, [timeline]);

  return (
    <div className="hero-canvas-container fixed inset-0 z-10 pointer-events-none w-full h-full transition-opacity duration-[16ms]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: false, powerPreference: "high-performance" }} // Optimized for PostProcessing
        dpr={[1, 2]}
        onCreated={({ gl, scene, camera }) => {
          // Pre-warm Shaders for zero hitching when Card enters screen
          gl.compile(scene, camera);
        }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#7000ff" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} color="#a100ff" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Card timeline={timeline} />
          </Float>
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        {/* Post-Processing Neon Glow */}
        <EffectComposer multisampling={4}>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.4} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
