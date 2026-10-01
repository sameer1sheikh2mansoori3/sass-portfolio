"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

interface AboutProps {
  data?: typeof PORTFOLIO_DATA.about;
}

export default function About({ data }: AboutProps = {}) {
  const about = data || PORTFOLIO_DATA.about;

  return (
    <section
      id="about"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-14">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᛉ</span>
            <span>{about.sectionTag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-4xl drop-shadow-md">
            FORGED IN THE CRUCIBLE OF HIGH PERFORMANCE
          </h2>
        </div>

        {/* 4-Line Bio Presentation in Cinematic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            {about.bioLines.map((line, idx) => (
              <div
                key={idx}
                className="stagger-reveal group p-6 sm:p-7 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/80 backdrop-blur-md transition-all duration-300 hover:border-[#C1440E]/60 hover:bg-[#0A0A0B]/95 shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <span className="font-cinzel text-base sm:text-lg font-bold text-[#C1440E] opacity-90 mt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="font-cinzel text-base sm:text-lg md:text-xl text-[#E8E2D6] leading-relaxed">
                    {line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side Monolith Card */}
          <div className="stagger-reveal lg:col-span-4 p-8 rounded-sm border border-[#C1440E]/40 bg-gradient-to-b from-[#18110c]/90 to-[#0A0A0B]/95 backdrop-blur-xl shadow-2xl">
            <div className="text-xs font-mono tracking-[0.3em] text-[#C1440E] uppercase mb-4 flex items-center gap-2">
              <span>⚔</span>
              <span>THE SPARTAN CREED</span>
            </div>
            <p className="font-cinzel text-sm sm:text-base text-[#E8E2D6]/90 leading-relaxed mb-6 italic">
              &ldquo;We treat the browser not as a static document viewer, but as an infinite volumetric stage. Code is our chisel; frame-rates are our oath.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#E8E2D6]/15 flex items-center justify-between text-xs font-mono text-[#6B7A8F]">
              <span>CORE DISCIPLINE</span>
              <span className="text-[#C1440E] font-bold">ZERO LATENCY</span>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid: 4+ Years, 38 Projects, 21 Clients, 12 Awards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {about.stats.map((stat, idx) => (
            <div
              key={idx}
              className="stagger-reveal p-6 sm:p-7 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/80 backdrop-blur-md transition-all duration-300 hover:border-[#C1440E]/80 hover:shadow-[0_10px_35px_rgba(193,68,14,0.25)] group"
            >
              <div className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-[#E8E2D6] mb-2 group-hover:text-[#C1440E] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="font-mono text-xs tracking-wider text-[#C1440E] font-bold uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-inter text-xs text-[#6B7A8F] leading-snug">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
