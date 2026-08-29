'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { BookOpen, Star, Calendar, FileText, Bookmark, Tag, ShoppingCart, ExternalLink, CheckCircle2, BookCheck, Users } from 'lucide-react';
import BookReaderModal from '@/components/BookReaderModal';
import SaveBookButton from '@/components/SaveBookButton';

interface BookDetailClientViewProps {
  book: {
    slug: string;
    title: string;
    author: string;
    year: number;
    displayYear: string;
    pages: number;
    category: string;
    summary: string;
    rating: number;
    isReadable: boolean;
    coverUrl: string;
    buyUrl?: string | null;
    fullPages?: string[];
  };
}

export default function BookDetailClientView({ book }: BookDetailClientViewProps) {
  const { data: session } = useSession();
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // Read Status & Readers List State
  const [isRead, setIsRead] = useState(false);
  const [readers, setReaders] = useState<Array<{ id: string; name: string; image?: string | null }>>([]);
  const [isTogglingRead, setIsTogglingRead] = useState(false);
  const [readPrompt, setReadPrompt] = useState<string | null>(null);

  // Fetch Read Status & Readers List
  useEffect(() => {
    fetch(`/api/books/${encodeURIComponent(book.slug)}/read-status`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setIsRead(!!data.isRead);
        setReaders(data.readers || []);
      })
      .catch((err) => console.error('Error fetching read status:', err));
  }, [book.slug]);

  // Handle Toggle Read Status
  const handleToggleRead = async () => {
    setReadPrompt(null);
    if (!session) {
      setReadPrompt('Kitabı okudum olarak işaretlemek için lütfen giriş yapın.');
      setTimeout(() => setReadPrompt(null), 4000);
      return;
    }

    try {
      setIsTogglingRead(true);
      const res = await fetch(`/api/books/${encodeURIComponent(book.slug)}/read-status`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsRead(!!data.isRead);
        setReaders(data.readers || []);
      }
    } catch (err) {
      console.error('Error toggling read status:', err);
    } finally {
      setIsTogglingRead(false);
    }
  };

  const purchaseTargetUrl = (book.buyUrl && book.buyUrl.trim().length > 0)
    ? book.buyUrl
    : `https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author + ' satın al')}`;

  const renderActionButtons = () => (
    <>
      {/* Read Book / Kitap Özeti Action Button */}
      <button
        onClick={() => setIsReaderOpen(true)}
        className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#5C2E0B] hover:to-[#78350F] text-amber-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-600/40 cursor-pointer"
      >
        <BookOpen className="w-4 h-4 text-amber-300 shrink-0" />
        <span>Kitap Özetini Oku</span>
      </button>

      {/* Save Book to Personal Library Action Button */}
      <SaveBookButton
        bookId={book.slug}
        bookSlug={book.slug}
        bookTitle={book.title}
        variant="button"
        className="w-full py-2 sm:py-2.5"
      />

      {/* Buy Book / Satın Al Fiyatı İncele Action Button */}
      <a
        href={purchaseTargetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-amber-100/90 hover:bg-amber-200 text-[#78350F] font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 border border-amber-300/80 cursor-pointer"
      >
        <ShoppingCart className="w-4 h-4 text-amber-800 shrink-0" />
        <span>Satın Al / Fiyatı İncele</span>
        <ExternalLink className="w-3 h-3 text-amber-600 ml-auto shrink-0" />
      </a>
    </>
  );

  return (
    <div className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start relative">
      
      {/* TOP-RIGHT OKUDUM (READ) TOGGLE BUTTON (Inside Card Top Right) */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex flex-col items-end">
        <button
          onClick={handleToggleRead}
          disabled={isTogglingRead}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border ${
            isRead
              ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 border-amber-600 shadow-amber-950/20'
              : 'bg-amber-100/90 hover:bg-amber-200 text-[#78350F] border-amber-300/90'
          }`}
          title={isRead ? "Okudum olarak işaretlediniz (Kaldırmak için tıklayın)" : "Bu kitabı okudum olarak işaretleyin"}
        >
          {isRead ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>Okudum</span>
            </>
          ) : (
            <>
              <BookCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
              <span>Okudum</span>
            </>
          )}
        </button>

        {readPrompt && (
          <div className="mt-1.5 p-2 rounded-xl bg-amber-900/95 text-amber-100 text-[11px] font-medium border border-amber-600 shadow-xl max-w-[210px] text-right animate-fadeIn">
            {readPrompt}
          </div>
        )}
      </div>

      {/* LEFT SIDE: COVER IMAGE & DESKTOP ACTIONS */}
      <div className="md:col-span-4 flex flex-col items-center space-y-3 sm:space-y-4">
        
        {/* Cover Aspect Ratio 2/3 */}
        <div className="relative aspect-[2/3] w-36 sm:w-60 rounded-xl sm:rounded-2xl overflow-hidden shadow-cozy border-2 border-[#E6D7BC] bg-[#FEFBF3] group">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        {/* DESKTOP ACTION BUTTONS (Hidden on mobile) */}
        <div className="hidden sm:flex flex-col space-y-3 w-full">
          {renderActionButtons()}
        </div>
      </div>

      {/* RIGHT SIDE: METADATA, SUMMARY & MOBILE ACTIONS */}
      <div className="md:col-span-8 space-y-4 sm:space-y-6 text-[#362215]">
        
        {/* Category & Title */}
        <div className="space-y-1.5 sm:space-y-2 border-b border-amber-200/80 pb-3 sm:pb-4 pr-20 sm:pr-24">
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B4513] bg-amber-100/80 px-3 py-0.5 sm:py-1 rounded-full border border-amber-200">
            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
            <span>{book.category}</span>
          </span>

          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-[#362215] leading-tight">
            {book.title}
          </h1>

          <p className="text-sm sm:text-base font-bold text-[#8B4513] pt-0.5 flex items-center gap-2 font-serif italic">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
            <span>Yazar: {book.author}</span>
          </p>
        </div>

        {/* Detailed Metadata Grid (3 compact boxes: Yıl, Sayfa, Değerlendirme) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs font-medium text-[#5C4033]">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-50/80 p-2 sm:p-3 rounded-xl border border-amber-200/80">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[9px] sm:text-[10px] text-[#8B4513] uppercase font-bold truncate">Yayın Yılı</span>
              <span className="font-mono font-bold text-[#362215] text-xs sm:text-sm block">{book.displayYear}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-50/80 p-2 sm:p-3 rounded-xl border border-amber-200/80">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[9px] sm:text-[10px] text-[#8B4513] uppercase font-bold truncate">Sayfa</span>
              <span className="font-mono font-bold text-[#362215] text-xs sm:text-sm block">{book.pages}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-50/80 p-2 sm:p-3 rounded-xl border border-amber-200/80">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[9px] sm:text-[10px] text-[#8B4513] uppercase font-bold truncate">Puan</span>
              <span className="font-mono font-bold text-[#362215] text-xs sm:text-sm block">{book.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Editör İncelemesi */}
        <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#362215] flex items-center gap-2 border-b border-amber-200/80 pb-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
            <span>Editör İncelemesi</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C4033] leading-relaxed font-sans whitespace-pre-line bg-amber-50/60 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-200/60 shadow-inner">
            {book.summary}
          </p>
        </div>

        {/* BU KİTABI OKUYANLAR SECTION (Directly under Editör İncelemesi) */}
        <div className="space-y-2 sm:space-y-3 pt-2">
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#362215] flex items-center gap-2 border-b border-amber-200/80 pb-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
            <span>Bu Kitabı Okuyan Okurlarımız ({readers.length})</span>
          </h3>

          {readers.length === 0 ? (
            <p className="text-xs sm:text-sm text-stone-500 font-serif italic bg-amber-50/40 p-3.5 sm:p-4 rounded-xl border border-amber-200/40">
              Henüz kayıtlı okurlarımızdan kimse bu kitabı okudum olarak işaretlemedi. İlk işaretleyen sen ol!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1 bg-amber-50/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-200/60">
              {readers.map((reader) => (
                <div
                  key={reader.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#78350F] text-xs font-bold border border-amber-200 shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-800 text-amber-100 text-[10px] font-mono flex items-center justify-center font-bold shrink-0">
                    {reader.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span>{reader.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE ACTION BUTTONS (Positioned AFTER Readers Section on Mobile) */}
        <div className="flex sm:hidden flex-col space-y-3 w-full pt-3 border-t border-amber-200/60">
          {renderActionButtons()}
        </div>

      </div>

      {/* READER MODAL */}
      {isReaderOpen && (
        <BookReaderModal
          book={{
            slug: book.slug,
            title: book.title,
            author: book.author,
            pages: book.pages,
            coverUrl: book.coverUrl,
          }}
          onClose={() => setIsReaderOpen(false)}
        />
      )}

    </div>
  );
}
