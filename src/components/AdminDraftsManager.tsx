'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, CheckCircle, Rocket, Eye, Sparkles, Star, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface DraftBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  category: string;
  summary: string;
  rating: number;
  coverUrl: string;
  isPublished: boolean;
}

export default function AdminDraftsManager() {
  const [drafts, setDrafts] = useState<DraftBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [isPublishingAll, setIsPublishingAll] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchDrafts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/books/drafts', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDrafts(data.drafts || []);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handlePublishSingle = async (id: string, title: string) => {
    try {
      setPublishingId(id);
      setStatusMessage(null);

      const res = await fetch('/api/admin/books/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish', id }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: `"${title}" canlıya alındı!` });
        setDrafts((prev) => prev.filter((b) => b.id !== id));
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Yayınlama hatası' });
      }
    } catch (error) {
      console.error('Error publishing book:', error);
      setStatusMessage({ type: 'error', text: 'Bağlantı hatası oluştu' });
    } finally {
      setPublishingId(null);
    }
  };

  const handlePublishAll = async () => {
    try {
      setIsPublishingAll(true);
      setStatusMessage(null);

      const res = await fetch('/api/admin/books/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish_all' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: 'Tüm Zaman Çarkı serisi canlıya alındı!' });
        setDrafts([]);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Yayınlama hatası' });
      }
    } catch (error) {
      console.error('Error publishing all books:', error);
      setStatusMessage({ type: 'error', text: 'Bağlantı hatası oluştu' });
    } finally {
      setIsPublishingAll(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-fire">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6D7BC] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-5 h-5 text-[#9A3412]" />
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#362215]">
              Yayına Hazır Taslak Eserler (Zaman Çarkı Serisi)
            </h2>
          </div>
          <p className="text-xs text-[#5C4033] font-sans">
            Hazırlanmış 14 Zaman Çarkı kitabını buradan inceleyebilir, kontrol ettikten sonra tek tıkla canlıya alabilirsiniz.
          </p>
        </div>

        {drafts.length > 0 && (
          <button
            onClick={handlePublishAll}
            disabled={isPublishingAll}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-emerald-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-500/40 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Rocket className="w-4 h-4 text-emerald-300" />
            <span>{isPublishingAll ? 'Yayınlanıyor...' : `Tümünü Canlıya Al (${drafts.length} Kitap)`}</span>
          </button>
        )}
      </div>

      {/* STATUS NOTIFICATION */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* DRAFTS LIST */}
      {isLoading ? (
        <div className="text-center py-12 text-stone-400 font-serif italic text-sm animate-pulse">
          Taslak kitaplar yükleniyor...
        </div>
      ) : drafts.length === 0 ? (
        <div className="p-8 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-serif font-bold text-base text-emerald-900">
            Yayına Hazır Bekleyen Taslak Bulunmuyor!
          </h3>
          <p className="text-xs text-emerald-700 font-sans">
            Tüm Zaman Çarkı kitapları başarıyla canlıya alındı veya yeni taslak henüz eklenmedi.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {drafts.map((book, index) => (
            <div
              key={book.id}
              className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-xs flex flex-col md:flex-row gap-5 items-start transition-all hover:border-amber-300"
            >
              {/* COVER IMAGE */}
              <div className="relative w-32 h-48 rounded-xl overflow-hidden shrink-0 bg-amber-950 border border-amber-300 shadow-md self-center md:self-start">
                <Image src={book.coverUrl} alt={book.title} fill unoptimized className="object-cover" />
              </div>

              {/* DETAILS */}
              <div className="flex-1 space-y-3 min-w-0 w-full">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Kitap #{index + 1}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#362215] mt-1">
                      {book.title}
                    </h3>
                    <p className="text-xs font-serif italic text-amber-900">
                      Yazar: {book.author}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePublishSingle(book.id, book.title)}
                    disabled={publishingId === book.id}
                    className="px-4 py-2 rounded-xl bg-[#78350F] hover:bg-[#5C2E0B] text-amber-100 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 border border-amber-600/40 cursor-pointer disabled:opacity-50 shrink-0 self-start sm:self-auto"
                  >
                    <Rocket className="w-3.5 h-3.5 text-amber-300" />
                    <span>{publishingId === book.id ? 'Yayınlanıyor...' : 'Yayınla (Canlıya Al)'}</span>
                  </button>
                </div>

                {/* METADATA BADGES */}
                <div className="flex flex-wrap gap-2 text-xs font-medium text-[#5C4033]">
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    <span>Basım: {book.year} (İthaki)</span>
                  </span>

                  <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>{book.pages} Sayfa</span>
                  </span>

                  <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Puan: {book.rating.toFixed(1)} / 5</span>
                  </span>

                  <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-amber-900 font-bold">
                    {book.category}
                  </span>
                </div>

                {/* SUMMARY & EDITORIAL REVIEW */}
                <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-xs text-[#5C4033] leading-relaxed font-sans whitespace-pre-line max-h-48 overflow-y-auto shadow-inner">
                  {book.summary}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
