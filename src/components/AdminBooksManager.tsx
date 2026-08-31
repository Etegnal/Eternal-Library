'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BookOpen, Upload, Plus, CheckCircle, AlertCircle, Star, Calendar, FileText, Tag, Sparkles } from 'lucide-react';
import { DEFAULT_BOOK_CATEGORIES } from '@/lib/categories';

export default function AdminBooksManager() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '1900',
    pages: '100',
    category: DEFAULT_BOOK_CATEGORIES[0],
    summary: '',
    rating: '4.8',
    isReadable: false,
    content: '',
    buyUrl: '',
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>(DEFAULT_BOOK_CATEGORIES);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  // AUTO-FETCH STATE (Kitapyurdu Scraper + LLM AI Content Generator)
  const [autoQuery, setAutoQuery] = useState('');
  const [isFetchingAuto, setIsFetchingAuto] = useState(false);
  const [autoStatusMessage, setAutoStatusMessage] = useState<string | null>(null);

  // Fetch unique categories from DB to enrich the category pool
  React.useEffect(() => {
    fetch('/api/admin/books')
      .then((res) => res.json())
      .then((books) => {
        if (Array.isArray(books)) {
          const dbCats = books.map((b: any) => b.category).filter(Boolean);
          const combined = Array.from(new Set([...DEFAULT_BOOK_CATEGORIES, ...dbCats]));
          setAvailableCategories(combined);
        }
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFetchAutoData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoQuery.trim()) {
      setStatusMessage({ type: 'error', text: 'Lütfen aramak istediğiniz kitap adını girin.' });
      return;
    }

    setIsFetchingAuto(true);
    setAutoStatusMessage("Kitapyurdu'ndan künye verileri çekiliyor ve LLM ile detaylı özet hazırlanıyor...");
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/fetch-book-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: autoQuery.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kitap verileri çekilemedi.');
      }

      // Add fetched genre to available categories pool if custom
      if (data.genre) {
        setAvailableCategories((prev) => Array.from(new Set([...prev, data.genre])));
      }

      // Parse float rating (e.g., "4.7 / 5" -> "4.7")
      let numericRating = '4.8';
      if (data.rating) {
        const match = data.rating.match(/(\d+\.?\d*)/);
        if (match) numericRating = match[1];
      }

      // Populate Form Fields cleanly without header prefixes
      setFormData({
        title: data.title || autoQuery,
        author: data.author || '',
        year: data.original_publish_year || '2003',
        pages: data.page_count || '300',
        category: data.genre || 'Klasikler',
        summary: data.editor_review || '', // Pure Editorial Review text only
        rating: numericRating,
        isReadable: true,
        content: data.summary || '', // Pure Full-Text Plot Summary for Read Mode
        buyUrl: data.product_url || '',
      });

      if (data.cover_image_url) {
        setCoverPreview(data.cover_image_url);
      }

      setStatusMessage({
        type: 'success',
        text: `"${data.title}" için veriler Kitapyurdu & LLM ile başarıyla çekildi ve forma aktarıldı!`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Kitap verileri çekilirken bir hata oluştu.' });
    } finally {
      setIsFetchingAuto(false);
      setAutoStatusMessage(null);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setCoverFile(file);
    const objectUrl = URL.createObjectURL(file);
    setCoverPreview(objectUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setStatusMessage({ type: 'error', text: 'Lütfen başlık ve yazar alanlarını doldurun.' });
      return;
    }

    const finalCategory = isCustomCategory ? (customCategory.trim() || 'Klasikler') : formData.category;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('year', formData.year);
      data.append('pages', formData.pages);
      data.append('category', finalCategory);
      data.append('summary', formData.summary);
      data.append('rating', formData.rating);
      data.append('isReadable', formData.isReadable ? 'true' : 'false');
      data.append('content', formData.content);
      data.append('buyUrl', formData.buyUrl);

      if (coverFile) {
        data.append('cover', coverFile);
      }

      const res = await fetch('/api/admin/books', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Kitap kaydedilirken hata oluştu.');
      }

      // Add finalCategory to available categories pool dynamically
      setAvailableCategories((prev) => Array.from(new Set([...prev, finalCategory])));

      setStatusMessage({ type: 'success', text: `"${formData.title}" kitabı ve kapağı başarıyla kaydedildi!` });

      // Reset form
      setFormData({
        title: '',
        author: '',
        year: '1900',
        pages: '100',
        category: finalCategory,
        summary: '',
        rating: '4.8',
        isReadable: false,
        content: '',
        buyUrl: '',
      });
      setIsCustomCategory(false);
      setCustomCategory('');
      setCoverFile(null);
      setCoverPreview(null);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Bir hata oluştu.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-fire">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#E6D7BC] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              <BookOpen className="w-5 h-5 text-[#9A3412]" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
              Yeni Eser & Kapak Yükleme
            </h2>
          </div>
          <p className="text-xs text-[#5C4033] font-sans">
            Mutlak Kitaplık için yeni başyapıt ekleyin. Yüklenen kapak görselleri otomatik olarak <code className="font-mono text-amber-900 bg-amber-100/80 px-1.5 py-0.5 rounded">public/covers/[slug].jpg</code> olarak saklanır.
          </p>
        </div>
      </div>

      {/* AUTOMATED KITAPYURDU SCRAPER + LLM WIDGET BOX */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-[#23120A] to-amber-900 border border-amber-500/40 text-amber-100 shadow-cozy space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <h3 className="font-serif font-bold text-sm text-amber-200 uppercase tracking-wider">
              Otomatik Kitap Bilgisi Çek & Doldur (Kitapyurdu + LLM AI)
            </h3>
          </div>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-mono">
            Scraper + LLM
          </span>
        </div>

        <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
          Sadece kitap adını girin. Sistem Kitapyurdu'ndan doğrulanmış sayfa sayısı, yayınevi ve kapak görselini çekecek; yapay zeka ile tam metin özeti ve editoryal analizi oluşturup aşağıdaki forma otomatik aktaracaktır.
        </p>

        <form onSubmit={handleFetchAutoData} className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <input
            type="text"
            value={autoQuery}
            onChange={(e) => setAutoQuery(e.target.value)}
            placeholder="Aramak istediğiniz kitap adı (Örn: Dune, Parlayan Sözler, Simyacı)..."
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-[#1A0D06] border border-amber-600/50 text-xs font-serif text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            disabled={isFetchingAuto}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-950" />
            <span>{isFetchingAuto ? 'Getiriliyor...' : 'Kitap Bilgilerini Getir'}</span>
          </button>
        </form>

        {isFetchingAuto && (
          <div className="flex items-center gap-2 text-xs text-amber-300 font-mono pt-1 animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
            <span>{autoStatusMessage || 'İçerik hazırlanıyor...'}</span>
          </div>
        )}
      </div>

      {/* STATUS NOTIFICATION */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* DRAG AND DROP COVER UPLOAD AREA */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#8B4513] uppercase tracking-wider">
            Kitap Kapak Görseli (Sürükle-Bırak)
          </label>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-amber-300/80 hover:border-amber-600 rounded-2xl p-6 text-center bg-amber-50/40 transition-colors cursor-pointer relative flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {coverPreview ? (
              <div className="relative w-28 h-40 rounded-xl overflow-hidden shadow-lg border border-amber-300 shrink-0 bg-amber-950">
                <Image src={coverPreview} alt="Kapak Önizleme" fill unoptimized className="object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center border border-amber-300 shrink-0">
                <Upload className="w-8 h-8 text-[#9A3412]" />
              </div>
            )}

            <div className="space-y-1 text-left">
              <p className="text-xs font-bold text-[#362215]">
                {coverFile ? coverFile.name : 'Kapak görselini buraya sürükleyin veya dosya seçin'}
              </p>
              <p className="text-[11px] text-[#5C4033]">
                Yüklenen görsel <code className="font-mono text-amber-900">public/covers/[slug].jpg</code> yoluna kaydedilecektir. (PNG, JPG, WEBP)
              </p>
            </div>
          </div>
        </div>

        {/* METADATA FIELDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">Eser Başlığı *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Örn: Dönüşüm"
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-serif font-bold text-[#362215] focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">Yazar *</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Örn: Franz Kafka"
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-serif font-bold text-[#362215] focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">İlk Yayın Yılı (MÖ için eksi örn: -375)</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">Sayfa Sayısı</label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">Kategori / Tür (Standart Havuz) *</label>
            <select
              value={isCustomCategory ? 'CUSTOM' : formData.category}
              onChange={(e) => {
                if (e.target.value === 'CUSTOM') {
                  setIsCustomCategory(true);
                } else {
                  setIsCustomCategory(false);
                  setFormData({ ...formData, category: e.target.value });
                }
              }}
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="CUSTOM">+ Özel Kategori / Tür Gir...</option>
            </select>

            {isCustomCategory && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Özel Kategori Adı (Örn: Tarih & Roman)..."
                className="w-full mt-2 p-2.5 rounded-xl bg-amber-100/80 border border-amber-400 text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-700 animate-fadeIn"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">Puan / Derecelendirme (1.0 - 5.0)</label>
            <input
              type="number"
              step="0.1"
              max="5.0"
              min="1.0"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
            />
          </div>

        </div>

        {/* SUMMARY */}
        <div>
          <label className="block text-xs font-bold text-[#8B4513] mb-1">Editör İncelemesi & Özet</label>
          <textarea
            rows={3}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Kitap hakkındaki editör incelemesi ve edebi değerlendirme..."
            className="w-full p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] leading-relaxed focus:outline-none focus:border-amber-600 font-sans"
          />
        </div>

        {/* BUY URL */}
        <div>
          <label className="block text-xs font-bold text-[#8B4513] mb-1">Satın Alma / Mağaza Linki (Opsiyonel URL)</label>
          <input
            type="url"
            value={formData.buyUrl}
            onChange={(e) => setFormData({ ...formData, buyUrl: e.target.value })}
            placeholder="https://www.amazon.com.tr/... veya https://www.bkmkitap.com/..."
            className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] focus:outline-none focus:border-amber-600 font-mono"
          />
        </div>

        {/* READABLE TOGGLE CHECKBOX */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-100/60 border border-amber-200/80">
          <input
            type="checkbox"
            id="isReadable"
            checked={formData.isReadable}
            onChange={(e) => setFormData({ ...formData, isReadable: e.target.checked })}
            className="w-4 h-4 accent-amber-800 rounded cursor-pointer"
          />
          <label htmlFor="isReadable" className="text-xs font-bold text-[#362215] cursor-pointer">
            Tam Metin Okuma Modu Aktif (Kitap sitede doğrudan okunabilsin)
          </label>
        </div>

        {/* FULL TEXT (OPTIONAL) */}
        {formData.isReadable && (
          <div>
            <label className="block text-xs font-bold text-[#8B4513] mb-1">
              Tam Metin İçeriği (Sayfaları ayırmak için <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">---</code> kullanın)
            </label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="1. Bölüm metni... &#10;--- &#10;2. Bölüm metni..."
              className="w-full p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] font-serif leading-relaxed focus:outline-none focus:border-amber-600"
            />
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#5C2E0B] hover:to-[#78350F] text-amber-100 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Kaydediliyor...</span>
            ) : (
              <>
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Kitabı ve Kapağı Kaydet</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
