'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/fireplace.webm" type="audio/webm" />
        <source src="/assets/fireplace.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-3 bg-[#23120A]/90 backdrop-blur-md text-amber-100 p-2.5 px-4 rounded-full border border-amber-600/40 shadow-2xl">
        <button
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
