"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

interface ProjectsProps {
  data?: typeof PORTFOLIO_DATA.projects;
}

export default function Projects({ data }: ProjectsProps = {}) {
  const projects = data || PORTFOLIO_DATA.projects;

  return (
    <section
      id="projects"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᛟ</span>
            <span>{projects.sectionTag}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-2xl drop-shadow-md">
              CONQUERED REALMS & MONUMENTS
            </h2>
            <p className="font-inter text-sm text-[#6B7A8F] max-w-md leading-relaxed">
              {projects.description}
            </p>
          </div>
        </div>

        {/* 5 Showcase Projects Grid */}
        <div className="space-y-14">
          {projects.list.map((proj, idx) => (
            <div
              key={proj.id}
              className="stagger-reveal group relative rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B]/90 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#C1440E]/80 hover:shadow-[0_25px_60px_rgba(193,68,14,0.2)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
                {/* Left: Project Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#6B7A8F] mb-4">
                      <span className="text-[#C1440E] font-bold tracking-widest">
                        CAMPAIGN 0{idx + 1}
                      </span>
                      <span>{"//"}</span>
                      <span className="text-[#E8E2D6]/90">{proj.year}</span>
                      <span>{"//"}</span>
                      <span className="text-[#6B7A8F]">{proj.role}</span>
                    </div>

                    <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-[#E8E2D6] mb-4 group-hover:text-[#C1440E] transition-colors duration-300 tracking-wide">
                      {proj.title}
                    </h3>

                    <p className="font-inter text-sm sm:text-base text-[#E8E2D6]/75 leading-relaxed mb-6">
                      {proj.oneLiner}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {proj.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1 rounded-sm text-xs font-mono bg-[#14161f] text-[#E8E2D6]/90 border border-[#E8E2D6]/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics & Interaction */}
                  <div className="pt-6 border-t border-[#E8E2D6]/15 flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#6B7A8F] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C1440E]" />
                      {proj.metrics}
                    </span>
                    <button
                      className="inline-flex items-center gap-2.5 font-inter text-xs font-bold tracking-widest text-[#E8E2D6] uppercase group/btn transition-colors hover:text-[#C1440E] cursor-pointer"
                      onClick={() => alert(`Initiating campaign protocol for ${proj.title}`)}
                    >
                      <span>Inspect Monument</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5 text-[#C1440E]">
                        ⚔
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right: Cinematic Visual Screen with God of War atmosphere */}
                <div className="lg:col-span-5 h-60 sm:h-72 lg:h-80 w-full rounded-sm overflow-hidden relative border border-[#E8E2D6]/15 group-hover:border-[#C1440E]/60 transition-colors duration-500">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: proj.previewGradient }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.65)_51%)] bg-[length:100%_4px] opacity-45 pointer-events-none" />

                  {/* Screen Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#E8E2D6]/70">
                      <span>ARCHIVE // ID: {proj.id.toUpperCase()}</span>
                      <span className="text-[#C1440E] font-bold">SECURED</span>
                    </div>
                    <div className="text-right">
                      <div className="font-cinzel text-2xl font-black text-[#E8E2D6] tracking-widest drop-shadow-md">
                        {proj.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#6B7A8F] mt-1">
                        REALM STATUS: CONQUERED
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
