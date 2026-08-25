import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import ViewTracker from '@/components/ViewTracker';
import PostCard from '@/components/PostCard';

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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/yazilar"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#78350F] bg-[#FEF9EE] hover:bg-[#FDE68A]/60 border border-[#FDE68A] shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span>Tüm Yazılara Dön</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#5C4033]">
          <div className="flex items-center gap-1.5 bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A] text-[#78350F] font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#9A3412]" />
            <span>{dateStr}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1.5 bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A] text-[#78350F] font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>{article.readingTime}</span>
            </div>
          )}

          {/* View Counter */}
          <ViewTracker postId={article.id} initialViews={article.views} />
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#362215] leading-tight">
          {article.title}
        </h1>

        <p className="text-[#5C4033] font-serif italic text-lg sm:text-xl leading-relaxed">
          “{article.excerpt}”
        </p>
      </div>

      {/* Featured Cover Image */}
      {article.coverImage && (
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-cozy border border-[#E6D7BC]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content - Light Parchment */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-[#362215] space-y-8">
        <div className="prose lg:prose-lg max-w-none font-sans leading-relaxed text-[#362215] space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif font-bold text-2xl text-[#362215] pt-4 border-b border-[#E6D7BC] pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-[#9A3412] pl-4 italic font-serif text-lg text-[#5C4033] bg-[#FEF9EE] p-4 rounded-r-xl border border-r border-t border-b border-[#FDE68A]/60">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg leading-relaxed text-[#362215]">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* LIKE HEART BUTTON AT BOTTOM OF ARTICLE */}
        <div className="pt-8 border-t border-[#E6D7BC] text-center">
          <LikeButton postId={article.id} initialLikes={article.likes} />
        </div>
      </div>

      {/* RELATED ARTICLES RECOMMENDATION SECTION */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 border-b border-[#E6D7BC] pb-3">
            <BookOpen className="w-5 h-5 text-[#9A3412]" />
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
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
