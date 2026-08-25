'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, BookOpen, Star, ArrowRight, Loader2, Library, BookMarked, Sparkles } from 'lucide-react';
import { LOFI_BOOK_PLACEHOLDER } from '@/lib/books';

interface BookItem {
  id: string;
  googleBookId?: string | null;
  isbn10?: string | null;
  isbn13?: string | null;
  title: string;
  subtitle?: string | null;
  authors: string;
  publisher?: string | null;
  publishedDate?: string | null;
  description?: string | null;
  pageCount?: number | null;
  categories: string;
  averageRating?: number | null;
  thumbnailUrl?: string | null;
  largeCoverUrl?: string | null;
  curatedCategory?: string | null;
}

interface BookSearchCatalogProps {
  initialBooks: BookItem[];
}

export default function BookSearchCatalog({ initialBooks }: BookSearchCatalogProps) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<BookItem[]>(initialBooks);
  const [loading, setLoading] = useState(false);

  // Debounced real-time search
  useEffect(() => {
    if (!query.trim()) {
      setBooks(initialBooks);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        }
      } catch (e) {
        console.error('Search error:', e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, initialBooks]);

  return (
    <div className="space-y-10">
      
      {/* SEARCH BAR INPUT */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kitap adı, yazar veya ISBN arayın... (ör: Suç ve Ceza, Dostoyevski, 978975...)"
            className="w-full px-5 py-4 pl-12 pr-12 rounded-2xl bg-[#FFFDF9] border-2 border-[#E6D7BC] focus:border-[#8B4513] text-[#362215] placeholder-[#8B4513]/50 text-sm shadow-parchment focus:outline-none transition-all"
          />

          <Search className="absolute left-4 w-5 h-5 text-[#8B4513]" />

          {loading ? (
            <Loader2 className="absolute right-4 w-5 h-5 text-amber-700 animate-spin" />
          ) : query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-xs font-bold text-[#8B4513] hover:underline"
            >
              Temizle
            </button>
          ) : null}
        </div>

        <p className="text-center text-xs text-[#8B4513]/80 mt-2.5 font-sans">
          💡 Open Library API ve arşivimiz üzerinden anında arama yapar, bulduklarını veritabanımıza kaydeder.
        </p>
      </div>

      {/* SEARCH RESULTS HEADER */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-700" />
          <h2 className="font-serif font-bold text-xl text-[#362215]">
            {query ? `"${query}" İçin Arama Sonuçları` : 'Öne Çıkan Başucu Eserleri'}
          </h2>
        </div>

        <span className="text-xs font-mono text-[#8B4513] bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200 font-bold">
          {books.length} Eser Bulundu
        </span>
      </div>

      {/* BOOKS GRID */}
      {books.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] space-y-4">
          <BookMarked className="w-12 h-12 text-amber-700 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#362215]">Sonuç Bulunamadı</h3>
          <p className="text-sm text-[#5C4033] max-w-md mx-auto leading-relaxed">
            Aradığınız kriterlere uygun bir eser bulunamadı. Lütfen kelimeyi kontrol edin veya farklı bir yazar/kitap adı arayın.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => {
            const coverUrl = book.thumbnailUrl || book.largeCoverUrl || LOFI_BOOK_PLACEHOLDER;

            return (
              <div
                key={book.id}
                className="group flex flex-col bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment hover:shadow-cozy transition-all duration-300 overflow-hidden"
              >
                {/* Book Cover Image */}
                <div className="relative w-full h-64 bg-[#23120A]/10 flex items-center justify-center p-4 border-b border-amber-200/60">
                  <div className="relative w-36 h-48 rounded-lg overflow-hidden shadow-2xl border-2 border-amber-200/80 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={coverUrl}
                      alt={book.title}
                      fill
                      sizes="144px"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Book Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8B4513] font-medium">
                      <span className="bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200/80 text-[11px] font-bold">
                        {book.curatedCategory || book.categories || 'Genel Edebiyat'}
                      </span>
                      {book.averageRating ? (
                        <div className="flex items-center gap-1 text-amber-700 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{book.averageRating}</span>
                        </div>
                      ) : null}
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#362215] group-hover:text-amber-800 transition-colors line-clamp-1 pt-1">
                      <Link href={`/kitaplar/${book.id}`}>{book.title}</Link>
                    </h3>

                    <p className="text-xs font-bold text-[#8B4513]">
                      Yazar: {book.authors}
                    </p>

                    <p className="text-xs text-[#5C4033] line-clamp-3 leading-relaxed font-sans pt-1">
                      {book.description || 'Bu eser için özet kütüphane arşivine henüz eklenmemiştir.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-xs text-[#5C4033] font-mono">
                      {book.publishedDate ? book.publishedDate : ''} {book.pageCount ? `• ${book.pageCount} Sayfa` : ''}
                    </span>

                    <Link
                      href={`/kitaplar/${book.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8B4513] hover:underline"
                    >
                      <span>Detayları İncele</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
