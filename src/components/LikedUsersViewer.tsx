'use client';

import React, { useState } from 'react';
import { Heart, X, User } from 'lucide-react';

interface LikedUserItem {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

interface LikedUsersViewerProps {
  postTitle: string;
  totalLikes: number;
  likedUsers: LikedUserItem[];
}

export default function LikedUsersViewer({ postTitle, totalLikes, likedUsers }: LikedUsersViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 transition-colors"
        title="Beğenen Kullanıcıları Gör"
      >
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
        <span>{totalLikes} Beğeni</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFFDF9] border-2 border-[#E6D7BC] rounded-3xl shadow-2xl p-6 space-y-5 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1 pb-3 border-b border-[#E6D7BC]">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span>Beğenen Kullanıcılar</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#362215]">
                {postTitle}
              </h3>
            </div>

            {/* Users List */}
            {likedUsers.length > 0 ? (
              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {likedUsers.map((u) => (
                  <div key={u.id} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-[#362215]">{u.name || '(İsimsiz Kullanıcı)'}</p>
                        <p className="text-[11px] font-mono text-stone-600">{u.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {new Date(u.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-stone-600 italic bg-amber-50/50 rounded-2xl border border-amber-200/50">
                Henüz kayıtlı bir üye tarafından beğenilmedi (veya anonim beğeniler mevcut).
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-cozy-amber text-cozy-wood font-bold text-xs shadow-sm hover:bg-cozy-amber-dark transition-colors"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
