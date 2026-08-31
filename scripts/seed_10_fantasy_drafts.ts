import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FANTASY_DRAFT_BOOKS = [
  {
    title: 'Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    pages: 426,
    category: 'Epik Fantastik',
    rating: 4.9,
    buyUrl: 'https://www.kitapyurdu.com/kitap/hobbit/244625.html',
  },
  {
    title: 'Yüzüklerin Efendisi: İki Kule',
    author: 'J.R.R. Tolkien',
    year: 1954,
    pages: 480,
    category: 'Epik Fantastik',
    rating: 4.9,
    buyUrl: 'https://www.kitapyurdu.com/kitap/yuzuklerin-efendisi-2-iki-kule/10001.html',
  },
  {
    title: 'Yüzüklerin Efendisi: Kralın Dönüşü',
    author: 'J.R.R. Tolkien',
    year: 1955,
    pages: 420,
    category: 'Epik Fantastik',
    rating: 4.9,
    buyUrl: 'https://www.kitapyurdu.com/kitap/yuzuklerin-efendisi-3-kralin-donusu/10002.html',
  },
  {
    title: 'Silmarillion',
    author: 'J.R.R. Tolkien',
    year: 1977,
    pages: 688,
    category: 'Epik Fantastik',
    rating: 4.8,
    buyUrl: 'https://www.kitapyurdu.com/kitap/silmarillion/10003.html',
  },
  {
    title: 'Harry Potter ve Felsefe Taşı',
    author: 'J.K. Rowling',
    year: 1997,
    pages: 276,
    category: 'Fantastik',
    rating: 4.9,
    buyUrl: 'https://www.kitapyurdu.com/kitap/harry-potter-ve-felsefe-tasi-1-kitap/2422.html',
  },
  {
    title: 'Harry Potter ve Sırlar Odası',
    author: 'J.K. Rowling',
    year: 1998,
    pages: 316,
    category: 'Fantastik',
    rating: 4.8,
    buyUrl: 'https://www.kitapyurdu.com/kitap/harry-potter-ve-sirlar-odasi-2-kitap/2423.html',
  },
  {
    title: 'Yerdeniz Büyücüsü',
    author: 'Ursula K. Le Guin',
    year: 1968,
    pages: 216,
    category: 'Epik Fantastik',
    rating: 4.8,
    buyUrl: 'https://www.kitapyurdu.com/kitap/yerdeniz-buyucusu/10004.html',
  },
  {
    title: 'Büyünün Rengi (Diskdünya 1. Cilt)',
    author: 'Terry Pratchett',
    year: 1983,
    pages: 232,
    category: 'Mizahi Fantastik',
    rating: 4.7,
    buyUrl: 'https://www.kitapyurdu.com/kitap/buyunun-rengi-diskdunya-1/10005.html',
  },
  {
    title: 'Elantris',
    author: 'Brandon Sanderson',
    year: 2005,
    pages: 656,
    category: 'Epik Fantastik',
    rating: 4.8,
    buyUrl: 'https://www.kitapyurdu.com/kitap/elantris/10007.html',
  },
  {
    title: 'Yeni Bahar (Zaman Çarkı Başlangıç)',
    author: 'Robert Jordan',
    year: 2004,
    pages: 400,
    category: 'Epik Fantastik',
    rating: 4.7,
    buyUrl: 'https://www.kitapyurdu.com/kitap/yeni-bahar-zaman-carki-baslangic/10009.html',
  },
];

async function seed() {
  console.log('Seeding 10 NEW Fantasy Draft books with EMPTY summary/review and TICKED read mode...');

  for (const book of FANTASY_DRAFT_BOOKS) {
    const slug = book.title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    await prisma.book.upsert({
      where: { slug },
      update: {
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        category: book.category,
        rating: book.rating,
        summary: '', // USER DIRECTIVE: EMPTY SUMMARY
        description: '',
        isReadable: true, // USER DIRECTIVE: TICKED (READ MODE ENABLED)
        isPublished: false, // DRAFT MODE
        buyUrl: book.buyUrl,
        coverUrl: '', // USER DIRECTIVE: EMPTY COVER URL FOR DRAG & DROP
      },
      create: {
        slug,
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        category: book.category,
        rating: book.rating,
        summary: '', // USER DIRECTIVE: EMPTY SUMMARY
        description: '',
        isReadable: true, // USER DIRECTIVE: TICKED (READ MODE ENABLED)
        isPublished: false, // DRAFT MODE
        buyUrl: book.buyUrl,
        coverUrl: '', // USER DIRECTIVE: EMPTY COVER URL FOR DRAG & DROP
      },
    });

    console.log(`✓ Seeded Fantasy Draft: "${book.title}" by ${book.author} (${book.pages}p, ${book.year}) [ReadMode: TICKED, Summary: EMPTY, Cover: EMPTY]`);
  }

  await prisma.$disconnect();
  console.log('\nSUCCESS! All 10 NEW fantasy draft books seeded into database cleanly.');
}

seed().catch(console.error);
