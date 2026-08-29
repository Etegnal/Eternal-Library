import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Music, ExternalLink, Headphones, Radio } from 'lucide-react';
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
    <div className="relative min-h-screen bg-[#1C0E07] text-amber-100 flex flex-col font-sans">
      
      {/* HERO HEADER */}
      <section className="relative pt-36 pb-10 px-4 sm:px-8 bg-gradient-to-b from-[#190B05] via-[#241108] to-[#1C0E07] text-amber-100 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Müzik & Ambiyans Seçkisi</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
            Ruhun Derinliklerine Dokunan Melodiler
          </h1>

          <p className="text-sm sm:text-base text-amber-200/90 max-w-2xl mx-auto font-serif italic leading-relaxed">
            Kitap okurken, denemelerimizi incelerken veya gece huzurla dinlenirken sizlere eşlik edecek özel mûsıkî parçaları ve film müzikleri.
          </p>
        </div>
      </section>

      {/* TRACKS VERTICAL PLAYLIST TABLE */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-8 py-8 w-full">
        {tracks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#2A160A]/80 border border-dashed border-amber-800/60 shadow-2xl space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-950/80 flex items-center justify-center mx-auto text-amber-300 border border-amber-600/40 shadow-sm">
              <Music className="w-8 h-8 text-amber-400" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-white">
              Henüz Müzik Eklenmedi
            </h3>

            <p className="text-sm text-amber-200/80 font-serif italic leading-relaxed">
              Müzik listemiz hazırlanma aşamasındadır. Çok yakında yönetici paneli üzerinden eklenen seçkin parçalar burada yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#2A160A]/95 border border-amber-800/50 shadow-2xl overflow-hidden divide-y divide-amber-900/40">
            
            {/* TABLE HEADER BAR */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#190B05]/95 flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-amber-800/50">
              <div className="flex items-center gap-4 flex-1">
                <span className="w-6 text-center text-amber-400/60">#</span>
                <span>Şarkı & Sanatçı</span>
              </div>
              <div className="hidden md:block w-40 text-center">Kategori</div>
              <div className="w-36 text-right pr-2">Spotify Linki</div>
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
                  className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[#341B0D]/80 transition-colors group"
                >
                  {/* LEFT: NUMBER & THUMBNAIL & INFO */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <span className="w-6 text-center text-amber-300/60 font-mono text-xs sm:text-sm font-bold shrink-0">
                      {index + 1}
                    </span>

                    {/* COVER THUMBNAIL */}
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-amber-950 border border-amber-800/50 shrink-0 shadow-md">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-400">
                          <Music className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* TITLE & ARTIST */}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors truncate">
                        {track.title}
                      </h4>
                      <p className="text-xs text-amber-200/70 truncate flex items-center gap-1 mt-0.5">
                        <Headphones className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{track.artist}</span>
                      </p>
                    </div>
                  </div>

                  {/* MIDDLE: CATEGORY BADGE */}
                  <div className="hidden md:flex w-40 justify-center shrink-0">
                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/50">
                      {track.category || 'Müzik Seçkisi'}
                    </span>
                  </div>

                  {/* RIGHT: SPOTIFY LINK BUTTON */}
                  <div className="w-36 flex justify-end shrink-0">
                    {track.spotifyUrl ? (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-600/50 transition-all flex items-center gap-1.5 shadow-sm group/spot hover:scale-105"
                        title="Spotify'da Aç"
                      >
                        <SpotifyIcon className="w-4 h-4 text-[#1DB954] group-hover/spot:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Spotify</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400/80" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-amber-200/50 italic pr-2">
                        Bağlantı Yok
                      </span>
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
