'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Feather, BookOpen, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/slug';

function NewPostForm() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'YAZI' | 'SIIR'>('YAZI');
  const [coverImage, setCoverImage] = useState('');
  const [readingTime, setReadingTime] = useState('3 dk okuma');
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const qType = searchParams.get('type');
    const qTitle = searchParams.get('title');
    const qAuthor = searchParams.get('author');
    const qContent = searchParams.get('content');

    if (qType === 'SIIR' || qType === 'YAZI') setType(qType);
    if (qTitle) {
      setTitle(qTitle);
      setSlug(slugify(qTitle));
    }
    if (qAuthor) setAuthor(qAuthor);
    if (qContent) {
      setContent(qContent);
      setExcerpt(qContent.slice(0, 120) + (qContent.length > 120 ? '...' : ''));
    }
  }, [searchParams]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          author,
          excerpt,
          content,
          type,
          coverImage,
          readingTime,
          publishedAt,
        }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'İçerik kaydedilemedi');
      }
    } catch (e) {
      console.error(e);
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cozy-amber-dark hover:text-cozy-amber transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Yönetim Paneline Dön</span>
        </Link>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] dark:bg-[#1E110A] border-2 border-[#E5D5B7] dark:border-amber-900/60 shadow-fire space-y-6 text-cozy-coffee dark:text-amber-100">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl border-b border-cozy-parchment-border dark:border-amber-900/40 pb-4">
          Yeni İçerik Ekle (Yazı / Şiir)
        </h1>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Content Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase mb-2">
              İçerik Türü
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setType('YAZI')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  type === 'YAZI'
                    ? 'bg-cozy-amber text-cozy-wood border-cozy-amber shadow-md'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-cozy-coffee dark:text-amber-200 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Yazı / Deneme</span>
              </button>

              <button
                type="button"
                onClick={() => setType('SIIR')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  type === 'SIIR'
                    ? 'bg-cozy-amber text-cozy-wood border-cozy-amber shadow-md'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-cozy-coffee dark:text-amber-200 border-amber-200 dark:border-amber-800 hover:bg-amber-100'
                }`}
              >
                <Feather className="w-4 h-4" />
                <span>Şiir</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Başlık
            </label>
            <input
              type="text"
              required
              placeholder="İçerik başlığı..."
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
            />
          </div>

          {/* Author (Şair / Yazar) */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cozy-amber" />
              <span>Şair / Yazar (Kimden Yazıldığı)</span>
            </label>
            <input
              type="text"
              placeholder={type === 'SIIR' ? 'Şair adı (örn: Ahmet Murat, Cahit Zarifoğlu...)' : 'Yazar adı...'}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              URL Bağlantısı (Slug)
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm font-mono focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
            />
          </div>

          {/* Date Picker (Yayın Tarihi) */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cozy-amber" />
              <span>Yayın Tarihi</span>
            </label>
            <input
              type="date"
              required
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              Özet / Kısa Açıklama
            </label>
            <textarea
              required
              rows={2}
              placeholder="Ana sayfada gösterilecek kısa alıntı veya özet..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
            />
          </div>

          {/* Cover Image & Reading Time */}
          {type === 'YAZI' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Kapak Görsel URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Okuma Süresi
                </label>
                <input
                  type="text"
                  placeholder="4 dk okuma"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1">
              İçerik (Metin / Şiir Mısraları)
            </label>
            <textarea
              required
              rows={12}
              placeholder={
                type === 'SIIR'
                  ? 'Şiir mısralarını buraya yazın...'
                  : 'Yazı içeriğini buraya yazın...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm font-serif focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-amber-950/30 leading-relaxed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Kaydediliyor...' : 'Yayınla ve Kaydet'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewPostPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-cozy-coffee font-medium">Yükleniyor...</div>}>
      <NewPostForm />
    </Suspense>
  );
}
