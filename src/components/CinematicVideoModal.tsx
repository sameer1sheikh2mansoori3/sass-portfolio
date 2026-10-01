"use client";

import React, { useRef, useState, useEffect } from "react";

interface CinematicVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CinematicVideoModal({
  isOpen,
  onClose,
}: CinematicVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.volume = volume;
        videoRef.current.muted = false;

        // Try playing unmuted first
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn(
              "Browser blocked unmuted video autoplay. Falling back to muted playback with unmute prompt:",
              err
            );
            // Browser Autoplay Policy requires muted on first automatic play
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  const unmuteAndPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = volume || 1;
    setIsMuted(false);
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn("Play error:", err));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      // Whenever user clicks play directly, ensure sound is enabled
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    if (!nextMuted) {
      videoRef.current.volume = volume || 1;
    }
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      const muted = val === 0;
      videoRef.current.muted = muted;
      setIsMuted(muted);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Cinema Modal Container */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0c0d12] border-2 border-[#C1440E] rounded-sm shadow-[0_0_60px_rgba(193,68,14,0.6)] overflow-hidden flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#18110c] via-[#0A0A0B] to-[#18110c] border-b border-[#C1440E]/40">
          <div className="flex items-center gap-3">
            <span className="text-[#C1440E] text-base animate-pulse">⚔</span>
            <span className="font-cinzel text-xs sm:text-sm font-black tracking-widest text-[#E8E2D6] uppercase">
              GOD OF WAR // OFFICIAL SOUNDTRACK CINEMATIC
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#E8E2D6]/20 bg-[#0A0A0B] hover:border-[#C1440E] hover:text-[#C1440E] text-[#E8E2D6] text-xs font-mono flex items-center justify-center transition-all cursor-pointer"
            title="Close Cinema Mode"
          >
            ✕
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            controls
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          >
            <source src="/model/god_of_war_ost.mp4" type="video/mp4" />
            <source src="/video/god_of_war_ost.mp4" type="video/mp4" />
          </video>

          {/* Unmute Prompt Banner if browser muted autoplay */}
          {isMuted && (
            <button
              onClick={unmuteAndPlay}
              className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-[#C1440E] text-[#E8E2D6] font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_#C1440E] animate-bounce cursor-pointer flex items-center gap-2 hover:bg-[#d94d12] transition-colors"
              title="Browser muted audio on start — click here to play full God of War soundtrack!"
            >
              <span>🔇</span>
              <span>MUTED BY BROWSER — CLICK TO UNMUTE SOUND 🔊</span>
            </button>
          )}

          {/* Center Play Button Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C1440E]/90 text-[#E8E2D6] text-2xl flex items-center justify-center shadow-[0_0_30px_#C1440E] hover:scale-110 transition-transform cursor-pointer"
            >
              ▶
            </button>
          )}

          {/* Timeline Scrub Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#0A0A0B]/80 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-[#C1440E] to-[#FF5500] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#0A0A0B] border-t border-[#E8E2D6]/10 text-xs font-mono gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="px-3.5 py-1.5 rounded-sm border border-[#E8E2D6]/20 bg-[#14161f] text-[#E8E2D6] hover:border-[#C1440E] hover:text-[#C1440E] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{isPlaying ? "⏸ PAUSE" : "▶ PLAY"}</span>
            </button>

            <button
              onClick={toggleMute}
              className={`px-3.5 py-1.5 rounded-sm border transition-all cursor-pointer flex items-center gap-1.5 ${
                isMuted
                  ? "border-[#C1440E] bg-[#C1440E]/30 text-[#E8E2D6] font-bold shadow-[0_0_10px_#C1440E]"
                  : "border-[#E8E2D6]/20 bg-[#14161f] text-[#E8E2D6] hover:border-[#C1440E] hover:text-[#C1440E]"
              }`}
            >
              <span>{isMuted ? "🔇 UNMUTE SOUND" : "🔊 MUTE"}</span>
            </button>

            {/* Volume Range Slider */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <span className="text-[10px] text-[#6B7A8F]">VOL:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-[#C1440E] cursor-pointer"
                title="Adjust Volume"
              />
            </div>
          </div>

          <div className="text-[11px] text-[#6B7A8F] tracking-widest">
            AUTHENTIC GOD OF WAR OST // 4:07 MIN
          </div>
        </div>
      </div>
    </div>
  );
}
