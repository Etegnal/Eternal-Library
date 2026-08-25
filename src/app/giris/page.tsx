'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, Mail, Lock, User, Flame, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    if (!loginIdentifier || !loginPassword) {
      setLoginError('Lütfen tüm alanları doldurun.');
      setLoginLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      email: loginIdentifier,
      password: loginPassword,
      redirect: false,
    });

    if (res?.error) {
      setLoginError('Kullanıcı adı/e-posta veya şifre hatalı!');
      setLoginLoading(false);
    } else {
      router.push('/profil');
      router.refresh();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regName || !regEmail || !regPassword || !regPasswordConfirm) {
      setRegError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (regPassword !== regPasswordConfirm) {
      setRegError('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setRegLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegError(data.error || 'Kayıt sırasında bir hata oluştu.');
        setRegLoading(false);
        return;
      }

      setRegSuccess('Hesabınız başarıyla oluşturuldu! Oturum açılıyor...');
      
      // Otomatik Giriş Yap
      setTimeout(async () => {
        const loginRes = await signIn('credentials', {
          email: regEmail,
          password: regPassword,
          redirect: false,
        });

        if (loginRes?.ok) {
          router.push('/profil');
          router.refresh();
        } else {
          setActiveTab('login');
          setLoginIdentifier(regEmail);
          setLoginPassword(regPassword);
          setRegLoading(false);
        }
      }, 1000);

    } catch (err) {
      setRegError('Bir bağlantı hatası oluştu.');
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-16">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E5D5B7] shadow-fire space-y-6">
        
        {/* Tab Buttons */}
        <div className="grid grid-cols-2 p-1.5 bg-[#23120A]/10 rounded-2xl border border-amber-900/10">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setLoginError(''); }}
            className={`py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-[#1C0E07] text-amber-200 shadow-md border border-amber-700/50'
                : 'text-[#5C4033] hover:text-[#362215]'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Giriş Yap</span>
          </button>
          
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'bg-[#1C0E07] text-amber-200 shadow-md border border-amber-700/50'
                : 'text-[#5C4033] hover:text-[#362215]'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Kayıt Ol</span>
          </button>
        </div>

        {/* TAB 1: GİRİŞ YAP */}
        {activeTab === 'login' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h1 className="font-serif font-bold text-2xl text-cozy-coffee">
                Kütüphaneye Hoş Geldiniz
              </h1>
              <p className="text-xs text-cozy-coffee-light">
                Kullanıcı adınız veya e-postanız ile giriş yapın
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-cozy-coffee">
              <div>
                <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
                  Kullanıcı Adı veya E-Posta
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="kullanici veya email@ornek.com"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <User className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
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
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <Lock className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>{loginLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: KAYIT OL */}
        {activeTab === 'register' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h1 className="font-serif font-bold text-2xl text-cozy-coffee">
                Aramıza Katılın
              </h1>
              <p className="text-xs text-cozy-coffee-light">
                Eternal Library ailesine katılmak için form doldurun
              </p>
            </div>

            {regError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{regError}</span>
              </div>
            )}

            {regSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{regSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-cozy-coffee">
              <div>
                <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Örn: yasin_eren"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <User className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="ornek@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <Mail className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
                  Şifre (En az 6 karakter)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <Lock className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cozy-coffee uppercase mb-1">
                  Şifre Tekrarı
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 text-sm focus:outline-none focus:border-cozy-amber bg-amber-50/50 placeholder:text-amber-800/40"
                  />
                  <Lock className="w-4 h-4 text-cozy-amber-dark absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full py-3 px-4 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-sm shadow-cozy transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{regLoading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
