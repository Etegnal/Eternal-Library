import React from 'react';
import Link from 'next/link';
import { Flame, Heart, Coffee, BookOpen, Feather, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#190D07] text-cozy-parchment border-t border-cozy-amber/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Brand info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cozy-amber flex items-center justify-center">
              <Flame className="w-4 h-4 text-cozy-wood fill-cozy-wood" />
            </div>
            <span className="font-serif font-bold text-xl text-cozy-parchment">
              Eternal Library
            </span>
          </div>
          <p className="text-sm text-cozy-parchment/70 leading-relaxed font-sans max-w-md">
            Sıcak ahşap tonları, loş şömine ateşi ve eski kitap kokuları arasında kişisel düşünceler, edebiyat yazıları ve 365 günlük ilham sözleri platformu.
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400/80 font-mono">
            <Coffee className="w-4 h-4 text-cozy-amber" />
            <span>Sıcak çayınız ve kitabınız daima hazır olsun.</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-serif font-bold text-sm text-cozy-amber uppercase tracking-wider mb-3">
            Keşfet
          </h4>
          <ul className="space-y-2 text-sm text-cozy-parchment/80">
            <li>
              <Link href="/yazilar" className="hover:text-cozy-amber transition-colors">
                Denemeler & Yazılar
              </Link>
            </li>
            <li>
              <Link href="/siirler" className="hover:text-cozy-amber transition-colors">
                Şiir Seçkisi
              </Link>
            </li>
            <li>
              <Link href="/gunun-sozu" className="hover:text-cozy-amber transition-colors">
                365 Günün Sözü
              </Link>
            </li>
            <li>
              <Link href="/hakkimda" className="hover:text-cozy-amber transition-colors">
                Hakkımda & Kitaplık
              </Link>
            </li>
          </ul>
        </div>

        {/* Lo-fi Quote & Admin Panel Access */}
        <div className="md:col-span-4 space-y-3 p-5 rounded-xl bg-cozy-wood/60 border border-cozy-amber/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-cozy-amber uppercase tracking-wider">
            <Feather className="w-4 h-4" />
            <span>Kütüphane Notu</span>
          </div>
          <p className="font-serif italic text-xs text-cozy-parchment/90 leading-relaxed">
            "Okumak, gidenin yerine gelmeyeni beklemek gibidir; ama kitaplar hep gelir."
          </p>
          <div className="pt-2 border-t border-amber-950 flex items-center justify-between text-xs text-cozy-parchment/60">
            <span>Yönetim Erişimi</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-cozy-amber hover:underline font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Girişi</span>
            </Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-amber-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-cozy-parchment/60 gap-4">
        <p>© {new Date().getFullYear()} Eternal Library. Tüm hakları saklıdır.</p>
        <p className="flex items-center gap-1">
          <span>Lo-fi tutkusuyla</span>
          <Heart className="w-3.5 h-3.5 text-cozy-amber fill-cozy-amber" />
          <span>geliştirildi.</span>
        </p>
      </div>
    </footer>
  );
}
