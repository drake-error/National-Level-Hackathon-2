'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HomePageContent } from '@/components/Home/HomePageContent';
import { ParticleBackground } from '@/components/Home/ParticleBackground';

export default function Home() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  
  const transitionTriggered = useRef(false);
  const v2TransitionTriggered = useRef(false);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Force video 2 to be invisible initially
    gsap.set(v2, { opacity: 0 });

    const handleV2TimeUpdate = () => {
      // Crossfade exactly 1 second before secondhero.mp4 finishes playing!
      if (!v2TransitionTriggered.current && v2.duration > 0 && v2.currentTime >= v2.duration - 1.0) {
        v2TransitionTriggered.current = true;
        v2.removeEventListener('timeupdate', handleV2TimeUpdate);

        // Mount the 3D Wave!
        setParticlesVisible(true);

        // Fade out video 2
        gsap.to(v2, { opacity: 0, duration: 1, ease: 'power2.inOut' });

        // Show website content sequentially
        setTimeout(() => {
          setContentVisible(true);
        }, 800); 
      }
    };

    const handleV1TimeUpdate = () => {
      // Transition seamlessly right at the end (preventing HTML video loop gaps)
      if (!transitionTriggered.current && v1.duration > 0 && v1.currentTime >= v1.duration - 0.05) {
        transitionTriggered.current = true;
        v1.removeEventListener('timeupdate', handleV1TimeUpdate);
        
        // Play the second video
        v2.play().catch(console.error);
        
        // 100% Accurate Hard Cut Bridge (No ghosting, instant frame swap)
        gsap.to(v1, { opacity: 0, duration: 0 });
        gsap.to(v2, { opacity: 1, duration: 0 });

        // Begin listening to video 2's progression for the final handoff!
        v2.addEventListener('timeupdate', handleV2TimeUpdate);
      }
    };

    v1.addEventListener('timeupdate', handleV1TimeUpdate);
    // Auto-play the first video on mount
    v1.play().catch(console.error);

    return () => {
      v1.removeEventListener('timeupdate', handleV1TimeUpdate);
      v2.removeEventListener('timeupdate', handleV2TimeUpdate);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Video 1: herosection.mp4 */}
      <video
        ref={video1Ref}
        src="/videos/herosection.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Video 2: secondhero.mp4 (acts as dynamic background afterward) */}
      <video
        ref={video2Ref}
        src="/videos/secondhero.mp4"
        muted
        playsInline
        /* object-fill forces EVERY PIXEL of the video to map to the 16:9 screen, distorting it if necessary, but leaving NO space */
        className="absolute inset-0 w-full h-full object-fill z-20 opacity-0"
      />

      {/* R3F 3D Particle Field Layer (z-15) */}
      <div className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${particlesVisible ? 'opacity-100 z-[25]' : 'opacity-0 z-0'}`}>
        {particlesVisible && <ParticleBackground />}
      </div>

      {/* Site Content Layer (z-30) */}
      <div className={`absolute top-0 left-0 w-full h-full z-30 overflow-y-auto transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HomePageContent />
      </div>

    </main>
  );
}
