import React from 'react';
import { prisma } from '@/lib/prisma';
import { Library } from 'lucide-react';
import MutlakKitaplikCatalog from '@/components/MutlakKitaplikCatalog';

// Render dynamically on-demand to bypass Vercel 19MB static HTML file limit caused by 135 base64 book covers
export const revalidate = 0;

export default async function BooksPage() {
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
  const books = dbBooks.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    author: b.author,
    year: b.year,
    displayYear: b.year < 0 ? `MÖ ${Math.abs(b.year)}` : `${b.year}`,
    pages: b.pages,
    category: b.category,
    summary: b.summary.length > 200 ? `${b.summary.slice(0, 200)}...` : b.summary,
    rating: b.rating,
    isReadable: b.isReadable,
    coverUrl: b.coverUrl,
    createdAt: b.createdAt.toISOString(),
  }));

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
