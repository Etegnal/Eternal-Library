'use client';

import React from 'react';
import { ViewLogItem } from '@/components/AdminReadingAnalytics';
import { X, MapPin, Smartphone, Globe, Link2, ShieldCheck, Clock, User, BookOpen, Feather } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsDetailModalProps {
  log: ViewLogItem;
  onClose: () => void;
}

export default function AnalyticsDetailModal({ log, onClose }: AnalyticsDetailModalProps) {
  const isMember = Boolean(log.userId || log.user);
  const isPoem = log.postType === 'SIIR';
  const title = log.postTitle || log.post?.title || 'Eser';
  const slug = log.post?.slug;
  const detailUrl = slug ? (isPoem ? `/siirler/${slug}` : `/yazilar/${slug}`) : null;
  const dateStr = new Date(log.createdAt).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const locationText = log.city ? `${log.city}${log.country ? `, ${log.country}` : ''}` : 'Bilinmeyen Konum';
  const deviceType = log.deviceType || 'Masaüstü';
  const osText = log.os || 'Bilinmiyor';
  const browserText = log.browser || 'Bilinmiyor';
  const referrerText = log.referrer || 'Doğrudan URL / Yer İmi';
  const ipAddress = log.ipAddress || '—';
  const fingerprint = log.fingerprint || '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire p-6 space-y-6 relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#E6D7BC] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              <ShieldCheck className="w-5 h-5 text-[#9A3412]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#362215]">
                Okuyucu Analitik Detayları
              </h3>
              <p className="text-xs text-[#5C4033] font-sans">
                Konum, Cihaz, IP ve Bağlantı Bilgisi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-amber-100/50 hover:bg-amber-100 text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* READER & POST OVERVIEW CARD */}
        <div className="p-4 rounded-2xl bg-[#FEFBF3] border border-[#E6D7BC] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                isMember ? 'bg-amber-900 text-amber-100' : 'bg-stone-200 text-stone-700'
              }`}>
                {isMember ? (log.userName || 'U').charAt(0).toUpperCase() : 'M'}
              </div>
              <div>
                <span className="font-bold text-xs text-[#362215] block">
                  {log.userName || log.user?.name || 'Misafir Okuyucu'}
                </span>
                <span className="text-[11px] font-mono text-[#785438]">
                  {log.userEmail || log.user?.email || 'Misafir Oturumu'}
                </span>
              </div>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${
              isMember ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-stone-200 text-stone-700 border-stone-300'
            }`}>
              {isMember ? 'Kayıtlı Üye' : 'Misafir'}
            </span>
          </div>

          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-serif text-[#362215]">
            <div className="flex items-center gap-1.5 font-bold">
              {isPoem ? <Feather className="w-3.5 h-3.5 text-rose-700" /> : <BookOpen className="w-3.5 h-3.5 text-amber-700" />}
              {detailUrl ? (
                <Link href={detailUrl} target="_blank" className="hover:underline hover:text-[#9A3412]">
                  {title}
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#785438] font-mono">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>{dateStr}</span>
            </div>
          </div>
        </div>

        {/* ANALYTICS METRICS GRID */}
        <div className="grid grid-cols-2 gap-3 font-sans">
          
          {/* LOCATION */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78350F] uppercase">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Konum</span>
            </div>
            <p className="text-xs font-bold text-[#362215] font-serif">
              {locationText}
            </p>
          </div>

          {/* DEVICE TYPE */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78350F] uppercase">
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>Cihaz Türü</span>
            </div>
            <p className="text-xs font-bold text-[#362215]">
              {deviceType}
            </p>
          </div>

          {/* OPERATING SYSTEM */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78350F] uppercase">
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>İşletim Sistemi</span>
            </div>
            <p className="text-xs font-bold text-[#362215]">
              {osText}
            </p>
          </div>

          {/* BROWSER */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78350F] uppercase">
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>Tarayıcı</span>
            </div>
            <p className="text-xs font-bold text-[#362215]">
              {browserText}
            </p>
          </div>

          {/* REFERRER */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1 col-span-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#78350F] uppercase">
              <Link2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Ziyaret Kaynağı (Referrer)</span>
            </div>
            <p className="text-xs font-bold text-blue-900 font-mono">
              {referrerText}
            </p>
          </div>

          {/* IP ADDRESS */}
          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-900 uppercase">
              <span>🆔 IP Adresi</span>
            </div>
            <p className="text-xs font-bold font-mono text-purple-950">
              {ipAddress}
            </p>
          </div>

          {/* FINGERPRINT */}
          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-900 uppercase">
              <span>🔑 Cihaz Hash Kodu</span>
            </div>
            <p className="text-xs font-bold font-mono text-purple-950 truncate">
              {fingerprint}
            </p>
          </div>

        </div>

        {/* CLOSE BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#78350F] hover:bg-[#9A3412] text-amber-100 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
}
