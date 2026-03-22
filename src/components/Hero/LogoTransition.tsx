'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const LogoTransition = ({ timeline }: { timeline: gsap.core.Timeline | null }) => {
  const logoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timeline || !logoRef.current) return;

    // Initially the video is completely invisible
    gsap.set(logoRef.current, { opacity: 0 });
    
    // Ensure site content is hidden at start
    gsap.set(".site-content", { opacity: 0 });

    // When the card DASHES into the video, the video should appear and start playing
    // to show the logo tilting in reaction!
    timeline.to(logoRef.current, {
      opacity: 1, // Full visibility during the hit
      duration: 0.5,
      onStart: () => {
        if (logoRef.current) logoRef.current.play();
      }
    }, "dash");

    // The Reveal Step (Home Page Opens once card is perfectly seated)
    timeline.to(logoRef.current, {
      scale: 1.05, // Subtle breathing scale
      opacity: 0.4, // Fade down to act as a dark dynamic background
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        // Fade in the actual website content underneath
        gsap.to(".site-content", { opacity: 1, duration: 0.5 });
      }
    }, "reveal");

  }, [timeline]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <video 
        ref={logoRef}
        id="docking-logo" 
        src="/videos/secondhero.mp4"
        muted
        playsInline
        className="will-change-transform w-full h-full object-cover" 
      />
    </div>
  );
};
