'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PenTool, Feather, Clock, CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';

export interface UserSubmissionItem {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  status: 'PUBLISHED' | 'PENDING';
  publishedUrl?: string;
  createdAt: Date | string;
}

interface UserSubmissionsSectionProps {
  submissions: UserSubmissionItem[];
}

export default function UserSubmissionsSection({ submissions }: UserSubmissionsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'PUBLISHED' | 'PENDING'>('all');

  const publishedList = submissions.filter((s) => s.status === 'PUBLISHED');
  const pendingList = submissions.filter((s) => s.status === 'PENDING');

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
      
      {/* HEADER & NEW SUBMISSION ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6D7BC]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/80 border border-amber-300/60 text-amber-900">
              <PenTool className="w-5 h-5 text-[#9A3412]" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
              Benim Kalemimden
            </h2>
          </div>
          <p className="text-xs text-[#5C4033] font-sans">
            Gönderdiğiniz, onay bekleyen ve kütüphanede yayınlanan tüm eserleriniz.
          </p>
        </div>

        <Link
          href="/iletisim"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center justify-center gap-2 border border-amber-500/40 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Yeni Eser Gönder</span>
        </Link>
      </div>

      {/* FILTER TABS */}
      {submissions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
                : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tüm Eserlerim ({submissions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('PUBLISHED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              filter === 'PUBLISHED'
                ? 'bg-emerald-700 text-white border-emerald-600 shadow-md'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Yayında ({publishedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              filter === 'PENDING'
                ? 'bg-amber-700 text-white border-amber-600 shadow-md'
                : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 border-amber-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Bekleyen / İncelemede ({pendingList.length})</span>
          </button>
        </div>
      )}

      {/* SUBMISSIONS LIST */}
      {filteredSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {filteredSubmissions.map((item) => {
            const isPublished = item.status === 'PUBLISHED';
            const dateStr = new Date(item.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="group relative p-5 rounded-2xl bg-[#FEFBF3] border-2 border-[#E8DCC4] shadow-sm hover:shadow-cozy hover:border-[#9A3412]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Status & Date */}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] border ${
                        isPublished
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Yayında</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
                          <span>Editör İncelemesinde</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] text-[#785438] font-mono">
                      {dateStr}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-lg text-[#362215] group-hover:text-[#9A3412] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-serif italic text-xs text-[#5C4033] line-clamp-2 leading-relaxed pl-3 border-l-2 border-amber-600/40">
                    "{item.excerpt}"
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#785438] font-sans">
                    {isPublished ? 'Sitede yayında olan eseriniz' : 'Onay süreci devam ediyor'}
                  </span>

                  {isPublished && item.publishedUrl ? (
                    <Link
                      href={item.publishedUrl}
                      className="inline-flex items-center gap-1 font-bold text-[#9A3412] hover:underline"
                    >
                      <span>Sitede Gör</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/60 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Bekliyor
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300/60">
            <Feather className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif font-bold text-lg text-[#362215]">
              Henüz Bir Eser Göndermediniz
            </h3>
            <p className="text-xs text-[#5C4033] leading-relaxed">
              Kaleminizden dökülen şiir veya denemeleri dijital kütüphanemizde yayınlanmak üzere editörlerimize ulaştırabilirsiniz.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/iletisim"
              className="px-5 py-2.5 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>İlk Eserinizi Gönderin</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
