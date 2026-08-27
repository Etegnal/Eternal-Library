'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, AArrowDown, AArrowUp, RotateCcw } from 'lucide-react';

interface BookPageData {
  pageNumber: number;
  content: string;
}

interface BookReaderModalProps {
  book: {
    slug: string;
    title: string;
    author: string;
    pages: number;
    coverUrl: string;
    bookPages?: BookPageData[];
  };
  onClose: () => void;
}

export default function BookReaderModal({ book, onClose }: BookReaderModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(18); // default font size in px
  const [pages, setPages] = useState<BookPageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load pages from props or fetch from API endpoint
  useEffect(() => {
    if (book.bookPages && book.bookPages.length > 0) {
      setPages(book.bookPages);
      setLoading(false);
    } else {
      fetch(`/api/books/${book.slug}/pages`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setPages(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [book.slug, book.bookPages]);

  // Load saved lastReadPage_[slug] from localStorage
  useEffect(() => {
    try {
      const savedPage = localStorage.getItem(`lastReadPage_${book.slug}`);
      if (savedPage) {
        const parsed = parseInt(savedPage, 10);
        if (!isNaN(parsed) && parsed >= 1) {
          setCurrentPage(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [book.slug]);

  // Save current page to localStorage whenever page changes
  const changePage = (newPage: number) => {
    const total = pages.length > 0 ? pages.length : 1;
    const clamped = Math.max(1, Math.min(newPage, total));
    setCurrentPage(clamped);
    try {
      localStorage.setItem(`lastReadPage_${book.slug}`, clamped.toString());
    } catch {
      // Ignore localStorage errors
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        changePage(currentPage + 1);
      } else if (e.key === 'ArrowLeft') {
        changePage(currentPage - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length]);

  const totalPagesCount = pages.length > 0 ? pages.length : 1;
  const currentContent = pages.find((p) => p.pageNumber === currentPage)?.content || 
    pages[currentPage - 1]?.content || 
    'Bu sayfa için henüz metin yüklenmedi.';

  const progressPercent = Math.round((currentPage / totalPagesCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn">
      
      {/* KOYU PARŞÖMEN CONTAINER (#1c1611 background, #e6d7c3 text) */}
      <div className="relative w-full h-full max-w-4xl max-h-[92vh] sm:rounded-3xl bg-[#1c1611] text-[#e6d7c3] border border-[#36271c] shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* TOP CONTROL BAR */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#36271c] bg-[#16110d]/90 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-900/60 border border-amber-700/50 flex items-center justify-center text-amber-200 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#f5ebd9] truncate">
                {book.title}
              </h3>
              <p className="text-xs text-[#a89582] truncate font-sans">
                {book.author}
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS: Font Size Controls, Reset & Close */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Font Size Decrement */}
            <button
              onClick={() => setFontSize((prev) => Math.max(14, prev - 2))}
              className="p-1.5 rounded-lg bg-[#271d16] hover:bg-[#36271c] text-[#d6c4af] transition-colors border border-[#443224]"
              title="Yazı Boyutunu Küçült"
            >
              <AArrowDown className="w-4 h-4" />
            </button>

            {/* Font Size Increment */}
            <button
              onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
              className="p-1.5 rounded-lg bg-[#271d16] hover:bg-[#36271c] text-[#d6c4af] transition-colors border border-[#443224]"
              title="Yazı Boyutunu Büyüt"
            >
              <AArrowUp className="w-4 h-4" />
            </button>

            {/* Reset Progress to Page 1 */}
            {currentPage > 1 && (
              <button
                onClick={() => changePage(1)}
                className="p-1.5 rounded-lg bg-[#271d16] hover:bg-[#36271c] text-[#d6c4af] transition-colors border border-[#443224]"
                title="En Başa Dön (Sayfa 1)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 transition-colors border border-amber-700/50 ml-1"
              title="Okumayı Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* READER TEXT BODY AREA */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 md:p-16 custom-scrollbar">
          {loading ? (
            <div className="h-full flex items-center justify-center text-[#a89582] font-serif animate-pulse">
              Eser Yükleniyor...
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* PAGE HEADER NUMBER */}
              <div className="text-center pb-4 border-b border-[#36271c]/60">
                <span className="font-serif text-xs uppercase tracking-widest text-[#a89582]">
                  — KİTAP ÖZETİ / SAYFA {currentPage} —
                </span>
              </div>

              {/* MAIN READING CONTENT */}
              <div
                style={{ fontSize: `${fontSize}px` }}
                className="font-serif text-[#e6d7c3] leading-relaxed sm:leading-loose whitespace-pre-line text-justify tracking-normal select-text"
              >
                {currentContent}
              </div>

            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION & PROGRESS FOOTER */}
        <div className="p-4 sm:p-5 border-t border-[#36271c] bg-[#16110d]/90 backdrop-blur-sm z-10 shrink-0 space-y-3">
          
          {/* Progress Bar */}
          <div className="w-full bg-[#271d16] h-1.5 rounded-full overflow-hidden border border-[#36271c]">
            <div
              className="bg-gradient-to-r from-amber-700 to-amber-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Navigation Controls Row */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded-xl bg-[#271d16] hover:bg-[#36271c] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-[#e6d7c3] flex items-center gap-1.5 transition-colors border border-[#443224]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Sayfa</span>
            </button>

            <div className="text-center">
              <span className="font-mono text-xs text-[#a89582]">
                Sayfa <strong className="text-[#f5ebd9]">{currentPage}</strong> / {totalPagesCount} (%{progressPercent})
              </span>
            </div>

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage >= totalPagesCount}
              className="px-4 py-2 rounded-xl bg-[#271d16] hover:bg-[#36271c] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-[#e6d7c3] flex items-center gap-1.5 transition-colors border border-[#443224]"
            >
              <span>Sonraki Sayfa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
