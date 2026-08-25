'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Feather, Sparkles, BookOpen, Quote, ChevronDown, ChevronUp } from 'lucide-react';

export interface MasterPoemItem {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  year?: string;
  slug?: string;
}

const DEFAULT_MASTER_POEMS: MasterPoemItem[] = [
  {
    id: 'master-1',
    title: 'Ben Sana Mecburum',
    author: 'Attila İlhan',
    excerpt: 'Ben sana mecburum bilemezsin\nAdını mıh gibi aklımda tutuyorum\nBüyüdükçe büyüyor gözlerin\nBen sana mecburum bilemezsin\nİçimi seninle ısıtıyorum...',
    year: '1960',
  },
  {
    id: 'master-2',
    title: 'Tahir ile Zühre Meselesi',
    author: 'Nâzım Hikmet',
    excerpt: 'Tahir olmak da ayıp değil Zühre olmak da\nhatta sevda yüzünden ölmek de ayıp değil,\nbütün iş Tahir ile Zühre olabilmekte\nyani yürekte...',
    year: '1948',
  },
  {
    id: 'master-3',
    title: 'Lavinia',
    author: 'Özdemir Asaf',
    excerpt: 'Sana gitme demeyeceğim.\nÜşüyorsun ceketimi al.\nGünün en güzel saatleri bunlar.\nYalnız kalma okuma salonunda...',
    year: '1957',
  },
  {
    id: 'master-4',
    title: 'Otuz Beş Yaş',
    author: 'Cahit Sıtkı Tarancı',
    excerpt: 'Yaş thirty five! Yolun yarısı eder.\nDante gibi ortasındayız ömrün.\nDelikanlı çağımızdaki cevher,\nGözünün yaşına bakmadan gider...',
    year: '1946',
  },
  {
    id: 'master-5',
    title: 'Hasretinden Prangalar Eskittim',
    author: 'Ahmed Arif',
    excerpt: 'Seni, anlatabilmek seni.\nİyi çocuklara, kahramanlara.\nSeni anlatabilmek seni,\nNamussuza, halden bilmeze,\nKahpe yalanlara...',
    year: '1968',
  },
  {
    id: 'master-6',
    title: 'Monna Rosa',
    author: 'Sezai Karakoç',
    excerpt: 'Monna Rosa. Siyah güller, ak güller.\nGülhanenin gülleri ve güller.\nKanayan gülümseme ve neşeli hüzün,\nGül bahçesi gülşen olur gülünce yüzün...',
    year: '1952',
  },
];

interface MasterPoetsSectionProps {
  customMasterPoems?: MasterPoemItem[];
}

export default function MasterPoetsSection({ customMasterPoems = [] }: MasterPoetsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Combine default classics with any poems from database that have specified authors
  const allMasterPoems = [...customMasterPoems, ...DEFAULT_MASTER_POEMS];

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="pt-8 border-t-2 border-[#E6D7BC] space-y-8">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-widest bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300/80 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Üstat Kalemler Antolojisi</span>
        </div>
        
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#362215]">
          Üstat Kalemler
        </h2>

        <p className="text-[#5C4033] text-sm leading-relaxed font-serif italic max-w-xl mx-auto">
          "Türk ve dünya edebiyatının unutulmaz şairlerinden zihne kazınan ölümsüz mısralar."
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMasterPoems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="group relative p-6 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-parchment hover:shadow-cozy hover:border-[#9A3412]/40 transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* TOP POET BADGE & YEAR */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#362215] group-hover:text-[#9A3412] transition-colors">
                        {item.author}
                      </h3>
                      <p className="text-[11px] text-[#785438] font-sans">
                        Şair & Edebiyatçı
                      </p>
                    </div>
                  </div>

                  {item.year && (
                    <span className="text-[11px] font-mono text-amber-900/70 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {item.year}
                    </span>
                  )}
                </div>

                {/* POEM TITLE */}
                <div className="space-y-1">
                  <h4 className="font-serif font-semibold text-lg text-[#5C2E0B]">
                    {item.title}
                  </h4>
                </div>

                {/* STANZA QUOTE BLOCK */}
                <div className="relative pl-4 border-l-2 border-[#9A3412]/50 font-serif italic text-xs sm:text-sm text-[#5C4033] leading-relaxed whitespace-pre-line bg-amber-50/40 p-3 rounded-r-xl border-y border-r border-amber-200/40">
                  <Quote className="w-4 h-4 text-amber-600/30 absolute top-2 right-2 pointer-events-none" />
                  "{isExpanded ? item.excerpt : item.excerpt.slice(0, 140) + (item.excerpt.length > 140 ? '...' : '')}"
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#785438] font-serif italic">
                  — {item.author}
                </span>

                {item.slug ? (
                  <Link
                    href={`/siirler/${item.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#9A3412] hover:underline"
                  >
                    <span>Şiirin Tamamını Oku</span>
                    <Feather className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9A3412] hover:underline"
                  >
                    <span>{isExpanded ? 'Kısalt' : 'Devamını Gör'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
