import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import CardBadges from '@/components/CardBadges';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author?: string | null;
    coverImage?: string | null;
    readingTime?: string | null;
    publishedAt: Date | string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="relative group flex flex-col bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] overflow-hidden shadow-parchment hover:shadow-cozy transition-all duration-300 hover:-translate-y-1">
      
      {/* Read & Like Badges in Top Right */}
      <CardBadges postId={post.id} />

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-amber-950">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cozy-wood/60 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 bg-cozy-wood/80 backdrop-blur-md text-amber-200 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 border border-amber-800/40">
            <BookOpen className="w-3 h-3 text-cozy-amber" />
            <span>Deneme & Yazı</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-cozy-coffee-light mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cozy-amber-dark" />
              <span>{dateStr}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cozy-amber-dark" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-cozy-coffee group-hover:text-cozy-amber-dark transition-colors line-clamp-2 mb-2">
            <Link href={`/yazilar/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-[#5C4033] text-sm leading-relaxed line-clamp-3 mb-4 font-sans">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Footer Link */}
        <div className="pt-4 border-t border-cozy-parchment-border flex items-center justify-between">
          <span className="text-xs text-cozy-coffee-light italic">
            {post.author ? `— ${post.author}` : ''}
          </span>
          <Link
            href={`/yazilar/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cozy-amber-dark group-hover:text-cozy-amber transition-colors"
          >
            <span>Devamını Oku</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
