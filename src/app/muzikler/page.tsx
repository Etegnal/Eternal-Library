import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Music, Headphones, Disc } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-28 sm:pb-20 space-y-10">
      
      {/* VINYL COLLECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200 shadow-sm">
          <Disc className="w-4 h-4 text-cozy-amber animate-spin-slow" />
          <span>Plak Antolojisi</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-cozy-coffee tracking-tight">
          Nadide Plaklar Seçkisi
        </h1>

        <p className="text-cozy-coffee-light text-sm sm:text-base leading-relaxed font-serif italic">
          "Plağın iğneyle buluştuğu o ilk an, zamanın durduğu andır."
        </p>
      </div>

      {/* VINYL COLLECTION CARDS */}
      <main className="w-full">
        {tracks.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-cozy-parchment-border shadow-sm space-y-3 max-w-xl mx-auto">
            <Disc className="w-10 h-10 text-cozy-amber mx-auto opacity-80 animate-spin-slow" />
            <p className="text-cozy-coffee font-serif font-bold text-base sm:text-lg">
              Koleksiyonda Henüz Plak Bulunmuyor
            </p>
            <p className="text-cozy-coffee-light text-xs sm:text-sm font-serif italic">
              Kütüphane plak arşivimiz hazırlanma aşamasındadır. Yakında nadide eserler burada sergilenecektir.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
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
                  className="group relative rounded-2xl bg-white border border-cozy-parchment-border p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 overflow-hidden"
                >
                  {/* VINYL SLEEVE & SPINNING VINYL DISK ASSEMBLY */}
                  <div className="relative flex items-center shrink-0 w-28 sm:w-36 h-24 sm:h-28 my-auto">
                    
                    {/* PHYSICAL VINYL RECORD (SLIDES OUT ON HOVER) */}
                    <div className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-stone-950 via-zinc-900 to-stone-800 border-4 border-zinc-950 shadow-2xl flex items-center justify-center transition-all duration-500 ease-out group-hover:translate-x-6 sm:group-hover:translate-x-8 group-hover:rotate-[180deg] z-0">
                      {/* VINYL GROOVES */}
                      <div className="absolute inset-1 rounded-full border border-zinc-700/30" />
                      <div className="absolute inset-2.5 rounded-full border border-zinc-700/20" />
                      <div className="absolute inset-4 rounded-full border border-zinc-700/20" />
                      
                      {/* SHINE REFLECTION */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                      {/* VINYL CENTER LABEL STICKER */}
                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-800 border-2 border-amber-600/60 overflow-hidden flex items-center justify-center shadow-inner shrink-0">
                        {coverUrl ? (
                          <img src={coverUrl} alt="Label" className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <Disc className="w-3 h-3 text-amber-200" />
                        )}
                        {/* CENTER SPINDLE HOLE */}
                        <div className="absolute w-2 h-2 rounded-full bg-zinc-950 border border-zinc-800" />
                      </div>
                    </div>

                    {/* ALBUM JACKET / VINYL SLEEVE COVER */}
                    <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-amber-900/30 bg-[#1C0E07] shadow-md shadow-amber-950/20 shrink-0 group-hover:shadow-lg transition-all duration-300">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={track.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cozy-amber bg-[#1F0F07]">
                          <Music className="w-6 h-6 opacity-70" />
                        </div>
                      )}
                      
                      {/* VINTAGE SHEEN OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none" />
                    </div>

                  </div>

                  {/* TRACK DETAILS */}
                  <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5 pr-1">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-cozy-coffee group-hover:text-cozy-amber transition-colors leading-snug break-words">
                      {track.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-cozy-coffee-light font-serif flex items-start sm:items-center gap-1.5 leading-tight break-words">
                      <Headphones className="w-3.5 h-3.5 text-cozy-amber shrink-0 mt-0.5 sm:mt-0" />
                      <span>{track.artist}</span>
                    </p>
                  </div>

                  {/* PLATFORM ICON BUTTONS */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-100/80 hover:bg-[#1DB954] border border-amber-200/90 hover:border-emerald-500 text-cozy-coffee hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 shrink-0 group/spot"
                        title="Spotify'da Dinle"
                        aria-label="Spotify'da Dinle"
                      >
                        <SpotifyIcon className="w-4 h-4 text-[#5C4033] group-hover/spot:text-white transition-colors" />
                      </a>
                    )}

                    {track.src && (
                      <a
                        href={track.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-100/80 hover:bg-[#C4302B] border border-amber-200/90 hover:border-red-700 text-cozy-coffee hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 shrink-0 group/yt"
                        title="YouTube'da İzle / Dinle"
                        aria-label="YouTube'da İzle / Dinle"
                      >
                        <YouTubeIcon className="w-4 h-4 text-[#5C4033] group-hover/yt:text-white transition-colors" />
                      </a>
                    )}
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
