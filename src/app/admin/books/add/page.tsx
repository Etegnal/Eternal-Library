import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import AdminBooksManager from '@/components/AdminBooksManager';

export const dynamic = 'force-dynamic';

export default function AdminAddBookPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#78350F] bg-[#FEF9EE] hover:bg-amber-100 px-4 py-2 rounded-full border border-amber-300 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#78350F]" />
          <span>Admin Paneline Dön</span>
        </Link>
      </div>

      <AdminBooksManager />
    </div>
  );
}
