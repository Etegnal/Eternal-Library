import React from 'react';
import CozyHero from '@/components/CozyHero';
import HomepageParchment from '@/components/HomepageParchment';
import { getTodayQuote } from '@/lib/quotes';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const todayQuote = await getTodayQuote();

  let latestArticles: any[] = [];
  try {
    latestArticles = await prisma.post.findMany({
      where: { type: 'YAZI', isFeatured: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });

    if (latestArticles.length === 0) {
      latestArticles = await prisma.post.findMany({
        where: { type: 'YAZI' },
        orderBy: { publishedAt: 'desc' },
        take: 4,
      });
    }
  } catch (e) {
    console.error("Error fetching articles:", e);
  }

  let featuredPoems: any[] = [];
  try {
    featuredPoems = await prisma.post.findMany({
      where: { type: 'SIIR', isFeatured: true },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });

    if (featuredPoems.length === 0) {
      featuredPoems = await prisma.post.findMany({
        where: { type: 'SIIR' },
        orderBy: { publishedAt: 'desc' },
        take: 4,
      });
    }
  } catch (e) {
    console.error("Error fetching poems:", e);
  }

  return (
    <div className="relative min-h-screen bg-[#FEF8EC]">
      
      {/* 1. LIVING VIDEO HERO SECTION WITH FULL-WIDTH CABIN & ETERNAL LIBRARY BRANDING */}
      <CozyHero initialQuote={todayQuote} />

      {/* TORN PAPER DECKLE EDGE TRANSITION */}
      <div className="relative w-full -mt-8 sm:-mt-12 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full h-12 sm:h-20 text-[#FEF8EC] fill-current">
          <path d="M0,32 L48,42.7 C96,53,192,75,288,74.7 C384,75,480,53,576,42.7 C672,32,768,32,864,42.7 C960,53,1056,75,1152,69.3 C1248,64,1344,32,1392,16 L1440,0 L1440,80 L1392,80 C1344,80,1248,80,1152,80 C1056,80,960,80,864,80 C480,80,384,80,288,80 C192,80,96,80,48,80 L0,80 Z"></path>
        </svg>
      </div>

      {/* 2. AUTHENTIC VINTAGE PARCHMENT SECTION WITH YAZILAR / ŞİİRLER TOGGLE */}
      <HomepageParchment
        latestArticles={latestArticles}
        featuredPoems={featuredPoems}
      />

    </div>
  );
}
