import { prisma } from '../src/lib/prisma';

async function testAllRoutes() {
  console.log('🔍 DİNAMİK ROTALAR VE VERİTABANI KONTROL EDİLİYOR...\n');

  try {
    console.log('1. Testing Posts (YAZI)...');
    const posts = await prisma.post.findMany({
      where: { type: 'YAZI' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        type: true,
        author: true,
        coverImage: true,
        readingTime: true,
        isFeatured: true,
        likes: true,
        views: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(`   ✅ ${posts.length} adet YAZI bulundu.`);

    console.log('\n2. Testing Poems (SIIR)...');
    const poems = await prisma.post.findMany({
      where: { type: 'SIIR' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        type: true,
        author: true,
        coverImage: true,
        readingTime: true,
        isFeatured: true,
        likes: true,
        views: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(`   ✅ ${poems.length} adet SIIR bulundu.`);

    console.log('\n3. Testing Books...');
    const books = await prisma.book.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        year: true,
        pages: true,
        category: true,
        summary: true,
        rating: true,
        isReadable: true,
        coverUrl: true,
        createdAt: true,
      },
    });
    console.log(`   ✅ ${books.length} adet BOOK bulundu.`);

    console.log('\n4. Testing MasterPoets...');
    const poets = await prisma.masterPoet.findMany({
      select: { id: true, title: true, author: true, content: true, excerpt: true, slug: true, year: true, createdAt: true },
    });
    console.log(`   ✅ ${poets.length} adet MASTER POET bulundu.`);

    console.log('\n5. Testing Single Post Detail (Sonuna Kadar)...');
    const singlePost = await prisma.post.findFirst({
      where: {
        OR: [
          { slug: 'sonuna-kadar' },
          { id: 'sonuna-kadar' },
        ],
      },
    });
    console.log(`   ✅ Single Post: ${singlePost ? singlePost.title : 'BULUNAMADI!'}`);

    console.log('\n6. Testing Single Book Detail...');
    const singleBook = await prisma.book.findFirst({
      include: { bookPages: true },
    });
    console.log(`   ✅ Single Book: ${singleBook ? singleBook.title : 'BULUNAMADI!'}`);

  } catch (error) {
    console.error('❌ ROTA VE DB KONTROLÜNDE HATA OLUŞTU:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAllRoutes();
