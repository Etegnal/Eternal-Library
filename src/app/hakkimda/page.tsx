import React from 'react';
import Image from 'next/image';
import { User, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark uppercase tracking-wider bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
          <User className="w-4 h-4 text-cozy-amber" />
          <span>Yazar & Kütüphaneci</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-[#362215]">
          Hakkımda ve Kütüphane Notları
        </h1>
        <p className="text-[#5C4033] text-base leading-relaxed font-serif italic">
          Sıcak bir şömine karşısında okuyabileceğiniz kocaman bir kütüphane. Tabi zamanla...
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-parchment">
        <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden shadow-fire border-2 border-cozy-amber/40 bg-[#1F0F07]">
          <Image
            src="/assets/author.jpg"
            alt="Yazar Profil"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="md:col-span-8 space-y-4 text-[#362215]">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#362215]">
            Merhaba, Ben Kütüphane Yazarınız
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#362215]/90 font-sans">
            Eternal Library (Kütüphane-i Ahsen), kendi kişisel yazılarımı, kafam dolu olduğu anlarda karaladıklarımı ve hislerimin dışavurumlarını topladığım bir sanal kütüphane. Sizin yazılarınızı ve edebi ürünlerinizi de paylaşmak istiyorum tabi ki gerçek bir kütüphane olması gerekir. Yayınlamak isterseniz benimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>

      {/* Bookshelf Favorite Books */}
      <div className="space-y-6">
        <div className="border-b border-[#E6D7BC] pb-3">
          <h3 className="font-serif font-bold text-2xl text-[#362215] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cozy-amber" />
            <span>Başucu Kitaplığımdan Seçmeler</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark uppercase tracking-wider">Roman</span>
            <h4 className="font-serif font-bold text-lg text-[#362215]">Seçilmiş</h4>
            <p className="text-xs text-[#5C4033] font-medium">Gökhan Biçer</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark uppercase tracking-wider">Felsefe</span>
            <h4 className="font-serif font-bold text-lg text-[#362215]">Varlık ve Hiçlik</h4>
            <p className="text-xs text-[#5C4033] font-medium">Jean-Paul Sartre</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6D7BC] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark uppercase tracking-wider">Şiir</span>
            <h4 className="font-serif font-bold text-lg text-[#362215]">Yerçekimli Karanfil</h4>
            <p className="text-xs text-[#5C4033] font-medium">Edip Cansever</p>
          </div>
        </div>
      </div>
    </div>
  );
}
