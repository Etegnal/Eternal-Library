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

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

      setStatusMessage({ type: 'success', text: `"${formData.title}" kitabı ve kapağı başarıyla kaydedildi!` });

      // Reset form
      setFormData({
        title: '',
        author: '',
        year: '1900',
        pages: '100',
        category: 'Klasikler',
        summary: '',
        rating: '4.8',
        isReadable: false,
        content: '',
        buyUrl: '',
      });
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
              {DEFAULT_BOOK_CATEGORIES.map((cat) => (
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
