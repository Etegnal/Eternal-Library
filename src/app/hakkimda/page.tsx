import React from 'react';
import Image from 'next/image';
import { User, BookOpen, Flame, Coffee } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cozy-amber-dark dark:text-amber-300 uppercase tracking-wider bg-amber-100/80 dark:bg-amber-950 px-3.5 py-1 rounded-full border border-amber-200 dark:border-amber-700">
          <User className="w-4 h-4 text-cozy-amber" />
          <span>Yazar & Kütüphaneci</span>
        </div>
        <h1 className="font-serif font-bold text-4xl text-cozy-coffee dark:text-amber-300">
          Hakkımda ve Kütüphane Notları
        </h1>
        <p className="text-cozy-coffee-light dark:text-amber-100/90 text-base leading-relaxed">
          Eski sayfaların kokusunda, sıcak şömine karşısında ve lo-fi melodiler eşliğinde hayat bulan bir edebiyat alanı.
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] dark:bg-[#23120A] border border-[#E6D7BC] dark:border-[#5C3119] shadow-parchment">
        <div className="md:col-span-4 relative aspect-square rounded-2xl overflow-hidden shadow-fire border-2 border-cozy-amber/40">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
            alt="Yazar Profil"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-8 space-y-4 text-cozy-coffee dark:text-amber-100">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-cozy-coffee dark:text-amber-300">
            Merhaba, Ben Kütüphane Yazarınız
          </h2>
          <p className="text-base leading-relaxed text-cozy-coffee/90 dark:text-amber-100/90 font-sans">
            Eternal Library (Kütüphane-i Ahsen), kelimelerin gücüne ve sessiz anların büyüsüne inanan bir edebiyat alanı olarak kuruldu. Burası; hızlı akan dünyanın telaşından uzakta, sıcak bir fincan çay veya kahve eşliğinde sığınılacak güvenli bir limandır.
          </p>
          <p className="text-sm leading-relaxed text-cozy-coffee-light dark:text-amber-200/90 font-sans">
            Denemelerimde zamanın yavaşlamasını, lo-fi yaşam felsefesini ve okuma kültürünü ele alırken; şiirlerimde iç dünyamızın sessiz ve derin yankılarına yer veriyorum.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-xs bg-amber-100 dark:bg-amber-950 text-cozy-amber-dark dark:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-700 font-medium">
              <Coffee className="w-3.5 h-3.5" />
              <span>Lo-Fi Hayranı</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs bg-amber-100 dark:bg-amber-950 text-cozy-amber-dark dark:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-700 font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kitap Tutkunu</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs bg-amber-100 dark:bg-amber-950 text-cozy-amber-dark dark:text-amber-300 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-700 font-medium">
              <Flame className="w-3.5 h-3.5" />
              <span>Gece Yazarı</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bookshelf Favorite Books */}
      <div className="space-y-6">
        <div className="border-b border-cozy-parchment-border dark:border-[#5C3119] pb-3">
          <h3 className="font-serif font-bold text-2xl text-cozy-coffee dark:text-amber-300 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cozy-amber" />
            <span>Başucu Kitaplığımdan Seçmeler</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#23120A] border border-cozy-parchment-border dark:border-[#5C3119] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark dark:text-amber-400 uppercase">Roman</span>
            <h4 className="font-serif font-bold text-lg text-cozy-coffee dark:text-amber-200">Kürk Mantolu Madonna</h4>
            <p className="text-xs text-cozy-coffee-light dark:text-amber-100/80">Sabahattin Ali</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#23120A] border border-cozy-parchment-border dark:border-[#5C3119] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark dark:text-amber-400 uppercase">Felsefe / Deneme</span>
            <h4 className="font-serif font-bold text-lg text-cozy-coffee dark:text-amber-200">Denemeler</h4>
            <p className="text-xs text-cozy-coffee-light dark:text-amber-100/80">Michel de Montaigne</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#23120A] border border-cozy-parchment-border dark:border-[#5C3119] shadow-sm space-y-2">
            <span className="text-xs font-bold text-cozy-amber-dark dark:text-amber-400 uppercase">Şiir</span>
            <h4 className="font-serif font-bold text-lg text-cozy-coffee dark:text-amber-200">Sevda Sözleri</h4>
            <p className="text-xs text-cozy-coffee-light dark:text-amber-100/80">Cemal Süreya</p>
          </div>
        </div>
      </div>
    </div>
  );
}
