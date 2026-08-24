import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import ViewTracker from '@/components/ViewTracker';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const article = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!article || article.type !== 'YAZI') {
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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/yazilar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cozy-amber-dark dark:text-amber-400 hover:text-cozy-amber dark:hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Yazılara Dön</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-cozy-coffee-light dark:text-amber-200">
          <div className="flex items-center gap-1.5 bg-amber-100/80 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700">
            <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark dark:text-amber-400" />
            <span>{dateStr}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1.5 bg-amber-100/80 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-700">
              <Clock className="w-3.5 h-3.5 text-cozy-amber-dark dark:text-amber-400" />
              <span>{article.readingTime}</span>
            </div>
          )}

          {/* View Counter with 👁️ Emoji */}
          <ViewTracker postId={article.id} initialViews={article.views} />
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-cozy-coffee dark:text-amber-300 leading-tight">
          {article.title}
        </h1>

        <p className="text-cozy-coffee-light dark:text-amber-100/90 font-serif italic text-lg sm:text-xl leading-relaxed">
          “{article.excerpt}”
        </p>
      </div>

      {/* Featured Cover Image */}
      {article.coverImage && (
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-cozy border border-cozy-parchment-border dark:border-[#5C3119]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] dark:bg-[#23120A] border border-[#E6D7BC] dark:border-[#5C3119] shadow-parchment text-cozy-coffee dark:text-amber-100 space-y-8">
        <div className="prose prose-stone dark:prose-invert lg:prose-lg max-w-none font-sans leading-relaxed text-cozy-coffee dark:text-amber-100 space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif font-bold text-2xl text-cozy-coffee dark:text-amber-300 pt-4 border-b border-amber-200 dark:border-amber-800 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-cozy-amber pl-4 italic font-serif text-lg text-cozy-coffee-light dark:text-amber-200 bg-amber-50/50 dark:bg-amber-950/40 p-4 rounded-r-xl">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg leading-relaxed text-cozy-coffee/90 dark:text-amber-100/90">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* LIKE HEART BUTTON AT BOTTOM OF ARTICLE */}
        <div className="pt-8 border-t border-cozy-parchment-border dark:border-[#5C3119] text-center">
          <LikeButton postId={article.id} initialLikes={article.likes} />
        </div>
      </div>

      {/* RELATED ARTICLES RECOMMENDATION SECTION */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 border-b-2 border-cozy-amber/30 dark:border-amber-700/50 pb-3">
            <BookOpen className="w-5 h-5 text-cozy-amber" />
            <h2 className="font-serif font-bold text-2xl text-cozy-coffee dark:text-amber-300">
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
