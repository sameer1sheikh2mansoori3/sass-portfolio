"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

interface ExperienceProps {
  data?: typeof PORTFOLIO_DATA.experience;
}

export default function Experience({ data }: ExperienceProps = {}) {
  const experience = data || PORTFOLIO_DATA.experience;

  return (
    <section
      id="experience"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᚺ</span>
            <span>{experience.sectionTag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-3xl drop-shadow-md">
            CHRONICLES OF GLORY & WAR
          </h2>
        </div>

        {/* Timeline of Roles */}
        <div className="relative border-l-2 border-[#C1440E]/40 ml-4 sm:ml-6 md:ml-8 pl-8 sm:pl-12 md:pl-16 space-y-16">
          {experience.roles.map((role, idx) => (
            <div key={idx} className="stagger-reveal relative group">
              {/* Timeline Marker Beacon */}
              <div className="absolute -left-[43px] sm:-left-[59px] md:-left-[75px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#0A0A0B] border-2 border-[#C1440E] group-hover:scale-125 group-hover:shadow-[0_0_20px_#C1440E] transition-all duration-300">
                <span className="text-[10px] text-[#C1440E] font-mono">⚔</span>
              </div>

              {/* Role Card */}
              <div className="p-8 sm:p-10 rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B]/85 backdrop-blur-xl transition-all duration-300 group-hover:border-[#C1440E]/70 group-hover:bg-[#0A0A0B]/95 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs tracking-widest text-[#C1440E] font-bold">
                    {role.period}
                  </span>
                  <span className="font-mono text-xs text-[#6B7A8F]">
                    {role.location}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#E8E2D6] mb-1 group-hover:text-[#C1440E] transition-colors duration-300 tracking-wide">
                  {role.role}
                </h3>

                <div className="font-cinzel text-base text-[#6B7A8F] mb-6 font-medium">
                  @ {role.company}
                </div>

                <p className="font-inter text-sm sm:text-base text-[#E8E2D6]/80 leading-relaxed mb-6">
                  {role.description}
                </p>

                {/* Tactical Highlights */}
                <div className="space-y-3 pt-6 border-t border-[#E8E2D6]/15">
                  {role.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <span className="text-[#C1440E] text-xs font-mono mt-1">▸</span>
                      <p className="font-inter text-xs sm:text-sm text-[#E8E2D6]/70 leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
