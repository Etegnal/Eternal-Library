import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminDashboardView from '@/components/AdminDashboardView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/giris');
  }

  // Admin kontrolü
  if ((session.user as any)?.role !== 'ADMIN') {
    redirect('/profil');
  }

  const postsRaw = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
    include: {
      likeRecords: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  const usersRaw = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      createdAt: true,
    },
  });

  const lettersRaw = await prisma.letter.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const posts = postsRaw.map((p) => ({
    id: p.id,
    title: p.title,
    type: p.type,
    likes: p.likes,
    views: p.views,
    isFeatured: p.isFeatured,
    publishedAt: p.publishedAt.toISOString(),
    likedUsers: p.likeRecords.map((lr) => ({
      id: lr.id,
      name: lr.user.name,
      email: lr.user.email,
      createdAt: lr.createdAt.toISOString(),
    })),
  }));

  const users = usersRaw.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  const letters = lettersRaw.map((l) => ({
    id: l.id,
    name: l.name,
    email: l.email,
    subject: l.subject,
    content: l.content,
    type: l.type,
    isRead: l.isRead,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <AdminDashboardView
      userEmail={session.user?.email || ''}
      posts={posts}
      users={users}
      letters={letters}
    />
  );
}
