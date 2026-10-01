"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${
        scrolled ? "opacity-100 translate-y-0" : "opacity-90 translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full border border-[#E8E2D6]/15 bg-[#0A0A0B]/85 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          {/* Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-cinzel text-xs font-black tracking-widest text-[#E8E2D6] hover:text-[#C1440E] transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C1440E] shadow-[0_0_10px_#C1440E]" />
            <span>SPARTAN PORTFOLIO</span>
            <span className="text-[#C1440E] font-mono text-[10px] hidden sm:inline">
              {"// 3D ENGINE"}
            </span>
          </Link>

          {/* Section Anchors */}
          <div className="hidden md:flex items-center gap-6 font-inter text-xs tracking-wider text-[#6B7A8F]">
            <button
              onClick={() => scrollTo("how-it-works")}
              className="hover:text-[#E8E2D6] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="hover:text-[#E8E2D6] transition-colors cursor-pointer"
            >
              Arsenal Features
            </button>
            <button
              onClick={() => scrollTo("showcase")}
              className="hover:text-[#E8E2D6] transition-colors cursor-pointer"
            >
              Live Demo
            </button>
            <Link
              href="/u/kratos"
              className="hover:text-[#C1440E] transition-colors flex items-center gap-1 text-[#E8E2D6]/80"
            >
              <span>⚔</span>
              <span>/u/kratos</span>
            </Link>
          </div>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-full border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] font-mono text-[11px] font-bold tracking-wider uppercase hover:bg-[#C1440E] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(193,68,14,0.3)]"
              >
                <span>⚔</span>
                <span>WAR ROOM (@{user.username.toUpperCase()})</span>
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
                  className="px-4 py-1.5 rounded-full bg-[#C1440E] text-[#E8E2D6] font-inter text-[11px] font-bold tracking-wider uppercase hover:bg-[#d94d12] hover:shadow-[0_0_15px_rgba(193,68,14,0.6)] transition-all flex items-center gap-1.5"
                >
                  <span>⚔</span>
                  <span>BUILD YOURS</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
