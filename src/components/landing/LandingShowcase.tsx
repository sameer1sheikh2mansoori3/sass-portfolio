"use client";

import Link from "next/link";

export default function LandingShowcase() {
  const demos = [
    {
      handle: "kratos",
      name: "KRATOS OF SPARTA",
      role: "Full-Stack Destroyer of Code Latency",
      doctrine:
        "Engineering digital architectures at the bleeding frontier of WebGL, physics, and full-stack rigor.",
      tags: ["React 19", "Three.js", "GSAP", "MongoDB"],
      url: "/u/kratos",
    },
    {
      handle: "demo",
      name: "DEMO WARRIOR",
      role: "Chief Systems Architect & Creative Technologist",
      doctrine:
        "Transforming browsers into living theatre. From sub-millisecond shader execution to distributed backends.",
      tags: ["TypeScript", "Next.js 16", "Lenis", "WebGL"],
      url: "/u/demo",
    },
  ];

  return (
    <section
      id="showcase"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᚺ</span>
            <span>[ 03 // LIVE HALL OF CONQUERORS ]</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-3xl drop-shadow-md">
              EXPLORE REAL-TIME CHRONICLES
            </h2>
            <p className="font-inter text-sm text-[#6B7A8F] max-w-md leading-relaxed">
              Click below to view how public portfolios render in full 3D glory when shared with the world.
            </p>
          </div>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {demos.map((d) => (
            <div
              key={d.handle}
              className="stagger-reveal group p-8 sm:p-10 rounded-sm border border-[#C1440E]/40 bg-gradient-to-b from-[#18110c]/90 to-[#0A0A0B]/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-[#C1440E] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#C1440E] tracking-widest font-bold">
                    PORTFOLIO // @{d.handle.toUpperCase()}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C1440E] shadow-[0_0_8px_#C1440E]" />
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#E8E2D6] mb-2">
                  {d.name}
                </h3>
                <div className="font-mono text-xs text-[#D4AF37] mb-4">
                  {d.role}
                </div>

                <p className="font-inter text-xs sm:text-sm text-[#6B7A8F] leading-relaxed mb-6">
                  {d.doctrine}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm bg-[#0c0d12] border border-[#E8E2D6]/10 text-[10px] font-mono text-[#E8E2D6]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E2D6]/10 flex items-center justify-between">
                <span className="font-mono text-xs text-[#6B7A8F]">
                  PUBLIC PATH: <span className="text-[#E8E2D6] font-bold">{d.url}</span>
                </span>
                <Link
                  href={d.url}
                  className="px-5 py-2.5 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_20px_#C1440E] transition-all flex items-center gap-1.5"
                >
                  <span>Launch ⚔</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Combat Test Callout */}
        <div className="stagger-reveal p-6 rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-[#E8E2D6]">
            <span className="text-xl animate-pulse">⚔</span>
            <span>
              INTERACTIVE TEST: Press <span className="text-[#C1440E] font-bold">[Spacebar]</span> or <span className="text-[#C1440E] font-bold">[Click Canvas]</span> anywhere on screen right now to unleash the Spartan Slash!
            </span>
          </div>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("spartan:slash"));
            }}
            className="px-4 py-2 border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] font-mono text-xs uppercase hover:bg-[#C1440E] transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            ⚔ Slash Now
          </button>
        </div>
      </div>
    </section>
  );
}
