'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Feather, Sparkles, Quote, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';

export interface MasterPoetData {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  year?: string | null;
}

interface MasterPoetsSectionProps {
  masterPoets: MasterPoetData[];
  isAdmin?: boolean;
}

export default function MasterPoetsSection({ masterPoets = [], isAdmin = false }: MasterPoetsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          "Edebiyatımızın ölümsüz şairlerinden zihne kazınan unutulmaz mısralar."
        </p>
      </div>

      {/* CARDS GRID OR EMPTY STATE */}
      {masterPoets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterPoets.map((item) => {
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
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                        {item.author.charAt(0).toUpperCase()}
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
                  <div className="relative pl-4 border-l-2 border-[#9A3412]/50 font-serif italic text-xs sm:text-sm text-[#5C4033] leading-relaxed whitespace-pre-line bg-amber-50/40 p-3.5 rounded-r-xl border-y border-r border-amber-200/40">
                    <Quote className="w-4 h-4 text-amber-600/30 absolute top-2 right-2 pointer-events-none" />
                    "{isExpanded ? item.excerpt : item.excerpt.slice(0, 140) + (item.excerpt.length > 140 ? '...' : '')}"
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#785438] font-serif italic">
                    — {item.author}
                  </span>

                  {item.excerpt.length > 140 && (
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
      ) : (
        /* EMPTY STATE WHEN NO MASTER POETS ARE ADDED YET */
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-amber-50/60 border-2 border-amber-200/80 space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300">
            <Feather className="w-6 h-6 text-amber-700" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#362215]">
              Henüz Üstat Şiir Eklenmedi
            </h3>
            <p className="text-xs text-[#5C4033] leading-relaxed max-w-md mx-auto">
              Admin panelinden sevdiğiniz şair ve mısraları ekleyerek bu seçki alanını doldurabilirsiniz.
            </p>
          </div>

          {isAdmin && (
            <div className="pt-2 flex justify-center">
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Admin Paneline Git & Üstat Şiir Ekle</span>
              </Link>
            </div>
          )}
        </div>
      )}

    </section>
  );
}
