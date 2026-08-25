import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { User, Mail, ShieldCheck, Calendar, Shield, BookOpen, LogOut } from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/giris');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect('/giris');
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      
      {/* Main Profile Card */}
      <div className="p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire relative overflow-hidden space-y-8">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E6D7BC]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-serif text-3xl font-bold shadow-fire border-2 border-amber-500/50 shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div>
                <h1 className="font-serif font-bold text-2xl text-[#362215]">
                  {user.name || 'Kullanıcı'}
                </h1>
                <p className="text-sm text-[#5C4033] flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>{user.email}</span>
                </p>
              </div>

              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAdmin 
                  ? 'bg-amber-100 text-amber-900 border border-amber-400' 
                  : 'bg-stone-100 text-stone-700 border border-stone-300'
              }`}>
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> : <User className="w-3.5 h-3.5 text-stone-600" />}
                <span>{isAdmin ? 'Yönetici (Admin)' : 'Üye (User)'}</span>
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#785438] pt-1">
              <Calendar className="w-3.5 h-3.5 text-amber-800" />
              <span>Üyelik Tarihi: {new Date(user.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Profile Info Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-[#785438] uppercase tracking-wider">Kullanıcı ID</span>
            <p className="font-mono text-xs text-[#362215] break-all">{user.id}</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-[#785438] uppercase tracking-wider">Hesap Durumu</span>
            <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Aktif Üye</span>
            </p>
          </div>
        </div>

        {/* Actions & Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E6D7BC]">
          {isAdmin ? (
            <Link
              href="/admin"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center justify-center gap-2 border border-amber-500/40"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Yönetici Paneline Git</span>
            </Link>
          ) : (
            <div className="text-xs text-[#5C4033]">
              Eternal Library dijital kütüphanesine hoş geldiniz.
            </div>
          )}

          <SignOutButton />
        </div>

      </div>
    </div>
  );
}
