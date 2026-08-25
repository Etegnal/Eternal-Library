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
    <div className="relative min-h-screen bg-[#FEF8EC] overflow-x-hidden">
      
      {/* 1. FULL PAGE LIVING CABIN HERO SECTION */}
      <CozyHero initialQuote={todayQuote} />

      {/* 2. SMOOTH GRADIENT TRANSITION TO PARCHMENT SECTION BELOW HERO */}
      <div className="relative w-full h-12 sm:h-16 z-20 pointer-events-none bg-gradient-to-b from-[#1F0F07] via-[#FEF8EC]/60 to-[#FEF8EC]" />

      {/* 3. VINTAGE PARCHMENT SECTION WITH YAZILAR / ŞİİRLER TOGGLE */}
      <HomepageParchment
        latestArticles={latestArticles}
        featuredPoems={featuredPoems}
      />

    </div>
  );
}
