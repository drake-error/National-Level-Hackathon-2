import gsap from 'gsap';

export const initMasterTimeline = () => {
  // A standard, un-pinned, completely automated cinematic timeline!
  const tl = gsap.timeline({
    paused: true, // We will manually play this when Video 1 ends!
    defaults: { ease: "power4.inOut" },
  });

  // 1. FLY-THROUGH
  tl.addLabel("start");
  
  // 2. THE DASH (Card flies to hit the logo)
  tl.addLabel("dash", 1);

  // 3. THE TILT (Impact makes it tilt, preparing to enter the wallet)
  tl.addLabel("tilt", 1.5);

  // 4. THE SIT (Card slides perfectly into the logo/wallet)
  tl.addLabel("sit", 2.0);

  // 5. THE REVEAL (Home page opens)
  tl.addLabel("reveal", 2.5);

  return tl;
};
