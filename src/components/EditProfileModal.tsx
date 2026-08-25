'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, X, CheckCircle2, Save, UserCog } from 'lucide-react';

interface EditProfileModalProps {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleOpen = () => {
    setName(user.name || '');
    setEmail(user.email || '');
    setCurrentPassword('');
    setNewPassword('');
    setError('');
    setSuccessMsg('');
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || 'Profil başarıyla güncellendi');
        setTimeout(() => {
          setIsOpen(false);
          router.refresh();
        }, 1200);
      } else {
        setError(data.error || 'Profil güncellenirken bir hata oluştu');
      }
    } catch (e) {
      console.error(e);
      setError('Bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON ON PROFILE */}
      <button
        type="button"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs border border-amber-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <UserCog className="w-4 h-4 text-amber-800" />
        <span>Bilgilerimi Güncelle</span>
      </button>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFFDF9] border-2 border-[#E6D7BC] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative animate-fadeIn">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pb-4 border-b border-[#E6D7BC]">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-xl">
                <UserCog className="w-5 h-5 text-amber-700" />
                <h2>Profil Bilgilerini Güncelle</h2>
              </div>
              <p className="text-xs text-[#5C4033]">
                Hesap adınızı, e-postanızı ve şifrenizi buradan güncelleyebilirsiniz.
              </p>
            </div>

            {/* Error / Success Notifications */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ad Soyad</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#5C4033] mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-700" />
                  <span>E-posta Adresi</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
                />
              </div>

              {/* Password Section Divider */}
              <div className="pt-2 border-t border-[#E6D7BC]">
                <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                  Şifre Değişikliği (Opsiyonel)
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#5C4033] mb-1 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-700" />
                      <span>Mevcut Şifreniz</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Mevcut şifre (Şifre değiştirecekseniz gerekli)"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-amber-200 text-xs focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#5C4033] mb-1 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-700" />
                      <span>Yeni Şifre</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Yeni şifre (En az 6 karakter)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-amber-200 text-xs focus:outline-none focus:border-cozy-amber bg-amber-50/50 text-[#362215]"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}
