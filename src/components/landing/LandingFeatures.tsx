"use client";

export default function LandingFeatures() {
  const features = [
    {
      tag: "01 // GRAPHICS PIPELINE",
      title: "Real-Time 3D Spartan Warrior",
      description:
        "A fully rigged 3D soldier character positioned in cinematic 3/4 perspective. It dynamically shifts between Idle, Walking, and Running based on the visitor's scroll speed.",
      rune: "ᚠ",
    },
    {
      tag: "02 // COMBAT SYSTEM",
      title: "Dual Blades of Chaos & Combat FX",
      description:
        "Equipped with glowing molten orange swords on both hands. Features cross-slash X-combos, spark bursts, camera shake recoil, and synthesized metal clash sounds.",
      rune: "⚔",
    },
    {
      tag: "03 // WORLD ATMOSPHERE",
      title: "God of War Norse Realm",
      description:
        "Procedurally etched stone floor with ancient runes, monolithic pillars in volumetric fog, dual particle systems (falling blizzard snow + rising fire embers).",
      rune: "ᚢ",
    },
    {
      tag: "04 // BACKEND ARCHITECTURE",
      title: "Multi-Tenant MongoDB Database",
      description:
        "Your portfolio chronicle is permanently stored in MongoDB. Login and update your bio, projects, or job history anytime from your private War Room.",
      rune: "ᚦ",
    },
    {
      tag: "05 // PUBLIC DISTRIBUTION",
      title: "Instant Shareable Link (/u/handle)",
      description:
        "Zero deployment pipelines or Vercel config needed. Simply send your unique URL to recruiters or paste it on your resume and LinkedIn profile.",
      rune: "ᛟ",
    },
    {
      tag: "06 // RESPONSIVE RIGOR",
      title: "Mobile & Touch Optimized",
      description:
        "Runs at a rock-solid 60 FPS across desktop, tablet, and mobile. Mobile users get dedicated on-screen floating attack buttons and touch scroll velocity.",
      rune: "ᛗ",
    },
  ];

  return (
    <section
      id="features"
      className="portfolio-section relative min-h-screen w-full flex items-center justify-center px-6 md:px-16 lg:px-24 py-28 z-10"
    >
      <div className="section-inner w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="stagger-reveal mb-16">
          <div className="text-xs font-mono tracking-[0.4em] text-[#C1440E] uppercase mb-3 flex items-center gap-2">
            <span>ᛟ</span>
            <span>[ 02 // ARSENAL FEATURES ]</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E8E2D6] tracking-tight leading-tight max-w-3xl drop-shadow-md">
              ENGINEERED FOR SUPREME REPUTATION
            </h2>
            <p className="font-inter text-sm text-[#6B7A8F] max-w-md leading-relaxed">
              Every detail is engineered to leave an indelible mark on engineering directors, recruiters, and luxury tech clients.
            </p>
          </div>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="stagger-reveal group p-7 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]/80 backdrop-blur-md transition-all duration-300 hover:border-[#C1440E] hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(193,68,14,0.2)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#C1440E] tracking-widest font-bold">
                  {feat.tag}
                </span>
                <span className="w-8 h-8 rounded-full border border-[#E8E2D6]/20 bg-[#0c0d12] flex items-center justify-center text-sm text-[#E8E2D6]">
                  {feat.rune}
                </span>
              </div>

              <h3 className="font-cinzel text-lg font-bold text-[#E8E2D6] mb-3 group-hover:text-[#C1440E] transition-colors">
                {feat.title}
              </h3>

              <p className="font-inter text-xs text-[#6B7A8F] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
