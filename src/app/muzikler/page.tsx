import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Music, Headphones, Radio } from 'lucide-react';
import { getYouTubeId } from '@/lib/playlist';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.359-.684.475-1.043.257-2.86-1.748-6.462-2.143-10.704-1.171-.407.093-.815-.162-.908-.57-.093-.408.162-.816.57-.909 4.646-1.063 8.625-.615 11.828 1.344.359.218.475.684.257 1.049zm1.474-3.277c-.274.444-.859.587-1.303.313-3.274-2.012-8.266-2.597-12.14-1.419-.501.152-1.031-.131-1.183-.632-.152-.501.131-1.031.632-1.183 4.426-1.344 9.932-.693 13.682 1.616.444.274.587.859.312 1.305zm.143-3.411c-3.924-2.33-10.389-2.545-14.133-1.408-.601.182-1.242-.164-1.424-.765-.182-.601.164-1.242.765-1.424 4.304-1.307 11.442-1.042 15.968 1.644.542.322.722 1.026.4 1.568-.323.542-1.027.722-1.576.401z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default async function MusicPlaylistCatalogPage() {
  let tracks: any[] = [];
  try {
    tracks = await prisma.track.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching tracks for music page:', error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-28 sm:pb-20 space-y-8 sm:space-y-10">
      
      {/* HEADER MATCHING ŞİİRLER PAGE */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200 shadow-sm">
          <Radio className="w-4 h-4 text-cozy-amber" />
          <span>Müzik Antolojisi</span>
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-4xl text-cozy-coffee tracking-tight">
          Ruhun Derinliklerine Dokunan Melodiler
        </h1>

        <p className="text-cozy-coffee-light text-xs sm:text-base leading-relaxed font-serif italic">
          "Ruhun şarkı söylerse, hayat seni dansa kaldırır."
        </p>
      </div>

      {/* TRACKS VERTICAL PLAYLIST TABLE */}
      <main className="w-full">
        {tracks.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-cozy-parchment-border shadow-sm space-y-3 max-w-xl mx-auto">
            <Music className="w-8 h-8 text-cozy-amber mx-auto opacity-80" />
            <p className="text-cozy-coffee font-serif font-bold text-base sm:text-lg">
              Henüz Müzik Eklenmedi
            </p>
            <p className="text-cozy-coffee-light text-xs sm:text-sm font-serif italic">
              Müzik listemiz hazırlanma aşamasındadır. Çok yakında seçkin parçalar burada yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-cozy-parchment-border shadow-md overflow-hidden divide-y divide-amber-100/70">
            
            {/* TABLE HEADER BAR */}
            <div className="px-3 sm:px-6 py-3 bg-[#FAF6EE] flex items-center justify-between text-[11px] sm:text-xs font-bold text-cozy-coffee uppercase tracking-wider border-b border-cozy-parchment-border">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <span className="w-4 sm:w-6 text-center text-cozy-coffee-light/60 shrink-0">#</span>
                <span className="truncate">Şarkı & Sanatçı</span>
              </div>
              <div className="hidden sm:block w-48 sm:w-56 text-left pl-2 font-bold shrink-0">Sanatçı</div>
              <div className="w-24 sm:w-32 text-right pr-1 font-bold shrink-0">Platformlar</div>
            </div>

            {/* TRACK ROWS */}
            {tracks.map((track, index) => {
              const youtubeId = getYouTubeId(track.src);
              const coverUrl = track.cover
                ? track.cover
                : youtubeId
                ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                : null;

              return (
                <div
                  key={track.id}
                  className="px-3 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-4 hover:bg-[#FAF6EE]/80 transition-colors group"
                >
                  {/* LEFT: NUMBER & THUMBNAIL & TITLE (WITH ARTIST SUBTITLE ON MOBILE) */}
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                    <span className="w-4 sm:w-6 text-center text-cozy-coffee-light/60 font-mono text-xs sm:text-sm font-bold shrink-0">
                      {index + 1}
                    </span>

                    {/* COVER THUMBNAIL */}
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-amber-100 border border-amber-200 shrink-0 shadow-sm">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cozy-amber">
                          <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      )}
                    </div>

                    {/* SONG TITLE & MOBILE ARTIST */}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className="font-serif font-bold text-xs sm:text-base text-cozy-coffee group-hover:text-cozy-amber transition-colors truncate leading-tight">
                        {track.title}
                      </h4>
                      {/* ARTIST ON MOBILE */}
                      <p className="sm:hidden text-[11px] text-cozy-coffee-light font-serif flex items-center gap-1 truncate">
                        <Headphones className="w-3 h-3 text-cozy-amber shrink-0" />
                        <span className="truncate">{track.artist}</span>
                      </p>
                    </div>
                  </div>

                  {/* MIDDLE: DESKTOP ARTIST NAME */}
                  <div className="hidden sm:flex w-48 sm:w-56 text-left pl-2 shrink-0 min-w-0">
                    <p className="text-xs sm:text-sm text-cozy-coffee-light font-serif font-medium truncate flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-cozy-amber shrink-0" />
                      <span className="truncate">{track.artist}</span>
                    </p>
                  </div>

                  {/* RIGHT: PLATFORM ICON BUTTONS (SPOTIFY & YOUTUBE) */}
                  <div className="w-24 sm:w-32 flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
                    {/* SPOTIFY ICON BUTTON */}
                    {track.spotifyUrl ? (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 shrink-0"
                        title="Spotify'da Dinle"
                        aria-label="Spotify'da Dinle"
                      >
                        <SpotifyIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                    ) : null}

                    {/* YOUTUBE ICON BUTTON */}
                    {track.src ? (
                      <a
                        href={track.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF0000] hover:bg-[#cc0000] text-white flex items-center justify-center transition-all shadow-sm hover:scale-110 shrink-0"
                        title="YouTube'da İzle / Dinle"
                        aria-label="YouTube'da İzle / Dinle"
                      >
                        <YouTubeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
