"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

interface HeroProps {
  data?: typeof PORTFOLIO_DATA.hero;
}

export default function Hero({ data }: HeroProps = {}) {
  const hero = data || PORTFOLIO_DATA.hero;

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
      {/* Top Norse / Spartan Telemetry Bar */}
      <div className="section-inner w-full flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs tracking-[0.3em] text-[#6B7A8F] font-inter">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C1440E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C1440E]"></span>
          </span>
          <span className="text-[#E8E2D6] font-mono font-semibold uppercase">
            {hero.statusBadge}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[#6B7A8F] font-mono text-[11px]">
          <span>ᛟ REALM: {hero.location}</span>
          <span className="text-[#C1440E]">{"///"}</span>
          <span>{hero.availability}</span>
        </div>
      </div>

      {/* Center Cinematic Title Card */}
      <div className="section-inner my-auto py-12 max-w-xl lg:max-w-2xl">
        <div className="stagger-reveal inline-flex items-center gap-3 px-4 py-1.5 mb-6 rounded-full border border-[#C1440E]/40 bg-[#C1440E]/10 text-[#C1440E] text-xs font-mono font-bold tracking-[0.35em] uppercase">
          <span>ᚱ</span>
          <span>{hero.greeting}</span>
        </div>

        <h1 className="stagger-reveal font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-[#E8E2D6] mb-6 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          ARYAN
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E8E2D6] via-[#C1440E] to-[#E8E2D6]/80">
            SHARMA
          </span>
        </h1>

        <p className="stagger-reveal font-cinzel text-lg sm:text-2xl md:text-3xl text-[#E8E2D6]/90 tracking-wider max-w-3xl mb-6 font-semibold uppercase">
          {hero.title}
        </p>

        <p className="stagger-reveal font-inter text-sm sm:text-base text-[#6B7A8F] max-w-2xl leading-relaxed mb-10 font-normal">
          {hero.doctrine}
        </p>

        {/* Action Controls */}
        <div className="stagger-reveal flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-9 py-4 bg-[#C1440E] text-[#E8E2D6] font-inter text-xs font-black tracking-[0.25em] uppercase rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#d94d12] hover:shadow-[0_0_35px_rgba(193,68,14,0.7)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin Campaign
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                ⚔
              </span>
            </span>
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("spartan:slash"));
            }}
            className="group relative px-7 py-4 border border-[#C1440E] bg-[#C1440E]/15 text-[#E8E2D6] font-inter text-xs font-black tracking-[0.25em] uppercase rounded-sm transition-all duration-300 hover:bg-[#C1440E] hover:shadow-[0_0_30px_rgba(193,68,14,0.75)] cursor-pointer flex items-center gap-2.5 active:scale-95"
            title="Trigger dual sword slash animation (or press Space / click canvas)"
          >
            <span className="text-[#FF3300] group-hover:text-white transition-colors">⚔</span>
            <a href="/signup">Unleash Blades</a>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border border-[#E8E2D6]/25 bg-[#0A0A0B]/70 backdrop-blur-md text-[#E8E2D6] font-inter text-xs font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 hover:border-[#C1440E] hover:text-[#C1440E] hover:bg-[#C1440E]/10 cursor-pointer"
          >
            Transmit Signal
          </button>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="section-inner w-full flex items-end justify-between text-xs font-inter text-[#6B7A8F] tracking-[0.25em]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-[1px] bg-[#C1440E]"></div>
          <span className="text-[#E8E2D6]/90 text-[11px] font-mono uppercase tracking-widest">
            SCROLL TO COMMENCE THE MARCH
          </span>
        </div>

        <div className="hidden sm:flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-[10px] text-[#C1440E] font-mono tracking-widest">ADVANCE</span>
          <span className="text-sm text-[#C1440E]">ᛏ</span>
        </div>
      </div>
    </section>
  );
}
