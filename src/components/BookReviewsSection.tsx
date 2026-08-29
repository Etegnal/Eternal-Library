'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MessageSquare, Star, Send, User, CheckCircle, AlertCircle } from 'lucide-react';

interface ReviewUser {
  id: string;
  name: string;
  image?: string | null;
}

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

interface BookReviewsSectionProps {
  bookSlug: string;
  bookTitle: string;
}

export default function BookReviewsSection({ bookSlug, bookTitle }: BookReviewsSectionProps) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch reviews for book
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/books/${encodeURIComponent(bookSlug)}/reviews`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookSlug]);

  // Handle Review Submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!comment.trim()) {
      setSubmitMessage({ type: 'error', text: 'Lütfen yorumunuzu yazın.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/books/${encodeURIComponent(bookSlug)}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitMessage({ type: 'success', text: 'İncelemeniz başarıyla yayınlandı!' });
        setComment('');
        setRating(5);
        fetchReviews(); // Refresh review list
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'İnceleme gönderilemedi.' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage({ type: 'error', text: 'Bir hata oluştu, lütfen tekrar deneyin.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'O';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment space-y-6 sm:space-y-8">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
        <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#362215] flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0" />
          <span>Okur İncelemeleri & Yorumlar</span>
        </h2>
        <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
          {reviews.length} Yorum
        </span>
      </div>

      {/* NEW REVIEW FORM / LOGIN PROMPT */}
      <div className="bg-amber-50/70 p-4 sm:p-6 rounded-2xl border border-amber-200/80 space-y-4">
        {session ? (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#362215] flex items-center gap-2">
              <span>{bookTitle} İncelemenizi Paylaşın</span>
            </h3>

            {/* STAR RATING SELECTOR */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#78350F]">Puanınız:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-115 transition-transform cursor-pointer"
                    title={`${star} Yıldız`}
                  >
                    <Star
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-amber-300 fill-transparent'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 ml-1">
                ({hoverRating || rating}/5)
              </span>
            </div>

            {/* COMMENT TEXTAREA */}
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bu eser hakkında ne düşünüyorsunuz? Düşüncelerinizi ve hissettiklerinizi diğer okurlarla paylaşın..."
              className="w-full p-3 sm:p-4 rounded-xl bg-white border border-amber-200 text-[#362215] text-xs sm:text-sm font-sans placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner resize-y"
            />

            {/* SUBMIT MESSAGE ALERT */}
            {submitMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  submitMessage.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {submitMessage.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{submitMessage.text}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#78350F] hover:bg-[#5C2E0B] text-amber-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 border border-amber-600/40 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Yayınlanıyor...' : 'İncelemeyi Yayınla'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-2">
            <p className="text-xs sm:text-sm text-[#5C4033] font-serif italic">
              Bu kitap hakkında yorum veya inceleme yazabilmek için kütüphane hesabınızla giriş yapmalısınız.
            </p>
            <Link
              href="/giris"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#78350F] text-amber-100 font-bold text-xs shadow-sm hover:bg-[#5C2E0B] transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>Giriş Yap veya Kaydol</span>
            </Link>
          </div>
        )}
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-stone-400 text-xs sm:text-sm font-serif italic animate-pulse">
            İncelemeler yükleniyor...
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-6 text-center bg-amber-50/40 rounded-xl border border-amber-200/50 space-y-1">
            <p className="text-xs sm:text-sm font-bold text-[#78350F] font-serif">
              Henüz Bu Kitap İçin İnceleme Yazılmamış
            </p>
            <p className="text-xs text-stone-500 font-serif italic">
              Düşüncelerini ilk paylaşan okur sen ol!
            </p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-3 transition-all hover:border-amber-300"
            >
              {/* USER HEADER & RATING */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* AVATAR INITIALS */}
                  <div className="w-9 h-9 rounded-full bg-amber-800 text-amber-100 font-serif font-bold text-xs flex items-center justify-center border border-amber-600 shadow-xs shrink-0">
                    {getInitials(rev.user.name)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#362215]">
                      {rev.user.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-sans block">
                      {formatDate(rev.createdAt)}
                    </span>
                  </div>
                </div>

                {/* STARS DISPLAY */}
                <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        rev.rating >= s
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300 fill-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* REVIEW CONTENT */}
              <p className="text-xs sm:text-sm text-[#5C4033] leading-relaxed font-sans whitespace-pre-line pl-1 sm:pl-12">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>

    </section>
  );
}
