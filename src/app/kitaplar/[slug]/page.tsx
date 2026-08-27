import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { verifiedBooksData } from '@/lib/verifiedBooks';
import BookDetailClientView from '@/components/BookDetailClientView';
import RecommendedBooksSection from '@/components/RecommendedBooksSection';
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
    buyUrl: dbBook?.buyUrl || '',
    fullPages: verified?.fullPages || dbBook?.bookPages.map((p) => p.content),
  };

  // Fetch recommended books (3 books excluding current)
  const dbOthers = await prisma.book.findMany({
    where: {
      NOT: { slug: bookData.slug },
    },
    take: 10,
  });

  const verifiedOthers = verifiedBooksData
    .filter((b) => b.slug !== bookData.slug && !dbOthers.some((d) => d.slug === b.slug))
    .map((b) => ({
      slug: b.slug,
      title: b.title,
      author: b.author,
      category: b.category,
      rating: b.rating,
      coverUrl: b.coverUrl,
    }));

  const allOthers = [
    ...dbOthers.map((b) => ({
      slug: b.slug,
      title: b.title,
      author: b.author,
      category: b.category,
      rating: b.rating,
      coverUrl: b.coverUrl,
    })),
    ...verifiedOthers,
  ];

  const sameCategory = allOthers.filter((b) => b.category === bookData.category);
  const differentCategory = allOthers.filter((b) => b.category !== bookData.category);
  const recommendedBooks = [...sameCategory, ...differentCategory].slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-6 sm:space-y-10">
      
      {/* MINIMAL RESPONSIVE BACK BUTTON */}
      <div>
        <Link
          href="/kitaplar"
          className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#78350F] transition-all bg-[#FEF9EE] p-2 sm:px-4 sm:py-2 rounded-full border border-[#FDE68A] shadow-sm hover:bg-[#FDE68A]/40"
          title="Mutlak Kitaplık'a Dön"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span className="hidden sm:inline">Mutlak Kitaplık'a Dön</span>
        </Link>
      </div>

      {/* ZERO-COMMERCE ESER DETAY KARTI */}
      <BookDetailClientView book={bookData} />

      {/* RECOMMENDED BOOKS (3 ESER) */}
      <RecommendedBooksSection books={recommendedBooks} />

    </div>
  );
}
