"use client";

import { useEffect, useState, useRef } from "react";
import CinematicVideoModal from "./CinematicVideoModal";
import { soundFX } from "@/lib/soundFx";

export default function HUD() {
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animState, setAnimState] = useState<"idle" | "walk" | "run" | "slash">("idle");
  const [slashTriggered, setSlashTriggered] = useState(false);
  const [ostPlaying, setOstPlaying] = useState(false);
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);
  const userExplicitlyPausedRef = useRef(false);

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
        soundFX.playSlash();
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
      soundFX.playSlash();
      clearTimeout(lastSlashTimeout);
      lastSlashTimeout = setTimeout(() => {
        setSlashTriggered(false);
      }, 1000);
    };

    const handleOpenCinema = () => setCinemaOpen(true);

    window.addEventListener("spartan:scroll", handleScroll as EventListener);
    window.addEventListener("spartan:slash", handleSlash as EventListener);
    window.addEventListener("spartan:open-cinema", handleOpenCinema as EventListener);

    return () => {
      window.removeEventListener("spartan:scroll", handleScroll as EventListener);
      window.removeEventListener("spartan:slash", handleSlash as EventListener);
      window.removeEventListener("spartan:open-cinema", handleOpenCinema as EventListener);
      clearTimeout(lastSlashTimeout);
    };
  }, [slashTriggered]);

  // Pause background OST when cinematic video modal is open to avoid audio clash
  useEffect(() => {
    if (cinemaOpen) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else if (ostPlaying && !userExplicitlyPausedRef.current) {
      audioRef.current?.play().catch(() => {});
    }
  }, [cinemaOpen, ostPlaying]);

  // Modern browsers require a user interaction before playing audio.
  // On the first interaction (click, key, touch, pointer anywhere on the page), auto-commence the OST.
  useEffect(() => {
    const handleFirstGesture = () => {
      if (userInteractedRef.current || userExplicitlyPausedRef.current) return;
      userInteractedRef.current = true;

      if (audioRef.current && !cinemaOpen) {
        audioRef.current.volume = 0.8;
        audioRef.current
          .play()
          .then(() => {
            setOstPlaying(true);
          })
          .catch((err) => {
            console.warn("Audio autoplay blocked by browser policy:", err);
          });
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("pointerdown", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("pointerdown", handleFirstGesture);
    };
  }, [cinemaOpen]);

  const toggleOstMusic = () => {
    if (!audioRef.current) return;

    if (ostPlaying) {
      audioRef.current.pause();
      userExplicitlyPausedRef.current = true;
      setOstPlaying(false);
    } else {
      userExplicitlyPausedRef.current = false;
      audioRef.current.volume = 0.85;
      audioRef.current
        .play()
        .then(() => setOstPlaying(true))
        .catch((err) => {
          console.warn("Audio play error:", err);
        });
    }
  };

  return (
    <>
      {/* Background God of War OST Audio Player */}
      <audio
        ref={audioRef}
        src="/model/god_of_war_ost.mp3"
        loop
        preload="auto"
        onPlay={() => setOstPlaying(true)}
        onPause={() => setOstPlaying(false)}
      />

      {/* Cinematic Fullscreen Video Modal */}
      <CinematicVideoModal
        isOpen={cinemaOpen}
        onClose={() => setCinemaOpen(false)}
      />

      {/* Floating Prompt Banner when Soundtrack is Not Yet Playing */}
      {!ostPlaying && !cinemaOpen && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
          <button
            onClick={toggleOstMusic}
            className="group px-6 py-3 rounded-full bg-[#C1440E] text-[#E8E2D6] font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_30px_#C1440E] border-2 border-[#E8E2D6]/40 flex items-center gap-3 hover:bg-[#d94d12] hover:scale-105 transition-all cursor-pointer"
            title="Click here to start the God of War soundtrack!"
          >
            <span className="text-base animate-pulse">🔊</span>
            <span className="text-white drop-shadow">CLICK TO PLAY GOD OF WAR OST</span>
            <span className="bg-black/40 px-2.5 py-1 rounded text-[10px] text-[#E8E2D6] font-bold">
              ▶ PLAY
            </span>
          </button>
        </div>
      )}

      {/* Mobile Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden pointer-events-auto flex flex-col gap-3">
        <button
          onClick={toggleOstMusic}
          className={`w-12 h-12 rounded-full text-base font-black active:scale-90 transition-all border cursor-pointer flex items-center justify-center ${
            ostPlaying
              ? "bg-[#C1440E] text-[#E8E2D6] border-[#E8E2D6]/40 shadow-[0_0_15px_#C1440E]"
              : "bg-[#14161f] text-[#6B7A8F] border-[#C1440E]/60 shadow-[0_0_15px_rgba(193,68,14,0.4)]"
          }`}
          title="Toggle God of War OST Soundtrack"
        >
          {ostPlaying ? "🔊" : "🔇"}
        </button>

        <button
          onClick={() => setCinemaOpen(true)}
          className="w-12 h-12 rounded-full bg-[#14161f] text-[#E8E2D6] shadow-[0_0_15px_rgba(193,68,14,0.4)] flex items-center justify-center text-sm font-black active:scale-90 transition-transform border border-[#C1440E]/60 cursor-pointer"
          title="Watch Cinematic OST Video"
        >
          🎬
        </button>

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

      {/* HUD Bar - Positioned cleanly below the Navbar */}
      <div className="fixed top-20 right-4 sm:right-6 lg:right-8 z-50 pointer-events-none flex items-center gap-2.5 text-[10px] font-mono tracking-widest uppercase">
        {/* Spartan Slash Action Button with Sound FX (Desktop & Tablet) */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("spartan:slash"));
          }}
          className="pointer-events-auto hidden sm:flex px-3.5 py-1.5 rounded-full border border-[#C1440E] bg-[#C1440E]/20 text-[#E8E2D6] hover:bg-[#C1440E] hover:shadow-[0_0_15px_#C1440E] active:scale-95 transition-all cursor-pointer items-center gap-1.5 font-bold"
          title="Trigger dual sword slash attack (or press Space / click canvas)"
        >
          <span className="text-[#E8E2D6] animate-pulse">⚔</span>
          <span>SLASH [SPACE / CLICK]</span>
        </button>

        {/* Watch Cinematic Video Button (Desktop & Tablet) */}
        <button
          onClick={() => setCinemaOpen(true)}
          className="pointer-events-auto hidden sm:flex px-3 py-1.5 rounded-full border border-[#C1440E]/50 bg-[#0A0A0B]/85 backdrop-blur-md text-[#E8E2D6] hover:border-[#C1440E] hover:text-[#C1440E] transition-all cursor-pointer items-center gap-1.5"
          title="Watch the God of War OST Cinematic Video"
        >
          <span>🎬</span>
          <span>CINEMA OST</span>
        </button>

        {/* God of War OST Soundtrack Audio Toggle (Always Visible) */}
        <button
          onClick={toggleOstMusic}
          className={`pointer-events-auto px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
            ostPlaying
              ? "border-[#C1440E] bg-[#C1440E]/30 text-[#E8E2D6] shadow-[0_0_15px_#C1440E]"
              : "border-[#C1440E] bg-[#C1440E]/15 text-[#E8E2D6] hover:bg-[#C1440E]/30 animate-pulse shadow-[0_0_10px_rgba(193,68,14,0.4)]"
          }`}
          title={ostPlaying ? "Pause God of War OST" : "Click to Play God of War OST"}
        >
          <span>{ostPlaying ? "🔊" : "🔇"}</span>
          <span>{ostPlaying ? "GOW OST: ON" : "PLAY OST (CLICK)"}</span>
        </button>

        {/* Telemetry Capsule */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#E8E2D6]/15 bg-[#0A0A0B]/85 backdrop-blur-md text-[#E8E2D6] shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="text-[#6B7A8F]">STATE:</span>
            <span
              className={`font-bold transition-colors duration-200 ${
                animState === "slash"
                  ? "text-[#E8E2D6] bg-[#C1440E] px-2 py-0.5 rounded text-[9px] shadow-[0_0_10px_#C1440E]"
                  : animState === "run"
                  ? "text-[#C1440E] font-black"
                  : animState === "walk"
                  ? "text-[#D4AF37]"
                  : "text-[#6B7A8F]"
              }`}
            >
              {animState.toUpperCase()}
            </span>
          </div>

          <span className="text-[#E8E2D6]/20">|</span>

          <div className="flex items-center gap-1">
            <span className="text-[#6B7A8F]">VEL:</span>
            <span className="w-7 text-right font-mono text-[#E8E2D6]">
              {velocity.toFixed(2)}
            </span>
          </div>

          <span className="text-[#E8E2D6]/20 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-[#6B7A8F]">MARCH:</span>
            <span className="w-6 text-right font-mono text-[#C1440E]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
