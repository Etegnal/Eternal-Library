'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, BookOpen, Feather, Library, Heart, Eye, Star, ExternalLink, Loader2, Calendar, Mail, User, Send } from 'lucide-react';
import SendEmailModal from '@/components/SendEmailModal';

interface SavedBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  rating: number;
  pages: number;
  coverUrl: string;
}

interface LikedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  type: 'YAZI' | 'SIIR';
  author: string | null;
  likes: number;
  views: number;
  publishedAt: string;
}

interface ViewRecordItem {
  id: string;
  postTitle: string | null;
  postType: 'YAZI' | 'SIIR';
  createdAt: string;
  post?: {
    id: string;
    title: string;
    slug: string;
    type: 'YAZI' | 'SIIR';
    author: string | null;
  } | null;
}

interface UserActivityModalProps {
  userId: string | null;
  userName?: string | null;
  userEmail?: string | null;
  initialTab?: 'savedBooks' | 'likedPosts' | 'views';
  onClose: () => void;
}

export default function UserActivityModal({
  userId,
  userName,
  userEmail,
  initialTab = 'savedBooks',
  onClose,
}: UserActivityModalProps) {
  const [activeTab, setActiveTab] = useState<'savedBooks' | 'likedPosts' | 'views'>(initialTab);
  const [loading, setLoading] = useState(true);
  const [userObj, setUserObj] = useState<any>(null);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
  const [viewRecords, setViewRecords] = useState<ViewRecordItem[]>([]);
  const [isSendMailOpen, setIsSendMailOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`/api/admin/users/${userId}/activity`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setUserObj(data.user);
          setSavedBooks(data.savedBooks || []);
          setLikedPosts(data.likedPosts || []);
          setViewRecords(data.viewRecords || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) return null;

  const displayName = userName || userObj?.name || 'Kullanıcı';
  const displayEmail = userEmail || userObj?.email || '';

  return (
    <>
      {isSendMailOpen && (
        <SendEmailModal
          initialRecipientEmail={displayEmail}
          initialRecipientName={displayName}
          onClose={() => setIsSendMailOpen(false)}
        />
      )}

      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        
        {/* MODAL CONTAINER */}
        <div className="bg-[#FFFDF9] border-2 border-[#E6D7BC] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* HEADER */}
          <div className="p-6 bg-[#FEFBF3] border-b border-[#E6D7BC] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-bold text-lg shadow-fire border border-amber-500/40 shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#362215]">
                  {displayName} — Aktivite Detayı
                </h3>
                <p className="text-xs text-[#5C4033] flex items-center gap-1 font-mono">
                  <Mail className="w-3.5 h-3.5 text-amber-700" />
                  <span>{displayEmail}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSendMailOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 hover:from-[#9A3412] hover:to-[#78350F] font-bold text-xs shadow-cozy transition-all flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
                title="Kullanıcıya Özel E-Posta Gönder"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>Mail Gönder</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-stone-500 hover:text-amber-900 hover:bg-amber-100/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        {/* TABS SELECTOR */}
        <div className="flex flex-wrap items-center gap-2 px-6 pt-4 border-b border-amber-200/80 bg-[#FEF9EE]">
          
          <button
            type="button"
            onClick={() => setActiveTab('savedBooks')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x cursor-pointer ${
              activeTab === 'savedBooks'
                ? 'bg-[#FFFDF9] text-[#78350F] border-[#E6D7BC] shadow-sm -mb-px font-bold'
                : 'bg-transparent text-[#5C4033] hover:text-[#78350F] border-transparent'
            }`}
          >
            <Library className="w-4 h-4 text-amber-800" />
            <span>Kaydedilen Kitaplar ({savedBooks.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('likedPosts')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x cursor-pointer ${
              activeTab === 'likedPosts'
                ? 'bg-[#FFFDF9] text-rose-900 border-[#E6D7BC] shadow-sm -mb-px font-bold'
                : 'bg-transparent text-[#5C4033] hover:text-rose-800 border-transparent'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-700" />
            <span>Beğenilen Yazı & Şiirler ({likedPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('views')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x cursor-pointer ${
              activeTab === 'views'
                ? 'bg-[#FFFDF9] text-[#78350F] border-[#E6D7BC] shadow-sm -mb-px font-bold'
                : 'bg-transparent text-[#5C4033] hover:text-[#78350F] border-transparent'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-700" />
            <span>Okuma Geçmişi ({viewRecords.length})</span>
          </button>

        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {loading ? (
            <div className="py-16 text-center space-y-2 text-[#5C4033]">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-amber-800" />
              <p className="text-xs font-serif">Kullanıcının aktiviteleri getiriliyor...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: SAVED BOOKS */}
              {activeTab === 'savedBooks' && (
                <div className="space-y-4">
                  {savedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {savedBooks.map((book) => (
                        <div
                          key={book.id || book.slug}
                          className="p-4 rounded-2xl bg-[#FEFBF3] border border-[#E8DCC4] shadow-sm hover:shadow-cozy transition-all flex gap-3 items-start"
                        >
                          <div className="relative w-16 h-24 rounded-lg overflow-hidden shrink-0 bg-amber-950 border border-amber-200 shadow-sm">
                            <Image
                              src={book.coverUrl}
                              alt={book.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-1 flex flex-col justify-between self-stretch">
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-amber-900 font-mono font-bold">
                                <span>{book.category}</span>
                                <div className="flex items-center gap-0.5 text-amber-600">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  <span>{book.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              <h4 className="font-serif font-bold text-sm text-[#362215] truncate pt-0.5">
                                {book.title}
                              </h4>

                              <p className="text-xs font-serif italic text-[#785438]">
                                {book.author}
                              </p>
                            </div>

                            <Link
                              href={`/kitaplar/${book.slug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:underline pt-1"
                            >
                              <span>Sitede İncele</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-[#5C4033] font-serif space-y-2">
                      <Library className="w-10 h-10 mx-auto text-amber-800/40" />
                      <p>Kullanıcı henüz kişisel kütüphanesine hiç kitap kaydetmemiş.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: LIKED POSTS & POEMS */}
              {activeTab === 'likedPosts' && (
                <div className="space-y-4">
                  {likedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {likedPosts.map((post) => {
                        const isPoem = post.type === 'SIIR';
                        const detailUrl = isPoem ? `/siirler/${post.slug}` : `/yazilar/${post.slug}`;

                        return (
                          <div
                            key={post.id}
                            className="p-4 rounded-2xl bg-[#FEFBF3] border border-[#E8DCC4] shadow-sm hover:shadow-cozy transition-all space-y-2.5 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                    isPoem
                                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                                      : 'bg-amber-100 text-amber-900 border-amber-300'
                                  }`}
                                >
                                  {isPoem ? <Feather className="w-3 h-3 text-rose-700" /> : <BookOpen className="w-3 h-3 text-amber-700" />}
                                  <span>{isPoem ? 'Şiir' : 'Yazı'}</span>
                                </span>

                                <span className="text-[11px] text-[#785438] font-mono">
                                  ❤️ {post.likes} Beğeni
                                </span>
                              </div>

                              <h4 className="font-serif font-bold text-base text-[#362215] line-clamp-1">
                                {post.title}
                              </h4>

                              <p className="font-serif italic text-xs text-[#5C4033] line-clamp-2 pl-2 border-l-2 border-amber-600/40">
                                "{post.excerpt}"
                              </p>
                            </div>

                            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                              <span className="text-[11px] text-[#785438] italic font-serif">
                                {post.author ? `— ${post.author}` : 'Eternal Library'}
                              </span>

                              <Link
                                href={detailUrl}
                                target="_blank"
                                className="inline-flex items-center gap-1 font-bold text-[#9A3412] hover:underline text-xs"
                              >
                                <span>Oku</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-[#5C4033] font-serif space-y-2">
                      <Heart className="w-10 h-10 mx-auto text-rose-800/40" />
                      <p>Kullanıcı henüz hiçbir yazı veya şiiri beğenmemiş.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: READING HISTORY */}
              {activeTab === 'views' && (
                <div className="space-y-4">
                  {viewRecords.length > 0 ? (
                    <div className="rounded-2xl border border-[#E6D7BC] overflow-hidden bg-[#FEFBF3]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FDF8EE] border-b border-[#E6D7BC] text-[#78350F] uppercase font-bold text-[11px]">
                          <tr>
                            <th className="p-3">Eser Adı</th>
                            <th className="p-3">Tür</th>
                            <th className="p-3 text-right">Okuma Zamanı</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-200/60 font-sans">
                          {viewRecords.map((vr) => {
                            const isPoem = vr.postType === 'SIIR';
                            const title = vr.postTitle || vr.post?.title || 'Eser';
                            const slug = vr.post?.slug;
                            const detailUrl = slug ? (isPoem ? `/siirler/${slug}` : `/yazilar/${slug}`) : null;
                            const dateStr = new Date(vr.createdAt).toLocaleString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            });

                            return (
                              <tr key={vr.id} className="hover:bg-amber-100/40 transition-colors">
                                <td className="p-3 font-serif font-bold text-[#362215]">
                                  {detailUrl ? (
                                    <Link href={detailUrl} target="_blank" className="hover:underline flex items-center gap-1 text-[#9A3412]">
                                      <span>{title}</span>
                                      <ExternalLink className="w-3 h-3 shrink-0" />
                                    </Link>
                                  ) : (
                                    <span>{title}</span>
                                  )}
                                </td>

                                <td className="p-3">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                      isPoem
                                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                                        : 'bg-amber-100 text-amber-900 border-amber-300'
                                    }`}
                                  >
                                    {isPoem ? <Feather className="w-3 h-3 text-rose-700" /> : <BookOpen className="w-3 h-3 text-amber-700" />}
                                    <span>{isPoem ? 'Şiir' : 'Yazı'}</span>
                                  </span>
                                </td>

                                <td className="p-3 text-right font-mono text-[11px] text-[#785438]">
                                  {dateStr}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-[#5C4033] font-serif space-y-2">
                      <Eye className="w-10 h-10 mx-auto text-amber-800/40" />
                      <p>Kullanıcının henüz bir okuma kaydı bulunmuyor.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#FEFBF3] border-t border-[#E6D7BC] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#78350F] font-bold text-xs border border-amber-300 transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>

    </div>
    </>
  );
}
