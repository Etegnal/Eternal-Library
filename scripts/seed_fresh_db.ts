import { prisma } from '../src/lib/prisma';
import { verifiedBooksData } from '../src/lib/verifiedBooks';
import { QUOTES_365 } from '../src/data/quotesData';

async function seed() {
  console.log('🚀 YENİ NEON VERİTABANI TOHUMLAMA (SEEDING) BAŞLADI...');

  // 1. ADMIN USER & TEST USERS
  console.log('👥 Kullanıcılar oluşturuluyor...');
  const adminUser = await prisma.user.upsert({
    where: { email: 'my.atmaz24@gmail.com' },
    update: { role: 'ADMIN', name: 'Ahmet_Murat' },
    create: {
      email: 'my.atmaz24@gmail.com',
      name: 'Ahmet_Murat',
      role: 'ADMIN',
      password: '$2a$10$hashedpasswordplaceholder',
    },
  });

  await prisma.user.upsert({
    where: { email: 'erenaoyunda@gmail.com' },
    update: { role: 'ADMIN', name: 'Eternal' },
    create: {
      email: 'erenaoyunda@gmail.com',
      name: 'Eternal',
      role: 'ADMIN',
      password: '$2a$10$hashedpasswordplaceholder',
    },
  });

  // 2. BOOKS & BOOK PAGES
  console.log('📚 Mutlak Kitaplık (Kitaplar & Sayfalar) temiz kapak URL’leri ile yükleniyor...');
  for (const item of verifiedBooksData) {
    const cleanCoverUrl = item.coverUrl && !item.coverUrl.startsWith('data:') 
      ? item.coverUrl 
      : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';

    const book = await prisma.book.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        author: item.author,
        year: item.year,
        pages: item.pages,
        category: item.category,
        summary: item.summary,
        rating: item.rating,
        isReadable: item.isReadable,
        coverUrl: cleanCoverUrl,
      },
      create: {
        slug: item.slug,
        title: item.title,
        author: item.author,
        year: item.year,
        pages: item.pages,
        category: item.category,
        summary: item.summary,
        rating: item.rating,
        isReadable: item.isReadable,
        coverUrl: cleanCoverUrl,
      },
    });

    if (item.fullPages && item.fullPages.length > 0) {
      for (let i = 0; i < item.fullPages.length; i++) {
        await prisma.bookPage.upsert({
          where: {
            bookId_pageNumber: {
              bookId: book.id,
              pageNumber: i + 1,
            },
          },
          update: { content: item.fullPages[i] },
          create: {
            bookId: book.id,
            pageNumber: i + 1,
            content: item.fullPages[i],
          },
        });
      }
    }
  }

  // 3. POSTS & POEMS
  console.log('✍️ Şiirler ve Yazılar yükleniyor...');
  const poems = [
    {
      slug: 'kuyu',
      title: 'Kuyu',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2026-09-07T21:00:00.000Z'),
      content: `Hangi kuyu derindir bana?
Ben Rabbime sığınmışım.
Hangi toprak boğar beni?
İmanla göklere karışmışım.

İster yerin altı kat altı,
İster celladının darağacı;
Rabbim benimleyken ne keder,
Bana Müslüman ölmek yeter!

Hakikat, kalbimde âşikâr,
Zikrimde imanım pâyidâr.
Kirletmeye çalış, ne fayda;
Kir tutar mı tertemiz sayfa?

Zoraki yakıştırmalar, ne acı!
Eksikliğiniz böyle mi diniyor?
Yormasın dilini o sahte duacı,
Yüce Rabbim benim içimi biliyor.`,
      excerpt: `Hangi kuyu derindir bana?
Ben Rabbime sığınmışım.
Hangi toprak boğar beni?
İmanla göklere karışmışım.`,
    },
    {
      slug: 'sonuna-kadar',
      title: 'Sonuna Kadar',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2026-09-01T00:00:00.000Z'),
      content: `Çok zeki, delice hem de,
Tımarhaneye kapatılacak kadar.
Sonuna kadar yürüyeceğiz bu yolda,
Işık söpse bile içimizdeki yangınla.`,
      excerpt: `Çok zeki, delice hem de,
Tımarhaneye kapatılacak kadar.`,
    },
    {
      slug: 'son-komutan',
      title: 'Son Komutan',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2026-08-31T00:00:00.000Z'),
      content: `Lanetler içinde yanacak o aciz bedenin 
Seni kurtarmaya tek gelecek Azrail'in !`,
      excerpt: `Lanetler içinde yanacak o aciz bedenin 
Seni kurtarmaya tek gelecek Azrail'in !`,
    },
    {
      slug: 'pacavra',
      title: 'Paçavra',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2026-08-28T00:00:00.000Z'),
      content: `Beklemiyordu kimse, oldurdu olmazları,
Gülüp eğlendi paçavra soysuzları.`,
      excerpt: `Beklemiyordu kimse, oldurdu olmazları,
Gülüp eğlendi paçavra soysuzları.`,
    },
    {
      slug: 'on',
      title: 'On',
      type: 'SIIR' as const,
      author: 'Ahmet Murat',
      publishedAt: new Date('2026-08-25T00:00:00.000Z'),
      content: `Senede on şiir katledildi.
İndikçe arşa çıktı Mehdi.`,
      excerpt: `Senede on şiir katledildi.
İndikçe arşa çıktı Mehdi.`,
    },
    {
      slug: 'fener',
      title: 'Fener',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2026-02-12T00:00:00.000Z'),
      content: `Bir sabah tuttu babam elimden...
Sessizliğin kıyısında bir fener gibi yandık.`,
      excerpt: `Bir sabah tuttu babam elimden...`,
    },
    {
      slug: 'istemem',
      title: 'İstemem',
      type: 'SIIR' as const,
      author: 'Eternal',
      publishedAt: new Date('2025-12-12T00:00:00.000Z'),
      content: `Eksik olsun istemem!
İstemem yalnızlığa anlatılmamış acıyı.`,
      excerpt: `Eksik olsun istemem!
İstemem yalnızlığa anlatılmamış acıyı.`,
    },
  ];

  for (const poem of poems) {
    await prisma.post.upsert({
      where: { slug: poem.slug },
      update: {
        title: poem.title,
        content: poem.content,
        excerpt: poem.excerpt,
        type: poem.type,
        author: poem.author,
        publishedAt: poem.publishedAt,
        isFeatured: true,
      },
      create: {
        slug: poem.slug,
        title: poem.title,
        content: poem.content,
        excerpt: poem.excerpt,
        type: poem.type,
        author: poem.author,
        publishedAt: poem.publishedAt,
        isFeatured: true,
      },
    });
  }

  // 4. MASTER POETS (ÜSTAT KALEMLER)
  console.log('✒️ Üstat Kalemler yükleniyor...');
  const masterPoets = [
    {
      author: 'Necip Fazıl Kısakürek',
      title: 'Kaldırımlar',
      slug: 'kaldirimlar',
      excerpt: 'Sokaktayım, kimsesiz bir sokak ortasında;\nYürüyorum, arkama bakmadan yürüyorum.\nYolumun karanlığa saplanan noktasında,\nSanki beni bekleyen bir hayal görüyorum.',
      content: `Sokaktayım, kimsesiz bir sokak ortasında;
Yürüyorum, arkama bakmadan yürüyorum.
Yolumun karanlığa saplanan noktasında,
Sanki beni bekleyen bir hayal görüyorum.

Kaldırımlar, ızdırap çekenlerin annesi,
Kaldırımlar, içimde yaşamış bir insandır.
Kaldırımlar, duyulur ses kesilince sesi,
Kaldırımlar, içimde kıvrılan bir lisandır.`,
      year: '1928',
      order: 1,
    },
    {
      author: 'Cahit Zarifoğlu',
      title: 'Yedi Güzel Adam',
      slug: 'yedi-guzel-adam',
      excerpt: 'Bu insanlar devrilmiş ağaçlara benziyorlar,\nBirer dağ gibi durgun duran bu adamlar...',
      content: `Bu insanlar devrilmiş ağaçlara benziyorlar,
Birer dağ gibi durgun duran bu adamlar.
Gökleri kalplerinde taşıyan bu güzel adamlar...`,
      year: '1973',
      order: 2,
    },
    {
      author: 'Sezai Karakoç',
      title: 'Mona Rosa',
      slug: 'mona-rosa',
      excerpt: 'Mona Rosa, siyah güller, ak güller;\nGeyve’nin gülleri ve beyaz yatak.\nKanadı kırık kuş merhamet ister;\nAh, senin yüzünden kana batacak Mona Rosa...',
      content: `Mona Rosa, siyah güller, ak güller;
Geyve’nin gülleri ve beyaz yatak.
Kanadı kırık kuş merhamet ister;
Ah, senin yüzünden kana batacak Mona Rosa...`,
      year: '1952',
      order: 3,
    },
    {
      author: 'Yunus Emre',
      title: 'Bana Seni Gerek Seni',
      slug: 'bana-seni-gerek-seni',
      excerpt: 'Aşkın aldı benden beni,\nBana seni gerek seni.\nBen yanarım dünü günü,\nBana seni gerek seni.',
      content: `Aşkın aldı benden beni,
Bana seni gerek seni.
Ben yanarım dünü günü,
Bana seni gerek seni.

Cennet cennet dedikleri,
Birkaç köşkle birkaç huri,
İsteyene ver sen onları,
Bana seni gerek seni.`,
      year: '13. Yüzyıl',
      order: 4,
    },
  ];

  for (const mp of masterPoets) {
    const existing = await prisma.masterPoet.findFirst({ where: { slug: mp.slug } });
    if (!existing) {
      await prisma.masterPoet.create({ data: mp });
    }
  }

  // 5. 365 QUOTES
  console.log('💬 365 Günün Sözü yükleniyor...');
  for (const q of QUOTES_365) {
    await prisma.quote.upsert({
      where: { dayOfYear: q.dayOfYear },
      update: {
        author: q.author,
        content: q.content,
        source: q.source || null,
      },
      create: {
        author: q.author,
        content: q.content,
        source: q.source || null,
        dayOfYear: q.dayOfYear,
      },
    });
  }

  // 6. TRACKS (MÜZİKLER)
  console.log('🎵 Müzikler yükleniyor...');
  const tracks = [
    { title: 'Chopin - Nocturne in C-sharp Minor', artist: 'Frédéric Chopin', src: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3', order: 1 },
    { title: 'Rainy Night Coffee', artist: 'Lo-Fi Chill', src: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3', order: 2 },
  ];

  for (const t of tracks) {
    const existing = await prisma.track.findFirst({ where: { title: t.title } });
    if (!existing) {
      await prisma.track.create({ data: t });
    }
  }

  // 7. PSYCHOLOGICAL TESTS
  console.log('🧠 Psikolojik Testler yükleniyor...');
  await prisma.psychologicalTest.upsert({
    where: { slug: 'felsefi-mizaç-ve-karakter-testi' },
    update: {
      title: 'Felsefi Mizaç ve Zihin Odası Testi',
      description: 'Zihninizin derinliklerinde hangi filozofun izleri saklı? Seçimlerinizdeki metaforlar üzerinden iç dünyanızı aydınlatın.',
      category: 'Psikolojik & Felsefi',
    },
    create: {
      slug: 'felsefi-mizaç-ve-karakter-testi',
      title: 'Felsefi Mizaç ve Zihin Odası Testi',
      description: 'Zihninizin derinliklerinde hangi filozofun izleri saklı? Seçimlerinizdeki metaforlar üzerinden iç dünyanızı aydınlatın.',
      category: 'Psikolojik & Felsefi',
      order: 1,
    },
  });

  console.log('✅ YENİ VERİTABANI BAŞARIYLA TAMAMEN TOHUMLANDI!');
}

seed()
  .catch((e) => {
    console.error('❌ SEED HATA:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
