"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

interface NavbarProps {
  displayName?: string;
}

export default function Navbar({ displayName }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Check auth session
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    const handleScroll = () => {
      const isPastHero = window.scrollY > 300;
      setScrolled(isPastHero);

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const warriorName = displayName || (user ? user.username.toUpperCase() : "ARYAN SHARMA");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full border border-[#E8E2D6]/15 bg-[#0A0A0B]/85 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          {/* Brand Mark */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 font-cinzel text-xs font-black tracking-widest text-[#E8E2D6] hover:text-[#C1440E] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#C1440E] shadow-[0_0_8px_#C1440E]" />
            <span>{warriorName}</span>
            <span className="text-[#6B7A8F] font-mono text-[10px] hidden sm:inline">
              {"// SPARTAN"}
            </span>
          </button>

          {/* Section Anchors */}
          <div className="hidden md:flex items-center gap-6 font-inter text-xs tracking-wider text-[#6B7A8F]">
            {[
              { id: "about", label: "Doctrine" },
              { id: "skills", label: "Arsenal" },
              { id: "projects", label: "Campaigns" },
              { id: "experience", label: "Combat" },
              { id: "contact", label: "Dispatch" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`transition-colors cursor-pointer hover:text-[#E8E2D6] ${
                  activeSection === link.id
                    ? "text-[#C1440E] font-semibold"
                    : "text-[#6B7A8F]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Fast Action CTA / Auth Navigation */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-full border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] font-mono text-[11px] font-bold tracking-wider uppercase hover:bg-[#C1440E] transition-all flex items-center gap-1.5"
              >
                <span>⚔</span>
                <span>WAR ROOM</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-full text-[#6B7A8F] hover:text-[#E8E2D6] font-mono text-[11px] tracking-wider transition-colors"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 rounded-full bg-[#C1440E] text-[#E8E2D6] font-inter text-[11px] font-bold tracking-wider uppercase hover:bg-[#d94d12] hover:shadow-[0_0_15px_rgba(193,68,14,0.5)] transition-all flex items-center gap-1.5"
                >
                  <span>⚔</span>
                  <span>CREATE YOURS</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
