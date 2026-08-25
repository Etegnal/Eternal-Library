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
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRAND LOGO AND NAME SIDE-BY-SIDE IN FLEX ROW */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-fire border-2 border-amber-500/50 group-hover:scale-105 transition-transform bg-[#1F0F07] shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Eternal Library Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-cinzel font-bold text-sm sm:text-base text-amber-200 tracking-[0.15em] uppercase drop-shadow-md group-hover:text-amber-400 transition-colors">
            ETERNAL LIBRARY
          </span>
        </Link>

        {/* DESKTOP NAVIGATION BAR */}
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

        {/* MOBILE MENU BUTTON */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-[#23120A]/85 text-amber-100 border border-amber-700/40 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {isOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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
