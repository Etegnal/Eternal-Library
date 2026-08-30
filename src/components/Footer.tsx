import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Coffee, Feather } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#190D07] text-cozy-parchment border-t border-cozy-amber/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Brand info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-fire border border-amber-500/50 bg-[#1F0F07] shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Eternal Library Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-cinzel font-bold text-lg tracking-[0.12em] uppercase text-amber-200">
              ETERNAL LIBRARY
            </span>
          </div>
          
          <p className="text-sm text-cozy-parchment/70 leading-relaxed font-sans max-w-md">
            Her insan eninde sonunda kendi hayatı sandığı bir hikaye uydurur. O hikayelerin toplamı da kendi hayatı olur. Sonsuz bir hikaye, sonsuz bir kütüphane. Tabi yazmaya devam ettikçe...
          </p>

          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-serif italic pt-1">
            <Coffee className="w-4 h-4 text-cozy-amber shrink-0" />
            <span>Valar Morghulis</span>
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
              <Link href="/iletisim" className="hover:text-cozy-amber transition-colors">
                Hakkımda & İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Lo-fi Quote & Submission Button */}
        <div className="md:col-span-4 space-y-3 p-5 rounded-xl bg-cozy-wood/60 border border-cozy-amber/20 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cozy-amber uppercase tracking-wider">
              <Feather className="w-4 h-4" />
              <span>Kütüphane Notu</span>
            </div>
            <p className="font-serif italic text-xs text-cozy-parchment/90 leading-relaxed">
              "Okumak, gidenin yerine gelmeyeni beklemek gibidir; ama kitaplar hep gelir."
            </p>
          </div>

          <Link
            href="/iletisim"
            className="pt-2.5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-100 bg-[#9A3412] hover:bg-[#78350F] border border-amber-500/50 shadow-md transition-all text-center"
          >
            <Feather className="w-3.5 h-3.5 text-amber-300" />
            <span>Edebi Eserinizi Bizimle Paylaşın</span>
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-amber-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-cozy-parchment/60 gap-4">
        <p>© {new Date().getFullYear()} Eternal Library. Tüm hakları saklıdır.</p>
        <p className="font-serif italic text-amber-200/80">
          Jon Snow'a saygılarla
        </p>
      </div>
    </footer>
  );
}
