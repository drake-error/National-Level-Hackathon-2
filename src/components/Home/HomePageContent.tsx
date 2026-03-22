'use client';
import { motion } from 'framer-motion';

export const HomePageContent = () => {
  return (
    <div className="w-full relative z-30">
      {/* 
        This is the editable homescreen page! 
        The video plays in the background (z-20), and this content sits on top (z-30).
        Scroll down to see more sections.
      */}

      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 glass">
        <div className="text-xl font-bold tracking-widest uppercase">BRAND LOGO</div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold text-white/80">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="hover:text-white transition-colors">Foundry</a>
          <a href="#" className="hover:text-white transition-colors">News</a>
        </nav>
        <button className="border border-white/20 px-6 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Contact
        </button>
      </header>

      {/* HERO SECTION (100vh) - Overlaying the video directly */}
      <section className="h-screen w-full flex flex-col justify-end pb-20 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
            Accelerating the <br /> Edge of Tomorrow.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-8 font-light">
            [Editable Area] We partner with visionary founders to engineer scalable business models, providing capital, computational resources, and strategic infrastructure.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-white/80 transition-colors">
              Discover Our Method
            </button>
          </div>
        </motion.div>
      </section>

      {/* ADDITIONAL SCROLLABLE SECTIONS (Solid Background) */}
      <div className="bg-[#050505] w-full relative z-40">
        
        {/* About Section */}
        <section className="py-32 px-8 md:px-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light uppercase tracking-widest text-white/50 mb-4">01. Identity</h2>
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Built for <br /> Builders.
              </h3>
            </div>
            <div className="flex flex-col justify-end text-lg text-white/70 font-light space-y-6">
              <p>
                [Editable Area] We are not just a fund. We are a foundry. We forge ideas into industry-leading enterprises by offering full-spectrum technical and quantitative support.
              </p>
              <p>
                Our ecosystem thrives on collaboration, bridging the gap between raw potential and market dominance through applied mathematics and rigorous engineering.
              </p>
              <a href="#" className="uppercase tracking-widest text-sm text-white font-bold underline underline-offset-8 hover:text-primary transition-colors">
                Read our Manifesto
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio / Focus Grid */}
        <section className="py-32 px-8 md:px-24 border-t border-white/10">
          <h2 className="text-3xl font-light uppercase tracking-widest text-white/50 mb-16 text-center">Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quantitative Finance", desc: "Algorithmic execution and deeply researched market making strategies." },
              { title: "AI & Machine Learning", desc: "Building neural architectures that redefine predictive analytics." },
              { title: "Decentralized Systems", desc: "Engineering trustless infrastructure for the modern web." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/10 glass hover:bg-white/5 transition-all cursor-pointer group">
                <div className="text-primary text-4xl mb-6 font-bold group-hover:scale-110 transition-transform origin-left">0{i+1}</div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 md:px-24 border-t border-white/10 flex justify-between items-center bg-black">
          <div className="text-2xl font-bold tracking-widest uppercase text-white/30">BRAND LOGO</div>
          <div className="text-xs tracking-widest text-white/30 uppercase">© 2026 All Rights Reserved</div>
        </footer>

      </div>
    </div>
  );
};
