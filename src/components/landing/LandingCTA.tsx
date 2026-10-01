"use client";

import Link from "next/link";

export default function LandingCTA() {
  return (
    <section
      id="cta"
      className="portfolio-section relative min-h-screen w-full flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-28 pb-12 z-10"
    >
      <div className="section-inner w-full max-w-5xl mx-auto my-auto text-center">
        {/* Section Header */}
        <div className="stagger-reveal mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C1440E]/40 bg-[#C1440E]/15 text-[#C1440E] text-xs font-mono font-bold tracking-[0.35em] uppercase">
          <span>⚔</span>
          <span>[ 04 // CLAIM YOUR REALM ]</span>
        </div>

        <h2 className="stagger-reveal font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#E8E2D6] tracking-tight leading-[0.95] mb-6 drop-shadow-xl">
          YOUR DIGITAL LEGEND
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E8E2D6] via-[#C1440E] to-[#E8E2D6]/80">
            BEGINS NOW
          </span>
        </h2>

        <p className="stagger-reveal font-inter text-base sm:text-lg text-[#6B7A8F] max-w-2xl mx-auto mb-10 leading-relaxed">
          Don&apos;t let your life&apos;s work get buried in a pile of identical two-page PDFs. Inscribe your chronicle into an unforgettable 3D battlefield.
        </p>

        {/* CTA Buttons */}
        <div className="stagger-reveal flex flex-wrap items-center justify-center gap-5 mb-16">
          <Link
            href="/signup"
            className="px-10 py-5 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-black tracking-[0.25em] uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_40px_rgba(193,68,14,0.8)] transition-all flex items-center gap-2 active:scale-95"
          >
            <span>⚔ Inscribe Your Free Chronicle</span>
            <span>→</span>
          </Link>

          <Link
            href="/login"
            className="px-8 py-5 border border-[#E8E2D6]/25 bg-[#0A0A0B]/80 backdrop-blur-md text-[#E8E2D6] font-cinzel text-xs font-bold tracking-[0.25em] uppercase rounded-sm hover:border-[#C1440E] hover:text-[#C1440E] transition-all"
          >
            Enter War Room (Sign In)
          </Link>
        </div>

        {/* Confidence Guarantees */}
        <div className="stagger-reveal grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-[#6B7A8F]">
          <div className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/70">
            <span className="text-[#E8E2D6] block font-bold mb-1">⚡ INSTANT URL</span>
            <span>Live in under 60 seconds</span>
          </div>
          <div className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/70">
            <span className="text-[#E8E2D6] block font-bold mb-1">🍃 MONGODB CLOUD</span>
            <span>Permanent, safe storage</span>
          </div>
          <div className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/70">
            <span className="text-[#E8E2D6] block font-bold mb-1">⚔ 60 FPS WEBGL</span>
            <span>High-octane Three.js engine</span>
          </div>
          <div className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/70">
            <span className="text-[#E8E2D6] block font-bold mb-1">🛡 ZERO CODING</span>
            <span>Visual dashboard editor</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="section-inner w-full max-w-6xl mx-auto pt-12 border-t border-[#E8E2D6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B7A8F]">
        <div className="flex items-center gap-2 text-[#E8E2D6]">
          <span className="w-2 h-2 rounded-full bg-[#C1440E]" />
          <span>SPARTAN PORTFOLIO // GOD OF WAR THEME</span>
        </div>
        <div>
          Next.js 16 + React 19 + Three.js + GSAP + MongoDB
        </div>
      </div>
    </section>
  );
}
