import React from 'react';
import { prisma } from '@/lib/prisma';
import PoemCard from '@/components/PoemCard';
import { Feather } from 'lucide-react';

export const revalidate = 60;

export default async function PoemsPage() {
  const poems = await prisma.post.findMany({
    where: { type: 'SIIR' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <Feather className="w-4 h-4 text-cozy-amber" />
          <span>Şiir Antolojisi</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-cozy-coffee">
          Öne Çıkan Şiirler
        </h1>
        <p className="text-cozy-coffee-light text-base leading-relaxed font-serif italic">
          "Ruhun şarkı söylerse, hayat seni dansa kaldırır."
        </p>
      </div>

      {/* Grid */}
      {poems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poems.map((poem) => (
            <PoemCard key={poem.id} poem={poem} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-cozy-parchment-border">
          <p className="text-cozy-coffee-light">Henüz yayınlanmış bir şiir bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
