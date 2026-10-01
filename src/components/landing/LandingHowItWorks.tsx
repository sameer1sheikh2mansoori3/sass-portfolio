"use client";

import Link from "next/link";

export default function LandingHowItWorks() {
  const steps = [
    {
      number: "01",
      rune: "ᚦ",
      title: "CLAIM YOUR WARRIOR SEAL",
      subtitle: "Instant 10-Second Registration",
      description:
        "Choose your personal handle (e.g. /u/alex or /u/sameer). Your unique 3D portfolio URL is immediately allocated and secured in MongoDB.",
      highlight: "No credit cards, zero server setup, instant handle reservation.",
      badge: "FREE REGISTRATION",
    },
    {
      number: "02",
      rune: "⚔",
      title: "ENTER THE WAR ROOM",
      subtitle: "Customize With Zero Code",
      description:
        "Open your private dashboard editor. Type in your hero name, title, achievements, tech skills, and projects. Everything auto-formats into cinematic Spartan cards.",
      highlight: "Real-time preview and 1-click MongoDB save button.",
      badge: "INTUITIVE DASHBOARD",
    },
    {
      number: "03",
      rune: "ᛟ",
      title: "DISPATCH & CONQUER",
      subtitle: "Send Your 3D URL To Anyone",
      description:
        "Copy your shareable link and send it to recruiters, clients, or on your social profiles. Watch recruiters scroll and fight with dual Blades of Chaos in 60 FPS 3D.",
      highlight: "Guaranteed to stand out from 99.9% of ordinary flat resumes.",
      badge: "MAXIMUM IMPACT",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᚦ</span>
            <span>[ 01 // HOW IT WORKS ]</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-3xl drop-shadow-md">
              FORGE YOUR 3D REALM IN 3 STEPS
            </h2>
            <p className="font-inter text-sm text-[#6B7A8F] max-w-md leading-relaxed">
              No 3D modeling skills, Three.js shaders, or server configuration required. We built the engine; you bring your achievements.
            </p>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="stagger-reveal group relative p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B]/85 backdrop-blur-xl transition-all duration-300 hover:border-[#C1440E] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(193,68,14,0.25)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-cinzel text-3xl font-black text-[#C1440E] opacity-90">
                    {step.number}
                  </span>
                  <span className="w-10 h-10 rounded-full border border-[#C1440E]/40 bg-[#C1440E]/10 flex items-center justify-center text-lg text-[#FF4400]">
                    {step.rune}
                  </span>
                </div>

                <div className="text-[10px] font-mono tracking-widest text-[#C1440E] uppercase mb-1">
                  {step.subtitle}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-[#E8E2D6] mb-4">
                  {step.title}
                </h3>

                <p className="font-inter text-sm text-[#6B7A8F] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]/10">
                <span className="text-xs font-mono text-[#E8E2D6]/90 block">
                  ⚡ {step.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Conversion Strip */}
        <div className="stagger-reveal p-6 rounded-sm border border-[#C1440E]/40 bg-gradient-to-r from-[#1b120c]/90 via-[#0A0A0B]/90 to-[#1b120c]/90 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚔</span>
            <div>
              <div className="font-cinzel text-sm sm:text-base font-bold text-[#E8E2D6]">
                Ready to build yours in under 60 seconds?
              </div>
              <div className="text-xs font-mono text-[#6B7A8F]">
                Signup is free. Your custom URL is live immediately.
              </div>
            </div>
          </div>

          <Link
            href="/signup"
            className="px-6 py-3 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-black tracking-widest uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_25px_#C1440E] transition-all text-center"
          >
            Claim Handle Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
