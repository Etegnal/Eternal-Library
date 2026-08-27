'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Edit, Trash2, Plus, Search, CheckCircle, AlertCircle, Upload, X, Star, BookCheck, Eye, RefreshCw, Calendar, FileText, Tag, Sparkles } from 'lucide-react';
import BookReaderModal from '@/components/BookReaderModal';
import { DEFAULT_BOOK_CATEGORIES } from '@/lib/categories';

export interface AdminBookItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  category: string;
  summary: string;
  rating: number;
  isReadable: boolean;
  coverUrl: string;
  buyUrl?: string | null;
  createdAt?: string;
  bookPages?: { pageNumber: number; content: string }[];
}

export default function AdminBooksListManager() {
  const [books, setBooks] = useState<AdminBookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit Modal State
  const [editingBook, setEditingBook] = useState<AdminBookItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    year: '',
    pages: '',
    category: DEFAULT_BOOK_CATEGORIES[0],
    summary: '',
    rating: '4.8',
    isReadable: false,
    content: '',
    buyUrl: '',
  });

  const [isEditCustomCategory, setIsEditCustomCategory] = useState(false);
  const [editCustomCategory, setEditCustomCategory] = useState('');

  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editCoverPreview, setEditCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview Reader Modal
  const [previewReadingBook, setPreviewReadingBook] = useState<AdminBookItem | null>(null);

  // Load books from API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/books');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBooks(data);
      }
    } catch (err) {
      console.error('Failed to fetch admin books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Edit Click
  const handleOpenEdit = async (book: AdminBookItem) => {
    setEditingBook(book);
    setEditCoverFile(null);
    setEditCoverPreview(book.coverUrl);

    const isPreset = DEFAULT_BOOK_CATEGORIES.includes(book.category);
    if (isPreset) {
      setIsEditCustomCategory(false);
      setEditCustomCategory('');
    } else {
      setIsEditCustomCategory(true);
      setEditCustomCategory(book.category);
    }

    // Fetch full book pages content if available
    let contentText = '';
    try {
      const res = await fetch(`/api/admin/books/${book.id}`);
      const detailed = await res.json();
      if (detailed && detailed.bookPages && detailed.bookPages.length > 0) {
        contentText = detailed.bookPages.map((p: any) => p.content).join('\n\n---\n\n');
      }
    } catch {
      // ignore
    }

    setEditFormData({
      title: book.title,
      author: book.author,
      year: book.year.toString(),
      pages: book.pages.toString(),
      category: isPreset ? book.category : DEFAULT_BOOK_CATEGORIES[0],
      summary: book.summary,
      rating: book.rating.toString(),
      isReadable: book.isReadable,
      content: contentText,
      buyUrl: book.buyUrl || '',
    });
  };

  // Handle Cover File Change for Edit
  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setEditCoverFile(file);
    setEditCoverPreview(URL.createObjectURL(file));
  };

  // Submit Edit Form
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    const finalCategory = isEditCustomCategory ? (editCustomCategory.trim() || 'Klasikler') : editFormData.category;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append('title', editFormData.title);
      data.append('author', editFormData.author);
      data.append('year', editFormData.year);
      data.append('pages', editFormData.pages);
      data.append('category', finalCategory);
      data.append('summary', editFormData.summary);
      data.append('rating', editFormData.rating);
      data.append('isReadable', editFormData.isReadable ? 'true' : 'false');
      data.append('content', editFormData.content);
      data.append('buyUrl', editFormData.buyUrl);

      if (editCoverFile) {
        data.append('cover', editCoverFile);
      }

      const res = await fetch(`/api/admin/books/${editingBook.id}`, {
        method: 'PUT',
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Kitap güncellenirken hata oluştu.');
      }

      setStatusMessage({
        type: 'success',
        text: `"${editFormData.title}" eseri başarıyla güncellendi!`,
      });

      setEditingBook(null);
      fetchBooks();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Güncelleme hatası' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Book
  const handleDeleteBook = async (book: AdminBookItem) => {
    if (!confirm(`"${book.title}" eserini silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/books/${book.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Silme işlemi başarısız');
      }

      setStatusMessage({ type: 'success', text: `"${book.title}" eseri silindi.` });
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Silinemedi' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* STATUS NOTIFICATION */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-stone-500 hover:text-stone-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP CONTROL BAR: SEARCH & ADD NEW BOOK BUTTON */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-amber-800/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap başlığı, yazar veya kategori ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] placeholder:text-stone-400 focus:outline-none focus:border-amber-600"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchBooks}
            className="p-2.5 rounded-xl bg-amber-100/60 hover:bg-amber-100 text-[#78350F] border border-amber-200 transition-colors"
            title="Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/admin/books/add"
            className="px-4 py-2.5 rounded-xl bg-[#78350F] hover:bg-[#5C2E0B] text-amber-100 font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Yeni Eser Ekle</span>
          </Link>
        </div>

      </div>

      {/* BOOKS TABLE */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment overflow-hidden">
        
        <div className="p-5 border-b border-[#E6D7BC] flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-[#362215]">
            Kütüphanedeki Tüm Eserler ({books.length})
          </h2>
          <span className="text-xs font-mono text-[#8B4513] bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            {filteredBooks.length} Eser Listelendi
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-stone-500 font-serif animate-pulse">
            Eserler yükleniyor...
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#362215]">
              <thead className="bg-amber-100/70 text-xs font-bold uppercase text-amber-900 border-b border-amber-200">
                <tr>
                  <th className="px-5 py-3">Kapak</th>
                  <th className="px-5 py-3">Başlık & Yazar</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Yıl / Sayfa</th>
                  <th className="px-5 py-3">Durum</th>
                  <th className="px-5 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-amber-50/60 transition-colors">
                    
                    {/* Cover Thumbnail */}
                    <td className="px-5 py-3">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-amber-950 border border-amber-300 shadow-sm shrink-0">
                        <Image
                          src={book.coverUrl}
                          alt={book.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Author */}
                    <td className="px-5 py-3 font-serif">
                      <div className="font-bold text-[#362215] text-sm hover:text-[#8B4513]">
                        <Link href={`/kitaplar/${book.slug}`} target="_blank">
                          {book.title}
                        </Link>
                      </div>
                      <div className="text-xs text-[#785438] italic">
                        {book.author}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3 text-xs text-[#8B4513]">
                      <span className="bg-amber-100/80 px-2.5 py-1 rounded-md font-mono border border-amber-200">
                        {book.category}
                      </span>
                    </td>

                    {/* Year & Pages */}
                    <td className="px-5 py-3 text-xs text-stone-700 font-mono">
                      <div>{book.year < 0 ? `MÖ ${Math.abs(book.year)}` : book.year}</div>
                      <div className="text-[11px] text-stone-500">{book.pages} Sayfa</div>
                    </td>

                    {/* Readable Status */}
                    <td className="px-5 py-3">
                      {book.isReadable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                          <BookCheck className="w-3 h-3 text-emerald-600" />
                          <span>Tam Metin</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          <span>Editör İncelemesi</span>
                        </span>
                      )}
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {book.isReadable && (
                          <button
                            onClick={() => setPreviewReadingBook(book)}
                            className="p-2 rounded-xl text-amber-800 hover:bg-amber-100 transition-colors"
                            title="Metni Oku & Önizle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenEdit(book)}
                          className="p-2 rounded-xl text-amber-900 bg-amber-100/60 hover:bg-amber-200 transition-colors border border-amber-300"
                          title="Eseri Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteBook(book)}
                          className="p-2 rounded-xl text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200"
                          title="Eseri Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-[#5C4033] font-serif">
            Arama kriterine uygun kitap bulunamadı.
          </div>
        )}

      </div>

      {/* EDIT BOOK MODAL */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E6D7BC] pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                  <Edit className="w-5 h-5 text-[#9A3412]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#362215]">
                  Eseri Düzenle: {editingBook.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingBook(null)}
                className="p-2 rounded-full hover:bg-amber-100 text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSaveEdit} className="space-y-5">
              
              {/* Cover Image Upload Preview */}
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                {editCoverPreview && (
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden shadow-md border border-amber-300 shrink-0 bg-amber-950">
                    <Image src={editCoverPreview} alt="Kapak" fill unoptimized className="object-cover" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#8B4513] uppercase">
                    Kapak Görselini Değiştir (Opsiyonel)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                    className="text-xs text-[#5C4033] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-800 file:text-amber-100 hover:file:bg-amber-900 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500">
                    Görsel yüklenmezse mevcut kapak resmi korunur.
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">Eser Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-serif font-bold text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">Yazar *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.author}
                    onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-serif font-bold text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">İlk Yayın Yılı</label>
                  <input
                    type="number"
                    value={editFormData.year}
                    onChange={(e) => setEditFormData({ ...editFormData, year: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">Sayfa Sayısı</label>
                  <input
                    type="number"
                    value={editFormData.pages}
                    onChange={(e) => setEditFormData({ ...editFormData, pages: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">Kategori / Tür (Zorunlu)</label>
                  <select
                    value={isEditCustomCategory ? 'CUSTOM' : editFormData.category}
                    onChange={(e) => {
                      if (e.target.value === 'CUSTOM') {
                        setIsEditCustomCategory(true);
                      } else {
                        setIsEditCustomCategory(false);
                        setEditFormData({ ...editFormData, category: e.target.value });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-600 cursor-pointer"
                  >
                    {DEFAULT_BOOK_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Yeni Tür/Kategori Ekle...</option>
                  </select>

                  {isEditCustomCategory && (
                    <input
                      type="text"
                      value={editCustomCategory}
                      onChange={(e) => setEditCustomCategory(e.target.value)}
                      placeholder="Yeni Kategori Adı Girin (Örn: Korku & Gerilim)..."
                      className="w-full mt-2 p-2.5 rounded-xl bg-amber-100/80 border border-amber-400 text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-700 animate-fadeIn"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">Puan (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editFormData.rating}
                    onChange={(e) => setEditFormData({ ...editFormData, rating: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-mono text-[#362215] focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-[#8B4513] mb-1">Editör İncelemesi & Özet Metni</label>
                <textarea
                  rows={3}
                  value={editFormData.summary}
                  onChange={(e) => setEditFormData({ ...editFormData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] leading-relaxed focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Buy URL */}
              <div>
                <label className="block text-xs font-bold text-[#8B4513] mb-1">Satın Alma / Mağaza Linki (Opsiyonel URL)</label>
                <input
                  type="url"
                  value={editFormData.buyUrl}
                  onChange={(e) => setEditFormData({ ...editFormData, buyUrl: e.target.value })}
                  placeholder="https://www.amazon.com.tr/... veya https://www.bkmkitap.com/..."
                  className="w-full p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] focus:outline-none focus:border-amber-600 font-mono"
                />
              </div>

              {/* IsReadable Toggle */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-100/60 border border-amber-200">
                <input
                  type="checkbox"
                  id="editIsReadable"
                  checked={editFormData.isReadable}
                  onChange={(e) => setEditFormData({ ...editFormData, isReadable: e.target.checked })}
                  className="w-4 h-4 accent-amber-800 rounded cursor-pointer"
                />
                <label htmlFor="editIsReadable" className="text-xs font-bold text-[#362215] cursor-pointer">
                  Tam Metin Okuma Modu Aktif
                </label>
              </div>

              {/* Full Text Pages */}
              {editFormData.isReadable && (
                <div>
                  <label className="block text-xs font-bold text-[#8B4513] mb-1">
                    Tam Metin İçeriği (Sayfaları ayırmak için <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">---</code> yazın)
                  </label>
                  <textarea
                    rows={6}
                    value={editFormData.content}
                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                    className="w-full p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#362215] font-serif leading-relaxed focus:outline-none focus:border-amber-600"
                  />
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#E6D7BC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#78350F] hover:bg-[#5C2E0B] text-amber-100 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* READER PREVIEW MODAL */}
      {previewReadingBook && (
        <BookReaderModal
          book={{
            slug: previewReadingBook.slug,
            title: previewReadingBook.title,
            author: previewReadingBook.author,
            pages: previewReadingBook.pages,
            coverUrl: previewReadingBook.coverUrl,
          }}
          onClose={() => setPreviewReadingBook(null)}
        />
      )}

    </div>
  );
}
