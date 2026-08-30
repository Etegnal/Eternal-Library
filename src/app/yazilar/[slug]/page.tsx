import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen, User } from 'lucide-react';
import ViewTracker from '@/components/ViewTracker';
import PostCard from '@/components/PostCard';
import BookReader from '@/components/BookReader';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const rawSlug = params.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const cleanSlug = slugify(decodedSlug);

  const article = await prisma.post.findFirst({
    where: {
      type: 'YAZI',
      OR: [
        { slug: rawSlug },
        { slug: decodedSlug },
        { slug: cleanSlug },
      ],
    },
  });

  if (!article) {
    notFound();
  }

  // Fetch 3 related articles
  const relatedArticles = await prisma.post.findMany({
    where: {
      type: 'YAZI',
      id: { not: article.id },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const dateStr = new Date(article.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/yazilar"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#78350F] dark:text-amber-200 bg-[#FEF9EE] dark:bg-[#23120A] hover:bg-[#FDE68A]/60 dark:hover:bg-[#2A150C] border border-[#FDE68A] dark:border-amber-800/60 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F] dark:text-amber-400" />
          <span>Tüm Yazılara Dön</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C4033] dark:text-amber-200/80">
          {article.author && (
            <div className="flex items-center gap-1.5 bg-[#FEF3C7] dark:bg-amber-950/80 px-3 py-1 rounded-full border border-[#FDE68A] dark:border-amber-800/60 text-[#78350F] dark:text-amber-300 font-semibold">
              <User className="w-3.5 h-3.5 text-[#9A3412] dark:text-amber-400" />
              <span>Yazar: {article.author}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-[#FEF3C7] dark:bg-amber-950/80 px-3 py-1 rounded-full border border-[#FDE68A] dark:border-amber-800/60 text-[#78350F] dark:text-amber-300 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#9A3412] dark:text-amber-400" />
            <span>{dateStr}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1.5 bg-[#FEF3C7] dark:bg-amber-950/80 px-3 py-1 rounded-full border border-[#FDE68A] dark:border-amber-800/60 text-[#78350F] dark:text-amber-300 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#9A3412] dark:text-amber-400" />
              <span>{article.readingTime}</span>
            </div>
          )}

          {/* View Counter */}
          <ViewTracker postId={article.id} initialViews={article.views} />
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#362215] dark:text-amber-200 drop-shadow-md leading-tight">
          {article.title}
        </h1>

        <p className="text-[#5C4033] dark:text-white font-serif italic text-lg sm:text-xl leading-relaxed">
          “{article.excerpt}”
        </p>
      </div>

      {/* BOOK READER WITH PAGE FLIPPING & BOOKMARK PROGRESS */}
      <BookReader
        postId={article.id}
        content={article.content}
        initialLikes={article.likes}
        postType="YAZI"
        author={article.author}
        dateStr={dateStr}
      />

      {/* RELATED ARTICLES RECOMMENDATION SECTION */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 border-b border-[#E6D7BC] dark:border-[#3D2214] pb-3">
            <BookOpen className="w-5 h-5 text-[#9A3412] dark:text-amber-400" />
            <h2 className="font-serif font-bold text-2xl text-[#362215] dark:text-amber-200">
              Bunu da İnceleyin: Diğer Yazılar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((relArticle) => (
              <PostCard key={relArticle.id} post={relArticle} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
