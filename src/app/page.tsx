'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HomePageContent } from '@/components/Home/HomePageContent';
import { ParticleBackground } from '@/components/Home/ParticleBackground';

export default function Home() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  
  const transitionTriggered = useRef(false);

  useEffect(() => {
    const v1 = video1Ref.current;
    if (!v1) return;

    const handleV1Ended = () => {
      // Trigger zoom-in transition when the video finishes
      if (!transitionTriggered.current) {
        transitionTriggered.current = true;
        v1.removeEventListener('ended', handleV1Ended);

        // We mount the particles slightly early so they are ready behind the logo
        setParticlesVisible(true);

        const tl = gsap.timeline();

        // 1. Fade OUT the video and Fade IN the massive logo seamlessly
        tl.to(v1, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0);
        tl.to("#zoom-logo", { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0);

        // 2. Zoom IN the logo massively to create a fly-through effect
        tl.to("#zoom-logo", { 
          scale: 30, 
          opacity: 0, // fade out to reveal the site behind it
          duration: 1.5, 
          ease: "power3.in" 
        }, 0.5);

        // 3. Show homepage content halfway through the zoom so it appears dynamically
        tl.call(() => {
          setContentVisible(true);
        }, undefined, 1.0);
      }
    };

    v1.addEventListener('ended', handleV1Ended);
    // Auto-play the first video on mount
    v1.play().catch(console.error);

    return () => {
      v1.removeEventListener('ended', handleV1Ended);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Video: herosection.mp4 */}
      <video
        ref={video1Ref}
        src="/videos/herosection.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* R3F 3D Particle Field Layer (z-15) */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${particlesVisible ? 'opacity-100 z-[25]' : 'opacity-0 z-0'}`}>
        {particlesVisible && <ParticleBackground />}
      </div>

      {/* Cinematic Zoom-In Logo Transition (z-60) */}
      <img 
        id="zoom-logo"
        src="/logo.png" 
        alt="Logo Transition" 
        /* Kept big and fitting a 16:9 screen layout */
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain z-[60] opacity-0 pointer-events-none origin-center"
      />

      {/* Site Content Layer (z-30) */}
      <div className={`absolute top-0 left-0 w-full h-full z-30 overflow-y-auto transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HomePageContent />
      </div>

    </main>
  );
}
