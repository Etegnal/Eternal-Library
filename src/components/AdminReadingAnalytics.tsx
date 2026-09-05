'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Feather, Eye, User, Search, RefreshCw, Sparkles, Shield, Clock, Users, ArrowUpRight, Heart, Library } from 'lucide-react';
import UserActivityModal from '@/components/UserActivityModal';
import AnalyticsDetailModal from '@/components/AnalyticsDetailModal';

export interface ViewLogItem {
  id: string;
  postId: string;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  postTitle: string | null;
  postType: 'YAZI' | 'SIIR';
  createdAt: string;

  // Enriched Analytics & Tracking Fields
  ipAddress?: string | null;
  city?: string | null;
  country?: string | null;
  deviceType?: string | null;
  browser?: string | null;
  os?: string | null;
  referrer?: string | null;
  fingerprint?: string | null;

  user?: {
    id: string;
    name: string | null;
    email: string;
    role: string;
  } | null;
  post?: {
    id: string;
    title: string;
    slug: string;
    type: 'YAZI' | 'SIIR';
    author: string | null;
  } | null;
}

export interface UserReadingStat {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  _count: {
    viewRecords: number;
    likeRecords: number;
    savedBooks: number;
  };
}

export default function AdminReadingAnalytics() {
  const [logs, setLogs] = useState<ViewLogItem[]>([]);
  const [userStats, setUserStats] = useState<UserReadingStat[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [memberViewsCount, setMemberViewsCount] = useState(0);
  const [guestViewsCount, setGuestViewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'YAZI' | 'SIIR'>('all');
  const [readerTypeFilter, setReaderTypeFilter] = useState<'all' | 'member' | 'guest'>('all');
  const [activeTab, setActiveTab] = useState<'stream' | 'users'>('stream');
  const [selectedUserForModal, setSelectedUserForModal] = useState<{
    id: string;
    name?: string | null;
    email?: string | null;
    initialTab?: 'savedBooks' | 'likedPosts' | 'views';
  } | null>(null);
  const [selectedLogForModal, setSelectedLogForModal] = useState<ViewLogItem | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reading-logs', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.recentLogs || []);
        setUserStats(data.userReadingStats || []);
        setTotalViews(data.totalViews || 0);
        setMemberViewsCount(data.memberViewsCount || 0);
        setGuestViewsCount(data.guestViewsCount || 0);
      }
    } catch (e) {
      console.error('Error fetching reading logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Filter logs by search query, post type, and reader type
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      (log.postTitle || log.post?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.userName || log.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.userEmail || log.user?.email || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || log.postType === typeFilter;

    const matchesReader =
      readerTypeFilter === 'all' ||
      (readerTypeFilter === 'member' && log.userId) ||
      (readerTypeFilter === 'guest' && !log.userId);

    return matchesSearch && matchesType && matchesReader;
  });

  const memberRatio = totalViews > 0 ? Math.round((memberViewsCount / totalViews) * 100) : 0;
  const guestRatio = totalViews > 0 ? Math.round((guestViewsCount / totalViews) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* HEADER & REFRESH BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D7BC]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100/90 border border-amber-300/80 text-amber-900">
              <Eye className="w-5 h-5 text-[#9A3412]" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#362215]">
              Okuma Analitiği ve Okuyucu Akışı
            </h2>
          </div>
          <p className="text-xs text-[#5C4033] font-sans">
            Kullanıcıların ve misafirlerin hangi yazı veya şiiri ne zaman okuduğunun anlık kaydı.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLogs}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#78350F] border border-amber-300/80 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Verileri Yenile</span>
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* TOTAL READS CARD */}
        <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-cozy space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#785438]">
            <span className="font-bold uppercase tracking-wider">Toplam Okunma</span>
            <Eye className="w-4 h-4 text-amber-700" />
          </div>
          <div className="font-serif font-bold text-3xl text-[#362215]">
            {totalViews.toLocaleString('tr-TR')}
          </div>
          <p className="text-[11px] text-[#5C4033] font-sans">
            Kütüphanenizde gerçekleşen tüm okunma oturumları.
          </p>
        </div>

        {/* MEMBER READS CARD */}
        <div className="p-5 rounded-2xl bg-[#FEFBF3] border-2 border-[#E6D7BC] shadow-cozy space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-900">
            <span className="font-bold uppercase tracking-wider">Üye Okumaları</span>
            <Users className="w-4 h-4 text-amber-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="font-serif font-bold text-3xl text-[#78350F]">
              {memberViewsCount.toLocaleString('tr-TR')}
            </div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
              %{memberRatio}
            </span>
          </div>
          <p className="text-[11px] text-[#5C4033] font-sans">
            Giriş yapmış kayıtlı kullanıcıların okumaları.
          </p>
        </div>

        {/* GUEST READS CARD */}
        <div className="p-5 rounded-2xl bg-[#FEF9EE] border-2 border-[#E6D7BC] shadow-cozy space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-700">
            <span className="font-bold uppercase tracking-wider">Misafir Okumaları</span>
            <User className="w-4 h-4 text-stone-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="font-serif font-bold text-3xl text-[#362215]">
              {guestViewsCount.toLocaleString('tr-TR')}
            </div>
            <span className="text-xs font-mono font-bold text-stone-700 bg-stone-200 px-2 py-0.5 rounded-full">
              %{guestRatio}
            </span>
          </div>
          <p className="text-[11px] text-[#5C4033] font-sans">
            Anonim misafir ziyaretçilerin okumaları.
          </p>
        </div>

      </div>

      {/* TABS HEADER */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6D7BC] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('stream')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
            activeTab === 'stream'
              ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
              : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Canlı Okuyucu Akışı ({filteredLogs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 border-amber-500/50 shadow-md'
              : 'bg-amber-50/80 hover:bg-amber-100 text-[#362215] border-amber-200/80'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>En Çok Okuyan Üyeler ({userStats.length})</span>
        </button>
      </div>

      {/* TAB 1: LIVE STREAM */}
      {activeTab === 'stream' && (
        <div className="space-y-4">
          
          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Okuyan kullanıcı, e-posta veya eser adı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FFFDF9] border border-[#E6D7BC] text-xs text-[#362215] placeholder-stone-400 focus:outline-none focus:border-amber-600 shadow-sm"
              />
            </div>

            {/* Post Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#E6D7BC] text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-600 cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <option value="all">Tüm Eser Türleri</option>
              <option value="YAZI">Yazılar</option>
              <option value="SIIR">Şiirler</option>
            </select>

            {/* Reader Type Filter */}
            <select
              value={readerTypeFilter}
              onChange={(e) => setReaderTypeFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#E6D7BC] text-xs font-bold text-[#362215] focus:outline-none focus:border-amber-600 cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <option value="all">Tüm Okuyucular</option>
              <option value="member">Kayıtlı Üyeler</option>
              <option value="guest">Misafirler</option>
            </select>

          </div>

          {/* STREAM TABLE */}
          <div className="rounded-2xl border-2 border-[#E6D7BC] bg-[#FFFDF9] overflow-hidden shadow-fire">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                {/* Table Header */}
                <thead className="bg-[#FDF8EE] border-b border-[#E6D7BC] text-[#78350F] uppercase tracking-wider font-bold text-[11px]">
                  <tr>
                    <th className="p-3.5">Okuyan Kişi</th>
                    <th className="p-3.5">Konum & Cihaz Analitiği</th>
                    <th className="p-3.5">Okunan Eser</th>
                    <th className="p-3.5">Tür</th>
                    <th className="p-3.5 text-right">Tarih & Saat</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-amber-200/60 font-sans">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => {
                      const isMember = Boolean(log.userId || log.user);
                      const isPoem = log.postType === 'SIIR';
                      const title = log.postTitle || log.post?.title || 'Eser';
                      const slug = log.post?.slug;
                      const detailUrl = slug ? (isPoem ? `/siirler/${slug}` : `/yazilar/${slug}`) : null;
                      const dateStr = new Date(log.createdAt).toLocaleString('tr-TR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      });

                      const locationText = log.city ? `${log.city}${log.country ? `, ${log.country}` : ''}` : 'Bilinmeyen Konum';
                      const deviceText = `${log.deviceType || 'Masaüstü'}${log.os || log.browser ? ` (${[log.os, log.browser].filter(Boolean).join(' / ')})` : ''}`;
                      const referrerText = log.referrer || 'Doğrudan URL';

                      return (
                        <tr key={log.id} className="hover:bg-amber-50/50 transition-colors">
                          
                          {/* Reader Column */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isMember
                                  ? 'bg-amber-900 text-amber-100 border border-amber-500/40 shadow-sm'
                                  : 'bg-stone-200 text-stone-600 border border-stone-300'
                              }`}>
                                {isMember
                                  ? (log.userName || log.user?.name || 'U').charAt(0).toUpperCase()
                                  : 'M'}
                              </div>

                              <div className="min-w-0">
                                <div className="font-bold text-[#362215] truncate flex items-center gap-1.5">
                                  <span>{log.userName || log.user?.name || 'Misafir Okuyucu'}</span>
                                  {isMember && (
                                    <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono border border-amber-300/80">
                                      Üye
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-[#785438] truncate font-mono">
                                  {log.userEmail || log.user?.email || 'Misafir Oturumu'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Analytics & Geolocation Button Column */}
                          <td className="p-3.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLogForModal(log)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-100 to-amber-200/90 hover:from-amber-200 hover:to-amber-300 text-[#78350F] border border-amber-300/90 font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                              title="Konum, Cihaz, IP ve Referrer detaylarını gör"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                              <span>📊 Analitik Detayı</span>
                            </button>
                          </td>

                          {/* Post Title Column */}
                          <td className="p-3.5">
                            <div className="font-serif font-bold text-[#362215] hover:text-[#9A3412] transition-colors flex items-center gap-1">
                              {detailUrl ? (
                                <Link href={detailUrl} target="_blank" className="hover:underline flex items-center gap-1">
                                  <span>{title}</span>
                                  <ArrowUpRight className="w-3 h-3 text-amber-700 shrink-0" />
                                </Link>
                              ) : (
                                <span>{title}</span>
                              )}
                            </div>
                            {log.post?.author && (
                              <span className="text-[10px] text-[#785438] italic font-serif">
                                — {log.post.author}
                              </span>
                            )}
                          </td>

                          {/* Post Type Badge Column */}
                          <td className="p-3.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                isPoem
                                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300'
                              }`}
                            >
                              {isPoem ? <Feather className="w-3 h-3 text-rose-700" /> : <BookOpen className="w-3 h-3 text-amber-700" />}
                              <span>{isPoem ? 'Şiir' : 'Yazı'}</span>
                            </span>
                          </td>

                          {/* Timestamp Column */}
                          <td className="p-3.5 text-right font-mono text-[11px] text-[#785438]">
                            {dateStr}
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#5C4033] font-serif">
                        {loading ? 'Okuma günlükleri yükleniyor...' : 'Kayıtlı okuma günlüğü bulunamadı.'}
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: USER LEADERBOARD */}
      {activeTab === 'users' && (
        <div className="rounded-2xl border-2 border-[#E6D7BC] bg-[#FFFDF9] overflow-hidden shadow-fire">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              <thead className="bg-[#FDF8EE] border-b border-[#E6D7BC] text-[#78350F] uppercase tracking-wider font-bold text-[11px]">
                <tr>
                  <th className="p-3.5">Sıra & Kullanıcı</th>
                  <th className="p-3.5 text-center">Okunan Eser Sayısı</th>
                  <th className="p-3.5 text-center">Beğendiği Eserler</th>
                  <th className="p-3.5 text-center">Kaydedilen Kitaplar</th>
                  <th className="p-3.5 text-right">Kayıt Tarihi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-amber-200/60 font-sans">
                {userStats.length > 0 ? (
                  userStats.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-amber-50/50 transition-colors">
                      
                      <td className="p-3.5">
                        <button
                          type="button"
                          onClick={() => setSelectedUserForModal({ id: u.id, name: u.name, email: u.email, initialTab: 'savedBooks' })}
                          className="flex items-center gap-3 text-left group cursor-pointer"
                        >
                          <span className="font-mono font-bold text-amber-800 text-xs w-5 text-center">
                            #{idx + 1}
                          </span>

                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-bold text-xs shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <div className="font-bold text-[#362215] group-hover:text-[#9A3412] transition-colors flex items-center gap-1">
                              <span>{u.name || 'İsimsiz Kullanıcı'}</span>
                              <Sparkles className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[11px] text-[#785438] font-mono">
                              {u.email}
                            </div>
                          </div>
                        </button>
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedUserForModal({ id: u.id, name: u.name, email: u.email, initialTab: 'views' })}
                          className="font-bold font-mono text-xs text-[#78350F] hover:bg-amber-100/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Okuma Geçmişini Gör"
                        >
                          {u._count.viewRecords} okuma
                        </button>
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedUserForModal({ id: u.id, name: u.name, email: u.email, initialTab: 'likedPosts' })}
                          className="font-bold font-mono text-xs text-rose-900 hover:bg-rose-100/80 px-2.5 py-1.5 rounded-lg border border-rose-200/80 transition-colors cursor-pointer"
                          title="Beğenilen Yazı ve Şiirleri Gör"
                        >
                          ❤️ {u._count.likeRecords}
                        </button>
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedUserForModal({ id: u.id, name: u.name, email: u.email, initialTab: 'savedBooks' })}
                          className="font-bold font-mono text-xs text-amber-900 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg border border-amber-300/80 transition-colors cursor-pointer"
                          title="Kaydedilen Kitapları Gör"
                        >
                          📚 {u._count.savedBooks}
                        </button>
                      </td>

                      <td className="p-3.5 text-right font-mono text-[11px] text-[#785438]">
                        {new Date(u.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#5C4033] font-serif">
                      Henüz okuma yapmış üye bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USER ACTIVITY MODAL */}
      {selectedUserForModal && (
        <UserActivityModal
          userId={selectedUserForModal.id}
          userName={selectedUserForModal.name}
          userEmail={selectedUserForModal.email}
          initialTab={selectedUserForModal.initialTab || 'savedBooks'}
          onClose={() => setSelectedUserForModal(null)}
        />
      )}

      {/* ANALYTICS DETAIL MODAL */}
      {selectedLogForModal && (
        <AnalyticsDetailModal
          log={selectedLogForModal}
          onClose={() => setSelectedLogForModal(null)}
        />
      )}

    </div>
  );
}
