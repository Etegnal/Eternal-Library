import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { slugify } from '@/lib/slug';
import { sendMail, IS_TEST_MODE, TEST_TARGET_EMAIL, getTestRecipients } from '@/lib/email';
import { generateNewPostEmailHtml } from '@/lib/emailTemplates';

import { getSiteUrl } from '@/lib/siteUrl';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get('featured') === 'true';

  const where: any = {};
  if (featuredOnly) {
    where.isFeatured = true;
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Yetkisiz erişim! Yalnızca yöneticiler yazı ekleyebilir.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, type, author, coverImage, readingTime, publishedAt, isFeatured } = body;

    if (!title || !content || !excerpt || !type) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
    }

    const cleanSlug = slugify(slug || title);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug: cleanSlug,
        content,
        excerpt,
        type, // "YAZI" | "SIIR"
        author: author || null,
        coverImage: coverImage || null,
        readingTime: readingTime || '3 dk okuma',
        isFeatured: isFeatured ?? true,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    // Trigger automated email notification (awaited for Serverless Function execution)
    try {
      const siteUrl = getSiteUrl();
      const emailHtml = generateNewPostEmailHtml(
        {
          title: newPost.title,
          slug: newPost.slug,
          excerpt: newPost.excerpt,
          type: newPost.type,
          author: newPost.author,
          readingTime: newPost.readingTime,
        },
        siteUrl
      );

      let recipients: string[] = getTestRecipients();
      const isTestModeActive = process.env.EMAIL_TEST_MODE !== 'false';

      if (!isTestModeActive) {
        const allUsers = await prisma.user.findMany({ select: { email: true } });
        recipients = allUsers.map((u) => u.email).filter(Boolean);
      }

      await sendMail({
        to: recipients,
        subject: `[Eternal Library] Yeni ${newPost.type === 'SIIR' ? 'Şiir' : 'Yazı'}: "${newPost.title}"`,
        html: emailHtml,
      });
    } catch (err) {
      console.error('Automated email dispatch error:', err);
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error('Post creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Bu slug zaten mevcut' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Yazı oluşturulamadı' }, { status: 500 });
  }
}
