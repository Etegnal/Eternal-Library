import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slug';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// GET single book details with pages
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const book = await prisma.book.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      include: {
        bookPages: {
          orderBy: { pageNumber: 'asc' },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Kitap bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Hata oluştu' }, { status: 500 });
  }
}

// PUT / Update book details & cover
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

    // Find existing book
    const existing = await prisma.book.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Güncellenecek kitap bulunamadı' }, { status: 404 });
    }

    let coverUrl = existing.coverUrl;

    // File Upload via fs/promises if new cover is uploaded
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const publicCoversDir = path.join(process.cwd(), 'public', 'covers');
      await mkdir(publicCoversDir, { recursive: true });

      const fileExtension = path.extname(file.name) || '.jpg';
      const fileName = `${slug}${fileExtension}`;
      const filePath = path.join(publicCoversDir, fileName);

      await writeFile(filePath, buffer);
      coverUrl = `/covers/${fileName}`;
    }

    // Atomic DB Update
    const updatedBook = await prisma.book.update({
      where: { id: existing.id },
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

    // Update BookPages if contentText is provided
    if (typeof contentText === 'string') {
      // Delete old pages
      await prisma.bookPage.deleteMany({
        where: { bookId: existing.id },
      });

      if (contentText.trim().length > 0) {
        const rawPages = contentText.split(/---|\n\n\n+/).filter((p) => p.trim().length > 0);
        for (let i = 0; i < rawPages.length; i++) {
          await prisma.bookPage.create({
            data: {
              bookId: existing.id,
              pageNumber: i + 1,
              content: rawPages[i].trim(),
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, book: updatedBook });
  } catch (error: any) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: error.message || 'Kitap güncellenirken hata oluştu' }, { status: 500 });
  }
}

// DELETE book
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existing = await prisma.book.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Silinecek kitap bulunamadı' }, { status: 404 });
    }

    await prisma.book.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Kitap silinemedi' }, { status: 500 });
  }
}
