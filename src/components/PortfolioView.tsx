"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Scene from "@/components/Scene";
import ScrollController from "@/components/ScrollController";
import Cursor from "@/components/Cursor";
import HUD from "@/components/HUD";
import { PortfolioDataType } from "@/lib/data";

interface PortfolioViewProps {
  portfolio: PortfolioDataType;
  banner?: React.ReactNode;
}

export default function PortfolioView({ portfolio, banner }: PortfolioViewProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] selection:bg-[#C1440E] selection:text-[#E8E2D6] overflow-x-hidden">
      {/* Optional Top Warrior Banner */}
      {banner}

      {/* 1. Custom Lagging Ember Cursor */}
      <Cursor />

      {/* 2. Real-time Telemetry HUD & Audio Toggle */}
      <HUD />

      {/* 3. Sticky Navigation Bar */}
      <Navbar displayName={portfolio.hero.name} />

      {/* 4. God of War Three.js Cinematic Scene */}
      <Scene />

      {/* 5. Lenis Smooth Scroll & GSAP ScrollTrigger Choreography */}
      <ScrollController />

      {/* 6. Atmospheric Post-Processing Overlays */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" />
      <div className="vignette-overlay pointer-events-none" aria-hidden="true" />
      <div className="horizon-glow pointer-events-none" aria-hidden="true" />

      {/* 7. Main Portfolio Content Flow */}
      <main className="relative z-10 flex flex-col w-full bg-transparent">
        <Hero data={portfolio.hero} />
        <About data={portfolio.about} />
        <Skills data={portfolio.skills} />
        <Projects data={portfolio.projects} />
        <Experience data={portfolio.experience} />
        <Contact data={portfolio.contact} />
        <Footer />
      </main>
    </div>
  );
}
