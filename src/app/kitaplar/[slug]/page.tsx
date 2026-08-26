import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Calendar, FileText, Bookmark, Tag } from 'lucide-react';
import { verifiedBooksData } from '@/lib/verifiedBooks';
import BookDetailClientView from '@/components/BookDetailClientView';
import { ensureVerifiedBooksInDb } from '@/lib/syncBooks';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BookDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  await ensureVerifiedBooksInDb();

  const slug = decodeURIComponent(params.slug);

  // Search in DB by slug or id
  let dbBook = await prisma.book.findFirst({
    where: {
      OR: [
        { slug: slug },
        { id: slug },
      ],
    },
    include: {
      bookPages: {
        orderBy: { pageNumber: 'asc' },
      },
    },
  });

  // Fallback to verifiedBooksData in-memory data
  const verified = verifiedBooksData.find((b) => b.slug === slug || b.title.toLowerCase() === slug.toLowerCase());

  if (!dbBook && !verified) {
    notFound();
  }

  const bookData = {
    id: dbBook?.id || verified?.slug || slug,
    slug: dbBook?.slug || verified?.slug || slug,
    title: dbBook?.title || verified?.title || '',
    author: dbBook?.author || verified?.author || '',
    year: dbBook?.year || verified?.year || 0,
    displayYear: verified?.displayYear || (dbBook?.year && dbBook.year < 0 ? `MÖ ${Math.abs(dbBook.year)}` : `${dbBook?.year}`),
    pages: dbBook?.pages || verified?.pages || 0,
    category: dbBook?.category || verified?.category || 'Klasikler',
    summary: dbBook?.summary || verified?.summary || '',
    rating: dbBook?.rating || verified?.rating || 4.8,
    isReadable: dbBook?.isReadable ?? verified?.isReadable ?? false,
    coverUrl: dbBook?.coverUrl || verified?.coverUrl || '',
    fullPages: verified?.fullPages || dbBook?.bookPages.map((p) => p.content),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      
      {/* Back to Mutlak Kitaplık Button */}
      <div>
        <Link
          href="/kitaplar"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#78350F] hover:underline transition-colors bg-[#FEF9EE] px-4 py-2 rounded-full border border-[#FDE68A] shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span>Mutlak Kitaplık'a Dön</span>
        </Link>
      </div>

      {/* ZERO-COMMERCE ESER DETAY KARTI */}
      <BookDetailClientView book={bookData} />

    </div>
  );
}
