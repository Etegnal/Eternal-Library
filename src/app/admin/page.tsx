import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeletePostButton from '@/components/DeletePostButton';
import { Plus, Feather, BookOpen, Edit, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-cozy-parchment-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cozy-amber flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cozy-wood" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl text-cozy-coffee">
              Yönetici Paneli
            </h1>
            <p className="text-xs text-cozy-coffee-light">
              Hoş geldiniz, {session.user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/new-post"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cozy-amber hover:bg-cozy-amber-dark text-cozy-wood font-bold text-xs shadow-cozy transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Yazı / Şiir Ekle</span>
          </Link>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#E6D7BC] shadow-parchment overflow-hidden">
        <div className="p-6 border-b border-cozy-parchment-border flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-cozy-coffee">
            Yayınlanmış Tüm İçerikler ({posts.length})
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-cozy-coffee">
              <thead className="bg-amber-100/60 text-xs font-bold uppercase text-cozy-amber-dark border-b border-amber-200">
                <tr>
                  <th className="px-6 py-3">Tür</th>
                  <th className="px-6 py-3">Başlık</th>
                  <th className="px-6 py-3">Tarih</th>
                  <th className="px-6 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${
                        post.type === 'YAZI' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {post.type === 'YAZI' ? <BookOpen className="w-3 h-3" /> : <Feather className="w-3 h-3" />}
                        <span>{post.type}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 font-serif font-semibold text-cozy-coffee">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-xs text-cozy-coffee-light">
                      {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      {/* Edit Button */}
                      <Link
                        href={`/admin/edit-post/${post.id}`}
                        className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors"
                        title="İçeriği Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      {/* Delete Button */}
                      <DeletePostButton postId={post.id} title={post.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-cozy-coffee-light">
            Henüz içerik bulunmuyor.
          </div>
        )}
      </div>
    </div>
  );
}
