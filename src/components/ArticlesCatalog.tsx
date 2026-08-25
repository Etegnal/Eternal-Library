'use client';

import React, { useState, useMemo } from 'react';
import PostCard, { PostItem } from '@/components/PostCard';
import { Search, BookOpen } from 'lucide-react';

interface ArticlesCatalogProps {
  articles: PostItem[];
}

const CATEGORIES = [
  'Tümü',
  'Felsefe & Düşünce',
  'Edebiyat & Kültür',
  'Sanat & Hayat',
  'Deneme & Eleştiri',
];

export default function ArticlesCatalog({ articles }: ArticlesCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // 1. Search Query Filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category Filter (match category or show all)
      let matchesCategory = true;
      if (selectedCategory !== 'Tümü') {
        const textToSearch = (article.title + ' ' + article.excerpt).toLowerCase();
        if (selectedCategory === 'Felsefe & Düşünce') {
          matchesCategory = textToSearch.includes('felsefe') || textToSearch.includes('düşünce') || textToSearch.includes('stoa') || textToSearch.includes('akıl');
        } else if (selectedCategory === 'Edebiyat & Kültür') {
          matchesCategory = textToSearch.includes('edebiyat') || textToSearch.includes('roman') || textToSearch.includes('kültür') || textToSearch.includes('yazar');
        } else if (selectedCategory === 'Sanat & Hayat') {
          matchesCategory = textToSearch.includes('sanat') || textToSearch.includes('hayat') || textToSearch.includes('resim') || textToSearch.includes('estetik');
        } else if (selectedCategory === 'Deneme & Eleştiri') {
          matchesCategory = textToSearch.includes('deneme') || textToSearch.includes('eleştiri') || textToSearch.includes('inceleme');
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* 3. ARAMA VE FİLTRELEME BÖLÜMÜNÜN TEMİZLİĞİ */}
      <div className="space-y-4">
        
        {/* SADE ARAMA ÇUBUĞU */}
        <div className="w-full max-w-2xl mx-auto mb-6 relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Yazı başlığı, yazar veya içerik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-stone-200 placeholder:text-stone-500 focus:border-amber-500/40 focus:outline-none w-full text-sm transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-stone-400 hover:text-stone-200 bg-white/5 px-2 py-1 rounded-lg"
            >
              Temizle
            </button>
          )}
        </div>

        {/* FİLTRE BUTONLARI (Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-transparent text-stone-400 hover:text-stone-200 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* 1. KART GRID VE EŞİT YÜKSEKLİK MİMARİSİ (auto-rows-fr items-stretch) */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr items-stretch">
          {filteredArticles.map((article) => (
            <PostCard key={article.id} post={article} />
          ))}
        </div>
      ) : (
        /* EMPTY SEARCH STATE */
        <div className="p-12 text-center bg-[#130f0c]/90 rounded-2xl border border-amber-900/20 space-y-3">
          <BookOpen className="w-8 h-8 text-amber-500/60 mx-auto" />
          <p className="text-stone-200 font-serif text-lg">Aramanızla eşleşen bir yazı bulunamadı.</p>
          <p className="text-xs text-stone-400">Lütfen arama terimlerinizi veya filtreleri değiştirip tekrar deneyin.</p>
        </div>
      )}

    </div>
  );
}
