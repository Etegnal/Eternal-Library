'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Music, Plus, Trash2, Edit3, Save, X, ExternalLink, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import Image from 'next/image';
import { getYouTubeId } from '@/components/MiniPlayer';

export interface TrackItem {
  id: string | number;
  title: string;
  artist: string;
  src: string;
  cover?: string | null;
  spotifyUrl: string;
  order?: number;
}

interface AdminTracksManagerProps {
  initialTracks?: TrackItem[];
}

export default function AdminTracksManager({ initialTracks = [] }: AdminTracksManagerProps) {
  const [tracks, setTracks] = useState<TrackItem[]>(initialTracks);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [src, setSrc] = useState('');
  const [cover, setCover] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [order, setOrder] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  const fetchTracks = async () => {
    try {
      const res = await fetch('/api/admin/tracks');
      if (res.ok) {
        const data = await res.json();
        setTracks(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !src.trim()) {
      setMsg({ type: 'error', text: 'Lütfen şarkı adı, sanatçı ve ses dosya yolunu / YouTube linkini eksiksiz girin.' });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      const isEditing = Boolean(editingId);
      const url = isEditing ? `/api/admin/tracks/${editingId}` : '/api/admin/tracks';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist, src, cover, spotifyUrl, order }),
      });

      if (res.ok) {
        setMsg({
          type: 'success',
          text: isEditing ? 'Şarkı başarıyla güncellendi!' : 'Yeni şarkı playlist’e eklendi!',
        });
        resetForm();
        fetchTracks();
        router.refresh();
      } else {
        const err = await res.json();
        setMsg({ type: 'error', text: err.error || 'İşlem sırasında hata oluştu.' });
      }
    } catch (e) {
      console.error(e);
      setMsg({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (track: TrackItem) => {
    setEditingId(track.id);
    setTitle(track.title);
    setArtist(track.artist);
    setSrc(track.src);
    setCover(track.cover || '');
    setSpotifyUrl(track.spotifyUrl || 'https://open.spotify.com');
    setOrder(track.order !== undefined && track.order !== null ? String(track.order) : '');
    setMsg(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setArtist('');
    setSrc('');
    setCover('');
    setSpotifyUrl('');
    setOrder('');
  };

  const handleDelete = async (id: string | number, name: string) => {
    if (!window.confirm(`"${name}" şarkısını playlist'ten silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/tracks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMsg({ type: 'success', text: 'Şarkı silindi.' });
        fetchTracks();
        router.refresh();
      } else {
        setMsg({ type: 'error', text: 'Silinirken hata oluştu.' });
      }
    } catch (e) {
      console.error(e);
      setMsg({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* ADD / EDIT FORM CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900">
              <Music className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#362215]">
                {editingId ? 'Şarkıyı Düzenle' : 'Yeni Müzik / Şarkı Ekle'}
              </h2>
              <p className="text-xs text-[#5C4033]">
                Doğrudan MP3 URL'si veya <strong>YouTube video linki</strong> yapıştırabilirsiniz.
              </p>
            </div>
          </div>

          {editingId && (
            <button
              onClick={resetForm}
              className="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>İptal</span>
            </button>
          )}
        </div>

        {/* NOTIFICATION MSG */}
        {msg && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border border-rose-300 text-rose-900'
            }`}
          >
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Song Title */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Şarkı Eser Başlığı *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Özgürüm, Nocturne in C-Sharp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

            {/* Artist Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Sanatçı / Orkestra *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Haktan Altunkaya, Chopin"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

            {/* Audio Source (src) */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Ses Dosyası veya YouTube URL *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: https://www.youtube.com/watch?v=... veya /audio/..."
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215] font-mono text-xs"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Cover Image */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Kapak Görseli URL (Spotify / Web)
              </label>
              <input
                type="text"
                placeholder="Örn: https://i.scdn.co/image/... (Boşsa YouTube resmi alınır)"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215] font-mono text-xs"
              />
            </div>

            {/* Spotify Link */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Spotify Bağlantı Linki (Opsiyonel)
              </label>
              <input
                type="text"
                placeholder="Örn: https://open.spotify.com/track/..."
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215] font-mono text-xs"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Çalma Sıralaması (Opsiyonel)
              </label>
              <input
                type="number"
                placeholder="Örn: 1, 2, 3..."
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

          </div>

          <p className="text-[11px] text-[#785438] italic font-serif">
            💡 <strong>İpucu:</strong> İndirmekle uğraşmadan doğrudan YouTube video linki (`https://www.youtube.com/watch?v=...`) yapıştırabilirsiniz. Sistem sesi otomatik çalar!
          </p>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center gap-2 border border-amber-500/40 disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Kaydediliyor...' : editingId ? 'Güncellemeyi Kaydet' : 'Şarkıyı Ekle & Kaydet'}</span>
            </button>
          </div>
        </form>

      </div>

      {/* EXISTING TRACKS LIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC]">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-[#9A3412]" />
            <h3 className="font-serif font-bold text-xl text-[#362215]">
              Kayıtlı Playlist Şarkıları ({tracks.length})
            </h3>
          </div>
        </div>

        {tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tracks.map((track) => {
              const ytId = getYouTubeId(track.src);
              const previewCover = track.cover
                ? track.cover
                : ytId
                ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                : null;

              return (
                <div
                  key={track.id}
                  className="p-4 rounded-2xl bg-[#FEFBF3] border border-[#E8DCC4] shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-amber-900/80 border border-amber-700/50 flex-shrink-0 relative overflow-hidden flex items-center justify-center text-amber-100 font-bold">
                      {previewCover ? (
                        <Image src={previewCover} alt={track.title} fill unoptimized className="object-cover" />
                      ) : (
                        <Music className="w-6 h-6 text-amber-300" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#362215] truncate">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#785438] truncate">
                        {track.artist}
                      </p>
                      <p className="text-[10px] font-mono text-stone-500 truncate">
                        {track.src}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors"
                        title="Spotify Bağlantısı"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => startEdit(track)}
                      className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                      title="Düzenle"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(track.id, `${track.artist} - ${track.title}`)}
                      className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-2">
            <p className="text-xs text-[#5C4033] font-serif">
              Henüz şarkı eklenmedi.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
