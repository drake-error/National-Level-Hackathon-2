import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useControls } from 'leva';

export const Card = ({ timeline }: { timeline: gsap.core.Timeline | null }) => {
  const cardRef = useRef<THREE.Group>(null);

  // --- TUNABLE INITIAL STARTING COORDINATES ---
  // Tweak these on-screen until the 3D card PRECISELY overlaps the frozen last frame of herosection.mp4!
  const { startX, startY, startZ, rotX, rotY, rotZ, initScale } = useControls('1. Match Video 1 Frame', {
    startX: { value: -5, step: 0.1 },
    startY: { value: -2, step: 0.1 },
    startZ: { value: -5, step: 0.1 },
    rotX: { value: Math.PI / 4, step: 0.05 },
    rotY: { value: Math.PI / 6, step: 0.05 },
    rotZ: { value: 0, step: 0.05 },
    initScale: { value: 1, step: 0.05 }
  });

  // --- TUNABLE TARGET COORDINATES FOR THE WALLET IN SECONDHERO.MP4 ---
  const { walletX, walletY, walletZ, impX, impY, impZ } = useControls('2. Match Video 2 Wallet', {
    walletX: { value: 0, step: 0.1 },
    walletY: { value: -0.2, step: 0.1 },
    walletZ: { value: 0.8, step: 0.1 },
    impX: { value: 0, step: 0.1 },
    impY: { value: 0.5, step: 0.1 },
    impZ: { value: 1.8, step: 0.1 }
  });

  useEffect(() => {
    if (!timeline || !cardRef.current) return;

    // We animate FROM the Leva-controlled exact origin coordinates!
    // 1. The Dash: Fly quickly and "Dash" the logo to make it tilt
    timeline.to(cardRef.current.position, {
      x: impX,
      y: impY,
      z: impZ,
      duration: 1,
      ease: "power3.in" // Accelerates into the hit
    }, "dash");

    timeline.to(cardRef.current.rotation, {
      x: -Math.PI / 8, // Tilted upwards as it strikes
      y: 0,
      z: 0,
      duration: 1,
    }, "dash");

    // 2. The Tilt: Upon impact, the card tilts backward and aligns with the wallet opening
    timeline.to(cardRef.current.position, {
      x: walletX,
      y: walletY + 0.5, // Hovers just above the slot
      z: walletZ + 0.2,
      duration: 0.5,
      ease: "back.out(2)" // Bounces off the impact
    }, "tilt");

    timeline.to(cardRef.current.rotation, {
      x: Math.PI / 2.5, // Flattening out to slide in
      y: 0,
      z: 0,
      duration: 0.5,
    }, "tilt");

    // 3. The Sit: Card flies and sits perfectly into the geometric logo
    timeline.to(cardRef.current.position, {
      x: walletX,
      y: walletY,
      z: walletZ,
      duration: 0.5,
      ease: "power4.out" // Smooth settling motion
    }, "sit");

    // As it settles inside, it scales down to disappear into the logo depth
    timeline.to(cardRef.current.scale, {
      x: 0.4,
      y: 0.4,
      z: 0.4,
      duration: 0.5,
    }, "sit");

    // Dissolve exactly as it finishes sitting
    timeline.to(cardRef.current.scale, {
      x: 0, y: 0, z: 0,
      duration: 0.05,
    }, "sit+=0.45");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]); // Only rebuild if timeline object changes, keeping it stable while user interacts with initial Start origin sliders

  return (
    <group ref={cardRef} position={[startX, startY, startZ]} rotation={[rotX, rotY, rotZ]} scale={[initScale, initScale, initScale]}>
      {/* Fallback geometric card since we don't have the explicit user GLB */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.37, 2.12, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Glowing Chip Indicator */}
      <mesh position={[-1.2, 0, 0.03]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
};
