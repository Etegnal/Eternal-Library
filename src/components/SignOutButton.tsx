'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/giris' })}
      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 border border-red-700/50"
    >
      <LogOut className="w-4 h-4 text-red-400" />
      <span>Oturumu Kapat</span>
    </button>
  );
}
