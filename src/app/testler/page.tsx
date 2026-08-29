import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Brain, HelpCircle, ArrowRight, Sparkles, Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PsychologicalTestsCatalogPage() {
  let tests: any[] = [];
  try {
    tests = await prisma.psychologicalTest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching tests for catalog:', error);
  }

  return (
    <div className="relative min-h-screen bg-[#1C0E07] text-amber-100 flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-12 px-4 sm:px-8 bg-gradient-to-b from-[#190B05] via-[#241108] to-[#1C0E07] text-amber-100 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Brain className="w-4 h-4 text-amber-400" />
            <span>Felsefi & Psikolojik Testler</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
            Ruhunun Derinliklerine Bir Yolculuk
          </h1>

          <p className="text-sm sm:text-base text-amber-200/90 max-w-2xl mx-auto font-serif italic leading-relaxed">
            Seçimlerinizin arkasındaki bilinçaltı sembolleri keşfedin. Her soru iç dünyanızdan bir parçayı aydınlatır, her şık gizli bir metafor taşır.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT / TESTS GRID */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-8 py-10 w-full space-y-12">
        {tests.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#2A160A]/80 border border-dashed border-amber-800/60 shadow-2xl space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-950/80 flex items-center justify-center mx-auto text-amber-300 border border-amber-600/40 shadow-sm">
              <Brain className="w-8 h-8 text-amber-400" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-white">
              Henüz Test Eklenmedi
            </h3>

            <p className="text-sm text-amber-200/80 font-serif italic leading-relaxed">
              Kütüphanemizin psikolojik testler seçkisi şu an hazırlanma aşamasındadır. Çok yakında yeni testler burada yayınlanacaktır.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tests.map((test) => (
              <div
                key={test.id}
                className="group relative rounded-3xl bg-[#2A160A]/90 border border-amber-800/50 shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                {/* COVER OR DECORATIVE BANNER */}
                <div className="relative h-44 w-full bg-gradient-to-br from-[#190B05] to-[#36190B] overflow-hidden flex items-center justify-center p-6 text-center">
                  {test.coverImage ? (
                    <img
                      src={test.coverImage}
                      alt={test.title}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative z-10 space-y-2">
                      <Brain className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
                      <span className="font-serif italic text-xs text-amber-200/80 block">
                        Eternal Library Test Kitaplığı
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#190B05]/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-sm">
                      {test.category || 'Psikolojik Test'}
                    </span>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {test.title}
                    </h3>

                    <p className="text-xs text-amber-200/80 line-clamp-3 leading-relaxed font-sans">
                      {test.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-900/40 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>{test._count?.questions || 0} Soru</span>
                    </span>

                    <Link
                      href={`/testler/${test.slug}`}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] text-[#FEF3C7] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 group-hover:scale-105 border border-amber-500/40"
                    >
                      <span>Teste Başla</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
