import React from 'react';
import { prisma } from '@/lib/prisma';
import { Library } from 'lucide-react';
import MutlakKitaplikCatalog from '@/components/MutlakKitaplikCatalog';
import { ensureVerifiedBooksInDb } from '@/lib/syncBooks';
import { verifiedBooksData } from '@/lib/verifiedBooks';

// Enable 1-hour Vercel CDN ISR Caching to save database quota
export const revalidate = 3600;

export default async function BooksPage() {
  // Ensure the verified masterpieces exist in Neon PostgreSQL DB
  await ensureVerifiedBooksInDb();

  // Fetch published books with optimized SELECT query (only essential card fields)
  const dbBooks = await prisma.book.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      slug: true,
      title: true,
      author: true,
      year: true,
      pages: true,
      category: true,
      summary: true,
      rating: true,
      isReadable: true,
      coverUrl: true,
      createdAt: true,
    },
    orderBy: [
      { rating: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  // Map to VerifiedBook schema with displayYear, id and createdAt
  const books = dbBooks.length >= 30 
    ? dbBooks.map((b) => {
        const verified = verifiedBooksData.find((vb) => vb.slug === b.slug);
        return {
          id: b.id,
          slug: b.slug,
          title: b.title,
          author: b.author,
          year: b.year,
          displayYear: verified?.displayYear || (b.year < 0 ? `MÖ ${Math.abs(b.year)}` : `${b.year}`),
          pages: b.pages,
          category: b.category,
          summary: b.summary,
          rating: b.rating,
          isReadable: b.isReadable,
          coverUrl: b.coverUrl,
          fullPages: verified?.fullPages,
          createdAt: b.createdAt.toISOString(),
        };
      })
    : verifiedBooksData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] dark:text-amber-300 uppercase tracking-widest bg-amber-100/80 dark:bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-800/60 shadow-sm">
          <Library className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Zamansız Eserler Antolojisi</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#362215] dark:text-amber-200 drop-shadow-md">
          Mutlak Kitaplık
        </h1>

        <p className="text-[#5C4033] dark:text-white text-base leading-relaxed font-serif italic max-w-xl mx-auto">
          "Her zihnin ve kitaplığın başköşesinde yer alması gereken zamansız başyapıtlar."
        </p>
      </div>

      {/* ZERO-COMMERCE MUTLAK KİTAPLIK CATALOG */}
      <MutlakKitaplikCatalog initialBooks={books} />

    </div>
  );
}
