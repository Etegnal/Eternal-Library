'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Flame } from 'lucide-react';

export default function AmbientAudio() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Pause fireplace audio when navigating away from homepage
  useEffect(() => {
    if (!isHomepage && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  }, [pathname, isHomepage, isPlaying]);

  const toggleSound = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      // Try playing audio asset first
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to Web Audio synthesis
          initWebAudio();
          setIsPlaying(true);
        });
      } else {
        initWebAudio();
        setIsPlaying(true);
      }
    }
  };

  const initWebAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        if (Math.random() < 0.003) {
          output[i] = (Math.random() * 2 - 1) * 0.8;
        } else {
          output[i] = (Math.random() * 2 - 1) * 0.06;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
    } catch (e) {
      console.warn("Web Audio API fallback initialized", e);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  // Hide fireplace widget completely on non-homepage routes
  if (!isHomepage) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/fireplace.webm" type="audio/webm" />
        <source src="/assets/fireplace.mp3" type="audio/mpeg" />
      </audio>

      {/* MOBILE COMPACT CIRCULAR ICON BUTTON (sm:hidden) */}
      <button
        type="button"
        onClick={toggleSound}
        className="sm:hidden w-12 h-12 rounded-full bg-[#23120A]/95 backdrop-blur-md border-2 border-amber-500/60 shadow-fire flex items-center justify-center text-amber-100 active:scale-95 transition-transform"
        title={isPlaying ? "Şömine Sesini Kapat" : "Şömine Sesini Aç"}
        aria-label={isPlaying ? "Şömine Sesini Kapat" : "Şömine Sesini Aç"}
      >
        <Flame className={`w-6 h-6 ${isPlaying ? "text-amber-400 animate-pulse" : "text-amber-200/40"}`} />
      </button>

      {/* DESKTOP FULL CONTROLS WIDGET (hidden sm:flex) */}
      <div className="hidden sm:flex items-center gap-3 bg-[#23120A]/90 backdrop-blur-md text-amber-100 p-2.5 px-4 rounded-full border border-amber-600/40 shadow-2xl">
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 text-xs font-bold tracking-wide hover:text-amber-300 transition-colors"
          title={isPlaying ? "Şömine Sesini Kapat" : "Şömine Sesini Aç"}
        >
          <Flame className={`w-4 h-4 ${isPlaying ? "text-amber-400 animate-pulse" : "text-amber-200/40"}`} />
          <span>{isPlaying ? "Şömine Sesi Açık" : "Şömine Sesi"}</span>
        </button>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-400 cursor-pointer" onClick={toggleSound} />
        ) : (
          <VolumeX className="w-4 h-4 text-amber-200/50 cursor-pointer" onClick={toggleSound} />
        )}

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 accent-amber-500 h-1.5 bg-amber-950 rounded-lg cursor-pointer"
          title="Ses Seviyesi"
        />
      </div>
    </div>
  );
}
