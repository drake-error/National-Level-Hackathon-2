'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export const VideoPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // If we want to automatically skip after a few seconds or when video ends
    const handleVideoEnd = () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPlaying(false);
            onComplete();
          }
        });
      }
    };

    const video = videoRef.current;
    if (video) {
        video.addEventListener('ended', handleVideoEnd);
        // Fallback in case autoplay fails
        const fallbackTimer = setTimeout(() => handleVideoEnd(), 8000); 

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
            clearTimeout(fallbackTimer);
        };
    }
  }, [onComplete]);

  if (!isPlaying) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/herosection.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Optional: Add a skip button if the user doesn't want to watch the whole video */}
      <button 
        onClick={() => {
            if (videoRef.current) {
               // Fast-forward to trigger end animation
               gsap.to(containerRef.current, {
                   opacity: 0,
                   duration: 0.5,
                   onComplete: () => {
                       setIsPlaying(false);
                       onComplete();
                   }
               });
            }
        }}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white uppercase tracking-widest text-xs z-10 transition-colors"
      >
        Skip sequence &rarr;
      </button>
    </div>
  );
};
