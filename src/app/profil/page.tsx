import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { User, Mail, ShieldCheck, Calendar } from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';
import UserPersonalLibrary, { LikedPost } from '@/components/UserPersonalLibrary';
import EditProfileModal from '@/components/EditProfileModal';
import UserSubmissionsSection, { UserSubmissionItem } from '@/components/UserSubmissionsSection';

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
      image: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect('/giris');
  }

  const isAdmin = user.role === 'ADMIN';

  // 1. Fetch user's liked posts & poems from LikeRecord table
  const likedRecords = await prisma.likeRecord.findMany({
    where: { userId: user.id },
    include: {
      post: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const likedPosts: LikedPost[] = likedRecords.map((r) => r.post);

  // 2. Fetch user's saved books from SavedBook table
  const savedBookRecords = await prisma.savedBook.findMany({
    where: { userId: user.id },
    include: {
      book: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const savedBooks = savedBookRecords.map((r) => r.book);

  // 3. Fetch user's pending / submitted works from Letter table (type = 'ESER')
  const userLetters = await prisma.letter.findMany({
    where: {
      email: user.email.toLowerCase(),
      type: 'ESER',
    },
    orderBy: { createdAt: 'desc' },
  });

  // 4. Fetch user's published works from Post table
  const publishedPosts = await prisma.post.findMany({
    where: {
      OR: [
        { author: user.name || undefined },
        { author: user.email },
      ],
    },
    orderBy: { publishedAt: 'desc' },
  });

  // Build unified user submissions list
  const userSubmissions: UserSubmissionItem[] = [];

  for (const post of publishedPosts) {
    userSubmissions.push({
      id: `post-${post.id}`,
      title: post.title,
      excerpt: post.excerpt,
      type: post.type,
      status: 'PUBLISHED',
      publishedUrl: post.type === 'SIIR' ? `/siirler/${post.slug}` : `/yazilar/${post.slug}`,
      createdAt: post.publishedAt,
    });
  }

  for (const letter of userLetters) {
    const existsInPublished = publishedPosts.some(
      (p) => p.title.toLowerCase().trim() === letter.subject.toLowerCase().trim()
    );
    if (!existsInPublished) {
      userSubmissions.push({
        id: `letter-${letter.id}`,
        title: letter.subject,
        excerpt: letter.content.trim().slice(0, 150) + (letter.content.length > 150 ? '...' : ''),
        type: 'ESER',
        status: 'PENDING',
        createdAt: letter.createdAt,
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-8">
      
      {/* 1. Main Profile Card */}
      <div className="p-8 rounded-3xl bg-[#FFFDF9] border-2 border-[#E6D7BC] shadow-fire relative overflow-hidden space-y-6">
        
        {/* Background Decorative Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#E6D7BC]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#78350F] to-[#9A3412] text-amber-100 flex items-center justify-center font-serif text-3xl font-bold shadow-fire border-2 border-amber-500/50 shrink-0 overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
            ) : (
              <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
            )}
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

        {/* Profile Actions & Edit Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <EditProfileModal user={user} />

            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#78350F] to-[#9A3412] hover:from-[#9A3412] hover:to-[#78350F] text-amber-100 font-bold text-xs shadow-cozy transition-all flex items-center justify-center gap-2 border border-amber-500/40"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Yönetici Paneline Git</span>
              </Link>
            )}

            <Link
              href="/iletisim"
              className="px-4 py-2.5 rounded-xl bg-amber-100/90 dark:bg-[#78350F] hover:bg-amber-200 dark:hover:bg-[#9A3412] text-[#78350F] dark:text-amber-100 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 border border-amber-300/80 dark:border-amber-600/50 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              <span>Admin'e Ulaş</span>
            </Link>
          </div>

          <SignOutButton />
        </div>

      </div>

      {/* 2. BENİM KALEMİMDEN (USER SUBMISSIONS & PUBLISHED WORKS SECTION) */}
      <UserSubmissionsSection submissions={userSubmissions} />

      {/* 3. PERSONAL LIBRARY / LIKED & SAVED WORKS SECTION */}
      <UserPersonalLibrary likedPosts={likedPosts} savedBooks={savedBooks} />

    </div>
  );
}
