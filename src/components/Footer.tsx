"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

export default function Footer() {
  const { contact } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full border-t border-[#E8E2D6]/10 bg-[#0A0A0B]/95 text-[#6B7A8F] font-inter text-xs">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Identity & Creed */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C1440E] shadow-[0_0_10px_#C1440E]" />
              <span className="font-cinzel text-base font-bold text-[#E8E2D6] tracking-wider">
                ARYAN SHARMA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7A8F]">
              Crafting real-time volumetric web monuments. Built with Next.js 15, Three.js, and GSAP.
            </p>
            <div className="font-mono text-[10px] text-[#C1440E]">
              SECURE DEPLOYMENT // PROD-STABLE
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold text-[#E8E2D6] uppercase tracking-widest">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-[#E8E2D6] transition-colors">
                  01 // The Doctrine
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#E8E2D6] transition-colors">
                  02 // The Arsenal
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#E8E2D6] transition-colors">
                  03 // Campaigns
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#E8E2D6] transition-colors">
                  04 // Combat History
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E8E2D6] transition-colors">
                  05 // Transmit Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: System Telemetry */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold text-[#E8E2D6] uppercase tracking-widest">
              Telemetry & Nodes
            </div>
            <ul className="space-y-2 text-xs">
              <li>Engine: WebGL 2.0 / ACES Filmic</li>
              <li>FPS Target: 60 FPS Steady</li>
              <li>Atmosphere: Exponential Fog 0.045</li>
              <li>Coordinates: {contact.coordinates.split("//")[0]}</li>
            </ul>
          </div>

          {/* Col 4: Comms & Dispatch */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold text-[#E8E2D6] uppercase tracking-widest">
              Direct Frequency
            </div>
            <p className="text-xs text-[#E8E2D6]/80 font-mono">
              {contact.email}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {contact.socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#14151B] border border-[#E8E2D6]/10 text-[11px] text-[#E8E2D6] hover:border-[#C1440E] hover:text-[#C1440E] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E8E2D6]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} ARYAN SHARMA. ALL ARCHIVES ENCRYPTED.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#C1440E] transition-colors cursor-pointer"
          >
            <span>RETURN TO SUMMIT</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
