"use client";

import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingShowcase from "@/components/landing/LandingShowcase";
import LandingCTA from "@/components/landing/LandingCTA";
import Footer from "@/components/Footer";
import Scene from "@/components/Scene";
import ScrollController from "@/components/ScrollController";
import Cursor from "@/components/Cursor";
import HUD from "@/components/HUD";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] selection:bg-[#C1440E] selection:text-[#E8E2D6] overflow-x-hidden">
      {/* 1. Custom Lagging Ember Cursor */}
      <Cursor />

      {/* 2. Real-time Telemetry HUD & Audio Toggle */}
      <HUD />

      {/* 3. Sticky Landing Navigation Bar */}
      <LandingNavbar />

      {/* 4. God of War Three.js Cinematic Scene (In Viewport at z-0) */}
      <Scene />

      {/* 5. Lenis Smooth Scroll & GSAP ScrollTrigger Choreography */}
      <ScrollController />

      {/* 6. Atmospheric Post-Processing Overlays */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" />
      <div className="vignette-overlay pointer-events-none" aria-hidden="true" />
      <div className="horizon-glow pointer-events-none" aria-hidden="true" />

      {/* 7. SaaS Product Landing Flow */}
      <main className="relative z-10 flex flex-col w-full bg-transparent">
        <LandingHero />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingShowcase />
        <LandingCTA />
        <Footer />
      </main>
    </div>
  );
}
