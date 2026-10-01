"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

interface SkillsProps {
  data?: typeof PORTFOLIO_DATA.skills;
}

export default function Skills({ data }: SkillsProps = {}) {
  const skills = data || PORTFOLIO_DATA.skills;

  return (
    <section
      id="skills"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᚦ</span>
            <span>{skills.sectionTag}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-2xl drop-shadow-md">
              THE ARSENAL OF WEAPONS & CODE
            </h2>
            <p className="font-inter text-sm text-[#6B7A8F] max-w-md leading-relaxed">
              {skills.description}
            </p>
          </div>
        </div>

        {/* 9 Core Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.list.map((skill, idx) => (
            <div
              key={idx}
              className="stagger-reveal group p-7 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/85 backdrop-blur-md transition-all duration-300 hover:border-[#C1440E] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(193,68,14,0.22)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#C1440E] tracking-widest font-bold flex items-center gap-1.5">
                  <span>⚔</span>
                  <span>{skill.iconTag} {"//"} {skill.category.toUpperCase()}</span>
                </span>
                <span className="font-mono text-xs text-[#6B7A8F] font-semibold">
                  {skill.level}%
                </span>
              </div>

              <h3 className="font-cinzel text-2xl font-bold text-[#E8E2D6] mb-2 group-hover:text-[#C1440E] transition-colors duration-300 tracking-wide">
                {skill.name}
              </h3>

              <p className="font-inter text-xs sm:text-sm text-[#E8E2D6]/70 leading-relaxed mb-6">
                {skill.summary}
              </p>

              {/* Runic Energy Meter */}
              <div className="w-full bg-[#18181e] h-1.5 rounded-full overflow-hidden p-[1px]">
                <div
                  className="bg-gradient-to-r from-[#6B7A8F] via-[#C1440E] to-[#E8E2D6] h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_#C1440E]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
