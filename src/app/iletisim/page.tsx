'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Mail,
  Send,
  Feather,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  BookOpen,
} from 'lucide-react';

// Custom Brand Icon Helpers
function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ContactAndAboutPage() {
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

  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/erenalchn',
      icon: TwitterXIcon,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/erenalchn/',
      icon: InstagramIcon,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@yasineren23/featured',
      icon: YouTubeIcon,
    },
    {
      name: 'Kendi Web Sitem (erenalacahan.com.tr)',
      url: 'https://erenalacahan.com.tr/',
      customLogo: '/assets/eternal-corp-logo.png',
    },
    {
      name: '1000Kitap',
      url: 'https://1000kitap.com/ErenAlacahan',
      customLogo: '/assets/1k-logo.png',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Etegnal',
      icon: GitHubIcon,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B4513] dark:text-amber-300 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-300 dark:border-amber-800/60 shadow-sm">
          <User className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Kütüphaneci & İletişim</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#362215] dark:text-amber-200 drop-shadow-md">
          Hakkımda, Kütüphane Notları & İletişim
        </h1>

        <p className="text-[#5C4033] dark:text-white text-base leading-relaxed font-serif italic max-w-xl mx-auto">
          "Sıcak bir şömine karşısında okuyabileceğiniz kocaman bir kütüphane. Tabi zamanla..."
        </p>
      </div>

      {/* 1. YAZAR & KÜTÜPHANECİ PROFİL KARTI (DİJİTAL BAĞLANTI İKONLARI ALTINDA BİRLEŞİK) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] dark:bg-[#23120A] border-2 border-[#E6D7BC] dark:border-[#3D2214] shadow-parchment transition-all">
        <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden shadow-fire border-2 border-amber-500/40 bg-[#1F0F07]">
          <Image
            src="/assets/author.jpg"
            alt="Kütüphane Yazarınız"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="md:col-span-8 space-y-4 text-[#362215] dark:text-amber-100">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#362215] dark:text-amber-200">
            Merhaba, Ben Kütüphane Yazarınız
          </h2>
          
          <p className="text-base sm:text-lg leading-relaxed text-[#362215]/90 dark:text-amber-100/90 font-sans">
            Eternal Library (Kütüphane-i Ahsen), kendi kişisel yazılarımı, kafam dolu olduğu anlarda karaladıklarımı ve hislerimin dışavurumlarını topladığım bir sanal kütüphane. Sizin yazılarınızı ve edebi ürünlerinizi de paylaşmak istiyorum tabi ki gerçek bir kütüphane olması gerekir. Yayınlamak isterseniz benimle iletişime geçebilirsiniz.
          </p>

          {/* DİJİTAL SOSYAL MEDYA İKONLARI (TEK SIRA HİZALANMIŞ, BAŞLIKSIZ, TEMA RENKLERİYLE) */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-amber-200/70 dark:border-amber-900/60">
            {socialLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  aria-label={link.name}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100/90 dark:bg-[#1A0D06] hover:bg-amber-200 dark:hover:bg-[#2A150C] border border-amber-300/80 dark:border-amber-900/60 text-[#78350F] dark:text-amber-200 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110 shrink-0 group"
                >
                  {link.customLogo ? (
                    <img
                      src={link.customLogo}
                      alt={link.name}
                      className="w-6 h-6 object-contain filter dark:brightness-125 transition-transform group-hover:scale-110"
                    />
                  ) : IconComp ? (
                    <IconComp className="w-5 h-5 text-[#78350F] dark:text-amber-300 group-hover:text-amber-900 dark:group-hover:text-amber-100 transition-colors" />
                  ) : null}
                </a>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. BAŞUCU KİTAPLIĞIMDAN SEÇMELER */}
      <div className="space-y-6">
        <div className="border-b border-[#E6D7BC] dark:border-amber-900/60 pb-3">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#362215] dark:text-amber-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <span>Başucu Kitaplığımdan Seçmeler</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#23120A] border border-[#E6D7BC] dark:border-[#3D2214] shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#8B4513] dark:text-amber-400 uppercase tracking-wider">Roman</span>
            <h4 className="font-serif font-bold text-lg text-[#362215] dark:text-amber-100">Seçilmiş</h4>
            <p className="text-xs text-[#5C4033] dark:text-amber-200/80 font-medium">Gökhan Biçer</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#23120A] border border-[#E6D7BC] dark:border-[#3D2214] shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#8B4513] dark:text-amber-400 uppercase tracking-wider">Felsefe</span>
            <h4 className="font-serif font-bold text-lg text-[#362215] dark:text-amber-100">Varlık ve Hiçlik</h4>
            <p className="text-xs text-[#5C4033] dark:text-amber-200/80 font-medium">Jean-Paul Sartre</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#23120A] border border-[#E6D7BC] dark:border-[#3D2214] shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#8B4513] dark:text-amber-400 uppercase tracking-wider">Şiir</span>
            <h4 className="font-serif font-bold text-lg text-[#362215] dark:text-amber-100">Yerçekimli Karanfil</h4>
            <p className="text-xs text-[#5C4033] dark:text-amber-200/80 font-medium">Edip Cansever</p>
          </div>
        </div>
      </div>

      {/* 3. FORM SECTION: İLETİŞİM MEKTUBU & EDEBİ ESER GÖNDERİMİ */}
      <div className="space-y-6 pt-4">
        <div className="border-b border-[#E6D7BC] dark:border-amber-900/60 pb-3">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#362215] dark:text-amber-200 flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <span>Kütüphaneciye Mektup / Eser Gönderin</span>
          </h3>
        </div>

        {/* Type Selector Toggle */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto p-1.5 bg-[#23120A]/10 dark:bg-black/40 rounded-2xl border border-amber-900/10 dark:border-amber-900/40">
          <button
            type="button"
            onClick={() => { setType('MEKTUP'); setError(''); setSuccess(''); }}
            className={`py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
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
            className={`py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
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
              className="w-full py-3.5 px-6 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {type === 'ESER' ? <Feather className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>{loading ? 'Gönderiliyor...' : type === 'ESER' ? 'Eseri Gönder' : 'Mektubu Gönder'}</span>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
