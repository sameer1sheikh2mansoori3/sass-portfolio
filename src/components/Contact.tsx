"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface ContactProps {
  data?: typeof PORTFOLIO_DATA.contact;
}

export default function Contact({ data }: ContactProps = {}) {
  const contact = data || PORTFOLIO_DATA.contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="portfolio-section relative min-h-screen w-full flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-28 pb-12 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto my-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-14 text-center md:text-left">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center justify-center md:justify-start gap-2">
            <span>ᛗ</span>
            <span>{contact.sectionTag}</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#E8E2D6] tracking-tight leading-tight mb-6 drop-shadow-lg">
            SUMMON THE WAR COUNCIL
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#6B7A8F] max-w-2xl leading-relaxed">
            {contact.subheading}
          </p>
        </div>

        {/* Transmission Chamber Card */}
        <div className="stagger-reveal p-8 sm:p-12 md:p-16 rounded-sm border border-[#C1440E]/50 bg-gradient-to-b from-[#18110c]/95 via-[#0A0A0B]/95 to-[#0A0A0B]/98 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="font-mono text-xs text-[#6B7A8F] tracking-widest uppercase block mb-3">
                DIRECT SECURE COMMS FREQUENCY
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-[#E8E2D6] hover:text-[#C1440E] transition-colors duration-300 break-all drop-shadow-md"
              >
                {contact.email}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-9 py-4 bg-[#C1440E] text-[#E8E2D6] font-inter text-xs font-black tracking-[0.25em] uppercase rounded-sm transition-all duration-300 hover:bg-[#d94d12] hover:shadow-[0_0_30px_rgba(193,68,14,0.7)] cursor-pointer"
              >
                {copied ? "FREQUENCY ACQUIRED" : "COPY FREQUENCY"}
              </button>

              <a
                href={`mailto:${contact.email}?subject=War%20Council%20Inquiry%20//%20Spartan%20Architecture`}
                className="w-full sm:w-auto px-9 py-4 border border-[#E8E2D6]/25 bg-[#0A0A0B]/80 text-[#E8E2D6] font-inter text-xs font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 hover:border-[#C1440E] hover:text-[#C1440E] hover:bg-[#C1440E]/15 text-center"
              >
                Open Dispatch
              </a>
            </div>
          </div>

          {/* Social Outposts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-12 border-t border-[#E8E2D6]/15">
            {contact.socials.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/60 hover:border-[#C1440E]/70 hover:bg-[#0A0A0B]/90 transition-all duration-300"
              >
                <div className="font-inter text-xs text-[#6B7A8F] mb-1.5 group-hover:text-[#C1440E] transition-colors flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="text-[10px] text-[#C1440E] opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
                <div className="font-cinzel text-sm sm:text-base font-bold text-[#E8E2D6] tracking-wide">
                  {item.handle}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
