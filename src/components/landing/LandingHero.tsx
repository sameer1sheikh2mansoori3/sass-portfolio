"use client";

import Link from "next/link";

export default function LandingHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="portfolio-section relative min-h-screen w-full flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 md:py-20 z-10"
    >
      {/* Top Protocol Telemetry */}
      <div className="section-inner w-full flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs tracking-[0.3em] text-[#6B7A8F] font-inter">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C1440E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C1440E]"></span>
          </span>
          <span className="text-[#E8E2D6] font-mono font-semibold uppercase">
            MULTI-TENANT 3D PORTFOLIO ENGINE // ACTIVE
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[#6B7A8F] font-mono text-[11px]">
          <span>ᛟ STACK: THREE.JS + GSAP + MONGODB</span>
          <span className="text-[#C1440E]">{"///"}</span>
          <span>ZERO WEBGL CODE REQUIRED</span>
        </div>
      </div>

      {/* Center Cinematic Title Card */}
      <div className="section-inner my-auto py-12 max-w-xl lg:max-w-3xl">
        <div className="stagger-reveal inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-full border border-[#C1440E]/40 bg-[#C1440E]/10 text-[#C1440E] text-xs font-mono font-bold tracking-[0.35em] uppercase">
          <span>⚔</span>
          <span>STOP SENDING FLAT RESUMES</span>
        </div>

        <h1 className="stagger-reveal font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-[#E8E2D6] mb-6 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          FORGE YOUR 3D
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E8E2D6] via-[#C1440E] to-[#E8E2D6]/80">
            SPARTAN PORTFOLIO
          </span>
        </h1>

        <p className="stagger-reveal font-cinzel text-base sm:text-xl md:text-2xl text-[#E8E2D6]/90 tracking-wider max-w-2xl mb-4 font-semibold uppercase">
          CONQUER RECRUITERS & CLIENTS WITH VISCERAL REAL-TIME 3D
        </p>

        <p className="stagger-reveal font-inter text-sm sm:text-base text-[#6B7A8F] max-w-2xl leading-relaxed mb-8 font-normal">
          Inscribe your career achievements into an interactive 3D Norse realm with a rigged warrior who runs with your scroll speed, dual glowing Blades of Chaos, and sound effects. Sign up in 10 seconds and share your live URL with anyone.
        </p>

        {/* Action Controls */}
        <div className="stagger-reveal flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
          <Link
            href="/signup"
            className="group relative px-8 py-4 bg-[#C1440E] text-[#E8E2D6] font-inter text-xs font-black tracking-[0.25em] uppercase rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#d94d12] hover:shadow-[0_0_35px_rgba(193,68,14,0.7)] cursor-pointer flex items-center gap-2"
          >
            <span>⚔ Inscribe Your Chronicle</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <Link
            href="/u/kratos"
            className="px-7 py-4 border border-[#E8E2D6]/25 bg-[#0A0A0B]/70 backdrop-blur-md text-[#E8E2D6] font-inter text-xs font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 hover:border-[#C1440E] hover:text-[#C1440E] hover:bg-[#C1440E]/10 cursor-pointer flex items-center gap-2"
          >
            <span>👁 Explore Live Demo</span>
          </Link>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("spartan:slash"));
            }}
            className="group px-6 py-4 border border-[#C1440E]/60 bg-[#C1440E]/15 text-[#E8E2D6] font-inter text-xs font-black tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:bg-[#C1440E] hover:shadow-[0_0_25px_rgba(193,68,14,0.6)] cursor-pointer flex items-center gap-2 active:scale-95"
            title="Click to test the dual sword combat animation"
          >
            <span className="text-[#FF3300] group-hover:text-white">⚔</span>
            <span>Blade Strike</span>
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("spartan:open-cinema"));
            }}
            className="group px-6 py-4 border border-[#E8E2D6]/20 bg-[#0A0A0B]/80 text-[#E8E2D6] font-inter text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:border-[#C1440E] hover:text-[#C1440E] transition-all cursor-pointer flex items-center gap-2"
            title="Watch the God of War OST Video"
          >
            <span>🎬</span>
            <span>God of War OST</span>
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="stagger-reveal grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E8E2D6]/10 text-xs font-mono">
          <div>
            <span className="text-[#C1440E] font-bold block">60 FPS</span>
            <span className="text-[#6B7A8F] text-[10px]">Three.js WebGL Engine</span>
          </div>
          <div>
            <span className="text-[#C1440E] font-bold block">DUAL BLADES</span>
            <span className="text-[#6B7A8F] text-[10px]">Real-Time Combat FX</span>
          </div>
          <div>
            <span className="text-[#C1440E] font-bold block">MONGODB</span>
            <span className="text-[#6B7A8F] text-[10px]">Multi-Tenant Cloud DB</span>
          </div>
          <div>
            <span className="text-[#C1440E] font-bold block">1-CLICK</span>
            <span className="text-[#6B7A8F] text-[10px]">Instant Shareable Link</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="section-inner w-full flex items-end justify-between text-xs font-inter text-[#6B7A8F] tracking-[0.25em]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-[1px] bg-[#C1440E]"></div>
          <span className="text-[#E8E2D6]/90 text-[11px] font-mono uppercase tracking-widest">
            SCROLL DOWN TO DISCOVER HOW IT WORKS
          </span>
        </div>

        <button
          onClick={() => scrollToSection("how-it-works")}
          className="hidden sm:flex flex-col items-center gap-1.5 animate-bounce cursor-pointer hover:text-[#E8E2D6]"
        >
          <span className="text-[10px] text-[#C1440E] font-mono tracking-widest">EXPLORE</span>
          <span className="text-sm text-[#C1440E]">ᛏ</span>
        </button>
      </div>
    </section>
  );
}
