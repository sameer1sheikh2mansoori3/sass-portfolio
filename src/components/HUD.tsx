"use client";

import { useEffect, useState, useRef } from "react";

export default function HUD() {
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animState, setAnimState] = useState<"idle" | "walk" | "run" | "slash">("idle");
  const [slashTriggered, setSlashTriggered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let lastSlashTimeout: NodeJS.Timeout;

    const handleScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;

      const vel = detail.velocity || 0;
      setVelocity(vel);
      setProgress(Math.round((detail.progress || 0) * 100));

      if (detail.triggerSlash) {
        setSlashTriggered(true);
        setAnimState("slash");
        clearTimeout(lastSlashTimeout);
        lastSlashTimeout = setTimeout(() => {
          setSlashTriggered(false);
        }, 1000);
      } else if (!slashTriggered) {
        if (vel > 0.8) {
          setAnimState("run");
        } else if (vel > 0.05) {
          setAnimState("walk");
        } else {
          setAnimState("idle");
        }
      }
    };

    const handleSlash = () => {
      setSlashTriggered(true);
      setAnimState("slash");
      clearTimeout(lastSlashTimeout);
      lastSlashTimeout = setTimeout(() => {
        setSlashTriggered(false);
      }, 1000);
    };

    window.addEventListener("spartan:scroll", handleScroll as EventListener);
    window.addEventListener("spartan:slash", handleSlash as EventListener);

    return () => {
      window.removeEventListener("spartan:scroll", handleScroll as EventListener);
      window.removeEventListener("spartan:slash", handleSlash as EventListener);
      clearTimeout(lastSlashTimeout);
    };
  }, [slashTriggered]);

  const toggleSound = () => {
    if (!soundOn) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          // Low-frequency atmospheric Norse wind rumble
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(55, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(140, ctx.currentTime);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setSoundOn(true);
        }
      } catch (err) {
        console.warn("Audio unavailable:", err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundOn(false);
    }
  };

  return (
    <>
      {/* Mobile Floating Slash Attack Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden pointer-events-auto">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("spartan:slash"));
          }}
          className="w-14 h-14 rounded-full bg-[#C1440E] text-[#E8E2D6] shadow-[0_0_20px_#C1440E] flex items-center justify-center text-xl font-black active:scale-90 transition-transform border-2 border-[#E8E2D6]/30 cursor-pointer"
          title="Slash"
        >
          ⚔
        </button>
      </div>

      <div className="fixed top-6 right-6 z-50 pointer-events-none hidden md:flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase">
      {/* Spartan Slash Action Button */}
      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent("spartan:slash"));
        }}
        className="pointer-events-auto px-3.5 py-1.5 rounded-full border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] hover:bg-[#C1440E] hover:shadow-[0_0_15px_#C1440E] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 font-bold"
        title="Trigger dual sword slash attack (or press Space / click canvas)"
      >
        <span className="text-[#E8E2D6] animate-pulse">⚔</span>
        <span className="text-[#E8E2D6]">SLASH [SPACE / CLICK]</span>
      </button>

   

    
    </div>
    </>
  );
}
