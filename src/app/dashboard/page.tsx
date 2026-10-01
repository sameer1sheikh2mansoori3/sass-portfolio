"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortfolioDataType } from "@/lib/data";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const [username, setUsername] = useState("");
  const [portfolio, setPortfolio] = useState<PortfolioDataType | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "skills" | "projects" | "experience" | "contact">("hero");

  useEffect(() => {
    fetch("/api/portfolio/my")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.success) {
          setUsername(data.user.username);
          setPortfolio(data.portfolio);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        setErrorMessage("Failed to load your warrior records.");
        setLoading(false);
      });
  }, [router]);

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const publicUrl = `${origin}/u/${username}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = async () => {
    if (!portfolio) return;
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/portfolio/my", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolio }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to inscribe changes");
      } else {
        setSuccessMessage("⚔ CHRONICLE SAVED TO MONGODB SUCCESSFULLY!");
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch {
      setErrorMessage("Network transmission failure while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-full border-2 border-[#C1440E] border-t-transparent animate-spin mb-4" />
        <div className="font-mono text-xs tracking-widest text-[#C1440E] uppercase">
          COMMUNING WITH CITADEL ARCHIVES...
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${origin}/u/${username}`;

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] p-4 sm:p-8 lg:p-12 relative select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D6]/15 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C1440E] bg-[#C1440E]/20 flex items-center justify-center text-xl text-[#FF3300] shadow-[0_0_15px_#C1440E]">
              ⚔
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#C1440E] uppercase">
                WAR ROOM // COMMAND CENTER
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-[#E8E2D6] tracking-wide">
                WARRIOR @{username.toUpperCase()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-sm border border-[#E8E2D6]/20 bg-[#0A0A0B] text-xs font-mono tracking-wider hover:border-[#C1440E] transition-all"
            >
              Citadel Home
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-sm border border-red-500/40 bg-red-950/20 text-red-300 text-xs font-mono tracking-wider hover:bg-red-900/40 transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Shareable Portfolio Link Banner */}
        <div className="p-6 rounded-sm border border-[#C1440E]/60 bg-gradient-to-r from-[#1b120c]/90 via-[#0c0d12]/95 to-[#1b120c]/90 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-[0.3em] text-[#C1440E] uppercase mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C1440E] animate-ping" />
              <span>YOUR PUBLIC SHAREABLE CHRONICLE LINK</span>
            </div>
            <div className="font-mono text-sm sm:text-base text-[#E8E2D6] font-bold break-all">
              {shareUrl}
            </div>
            <p className="font-inter text-xs text-[#6B7A8F] mt-1">
              Anyone with this link will experience your custom 3D Spartan warrior portfolio with full Blades of Chaos combat!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              className="px-5 py-3 rounded-sm bg-[#C1440E] text-[#E8E2D6] font-mono text-xs font-black tracking-wider uppercase hover:bg-[#d94d12] hover:shadow-[0_0_20px_#C1440E] transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY SHARE LINK"}</span>
            </button>

            <a
              href={`/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-sm border border-[#E8E2D6]/30 bg-[#0A0A0B]/80 text-[#E8E2D6] font-mono text-xs font-bold tracking-wider uppercase hover:border-[#C1440E] hover:text-[#C1440E] transition-all flex items-center gap-2"
            >
              <span>👁</span>
              <span>VIEW LIVE</span>
            </a>
          </div>
        </div>

        {/* Status Messages */}
        {successMessage && (
          <div className="p-4 rounded-sm border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 font-mono text-xs flex items-center gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 rounded-sm border border-red-500/50 bg-red-950/30 text-red-300 font-mono text-xs flex items-center gap-3">
            <span className="text-red-400 font-bold">⚠</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D6]/10 scrollbar-none">
          {[
            { id: "hero", label: "01 // HERO CARD" },
            { id: "about", label: "02 // DOCTRINE (ABOUT)" },
            { id: "skills", label: "03 // ARSENAL (SKILLS)" },
            { id: "projects", label: "04 // CAMPAIGNS (PROJECTS)" },
            { id: "experience", label: "05 // COMBAT (EXPERIENCE)" },
            { id: "contact", label: "06 // DISPATCH (CONTACT)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-sm font-mono text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#C1440E] text-[#E8E2D6] font-bold shadow-[0_0_15px_rgba(193,68,14,0.5)]"
                  : "bg-[#0A0A0B] border border-[#E8E2D6]/15 text-[#6B7A8F] hover:text-[#E8E2D6] hover:border-[#E8E2D6]/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Hero */}
        {activeTab === "hero" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
              Hero Presentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Full Warrior Name
                </label>
                <input
                  type="text"
                  value={portfolio.hero.name}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-cinzel text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  value={portfolio.hero.title}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-cinzel text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Greeting / Protocol Tag
                </label>
                <input
                  type="text"
                  value={portfolio.hero.greeting}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, greeting: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Location / Realm
                </label>
                <input
                  type="text"
                  value={portfolio.hero.location}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Doctrine / Philosophy Statement
                </label>
                <textarea
                  rows={3}
                  value={portfolio.hero.doctrine}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, doctrine: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-inter text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Availability Notice
                </label>
                <input
                  type="text"
                  value={portfolio.hero.availability}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, availability: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Status Badge Text
                </label>
                <input
                  type="text"
                  value={portfolio.hero.statusBadge}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      hero: { ...portfolio.hero, statusBadge: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: About */}
        {activeTab === "about" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
              Doctrine (About & Stats)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={portfolio.about.heading}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      about: { ...portfolio.about, heading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-cinzel text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  4 Bio Creed Lines
                </label>
                <div className="space-y-3">
                  {portfolio.about.bioLines.map((line, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const updated = [...portfolio.about.bioLines];
                        updated[idx] = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          about: { ...portfolio.about, bioLines: updated },
                        });
                      }}
                      className="w-full px-4 py-2 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-inter text-xs focus:border-[#C1440E] focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]/10">
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-3">
                  Key Metrics & Stats
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {portfolio.about.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B]">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...portfolio.about.stats];
                          updated[idx].value = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            about: { ...portfolio.about, stats: updated },
                          });
                        }}
                        className="w-full font-cinzel text-xl font-black text-[#C1440E] bg-transparent border-b border-[#E8E2D6]/20 mb-2 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...portfolio.about.stats];
                          updated[idx].label = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            about: { ...portfolio.about, stats: updated },
                          });
                        }}
                        className="w-full font-mono text-[10px] uppercase text-[#E8E2D6] bg-transparent border-b border-[#E8E2D6]/20 mb-1 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={stat.detail}
                        onChange={(e) => {
                          const updated = [...portfolio.about.stats];
                          updated[idx].detail = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            about: { ...portfolio.about, stats: updated },
                          });
                        }}
                        className="w-full font-inter text-[11px] text-[#6B7A8F] bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Skills */}
        {activeTab === "skills" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
                Arsenal (Disciplines & Skills)
              </h2>
              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...portfolio.skills.list,
                    {
                      name: "New Weapon",
                      category: "Core Engine" as any,
                      level: 90,
                      iconTag: String(portfolio.skills.list.length + 1).padStart(2, "0"),
                      summary: "Proficiency summary and description.",
                    },
                  ];
                  setPortfolio({
                    ...portfolio,
                    skills: { ...portfolio.skills, list: updated },
                  });
                }}
                className="px-3.5 py-1.5 rounded-sm border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] font-mono text-xs hover:bg-[#C1440E] transition-all cursor-pointer"
              >
                + Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.skills.list.map((skill, idx) => (
                <div key={idx} className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B] space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => {
                        const updated = [...portfolio.skills.list];
                        updated[idx].name = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          skills: { ...portfolio.skills, list: updated },
                        });
                      }}
                      className="font-cinzel text-sm font-bold text-[#E8E2D6] bg-transparent border-b border-[#E8E2D6]/20 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = portfolio.skills.list.filter((_, i) => i !== idx);
                        setPortfolio({
                          ...portfolio,
                          skills: { ...portfolio.skills, list: updated },
                        });
                      }}
                      className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#6B7A8F]">Level:</span>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={skill.level}
                      onChange={(e) => {
                        const updated = [...portfolio.skills.list];
                        updated[idx].level = Number(e.target.value);
                        setPortfolio({
                          ...portfolio,
                          skills: { ...portfolio.skills, list: updated },
                        });
                      }}
                      className="w-16 px-2 py-0.5 bg-[#0c0d12] border border-[#E8E2D6]/20 font-mono text-xs text-[#C1440E]"
                    />
                    <span className="text-xs font-mono text-[#C1440E]">%</span>
                  </div>

                  <textarea
                    rows={2}
                    value={skill.summary}
                    onChange={(e) => {
                      const updated = [...portfolio.skills.list];
                      updated[idx].summary = e.target.value;
                      setPortfolio({
                        ...portfolio,
                        skills: { ...portfolio.skills, list: updated },
                      });
                    }}
                    className="w-full p-2 bg-[#0c0d12] border border-[#E8E2D6]/10 rounded-sm font-inter text-xs text-[#6B7A8F] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Projects */}
        {activeTab === "projects" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
                Campaigns (Projects & Monuments)
              </h2>
              <button
                type="button"
                onClick={() => {
                  const updated = [
                    ...portfolio.projects.list,
                    {
                      id: "proj-" + Date.now(),
                      title: "NEW CAMPAIGN",
                      year: "2025",
                      role: "Lead Architect",
                      tags: ["React", "Three.js", "Node.js"],
                      oneLiner: "Cinematic real-time digital experience.",
                      accent: "#C1440E",
                      metrics: "100k+ users",
                      previewGradient: "from-[#C1440E]/20 to-transparent",
                      link: "https://example.com",
                      github: "https://github.com",
                    },
                  ];
                  setPortfolio({
                    ...portfolio,
                    projects: { ...portfolio.projects, list: updated },
                  });
                }}
                className="px-3.5 py-1.5 rounded-sm border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] font-mono text-xs hover:bg-[#C1440E] transition-all cursor-pointer"
              >
                + Add Project
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.projects.list.map((proj, idx) => (
                <div key={proj.id} className="p-5 rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B] space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...portfolio.projects.list];
                        updated[idx].title = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          projects: { ...portfolio.projects, list: updated },
                        });
                      }}
                      className="font-cinzel text-lg font-black text-[#E8E2D6] bg-transparent border-b border-[#E8E2D6]/20 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = portfolio.projects.list.filter((_, i) => i !== idx);
                        setPortfolio({
                          ...portfolio,
                          projects: { ...portfolio.projects, list: updated },
                        });
                      }}
                      className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Year</label>
                      <input
                        type="text"
                        value={proj.year}
                        onChange={(e) => {
                          const updated = [...portfolio.projects.list];
                          updated[idx].year = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            projects: { ...portfolio.projects, list: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#E8E2D6]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Role</label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => {
                          const updated = [...portfolio.projects.list];
                          updated[idx].role = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            projects: { ...portfolio.projects, list: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#E8E2D6]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Metrics</label>
                      <input
                        type="text"
                        value={proj.metrics}
                        onChange={(e) => {
                          const updated = [...portfolio.projects.list];
                          updated[idx].metrics = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            projects: { ...portfolio.projects, list: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#C1440E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">One-Liner Summary</label>
                    <textarea
                      rows={2}
                      value={proj.oneLiner}
                      onChange={(e) => {
                        const updated = [...portfolio.projects.list];
                        updated[idx].oneLiner = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          projects: { ...portfolio.projects, list: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-[#0c0d12] border border-[#E8E2D6]/15 font-inter text-xs text-[#E8E2D6]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">
                      Tech Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={proj.tags.join(", ")}
                      onChange={(e) => {
                        const updated = [...portfolio.projects.list];
                        updated[idx].tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                        setPortfolio({
                          ...portfolio,
                          projects: { ...portfolio.projects, list: updated },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#E8E2D6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Experience */}
        {activeTab === "experience" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
              Combat Timeline (Experience)
            </h2>
            <div className="space-y-6">
              {portfolio.experience.roles.map((role, idx) => (
                <div key={idx} className="p-5 rounded-sm border border-[#E8E2D6]/15 bg-[#0A0A0B] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Company</label>
                      <input
                        type="text"
                        value={role.company}
                        onChange={(e) => {
                          const updated = [...portfolio.experience.roles];
                          updated[idx].company = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            experience: { ...portfolio.experience, roles: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-cinzel text-sm text-[#E8E2D6]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Role Title</label>
                      <input
                        type="text"
                        value={role.role}
                        onChange={(e) => {
                          const updated = [...portfolio.experience.roles];
                          updated[idx].role = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            experience: { ...portfolio.experience, roles: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#C1440E]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Period (e.g. 2023 — Present)</label>
                      <input
                        type="text"
                        value={role.period}
                        onChange={(e) => {
                          const updated = [...portfolio.experience.roles];
                          updated[idx].period = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            experience: { ...portfolio.experience, roles: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#6B7A8F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Location</label>
                      <input
                        type="text"
                        value={role.location}
                        onChange={(e) => {
                          const updated = [...portfolio.experience.roles];
                          updated[idx].location = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            experience: { ...portfolio.experience, roles: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#6B7A8F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#6B7A8F] uppercase block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={role.description}
                      onChange={(e) => {
                        const updated = [...portfolio.experience.roles];
                        updated[idx].description = e.target.value;
                        setPortfolio({
                          ...portfolio,
                          experience: { ...portfolio.experience, roles: updated },
                        });
                      }}
                      className="w-full px-3 py-2 bg-[#0c0d12] border border-[#E8E2D6]/15 font-inter text-xs text-[#E8E2D6]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Contact */}
        {activeTab === "contact" && (
          <div className="p-6 sm:p-8 rounded-sm border border-[#E8E2D6]/15 bg-[#0c0d12]/80 space-y-6">
            <h2 className="font-cinzel text-xl font-black text-[#E8E2D6]">
              Dispatch (Contact Information & Socials)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={portfolio.contact.email}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      contact: { ...portfolio.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-1.5">
                  Deployment Realm / Coverage
                </label>
                <input
                  type="text"
                  value={portfolio.contact.location}
                  onChange={(e) =>
                    setPortfolio({
                      ...portfolio,
                      contact: { ...portfolio.contact, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0A0A0B] border border-[#E8E2D6]/20 rounded-sm font-mono text-sm focus:border-[#C1440E] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase text-[#6B7A8F] mb-3">
                  War Council Social Links
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolio.contact.socials.map((social, idx) => (
                    <div key={idx} className="p-4 rounded-sm border border-[#E8E2D6]/10 bg-[#0A0A0B] space-y-2">
                      <span className="font-cinzel text-xs font-bold text-[#C1440E]">
                        {social.label}
                      </span>
                      <input
                        type="text"
                        placeholder="Handle / Username"
                        value={social.handle}
                        onChange={(e) => {
                          const updated = [...portfolio.contact.socials];
                          updated[idx].handle = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            contact: { ...portfolio.contact, socials: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#E8E2D6]"
                      />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={social.url}
                        onChange={(e) => {
                          const updated = [...portfolio.contact.socials];
                          updated[idx].url = e.target.value;
                          setPortfolio({
                            ...portfolio,
                            contact: { ...portfolio.contact, socials: updated },
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-[#0c0d12] border border-[#E8E2D6]/15 font-mono text-xs text-[#6B7A8F]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Floating / Sticky Bottom Save Bar */}
        <div className="sticky bottom-6 z-40 p-4 sm:p-5 rounded-sm border border-[#C1440E] bg-[#0A0A0B]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C1440E] animate-pulse" />
            <span className="text-xs font-mono text-[#E8E2D6] font-bold">
              CHANGES IN WAR ROOM READY FOR INSCRIPTION
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-black tracking-[0.25em] uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_25px_#C1440E] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 active:scale-95"
            >
              <span>{saving ? "⏳" : "💾"}</span>
              <span>{saving ? "INSCRIBING TO MONGODB..." : "SAVE CHRONICLE"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
