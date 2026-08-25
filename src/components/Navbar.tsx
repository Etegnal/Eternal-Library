'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navLinks = [
    { href: '/', label: 'ANASAYFA' },
    { href: '/hakkimda', label: 'HAKKIMDA' },
    { href: '/yazilar', label: 'YAZILAR' },
    { href: '/siirler', label: 'ŞİİRLER' },
    { href: '/gunun-sozu', label: 'GÜNÜN SÖZÜ' },
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
              isHomePage
                ? 'text-amber-200 drop-shadow-md group-hover:text-amber-400'
                : 'text-[#362215] group-hover:text-amber-900'
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
        <div className="md:hidden absolute left-12 right-12 top-1/2 -translate-y-1/2 text-center pointer-events-none">
          <Link href="/" className="pointer-events-auto inline-block">
            <span className={`font-cinzel font-bold text-xs tracking-[0.12em] uppercase transition-colors ${
              isHomePage
                ? 'text-amber-200 drop-shadow-md'
                : 'text-[#362215]'
            }`}>
              ETERNAL LIBRARY
            </span>
          </Link>
        </div>

        {/* 3. Mobile Hamburger Button (Far Right) */}
        <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
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
          {navLinks.map((link) => {
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

          <Link
            href="/admin"
            className="ml-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-950/90 hover:bg-amber-900 border border-amber-600/50 transition-colors flex items-center gap-1 shadow-sm"
            title="Yönetici Girişi"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin</span>
          </Link>
        </nav>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 mx-2 p-4 rounded-2xl bg-[#1C0E07]/95 backdrop-blur-xl border border-amber-700/50 shadow-2xl space-y-2"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-center py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${
                    active
                      ? 'bg-[#9A3412] text-[#FEF3C7] border border-amber-500/50'
                      : 'text-amber-200/80 hover:bg-amber-900/40'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block text-center py-2.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-600/50"
            >
              Yönetici Paneli (Admin)
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
