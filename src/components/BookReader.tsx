'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bookmark, Calendar, RotateCcw } from 'lucide-react';
import LikeButton from '@/components/LikeButton';

interface BookReaderProps {
  postId: string;
  content: string;
  initialLikes: number;
  postType?: 'YAZI' | 'SIIR';
  dateStr?: string;
}

export default function BookReader({ postId, content, initialLikes, postType = 'YAZI', dateStr }: BookReaderProps) {
  const { data: session } = useSession();
  const userIdentifier = session?.user?.email || 'guest';
  const bookmarkKey = `eternal_bookmark_${userIdentifier}_${postId}`;

  // 1. Split content into logical pages
  const pages = useMemo<string[][]>(() => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length === 0) return [[content]];

    const result: string[][] = [];
    let currentPageParagraphs: string[] = [];
    let currentWordCount = 0;

    const maxWordsPerPage = postType === 'SIIR' ? 120 : 180;

    for (const p of paragraphs) {
      const wordCount = p.split(/\s+/).length;
      
      // Headers or Blockquotes start new logical flow or fit in current page
      if (currentWordCount > 0 && (currentWordCount + wordCount > maxWordsPerPage || currentPageParagraphs.length >= 4)) {
        result.push(currentPageParagraphs);
        currentPageParagraphs = [p];
        currentWordCount = wordCount;
      } else {
        currentPageParagraphs.push(p);
        currentWordCount += wordCount;
      }
    }

    if (currentPageParagraphs.length > 0) {
      result.push(currentPageParagraphs);
    }

    return result.length > 0 ? result : [[content]];
  }, [content, postType]);

  const totalPages = pages.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [restoredToast, setRestoredToast] = useState(false);

  // 2. Load saved reading progress on mount
  useEffect(() => {
    try {
      const savedPage = localStorage.getItem(bookmarkKey);
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10);
        if (pageNum > 1 && pageNum <= totalPages) {
          setCurrentPage(pageNum);
          setRestoredToast(true);
          setTimeout(() => setRestoredToast(false), 4000);
        }
      }
    } catch (e) {
      console.error('Error loading bookmark:', e);
    }
  }, [bookmarkKey, totalPages]);

  // 3. Save reading progress on page change
  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
    try {
      localStorage.setItem(bookmarkKey, String(newPage));
    } catch (e) {
      console.error('Error saving bookmark:', e);
    }
  };

  // 4. Keyboard Arrow Keys Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        changePage(currentPage + 1);
      } else if (e.key === 'ArrowLeft') {
        changePage(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const currentParagraphs: string[] = pages[currentPage - 1] || [];
  const isLastPage = currentPage === totalPages;

  // Animation variants for page flip feel
  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      rotateY: dir > 0 ? 12 : -12,
    }),
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      rotateY: dir > 0 ? -12 : 12,
      transition: { duration: 0.25, ease: 'easeIn' },
    }),
  };

  return (
    <div className="space-y-6">
      
      {/* Restored Bookmark Toast Notification */}
      <AnimatePresence>
        {restoredToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 px-5 rounded-2xl bg-[#FEF9EE] border border-[#FDE68A] shadow-md flex items-center justify-between text-xs text-[#78350F]"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-700 fill-amber-700 animate-bounce" />
              <span>
                {session?.user?.name ? `${session.user.name}, ` : ''}
                <strong>{currentPage}. sayfada</strong> kaldıgınız yerden devam ediyorsunuz.
              </span>
            </div>

            <button
              onClick={() => changePage(1)}
              className="inline-flex items-center gap-1 font-bold hover:underline text-amber-900"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Başa Dön</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOK PAGE CONTAINER */}
      <div className="relative rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire p-6 sm:p-12 min-h-[460px] flex flex-col justify-between overflow-hidden">
        
        {/* Book Header: Date & Page Count */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC] text-xs text-[#785438]">
          <div className="flex items-center gap-1.5 text-xs text-[#785438] font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>{dateStr || 'Tarih'}</span>
          </div>

          <div className="font-mono font-bold text-[#78350F] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
            Sayfa {currentPage} / {totalPages}
          </div>
        </div>

        {/* Animated Page Content */}
        <div className="py-6 flex-1 perspective-1000">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {postType === 'SIIR' ? (
                <div className="font-serif text-lg sm:text-xl leading-loose text-[#362215] italic whitespace-pre-line text-center max-w-xl mx-auto">
                  {currentParagraphs.join('\n\n')}
                </div>
              ) : (
                <div className="prose lg:prose-lg max-w-none font-sans leading-relaxed text-[#362215] space-y-5">
                  {currentParagraphs.map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="font-serif font-bold text-2xl text-[#362215] pt-2 border-b border-[#E6D7BC] pb-2">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={idx} className="border-l-4 border-[#9A3412] pl-4 italic font-serif text-lg text-[#5C4033] bg-[#FEF9EE] p-4 rounded-r-xl border border-r border-t border-b border-[#FDE68A]/60">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={idx} className="text-base sm:text-lg leading-relaxed text-[#362215]">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Like Button on Last Page */}
              {isLastPage && (
                <div className="pt-8 mt-6 border-t border-dashed border-[#E6D7BC] flex justify-center py-1">
                  <LikeButton postId={postId} initialLikes={initialLikes} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOOK READER NAVIGATION FOOTER */}
        <div className="pt-6 border-t border-[#E6D7BC] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#78350F] bg-[#FEF9EE] hover:bg-[#FDE68A]/60 border border-[#FDE68A] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Önceki Sayfa</span>
          </button>

          {/* Progress Bar & Dots */}
          <div className="flex items-center gap-1.5">
            {pages.map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => changePage(pageNum)}
                  className={`h-2 rounded-full transition-all ${
                    pageNum === currentPage
                      ? 'w-6 bg-[#9A3412]'
                      : 'w-2 bg-[#E6D7BC] hover:bg-amber-400'
                  }`}
                  title={`${pageNum}. Sayfaya Git`}
                  aria-label={`${pageNum}. Sayfaya Git`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-bold text-amber-100 bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] border border-amber-500/40 shadow-sm transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
          >
            <span>Sonraki Sayfa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
