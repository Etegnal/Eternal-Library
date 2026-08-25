'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DeletePostButton from '@/components/DeletePostButton';
import ToggleFeaturedButton from '@/components/ToggleFeaturedButton';
import DeleteUserButton from '@/components/DeleteUserButton';
import UserPasswordViewer from '@/components/UserPasswordViewer';
import DeleteLetterButton from '@/components/DeleteLetterButton';
import LetterDetailViewer from '@/components/LetterDetailViewer';
import LikedUsersViewer from '@/components/LikedUsersViewer';
import { Plus, Feather, BookOpen, Edit, ShieldCheck, Users, FileText, User, Mail, Calendar, Sparkles } from 'lucide-react';

interface LikedUserItem {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

interface PostItem {
  id: string;
  title: string;
  type: string;
  likes?: number;
  views?: number;
  isFeatured: boolean;
  publishedAt: string;
  likedUsers?: LikedUserItem[];
}

interface UserItem {
  id: string;
  name: string | null;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

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

interface AdminDashboardViewProps {
  userEmail: string;
  posts: PostItem[];
  users: UserItem[];
  letters: LetterItem[];
}

export default function AdminDashboardView({ userEmail, posts, users, letters }: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'letters'>('posts');

  const unreadCount = letters.filter(l => !l.isRead).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cozy-amber flex items-center justify-center text-cozy-wood">
            <ShieldCheck className="w-5 h-5 text-cozy-wood" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl text-[#362215]">
              Yönetici Paneli
            </h1>
            <p className="text-xs text-[#5C4033]">
              Hoş geldiniz, {userEmail}
            </p>
          </div>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'posts'
                ? 'bg-[#78350F] text-amber-100 border-amber-600 shadow-md'
                : 'bg-amber-100/50 text-[#5C4033] hover:bg-amber-100 border-amber-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>İçerikler ({posts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'users'
                ? 'bg-[#78350F] text-amber-100 border-amber-600 shadow-md'
                : 'bg-amber-100/50 text-[#5C4033] hover:bg-amber-100 border-amber-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kullanıcılar ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('letters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border relative ${
              activeTab === 'letters'
                ? 'bg-[#78350F] text-amber-100 border-amber-600 shadow-md'
                : 'bg-amber-100/50 text-[#5C4033] hover:bg-amber-100 border-amber-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Mektuplar & Eserler ({letters.length})</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse absolute -top-1 -right-1" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: POSTS MANAGEMENT */}
      {activeTab === 'posts' && (
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment overflow-hidden space-y-4">
          <div className="p-6 border-b border-[#E6D7BC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#362215]">
                Yayınlanmış İçerikler ({posts.length})
              </h2>
              <p className="text-xs text-[#5C4033] mt-0.5">
                ❤️ Kalp simgesiyle ana sayfada öne çıkarılacakları seçebilirsiniz
              </p>
            </div>

            <Link
              href="/admin/new-post"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Yazı / Şiir Ekle</span>
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#362215]">
                <thead className="bg-amber-100/70 text-xs font-bold uppercase text-amber-900 border-b border-amber-200">
                  <tr>
                    <th className="px-6 py-3">Tür</th>
                    <th className="px-6 py-3">Başlık</th>
                    <th className="px-6 py-3">Ana Sayfa</th>
                    <th className="px-6 py-3">Beğenenler & Okunma</th>
                    <th className="px-6 py-3">Tarih</th>
                    <th className="px-6 py-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${
                          post.type === 'YAZI' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}>
                          {post.type === 'YAZI' ? <BookOpen className="w-3 h-3" /> : <Feather className="w-3 h-3" />}
                          <span>{post.type}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 font-serif font-semibold text-[#362215]">
                        {post.title}
                      </td>
                      <td className="px-6 py-4">
                        <ToggleFeaturedButton postId={post.id} initialFeatured={post.isFeatured} />
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <LikedUsersViewer
                          postTitle={post.title}
                          totalLikes={post.likes || 0}
                          likedUsers={post.likedUsers || []}
                        />
                        <span className="text-xs font-mono text-stone-700 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200">
                          👁️ {post.views || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#5C4033]">
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/edit-post/${post.id}`}
                          className="p-2 rounded-xl text-amber-800 hover:bg-amber-100 transition-colors"
                          title="İçeriği Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeletePostButton postId={post.id} title={post.title} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-[#5C4033]">
              Henüz içerik bulunmuyor.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment overflow-hidden space-y-4">
          <div className="p-6 border-b border-[#E6D7BC]">
            <h2 className="font-serif font-bold text-lg text-[#362215]">
              Kayıtlı Tüm Kullanıcılar ({users.length})
            </h2>
            <p className="text-xs text-[#5C4033] mt-0.5">
              Sisteme kayıtlı kullanıcıların bilgilerini, e-postalarını, şifre hash durumlarını inceleyebilirsiniz.
            </p>
          </div>

          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#362215]">
                <thead className="bg-amber-100/70 text-xs font-bold uppercase text-amber-900 border-b border-amber-200">
                  <tr>
                    <th className="px-6 py-3">Kullanıcı Adı</th>
                    <th className="px-6 py-3">E-Posta Adresi</th>
                    <th className="px-6 py-3">Rol</th>
                    <th className="px-6 py-3">Şifre Bilgisi</th>
                    <th className="px-6 py-3">Kayıt Tarihi</th>
                    <th className="px-6 py-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-amber-50/60 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#362215] flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center text-xs font-bold shrink-0">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{u.name || '(İsimsiz)'}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-stone-700">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          u.role === 'ADMIN'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700 border border-stone-300'
                        }`}>
                          {u.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3 text-amber-800" /> : <User className="w-3 h-3 text-stone-600" />}
                          <span>{u.role}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <UserPasswordViewer passwordHash={u.password} />
                      </td>
                      <td className="px-6 py-4 text-xs text-[#5C4033]">
                        {new Date(u.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DeleteUserButton userId={u.id} userName={u.name || u.email} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-[#5C4033]">
              Henüz sistemde kullanıcı bulunmuyor.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LETTERS & ESERLER MANAGEMENT */}
      {activeTab === 'letters' && (
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment overflow-hidden space-y-4">
          <div className="p-6 border-b border-[#E6D7BC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#362215]">
                Gelen Mektuplar ve Edebi Eserler ({letters.length})
              </h2>
              <p className="text-xs text-[#5C4033] mt-0.5">
                Kullanıcıların bıraktığı mektupları ve gönderdiği edebi eserleri (şiir, deneme, öykü) okuyabilir ve inceleyebilirsiniz.
              </p>
            </div>
          </div>

          {letters.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#362215]">
                <thead className="bg-amber-100/70 text-xs font-bold uppercase text-amber-900 border-b border-amber-200">
                  <tr>
                    <th className="px-6 py-3">Tür</th>
                    <th className="px-6 py-3">Gönderen</th>
                    <th className="px-6 py-3">Konu / Başlık</th>
                    <th className="px-6 py-3">Tarih</th>
                    <th className="px-6 py-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {letters.map((letter) => (
                    <tr key={letter.id} className={`hover:bg-amber-50/60 transition-colors ${!letter.isRead ? 'bg-amber-50/40 font-semibold' : ''}`}>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          letter.type === 'ESER'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {letter.type === 'ESER' ? <Feather className="w-3 h-3 text-rose-700" /> : <Mail className="w-3 h-3 text-amber-700" />}
                          <span>{letter.type}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#362215]">{letter.name}</div>
                        <div className="text-xs font-mono text-stone-600">{letter.email}</div>
                      </td>
                      <td className="px-6 py-4 font-serif text-[#362215]">
                        {letter.subject}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#5C4033]">
                        {new Date(letter.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        <LetterDetailViewer letter={letter} />
                        <DeleteLetterButton letterId={letter.id} subject={letter.subject} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-[#5C4033]">
              Henüz gelen bir mektup veya eser bulunmuyor.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
