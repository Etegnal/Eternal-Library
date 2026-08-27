import React from 'react';
import { prisma } from '@/lib/prisma';
import { Library } from 'lucide-react';
import MutlakKitaplikCatalog from '@/components/MutlakKitaplikCatalog';
import { ensureVerifiedBooksInDb } from '@/lib/syncBooks';
import { verifiedBooksData } from '@/lib/verifiedBooks';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BooksPage() {
  // Ensure the 30 verified masterpieces exist in Neon PostgreSQL DB
  await ensureVerifiedBooksInDb();

  // Fetch all books from DB (Highest Rated First by default)
  const dbBooks = await prisma.book.findMany({
    orderBy: [
      { rating: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  // Map to VerifiedBook schema with displayYear
  const books = dbBooks.length >= 30 
    ? dbBooks.map((b) => {
        const verified = verifiedBooksData.find((vb) => vb.slug === b.slug);
        return {
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
        };
      })
    : verifiedBooksData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] uppercase tracking-widest bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-200 shadow-sm">
          <Library className="w-4 h-4 text-amber-700" />
          <span>Zamansız Eserler Antolojisi</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#362215]">
          Mutlak Kitaplık
        </h1>

        <p className="text-[#5C4033] text-base leading-relaxed font-serif italic max-w-xl mx-auto">
          "Her zihnin ve kitaplığın başköşesinde yer alması gereken zamansız başyapıtlar."
        </p>
      </div>

      {/* ZERO-COMMERCE MUTLAK KİTAPLIK CATALOG */}
      <MutlakKitaplikCatalog initialBooks={books} />

    </div>
  );
}
