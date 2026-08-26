'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Play, Pause, SkipForward, Music } from 'lucide-react';
import { Track } from '@/lib/playlist';

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.359-.684.475-1.043.257-2.86-1.748-6.462-2.143-10.704-1.171-.407.093-.815-.162-.908-.57-.093-.408.162-.816.57-.909 4.646-1.063 8.625-.615 11.828 1.344.359.218.475.684.257 1.049zm1.474-3.277c-.274.444-.859.587-1.303.313-3.274-2.012-8.266-2.597-12.14-1.419-.501.152-1.031-.131-1.183-.632-.152-.501.131-1.031.632-1.183 4.426-1.344 9.932-.693 13.682 1.616.444.274.587.859.312 1.305zm.143-3.411c-3.924-2.33-10.389-2.545-14.133-1.408-.601.182-1.242-.164-1.424-.765-.182-.601.164-1.242.765-1.424 4.304-1.307 11.442-1.042 15.968 1.644.542.322.722 1.026.4 1.568-.323.542-1.027.722-1.576.401z" />
    </svg>
  );
}

export default function MiniPlayer() {
  const pathname = usePathname();
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoadedPlaylist, setHasLoadedPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isHomepage = pathname === '/';
  const currentTrack = playlist[currentIndex];

  // Fetch playlist dynamically from API
  useEffect(() => {
    fetch('/api/tracks', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlaylist(data);
          setCurrentIndex(0);
        }
        setHasLoadedPlaylist(true);
      })
      .catch(() => {
        setHasLoadedPlaylist(true);
      });
  }, []);

  // Handle route change & play/stop behavior
  useEffect(() => {
    if (isHomepage || !currentTrack) {
      stopAudio();
    } else {
      if (hasLoadedPlaylist && playlist.length > 0) {
        playAudio();
      }
    }
  }, [pathname, hasLoadedPlaylist, currentIndex, playlist]);

  const playAudio = () => {
    if (isHomepage || !currentTrack) return;

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIdx);
  };

  const handleTrackEnded = () => {
    nextTrack();
  };

  // Hide MiniPlayer on homepage or when playlist is empty
  if (isHomepage || !currentTrack || playlist.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 animate-fadeIn">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleTrackEnded}
        preload="auto"
      />

      {/* Glassmorphism & Glow Container */}
      <div className="flex items-center gap-3.5 p-2.5 pr-4 bg-[#120e0b]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 rounded-2xl shadow-2xl shadow-black/60 transition-all duration-300 group">
        
        {/* Album / Vinyl Cover with Rotation */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-900/40 flex-shrink-0 bg-amber-950 flex items-center justify-center">
          {currentTrack.cover ? (
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              className={`object-cover transition-transform ${
                isPlaying ? 'animate-[spin_10s_linear_infinite]' : '[animation-play-state:paused]'
              }`}
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-amber-200 transition-transform ${
                isPlaying ? 'animate-[spin_10s_linear_infinite]' : '[animation-play-state:paused]'
              }`}
            >
              <Music className="w-5 h-5 text-amber-300" />
            </div>
          )}
        </div>

        {/* Track Title, Artist & Animated Equalizer */}
        <div className="min-w-0 flex-1 space-y-0.5 pr-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-serif font-medium text-amber-100 max-w-[120px] sm:max-w-[150px] truncate">
              {currentTrack.title}
            </h4>

            {/* Animated Equalizer Barmeter */}
            {isPlaying && (
              <div className="flex items-end gap-[2px] h-3 shrink-0" title="Çalıyor">
                <span className="w-[2.5px] bg-amber-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" />
                <span className="w-[2.5px] bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_0.2s_infinite]" />
                <span className="w-[2.5px] bg-amber-400 rounded-full animate-[bounce_0.9s_ease-in-out_0.4s_infinite]" />
              </div>
            )}
          </div>

          <span className="text-[10px] text-stone-400 max-w-[120px] sm:max-w-[150px] truncate block font-sans">
            {currentTrack.artist}
          </span>
        </div>

        {/* Controls: Play/Pause, Next & Spotify */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          
          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 flex items-center justify-center transition-colors min-w-[32px] min-h-[32px]"
            title={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-amber-300" />
            ) : (
              <Play className="w-4 h-4 fill-amber-300 ml-0.5" />
            )}
          </button>

          {/* Next Track Button */}
          {playlist.length > 1 && (
            <button
              type="button"
              onClick={nextTrack}
              className="w-7 h-7 rounded-full hover:bg-amber-500/20 text-stone-400 hover:text-amber-200 flex items-center justify-center transition-colors min-w-[28px] min-h-[28px]"
              title="Sonraki Şarkı"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          )}

          {/* Spotify Direct Link */}
          {currentTrack.spotifyUrl && (
            <a
              href={currentTrack.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-stone-400 hover:text-[#1DB954] transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
              title="Spotify'da Dinle"
            >
              <SpotifyIcon className="w-4 h-4" />
            </a>
          )}

        </div>

      </div>
    </div>
  );
}
