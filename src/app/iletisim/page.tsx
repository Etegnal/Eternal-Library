import React from 'react';
import { Mail, Send } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          <Mail className="w-4 h-4 text-amber-700" />
          <span>İletişim & Mektup</span>
        </div>
        <h1 className="font-cinzel font-bold text-4xl text-cozy-coffee">
          Görüş ve Düşüncelerinizi Paylaşın
        </h1>
        <p className="text-cozy-coffee-light text-base leading-relaxed">
          Bir kitap önerisi, bir şiir yorumu veya sadece merhaba demek için mektup bırakabilirsiniz.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border-2 border-[#E5D5B7] shadow-fire space-y-6">
        <form className="space-y-4 text-cozy-coffee">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Adınız Soyadınız</label>
              <input
                type="text"
                placeholder="Adınız..."
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">E-Posta Adresiniz</label>
              <input
                type="email"
                placeholder="eposta@adresiniz.com"
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Konu</label>
            <input
              type="text"
              placeholder="Mesaj konusu..."
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Mesajınız</label>
            <textarea
              rows={5}
              placeholder="Düşüncelerinizi buraya kaleme alabilirsiniz..."
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 font-serif"
            />
          </div>

          <button
            type="button"
            className="w-full py-3.5 px-6 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Mektubu Gönder</span>
          </button>
        </form>
      </div>
    </div>
  );
}
