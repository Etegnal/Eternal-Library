'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Feather, Plus, Trash2, Edit3, Save, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export interface MasterPoetItem {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  year?: string | null;
  createdAt: string;
}

interface AdminMasterPoetsManagerProps {
  initialMasterPoets?: MasterPoetItem[];
}

export default function AdminMasterPoetsManager({ initialMasterPoets = [] }: AdminMasterPoetsManagerProps) {
  const [poets, setPoets] = useState<MasterPoetItem[]>(initialMasterPoets);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [year, setYear] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  // Load poets if empty
  const fetchPoets = async () => {
    try {
      const res = await fetch('/api/admin/master-poets');
      if (res.ok) {
        const data = await res.json();
        setPoets(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPoets();
  }, []);

  // Handle Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !excerpt.trim()) {
      setMsg({ type: 'error', text: 'Lütfen şair adı, şiir başlığı ve mısraları eksiksiz girin.' });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      const isEditing = Boolean(editingId);
      const url = isEditing ? `/api/admin/master-poets/${editingId}` : '/api/admin/master-poets';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title, excerpt, year }),
      });

      if (res.ok) {
        setMsg({
          type: 'success',
          text: isEditing ? 'Üstat kalem başarıyla güncellendi!' : 'Yeni üstat kalem başarıyla eklendi!',
        });
        resetForm();
        fetchPoets();
        router.refresh();
      } else {
        const err = await res.json();
        setMsg({ type: 'error', text: err.error || 'İşlem sırasında hata oluştu.' });
      }
    } catch (e) {
      console.error(e);
      setMsg({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (poet: MasterPoetItem) => {
    setEditingId(poet.id);
    setAuthor(poet.author);
    setTitle(poet.title);
    setExcerpt(poet.excerpt);
    setYear(poet.year || '');
    setMsg(null);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setAuthor('');
    setTitle('');
    setExcerpt('');
    setYear('');
  };

  // Handle Delete
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" üstat şiirini silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/master-poets/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMsg({ type: 'success', text: 'Üstat kalem silindi.' });
        fetchPoets();
        router.refresh();
      } else {
        setMsg({ type: 'error', text: 'Silinirken hata oluştu.' });
      }
    } catch (e) {
      console.error(e);
      setMsg({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* ADD / EDIT FORM CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#362215]">
                {editingId ? 'Üstat Şiirini Düzenle' : 'Yeni Üstat Şiir / Kalem Ekle'}
              </h2>
              <p className="text-xs text-[#5C4033]">
                Şiirler sayfasının altındaki Üstat Kalemler seçkisine yeni eserler ekleyin.
              </p>
            </div>
          </div>

          {editingId && (
            <button
              onClick={resetForm}
              className="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>İptal</span>
            </button>
          )}
        </div>

        {/* NOTIFICATION MSG */}
        {msg && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border border-rose-300 text-rose-900'
            }`}
          >
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Author Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Şair / Yazar Adı *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Attila İlhan, Nâzım Hikmet"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

            {/* Poem Title */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Şiir / Eser Başlığı *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Ben Sana Mecburum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
                Yıl / Dönem (Opsiyonel)
              </label>
              <input
                type="text"
                placeholder="Örn: 1960"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
              />
            </div>

          </div>

          {/* Stanza Excerpt / Content */}
          <div>
            <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1">
              Unutulmaz Mısralar / Şiir Metni *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Şiirin unutulmaz mısralarını buraya yazın..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215] font-serif italic"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center gap-2 border border-amber-500/40 disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Kaydediliyor...' : editingId ? 'Güncellemeyi Kaydet' : 'Üstat Şiiri Ekle'}</span>
            </button>
          </div>
        </form>

      </div>

      {/* EXISTING MASTER POETS LIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6D7BC]">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#9A3412]" />
            <h3 className="font-serif font-bold text-xl text-[#362215]">
              Kayıtlı Üstat Kalemler ({poets.length})
            </h3>
          </div>
        </div>

        {poets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {poets.map((poet) => (
              <div
                key={poet.id}
                className="p-5 rounded-2xl bg-[#FEFBF3] border border-[#E8DCC4] shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-[#362215]">
                      {poet.author}
                    </span>
                    {poet.year && (
                      <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {poet.year}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-semibold text-sm text-amber-900">
                    {poet.title}
                  </h4>

                  <p className="font-serif italic text-xs text-[#5C4033] line-clamp-3 pl-3 border-l-2 border-amber-600/40">
                    "{poet.excerpt}"
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-end gap-2 text-xs">
                  <button
                    onClick={() => startEdit(poet)}
                    className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    onClick={() => handleDelete(poet.id, `${poet.author} - ${poet.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-2">
            <p className="text-xs text-[#5C4033] font-serif">
              Henüz üstat kalem eklenmemiş. Yukarıdaki formu kullanarak ekleyebilirsiniz.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
