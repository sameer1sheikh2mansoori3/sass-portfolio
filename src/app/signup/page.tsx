"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create warrior account");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Failed to transmit chronicle inscription. Check network.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(193,68,14,0.18),transparent_70%)]" />

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-cinzel text-sm font-black tracking-widest text-[#E8E2D6] hover:text-[#C1440E] transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C1440E] shadow-[0_0_10px_#C1440E]" />
          <span>CITADEL ENTRANCE</span>
        </Link>
        <div className="font-mono text-xs text-[#6B7A8F] tracking-widest">
          NEW CHRONICLE // INSCRIBE
        </div>
      </div>

      {/* Center Signup Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto">
        <div className="p-8 sm:p-10 rounded-sm border border-[#C1440E]/40 bg-[#0c0d12]/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Card Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#C1440E] bg-[#C1440E]/15 text-2xl mb-4 text-[#FF4400] shadow-[0_0_20px_rgba(193,68,14,0.5)]">
              ᚦ
            </div>
            <div className="text-[11px] font-mono tracking-[0.35em] text-[#C1440E] uppercase mb-1">
              CHRONICLE CLAIM
            </div>
            <h1 className="font-cinzel text-3xl font-black tracking-wide text-[#E8E2D6]">
              FORGE YOUR CHRONICLE
            </h1>
            <p className="font-inter text-xs text-[#6B7A8F] mt-2">
              Claim your Spartan handle and launch your personal 3D shareable portfolio.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-sm border border-red-500/50 bg-red-950/30 text-red-200 text-xs font-mono flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7A8F] mb-1.5">
                Warrior Handle (Your Share URL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                  placeholder="e.g. thor or leonidas"
                  className="w-full px-4 py-3 rounded-sm bg-[#0A0A0B] border border-[#E8E2D6]/20 text-[#E8E2D6] font-mono text-sm placeholder-[#6B7A8F]/50 focus:outline-none focus:border-[#C1440E] focus:ring-1 focus:ring-[#C1440E] transition-all"
                />
              </div>
              <p className="text-[10px] font-mono text-[#6B7A8F] mt-1">
                Your portfolio URL will be: <span className="text-[#C1440E]">/u/{username || "handle"}</span>
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7A8F] mb-1.5">
                Dispatch Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="warrior@realm.com"
                className="w-full px-4 py-3 rounded-sm bg-[#0A0A0B] border border-[#E8E2D6]/20 text-[#E8E2D6] font-inter text-sm placeholder-[#6B7A8F]/50 focus:outline-none focus:border-[#C1440E] focus:ring-1 focus:ring-[#C1440E] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7A8F] mb-1.5">
                Passphrase (Min 6 Characters)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-sm bg-[#0A0A0B] border border-[#E8E2D6]/20 text-[#E8E2D6] font-inter text-sm placeholder-[#6B7A8F]/50 focus:outline-none focus:border-[#C1440E] focus:ring-1 focus:ring-[#C1440E] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-3 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-black tracking-[0.25em] uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_30px_rgba(193,68,14,0.7)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>INSCRIBING CHRONICLE...</span>
              ) : (
                <>
                  <span>⚔</span>
                  <span>CLAIM HANDLE & ENTER WAR ROOM</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8E2D6]/10 text-center text-xs font-inter text-[#6B7A8F]">
            Already bear an inscribed seal?{" "}
            <Link
              href="/login"
              className="text-[#C1440E] font-bold hover:underline transition-colors ml-1"
            >
              Enter Citadel (Sign In)
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-center py-4 text-[10px] font-mono text-[#6B7A8F]/60 tracking-widest uppercase">
        MONGODB DYNAMIC DOCUMENT STORAGE // INSTANT LINK GENERATION
      </div>
    </div>
  );
}
