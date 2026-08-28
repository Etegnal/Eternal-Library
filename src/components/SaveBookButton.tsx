'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Heart, Check, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface SaveBookButtonProps {
  bookId: string;
  bookSlug: string;
  bookTitle?: string;
  initialSaved?: boolean;
  variant?: 'icon' | 'button' | 'badge';
  className?: string;
  onToggleSuccess?: (newSavedState: boolean) => void;
}

export default function SaveBookButton({
  bookId,
  bookSlug,
  bookTitle,
  initialSaved = false,
  variant = 'icon',
  className = '',
  onToggleSuccess,
}: SaveBookButtonProps) {
  const { data: session, status } = useSession();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Check saved status on mount via API or localStorage fallback
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/user/saved-books', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (data && (Array.isArray(data.savedBookIds) || Array.isArray(data.savedBookSlugs))) {
            const hasId = data.savedBookIds?.includes(bookId);
            const hasSlug = data.savedBookSlugs?.includes(bookSlug);
            setIsSaved(Boolean(hasId || hasSlug));
          }
        })
        .catch(() => {});
    } else {
      // LocalStorage fallback for guests
      try {
        const localSaved = JSON.parse(localStorage.getItem('eternal_saved_books') || '[]');
        if (Array.isArray(localSaved)) {
          setIsSaved(localSaved.includes(bookSlug) || localSaved.includes(bookId));
        }
      } catch (e) {}
    }
  }, [bookId, bookSlug, status]);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState); // Optimistic UI update

    if (status === 'authenticated') {
      try {
        const res = await fetch('/api/user/saved-books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookId, bookSlug }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSaved(data.saved);
          setToastMessage(data.message);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          if (onToggleSuccess) onToggleSuccess(data.saved);
        } else {
          // Revert optimistic update if API failed
          setIsSaved(!nextSavedState);
          setToastMessage(data.error || 'İşlem başarısız');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      } catch (err) {
        setIsSaved(!nextSavedState);
      } finally {
        setLoading(false);
      }
    } else {
      // Guest localStorage handle
      try {
        const localSaved = JSON.parse(localStorage.getItem('eternal_saved_books') || '[]');
        let updatedList: string[] = Array.isArray(localSaved) ? [...localSaved] : [];

        if (nextSavedState) {
          if (!updatedList.includes(bookSlug)) updatedList.push(bookSlug);
          setToastMessage('Kitap tarayıcınıza kaydedildi. Hesabınıza eklemek için giriş yapın.');
        } else {
          updatedList = updatedList.filter((s) => s !== bookSlug && s !== bookId);
          setToastMessage('Kitap kaydedilenlerden çıkarıldı.');
        }

        localStorage.setItem('eternal_saved_books', JSON.stringify(updatedList));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        if (onToggleSuccess) onToggleSuccess(nextSavedState);
      } catch (e) {
        setIsSaved(!nextSavedState);
      } finally {
        setLoading(false);
      }
    }
  };

  // Toast notification floating overlay
  const renderToast = () => {
    if (!showToast) return null;
    return (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#120e0b]/95 text-amber-100 text-xs font-medium px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-2 animate-fadeIn pointer-events-none max-w-xs text-center">
        <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    );
  };

  if (variant === 'button') {
    return (
      <>
        {renderToast()}
        <button
          type="button"
          onClick={handleToggleSave}
          disabled={loading}
          className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
            isSaved
              ? 'bg-amber-800 text-amber-100 border-amber-900 shadow-sm'
              : 'bg-amber-100/90 hover:bg-amber-200 text-[#78350F] border-amber-300/80'
          } ${className}`}
          title={isSaved ? 'Kişisel Kütüphanemden Çıkar' : 'Kişisel Kütüphaneme Ekle'}
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isSaved ? (
            <Check className="w-3.5 h-3.5 text-amber-300" />
          ) : (
            <Bookmark className="w-3.5 h-3.5 text-amber-800" />
          )}
          <span>{isSaved ? 'Kütüphanenizde' : 'Kütüphaneme Ekle'}</span>
        </button>
      </>
    );
  }

  // Default Icon variant (clean bookmark button for catalog cards or top bar)
  return (
    <>
      {renderToast()}
      <button
        type="button"
        onClick={handleToggleSave}
        disabled={loading}
        className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
          isSaved
            ? 'bg-amber-800 text-amber-100 border-amber-900 shadow-sm'
            : 'bg-amber-50 hover:bg-amber-100 text-[#78350F] border-amber-200/80'
        } ${className}`}
        title={isSaved ? 'Kütüphanemden Çıkar' : 'Kütüphaneme Ekle'}
        aria-label={isSaved ? 'Kütüphanemden Çıkar' : 'Kütüphaneme Ekle'}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-300 text-amber-300' : 'text-amber-700'}`} />
        )}
      </button>
    </>
  );
}
