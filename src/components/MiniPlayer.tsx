'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Play, Pause, SkipForward, SkipBack, Music, ChevronRight } from 'lucide-react';
import { Track } from '@/lib/playlist';

// Helper to extract YouTube video ID from various YouTube URL formats
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function SpotifyIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.359-.684.475-1.043.257-2.86-1.748-6.462-2.143-10.704-1.171-.407.093-.815-.162-.908-.57-.093-.408.162-.816.57-.909 4.646-1.063 8.625-.615 11.828 1.344.359.218.475.684.257 1.049zm1.474-3.277c-.274.444-.859.587-1.303.313-3.274-2.012-8.266-2.597-12.14-1.419-.501.152-1.031-.131-1.183-.632-.152-.501.131-1.031.632-1.183 4.426-1.344 9.932-.693 13.682 1.616.444.274.587.859.312 1.305zm.143-3.411c-3.924-2.33-10.389-2.545-14.133-1.408-.601.182-1.242-.164-1.424-.765-.182-.601.164-1.242.765-1.424 4.304-1.307 11.442-1.042 15.968 1.644.542.322.722 1.026.4 1.568-.323.542-1.027.722-1.576.401z" />
    </svg>
  );
}

export default function MiniPlayer() {
  const pathname = usePathname();
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.75);
  const [isMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasUserPaused, setHasUserPaused] = useState(false);
  const [hasLoadedPlaylist, setHasLoadedPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const isHomepage = pathname === '/';
  const currentTrack = playlist[currentIndex];

  const youtubeId = currentTrack ? getYouTubeId(currentTrack.src) : null;
  const coverUrl = currentTrack?.cover
    ? currentTrack.cover
    : youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : null;

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
      stopAudioEngine();
    } else {
      // Only auto-play if user has NOT explicitly paused the audio
      if (hasLoadedPlaylist && playlist.length > 0 && !hasUserPaused) {
        playAudioEngine();
      }
    }
  }, [pathname, hasLoadedPlaylist, currentIndex, playlist, hasUserPaused]);

  // Sync volume changes to audio engines
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;

    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
    }

    if (youtubeId && iframeRef.current && iframeRef.current.contentWindow) {
      const ytVolume = Math.round(targetVolume * 100);
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [ytVolume] }),
        '*'
      );
    }
  }, [volume, isMuted, youtubeId]);

  const playAudioEngine = () => {
    if (isHomepage || !currentTrack) return;

    if (youtubeId) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
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

  const stopAudioEngine = () => {
    if (youtubeId && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setHasUserPaused(true);
      stopAudioEngine();
    } else {
      setHasUserPaused(false);
      playAudioEngine();
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    setHasUserPaused(false);
    const nextIdx = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIdx);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    setHasUserPaused(false);
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIdx);
  };

  const handleTrackEnded = () => {
    nextTrack();
  };

  // Hide MiniPlayer on homepage or when playlist is empty
  if (isHomepage || !currentTrack || playlist.length === 0) {
    return null;
  }

  // COLLAPSED COMPACT SPOTIFY FLOATING BUTTON
  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-fadeIn">
        {/* Audio Engines (Kept mounted so audio keeps playing in background) */}
        {!youtubeId && (
          <audio
            ref={audioRef}
            src={currentTrack.src}
            onEnded={handleTrackEnded}
            preload="auto"
          />
        )}
        {youtubeId && (
          <iframe
            ref={iframeRef}
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&controls=0`}
            allow="autoplay"
          />
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] rounded-2xl bg-[#120e0b]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 text-stone-300 hover:text-amber-200 shadow-2xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          title="Müzik Çaları Genişlet"
          aria-label="Müzik Çaları Genişlet"
        >
          <SpotifyIcon
            style={{ animation: isPlaying ? 'spin 8s linear infinite' : 'none' }}
            className="w-5 h-5 text-stone-300 group-hover:text-[#1DB954] transition-colors"
          />
        </button>
      </div>
    );
  }

  // FULL EXPANDED MINIPLAYER BAR (Strictly Fixed Dimensions)
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 animate-fadeIn">
      
      {/* HTML5 Audio for Direct MP3s */}
      {!youtubeId && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onEnded={handleTrackEnded}
          preload="auto"
        />
      )}

      {/* Hidden YouTube IFrame Audio Engine */}
      {youtubeId && (
        <iframe
          ref={iframeRef}
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&controls=0`}
          allow="autoplay"
        />
      )}

      {/* Glassmorphism & Glow Container with Perfectly Fitted Dimensions */}
      <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 pr-3 bg-[#120e0b]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 rounded-2xl shadow-2xl shadow-black/60 transition-all duration-300 group shrink-0">
        
        {/* Far Left Collapse Arrow Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-lg text-stone-400 hover:text-amber-200 hover:bg-amber-500/10 transition-colors shrink-0"
          title="Müzik Çaları Küçült"
          aria-label="Müzik Çaları Küçült"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Strictly Fixed Vinyl Record Disc Container */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full overflow-hidden border border-amber-900/40 shrink-0 aspect-square bg-amber-950 flex items-center justify-center shadow-inner">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={currentTrack.title}
              fill
              unoptimized
              className={`object-cover ${isPlaying ? 'animate-vinyl-spin' : 'animate-vinyl-spin-paused'}`}
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br from-amber-900 to-amber-950 flex items-center justify-center text-amber-200 ${
                isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
              }`}
            >
              <Music className="w-5 h-5 text-amber-300" />
            </div>
          )}
        </div>

        {/* Track Title, Artist & Equalizer (Zero layout shift, responsive max-width) */}
        <div className="min-w-0 max-w-[85px] sm:max-w-[125px] flex-1 space-y-0.5 pr-1">
          <div className="flex items-center gap-1">
            <h4 className="text-xs font-serif font-medium text-amber-100 truncate flex-1">
              {currentTrack.title}
            </h4>

            {/* Equalizer Barmeter (Reserved DOM slot prevents text shifting) */}
            <div
              className={`flex items-end gap-[2px] h-3 w-3 shrink-0 transition-opacity duration-200 ${
                isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              title="Çalıyor"
            >
              <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? 'animate-[bounce_0.8s_ease-in-out_infinite]' : 'h-1'}`} />
              <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? 'animate-[bounce_0.6s_ease-in-out_0.2s_infinite]' : 'h-1'}`} />
              <span className={`w-[2px] bg-amber-400 rounded-full ${isPlaying ? 'animate-[bounce_0.9s_ease-in-out_0.4s_infinite]' : 'h-1'}`} />
            </div>
          </div>

          <span className="text-[10px] text-stone-400 truncate block font-sans">
            {currentTrack.artist}
          </span>
        </div>

        {/* Controls Row: Prev, Play/Pause, Next & Spotify */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Previous Track Button */}
          <button
            type="button"
            onClick={prevTrack}
            className="w-7 h-7 rounded-full hover:bg-amber-500/20 text-stone-400 hover:text-amber-200 flex items-center justify-center transition-colors min-w-[28px] min-h-[28px]"
            title="Önceki Şarkı"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

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
          <button
            type="button"
            onClick={nextTrack}
            className="w-7 h-7 rounded-full hover:bg-amber-500/20 text-stone-400 hover:text-amber-200 flex items-center justify-center transition-colors min-w-[28px] min-h-[28px]"
            title="Sonraki Şarkı"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Spotify Direct Link */}
          {currentTrack.spotifyUrl && (
            <a
              href={currentTrack.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-stone-400 hover:text-[#1DB954] transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center ml-0.5"
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
