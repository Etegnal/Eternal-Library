import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Feather, X, Eye, Send, CheckCircle2, User, ExternalLink } from 'lucide-react';
import { slugify } from '@/lib/slug';

interface LetterItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface LetterDetailViewerProps {
  letter: LetterItem;
}

export default function LetterDetailViewer({ letter }: LetterDetailViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(letter.isRead);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [authorName, setAuthorName] = useState(letter.name);
  const [customTitle, setCustomTitle] = useState(letter.subject);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState('');
  const router = useRouter();

  const toggleOpen = async () => {
    setIsOpen(!isOpen);
    setShowPublishForm(false);
    setPublishSuccess(false);

    if (!isRead) {
      setIsRead(true);
      try {
        await fetch(`/api/admin/letters/${letter.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isRead: true }),
        });
      } catch (e) {
        console.error('Letter status update error:', e);
      }
    }
  };

  const handlePublishAsPoem = async () => {
    setIsPublishing(true);
    setPublishError('');

    try {
      const excerpt = letter.content.trim().slice(0, 150) + (letter.content.length > 150 ? '...' : '');
      const cleanSlug = slugify(customTitle || letter.subject);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle || letter.subject,
          slug: cleanSlug,
          author: authorName || letter.name,
          excerpt,
          content: letter.content,
          type: 'SIIR',
          isFeatured: true,
          publishedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setPublishSuccess(true);
        router.refresh();
      } else {
        const data = await res.json();
        setPublishError(data.error || 'Şiir yayınlanırken bir hata oluştu.');
      }
    } catch (e) {
      console.error(e);
      setPublishError('Bağlantı hatası oluştu.');
    } finally {
      setIsPublishing(false);
    }
  };

  const openInFullEditor = () => {
    const params = new URLSearchParams({
      type: 'SIIR',
      title: customTitle || letter.subject,
      author: authorName || letter.name,
      content: letter.content,
    });
    router.push(`/admin/new-post?${params.toString()}`);
  };

  return (
    <>
      <button
        onClick={toggleOpen}
        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100/90 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 shrink-0"
      >
        <Eye className="w-3.5 h-3.5 text-amber-800" />
        <span>Oku / İncele</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#E6D7BC] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3 pb-4 border-b border-[#E6D7BC]">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  letter.type === 'ESER'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {letter.type === 'ESER' ? <Feather className="w-3.5 h-3.5 text-rose-700" /> : <Mail className="w-3.5 h-3.5 text-amber-700" />}
                  <span>{letter.type === 'ESER' ? 'Gelen Edebi Eser' : 'Genel Mektup'}</span>
                </span>
                <span className="text-xs text-[#785438]">
                  {new Date(letter.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-[#362215]">
                {letter.subject}
              </h2>

              <div className="text-xs text-[#5C4033] flex flex-wrap items-center gap-3">
                <span className="font-bold">Gönderen: {letter.name}</span>
                <span>•</span>
                <span className="font-mono">{letter.email}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 font-serif text-base text-[#362215] leading-relaxed whitespace-pre-line">
              {letter.content}
            </div>

            {/* PUBLISH AS POEM EXPANDABLE FORM */}
            {showPublishForm && (
              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm border-b border-rose-200 pb-2">
                  <Feather className="w-4 h-4 text-rose-700" />
                  <span>Bu Eseri Sitede Şiir Olarak Yayınla</span>
                </div>

                {publishSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Tebrikler! Şiir başarıyla siteye eklendi ve yayınlandı.</span>
                    </div>
                    <a
                      href="/siirler"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-1"
                    >
                      <span>Şiirlerde Gör</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {publishError && (
                      <div className="p-2.5 rounded-lg bg-red-100 text-red-800 text-xs border border-red-200 font-medium">
                        {publishError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#5C4033] mb-1">
                          Şiir Başlığı
                        </label>
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-rose-300 text-xs focus:outline-none focus:border-rose-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#5C4033] mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-rose-700" />
                          <span>Şair / Yazar (Kimden Yazıldığı)</span>
                        </label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Şair Adı"
                          className="w-full px-3 py-2 rounded-xl border border-rose-300 text-xs focus:outline-none focus:border-rose-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <button
                        type="button"
                        onClick={openInFullEditor}
                        className="text-xs text-rose-800 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Detaylı Editörde Aç</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowPublishForm(false)}
                          className="px-3 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors"
                        >
                          Vazgeç
                        </button>
                        <button
                          type="button"
                          onClick={handlePublishAsPoem}
                          disabled={isPublishing}
                          className="px-4 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isPublishing ? 'Yayınlanıyor...' : 'Hemen Siteye Yayınla'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#E6D7BC]">
              {!showPublishForm && !publishSuccess ? (
                <button
                  type="button"
                  onClick={() => setShowPublishForm(true)}
                  className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
                >
                  <Feather className="w-4 h-4" />
                  <span>Siteye Şiir Olarak Yayınla</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
