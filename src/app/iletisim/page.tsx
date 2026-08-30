'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Mail, Send, Feather, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { data: session } = useSession();

  const [type, setType] = useState<'MEKTUP' | 'ESER'>('MEKTUP');
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !subject || !content) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          content,
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Gönderim sırasında bir hata oluştu.');
      } else {
        setSuccess(
          type === 'ESER'
            ? 'Edebi eseriniz kütüphanecimize ulaştırıldı! İnceleyip sizinle iletişime geçeceğiz.'
            : 'Mektubunuz kütüphanecimize ulaştırıldı. İlginiz için teşekkür ederiz.'
        );
        setSubject('');
        setContent('');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-300 dark:border-amber-800/60">
          <Mail className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>İletişim & Edebi Eser Gönderimi</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215] dark:text-amber-200 drop-shadow-md">
          Görüş ve Düşüncelerinizi Paylaşın
        </h1>
        <p className="text-[#5C4033] dark:text-white text-base leading-relaxed font-serif italic">
          Bir kitap önerisi, bir şiir yorumu veya kütüphanemizde yayınlanmasını istediğiniz edebi eserinizi mektup olarak bırakabilirsiniz.
        </p>
      </div>

      {/* Type Selector Toggle */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto p-1.5 bg-[#23120A]/10 dark:bg-black/30 rounded-2xl border border-amber-900/10 dark:border-amber-900/40">
        <button
          type="button"
          onClick={() => { setType('MEKTUP'); setError(''); setSuccess(''); }}
          className={`py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
            type === 'MEKTUP'
              ? 'bg-[#1C0E07] text-amber-200 shadow-md border border-amber-700/50'
              : 'text-[#5C4033] dark:text-amber-200/70 hover:text-[#362215] dark:hover:text-amber-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Genel Mektup</span>
        </button>

        <button
          type="button"
          onClick={() => { setType('ESER'); setError(''); setSuccess(''); }}
          className={`py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
            type === 'ESER'
              ? 'bg-gradient-to-r from-[#78350F] to-[#9A3412] text-amber-100 shadow-md border border-amber-500/50 scale-105'
              : 'text-[#5C4033] dark:text-amber-200/70 hover:text-[#362215] dark:hover:text-amber-100'
          }`}
        >
          <Feather className="w-4 h-4 text-amber-400" />
          <span>Edebi Eser Paylaşın</span>
        </button>
      </div>

      {/* Main Form Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] dark:bg-[#23120A] border-2 border-[#E5D5B7] dark:border-[#3D2214] shadow-fire space-y-6">
        
        {type === 'ESER' && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#1A0D06] border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
            <p className="leading-relaxed font-medium">
              Kendi kaleme aldığınız deneme, şiir veya öyküleri yayınlanmak üzere doğrudan admin panelimize gönderebilirsiniz.
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-cozy-coffee dark:text-amber-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-[#362215] dark:text-amber-200">Adınız Soyadınız</label>
              <input
                type="text"
                required
                placeholder="Adınız..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-[#1A0D06] dark:text-amber-100 dark:placeholder:text-stone-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-[#362215] dark:text-amber-200">E-Posta Adresiniz</label>
              <input
                type="email"
                required
                placeholder="eposta@adresiniz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-[#1A0D06] dark:text-amber-100 dark:placeholder:text-stone-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#362215] dark:text-amber-200">
              {type === 'ESER' ? 'Eser Başlığı / Türü' : 'Konu / Başlık'}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'ESER' ? 'Örn: Gece Yarısı Denemesi / Şiir' : 'Mesaj konusu...'}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-[#1A0D06] dark:text-amber-100 dark:placeholder:text-stone-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1 text-[#362215] dark:text-amber-200">
              {type === 'ESER' ? 'Edebi Eser İçeriği' : 'Mektubunuz'}
            </label>
            <textarea
              rows={7}
              required
              placeholder={
                type === 'ESER'
                  ? 'Şiiriniz veya denemenizin tam metnini buraya kaleme alabilirsiniz...'
                  : 'Düşüncelerinizi buraya kaleme alabilirsiniz...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 dark:bg-[#1A0D06] dark:text-amber-100 dark:placeholder:text-stone-500 font-serif leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
          >
            {type === 'ESER' ? <Feather className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            <span>{loading ? 'Gönderiliyor...' : type === 'ESER' ? 'Eseri Gönder' : 'Mektubu Gönder'}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
