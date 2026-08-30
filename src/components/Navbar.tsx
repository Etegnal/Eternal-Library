'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Menu, X, ShieldCheck, User, LogIn, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const isHomePage = pathname === '/';
  const isDarkHeader = isHomePage || pathname.startsWith('/testler') || theme === 'dark';

  const navLinks = [
    { href: '/', label: 'ANASAYFA' },
    { href: '/kitaplar', label: 'KİTAPLAR' },
    { href: '/yazilar', label: 'YAZILAR' },
    { href: '/siirler', label: 'ŞİİRLER' },
    { href: '/testler', label: 'TESTLER' },
    { href: '/muzikler', label: 'PLAKLAR', hideOnDesktop: true },
    { href: '/iletisim', label: 'İLETİŞİM' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[48px]">
        
        {/* DESKTOP LAYOUT (>= md): SIDE-BY-SIDE LOGO EMBLEM AND TITLE ON LEFT */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-fire border-2 border-amber-500/50 group-hover:scale-105 transition-transform bg-[#1F0F07] shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Eternal Library Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className={`font-cinzel font-bold text-base tracking-[0.15em] uppercase transition-colors ${
              isDarkHeader
                ? 'text-amber-200 drop-shadow-md group-hover:text-amber-400'
                : 'text-[#362215] dark:text-amber-200 group-hover:text-amber-900'
            }`}>
              ETERNAL LIBRARY
            </span>
          </Link>
        </div>

        {/* MOBILE LAYOUT (< md):
            1. LOGO EMBLEM ON FAR LEFT
            2. ETERNAL LIBRARY TITLE IN EXACT CENTER
            3. HAMBURGER BUTTON ON FAR RIGHT */}

        {/* 1. Mobile Logo Emblem (Far Left) */}
        <Link href="/" className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 flex items-center shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-fire border-2 border-amber-500/50 bg-[#1F0F07]">
            <Image
              src="/assets/logo.png"
              alt="Eternal Library Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* 2. Mobile Title Text (Exact Center) */}
        <div className="md:hidden absolute left-12 right-16 top-1/2 -translate-y-1/2 text-center pointer-events-none">
          <Link href="/" className="pointer-events-auto inline-block">
            <span className={`font-cinzel font-bold text-xs tracking-[0.12em] uppercase transition-colors ${
              isDarkHeader
                ? 'text-amber-200 drop-shadow-md'
                : 'text-[#362215] dark:text-amber-200'
            }`}>
              ETERNAL LIBRARY
            </span>
          </Link>
        </div>

        {/* 3. Mobile Right Buttons (Theme Toggle + Hamburger) */}
        <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#23120A]/85 text-amber-100 border border-amber-700/40 focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Temayı Değiştir"
            title={theme === 'dark' ? 'Gündüz Moduna Geç' : 'Gece Moduna Geç'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-amber-300" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-[#23120A]/85 text-amber-100 border border-amber-700/40 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* DESKTOP NAVIGATION BAR (>= md) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#23120A]/85 backdrop-blur-md px-5 py-2 rounded-full border border-amber-700/40 shadow-2xl">
          {navLinks.filter(l => !l.hideOnDesktop).map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-[#9A3412] to-[#78350F] text-[#FEF3C7] shadow-lg border border-amber-500/50 scale-105'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {session ? (
            <div className="flex items-center gap-1.5 ml-2">
              <Link
                href="/profil"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-950/90 hover:bg-amber-900 border border-amber-600/50 transition-colors flex items-center gap-1.5 shadow-sm"
                title="Profilim"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{session.user?.name || 'Profilim'}</span>
              </Link>

              {(session.user as any)?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] border border-amber-500/60 transition-all flex items-center gap-1 shadow-md scale-105"
                  title="Yönetici Paneli"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          ) : (
            <Link
              href="/giris"
              className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-950/90 hover:bg-amber-900 border border-amber-600/50 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Giriş Yap / Kayıt Ol"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Giriş / Kayıt</span>
            </Link>
          )}

          {/* DESKTOP THEME TOGGLE ICON BUTTON */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-1.5 rounded-full text-amber-200 hover:text-amber-100 hover:bg-amber-900/60 border border-amber-600/50 transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={theme === 'dark' ? 'Gündüz Moduna Geç (Açık)' : 'Gece Moduna Geç (Koyu)'}
            aria-label="Temayı Değiştir"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-amber-300" />
            )}
          </button>

        </nav>

      </div>

      {/* MOBILE COMPACT GLASSMORPHISM FLOATING MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 right-4 sm:right-8 w-60 sm:w-64 p-3 rounded-2xl bg-[#140A04]/85 backdrop-blur-2xl border border-amber-500/30 shadow-2xl shadow-black/90 space-y-1.5 z-50 text-left"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3.5 py-2 rounded-xl text-xs font-bold font-serif tracking-wider uppercase transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-[#9A3412] to-[#78350F] text-[#FEF3C7] shadow-md border border-amber-500/40'
                        : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {session ? (
              <div className="space-y-1.5 pt-2 border-t border-amber-900/50">
                <Link
                  href="/profil"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/40 flex items-center justify-between transition-colors"
                >
                  <span className="truncate">Profilim</span>
                  <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </Link>

                {(session.user as any)?.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-200 bg-gradient-to-r from-[#9A3412] to-[#78350F] hover:from-[#78350F] hover:to-[#9A3412] border border-amber-500/50 flex items-center justify-between transition-all shadow-md"
                  >
                    <span>Yönetici Paneli</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="pt-2 border-t border-amber-900/50">
                <Link
                  href="/giris"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/40 flex items-center justify-between transition-colors"
                >
                  <span>Giriş / Kayıt</span>
                  <LogIn className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

