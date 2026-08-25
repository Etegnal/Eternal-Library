'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';

interface UserPasswordViewerProps {
  passwordHash: string;
}

export default function UserPasswordViewer({ passwordHash }: UserPasswordViewerProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1 shrink-0"
        title="Veritabanı Şifre Bilgisini / Hash Göster"
      >
        <KeyRound className="w-3 h-3" />
        {show ? <EyeOff className="w-3 h-3 text-amber-800" /> : <Eye className="w-3 h-3 text-amber-800" />}
        <span>{show ? 'Gizle' : 'İncele'}</span>
      </button>

      {show && (
        <span className="font-mono text-[11px] text-stone-600 bg-stone-100 px-2 py-1 rounded border border-stone-300 max-w-[200px] truncate" title={passwordHash}>
          {passwordHash || '(Boş/Kayıtsız)'}
        </span>
      )}
    </div>
  );
}
