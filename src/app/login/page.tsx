"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Failed to transmit credentials. Check network.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#E8E2D6] flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(193,68,14,0.15),transparent_70%)]" />

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
          GATEWAY // SECURE
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto">
        <div className="p-8 sm:p-10 rounded-sm border border-[#C1440E]/40 bg-[#0c0d12]/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Card Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#C1440E] bg-[#C1440E]/15 text-2xl mb-4 text-[#FF4400] shadow-[0_0_20px_rgba(193,68,14,0.5)]">
              ⚔
            </div>
            <div className="text-[11px] font-mono tracking-[0.35em] text-[#C1440E] uppercase mb-1">
              AUTHENTICATION
            </div>
            <h1 className="font-cinzel text-3xl font-black tracking-wide text-[#E8E2D6]">
              ENTER THE WAR ROOM
            </h1>
            <p className="font-inter text-xs text-[#6B7A8F] mt-2">
              Prove your identity to access and govern your chronicle.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-sm border border-red-500/50 bg-red-950/30 text-red-200 text-xs font-mono flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7A8F] mb-2">
                Warrior Handle or Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. kratos or warrior@realm.com"
                className="w-full px-4 py-3 rounded-sm bg-[#0A0A0B] border border-[#E8E2D6]/20 text-[#E8E2D6] font-inter text-sm placeholder-[#6B7A8F]/50 focus:outline-none focus:border-[#C1440E] focus:ring-1 focus:ring-[#C1440E] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B7A8F] mb-2">
                Cipher Passphrase
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
              className="w-full py-4 mt-2 bg-[#C1440E] text-[#E8E2D6] font-cinzel text-xs font-black tracking-[0.25em] uppercase rounded-sm hover:bg-[#d94d12] hover:shadow-[0_0_30px_rgba(193,68,14,0.7)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>DECIPHERING SEAL...</span>
              ) : (
                <>
                  <span>⚔</span>
                  <span>UNSEAL WAR ROOM</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8E2D6]/10 text-center text-xs font-inter text-[#6B7A8F]">
            Have not yet claimed a chronicle?{" "}
            <Link
              href="/signup"
              className="text-[#C1440E] font-bold hover:underline transition-colors ml-1"
            >
              Inscribe New Seal (Sign Up)
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-center py-4 text-[10px] font-mono text-[#6B7A8F]/60 tracking-widest uppercase">
        MONGODB MULTI-TENANT ARCHITECTURE // AES-SALTED AUTH
      </div>
    </div>
  );
}
