'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Flame, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@eternallibrary.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('E-posta veya şifre hatalı!');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-16">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E5D5B7] shadow-fire space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cozy-amber mx-auto flex items-center justify-center shadow-fire">
            <ShieldCheck className="w-6 h-6 text-cozy-wood" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-cozy-coffee">
            Yönetici Girişi
          </h1>
          <p className="text-xs text-cozy-coffee-light">
            Yazı ve şiir yönetimi için giriş yapın
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-cozy-coffee">
          <div>
            <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
              E-Posta Adresi
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50"
              />
              <Mail className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
              Şifre
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50"
              />
              <Lock className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-cozy-coffee-light bg-amber-50 p-3 rounded-xl border border-amber-200/60">
          Varsayılan Giriş: <span className="font-mono font-bold">admin@eternallibrary.com</span> / <span className="font-mono font-bold">admin123</span>
        </div>

      </div>
    </div>
  );
}
