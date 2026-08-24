import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen, Share2 } from 'lucide-react';

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

  const dateStr = new Date(article.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/yazilar"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cozy-amber-dark hover:text-cozy-amber transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Yazılara Dön</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-4 text-xs text-cozy-coffee-light">
          <div className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
            <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark" />
            <span>{dateStr}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-cozy-amber-dark" />
              <span>{article.readingTime}</span>
            </div>
          )}
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-cozy-coffee leading-tight">
          {article.title}
        </h1>

        <p className="text-cozy-coffee-light font-serif italic text-lg sm:text-xl leading-relaxed">
          “{article.excerpt}”
        </p>
      </div>

      {/* Featured Cover Image */}
      {article.coverImage && (
        <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-cozy border border-cozy-parchment-border">
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
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment text-cozy-coffee">
        <div className="prose prose-stone lg:prose-lg max-w-none font-sans leading-relaxed text-cozy-coffee space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif font-bold text-2xl text-cozy-coffee pt-4 border-b border-amber-200 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-cozy-amber pl-4 italic font-serif text-lg text-cozy-coffee-light bg-amber-50/50 p-4 rounded-r-xl">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="text-base sm:text-lg leading-relaxed text-cozy-coffee/90">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
