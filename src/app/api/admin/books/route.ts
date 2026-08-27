import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slug';
import { chunkTextIntoPages } from '@/lib/pageChunker';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const yearStr = formData.get('year') as string;
    const pagesStr = formData.get('pages') as string;
    const category = formData.get('category') as string;
    const summary = formData.get('summary') as string;
    const ratingStr = formData.get('rating') as string;
    const isReadableStr = formData.get('isReadable') as string;
    const contentText = formData.get('content') as string; // Optional full text
    const file = formData.get('cover') as File | null;

    if (!title || !author) {
      return NextResponse.json({ error: 'Başlık ve Yazar zorunludur' }, { status: 400 });
    }

    const slug = slugify(title);
    const year = parseInt(yearStr, 10) || 2026;
    const pages = parseInt(pagesStr, 10) || 100;
    const rating = parseFloat(ratingStr) || 4.8;
    const isReadable = isReadableStr === 'true';

    let coverUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';

    // Cover File Upload with Serverless (Vercel) + Local fallback
    if (file && file.size > 0) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const publicCoversDir = path.join(process.cwd(), 'public', 'covers');
        await mkdir(publicCoversDir, { recursive: true });

        const fileExtension = path.extname(file.name) || '.jpg';
        const fileName = `${slug}${fileExtension}`;
        const filePath = path.join(publicCoversDir, fileName);

        await writeFile(filePath, buffer);
        coverUrl = `/covers/${fileName}`;
      } catch (fsErr) {
        console.warn('Local fs write failed (Serverless environment), converting to base64 Data URL:', fsErr);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = file.type || 'image/jpeg';
        coverUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      }
    }

    // Atomic DB write using Prisma
    const book = await prisma.book.create({
      data: {
        slug,
        title,
        author,
        year,
        pages,
        category: category || 'Klasikler',
        summary: summary || '',
        rating,
        isReadable,
        coverUrl,
      },
    });

    // Auto-chunk full text into pages
    const textToChunk = (contentText && contentText.trim().length > 0) ? contentText : (summary || '');
    if (textToChunk.trim().length > 0) {
      const generatedPages = chunkTextIntoPages(textToChunk);
      for (let i = 0; i < generatedPages.length; i++) {
        await prisma.bookPage.create({
          data: {
            bookId: book.id,
            pageNumber: i + 1,
            content: generatedPages[i],
          },
        });
      }
    }

    return NextResponse.json({ success: true, book });
  } catch (error: any) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: error.message || 'Kitap eklenirken hata oluştu' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Kitaplar çekilemedi' }, { status: 500 });
  }
}
