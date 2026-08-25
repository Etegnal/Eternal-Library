import { PrismaClient, Role, PostType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { QUOTES_365 } from '../src/data/quotesData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Seed Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@eternallibrary.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@eternallibrary.com',
      name: 'Eternal Admin',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // 2. Seed Initial Posts
  const posts = [
    {
      title: 'Lo-Fi Yaşam Sanatı: Yavaşlamanın ve Sessizliğin Poetiği',
      slug: 'lo-fi-yasam-sanati-yavaslamanin-ve-sessizligin-poetigi',
      excerpt: 'Hızlı akan dünyamızın ritminden çıkıp, bir fincan sıcak çay ve çıtırdayan şömine eşliğinde iç dünyamıza yaptığımız huzurlu bir edebiyat yolculuğu.',
      content: `Günün ilk ışıkları penceremize düşerken ya da çıtırdayan bir şöminenin karşısında otururken içimizi kaplayan o derin huzur, tesadüf değildir. Modern yaşamın baş döndürücü hızı içerisinde unutmaya yüz tuttuğumuz o yavaş ritim, aslında ruhumuzun en çok ihtiyaç duyduğu dinginliktir.

### 1. Zamanı Yavaşlatmak
Sürekli bir yerlere yetişme telayı, zihnimizi yoran bildirim sesleri ve bitmek bilmeyen sorumluluklar arasında kendi sesimizi duymakta zorlanıyoruz. Oysa bir kitabı aralamak, eski bir sayfanın kokusunu içimize çekmek ve yağmurun sesine odaklanmak zamanı yavaşlatmanın en zarif yoludur.

> "Sessizlik, ruhun kendi derinlikleriyle baş başa kaldığı kutsal bir mabettir."

### 2. Lo-Fi Estetiği ve İçsel Odaklanma
Lo-Fi yaşam felsefesi; mükemmel olmama özgürlüğünü, sadeliği ve anın tadını çıkarmayı savunur. Eski bir pikaptan yükselen cızırtılı bir plak sesi ya da loş bir odadaki mum ışığı bize kusurların içindeki güzelliği hatırlatır.

Bu kütüphanede kaleme aldığımız her dize ve her cümle, işte bu yavaşlama sanatının bir meyvesidir. Kendinize zaman tanıyın, bir fincan sıcak içeceğinizi alın ve kelimelerin arasında kaybolmanın tadını çıkarın.`,
      type: PostType.YAZI,
      readingTime: '4 dk okuma',
      isFeatured: true,
      likes: 12,
      views: 145,
      coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'BİLMEM',
      slug: 'bilmem',
      excerpt: 'Her ana düş kur derdin. Ne demek hala bilmem. En kolay yol en iyi olduğun yoldur derdin.',
      content: `Her ana düş kur derdin.
Ne demek hala bilmem.
En kolay yol en iyi olduğun yoldur derdin.
Başka yol var mıdır bilmem.
Sen bunlar gibi olma derdin.
Dinledim seni, onlar gibisini bilmem.
Din,dil farketmez , iyi kal derdin.
Tek amacım iyi kalmaktır hala.
Her konuda, Her olayda, Her kararda.
Aklımda tek soru hala,
Sen olsan ne yapardın. Bilmem.`,
      type: PostType.SIIR,
      isFeatured: true,
      likes: 24,
      views: 189,
    },
    {
      title: 'Gece Yarısı Okumaları: Eski Kitap Kokusu ve Şömine Ateşi',
      slug: 'gece-yarisi-okumalari-eski-kitap-kokusu-ve-somine-atesi',
      excerpt: 'Gece yarısı saat ikiye gelirken sararmış sayfalar arasında kaybolmanın ve unutulmuş hikayeleri yeniden fısıldamanın büyüsü.',
      content: `Gecenin zifiri karanlığı şehri örttüğünde, kütüphanedeki şöminenin alevleri sarı bir ışık hüzmesi saçar duvarlara. Eski ciltli kitapların arasında dolaşmak, geçmiş zamanın bilginleriyle sessiz bir sohbet etmektir.

Gece yarısı okumaları, zihnin savunma mekanizmalarını bıraktığı ve ruhun en derin duyarlılığına ulaştığı saatlerdir.`,
      type: PostType.YAZI,
      readingTime: '5 dk okuma',
      isFeatured: true,
      likes: 8,
      views: 98,
      coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Sessiz Odada Mum Işığı',
      slug: 'sessiz-odada-mum-isigi',
      excerpt: 'Ahşap masanın üzerinde süzülen hafif bir alev ve geceye bırakılan mısralar.',
      content: `Ahşap masanın üzerinde süzülen hafif bir alev,
Gecenin sessizliğinde dans eder mısralar.
Pencereden süzülen rüzgarın fısıltısı,
Kalemin ucundan dökülür eski hatıralar.`,
      type: PostType.SIIR,
      isFeatured: false,
      likes: 15,
      views: 112,
    },
    {
      title: 'Sonbaharın Yaprak Fısıltıları',
      slug: 'sonbaharin-yaprak-fisiltilari',
      excerpt: 'Sarı yaprakların rüzgardaki şarkısı ve kalbe dokunan serinlik.',
      content: `Sarı yaprakların rüzgardaki şarkısı,
Kalbe dokunan tatlı bir serinlik.
Toprağa düşen her yaprak bir masal anlatır,
Zamanın koynunda saklanan sonsuz bir derinlik.`,
      type: PostType.SIIR,
      isFeatured: false,
      likes: 9,
      views: 76,
    },
    {
      title: 'Zamanın Ruhunda Bir Yağmur Sesine Sığınmak',
      slug: 'zamanin-ruhunda-bir-yagmur-sesine-siginmak',
      excerpt: 'Pencere kenarında oturup yağmur damlalarının camdaki dansını izlerken tutulan içsel notlar.',
      content: `Dışarıda sicim gibi yağan yağmur, camları tıkırdatırken elinizdeki sıcak bardağın buğusu ruhunuzu ısıtır. Yağmur sesi, doğanın en dinlendirici senfonisidir.

Bu denemede, yağmurlu günlerin getirdiği o derin tefekkür halini ele alıyoruz.`,
      type: PostType.YAZI,
      readingTime: '6 dk okuma',
      isFeatured: true,
      likes: 19,
      views: 204,
      coverImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  // 3. Seed ALL 365 Unique Daily Quotes
  console.log(`Seeding ${QUOTES_365.length} unique daily quotes...`);
  for (const quote of QUOTES_365) {
    await prisma.quote.upsert({
      where: { dayOfYear: quote.dayOfYear },
      update: {
        author: quote.author,
        content: quote.content,
        source: quote.source || 'Eternal Library Seçkisi',
      },
      create: {
        author: quote.author,
        content: quote.content,
        source: quote.source || 'Eternal Library Seçkisi',
        dayOfYear: quote.dayOfYear,
      },
    });
  }

  // 4. Seed Curated Books (10 World Classics & Philosophy Books)
  const books = [
    {
      googleBookId: 'kurk-mantolu-madonna',
      isbn10: '9753638027',
      isbn13: '9789753638029',
      title: 'Kürk Mantolu Madonna',
      subtitle: 'Yapı Kredi Yayınları',
      authors: 'Sabahattin Ali',
      publisher: 'Yapı Kredi Yayınları',
      publishedDate: '1943',
      description: 'Kürk Mantolu Madonna, Sabahattin Ali\'nin 1943 yılında yayımladığı romanıdır. Romanda Raif Efendi\'nin gençlik yıllarında Berlin\'de tanıştığı Maria Puder ile yaşadığı unutulmaz ve hüzünlü aşk anlatılır.',
      pageCount: 160,
      categories: 'Dünya Klasikleri, Türk Edebiyatı',
      averageRating: 4.8,
      ratingsCount: 1250,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789753638029-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789753638029-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: 'bolye-buyurdu-zerdust',
      isbn10: '9750719387',
      isbn13: '9789750719387',
      title: 'Böyle Buyurdu Zerdüşt',
      subtitle: 'Herkes İçin ve Hiç Kimse İçin Bir Kitap',
      authors: 'Friedrich Nietzsche',
      publisher: 'Can Yayınları',
      publishedDate: '1883',
      description: 'Nietzsche\'nin başyapıtı kabul edilen eser; Üstinsan, Güç İstenci ve Ebedi Dönüş kavramlarını Zerdüşt karakterinin kehanet dolu diliyle aktarır.',
      pageCount: 384,
      categories: 'Felsefe & Düşünce',
      averageRating: 4.7,
      ratingsCount: 890,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750719387-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750719387-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Felsefe & Düşünce',
    },
    {
      googleBookId: 'suc-ve-ceza',
      isbn10: '9750738600',
      isbn13: '9789750738609',
      title: 'Suç ve Ceza',
      subtitle: 'Hasan Âli Yücel Klasikler Dizisi',
      authors: 'Fyodor Dostoyevski',
      publisher: 'İş Bankası Kültür Yayınları',
      publishedDate: '1866',
      description: 'Yoksul öğrenci Raskolnikov\'un vicdan azabı, ahlaki sorgulamaları ve Saint Petersburg gecelerindeki içsel hesaplaşmasını konu alan psikolojik edebiyat abidesi.',
      pageCount: 688,
      categories: 'Dünya Klasikleri',
      averageRating: 4.9,
      ratingsCount: 3400,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750738609-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750738609-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: 'seker-portakali',
      isbn10: '9750738617',
      isbn13: '9789750738616',
      title: 'Şeker Portakalı',
      subtitle: 'Günün Birinde Acıyı Keşfeden Küçük Bir Çocuğun Öyküsü',
      authors: 'José Mauro de Vasconcelos',
      publisher: 'Can Yayınları',
      publishedDate: '1968',
      description: 'Günün birinde acıyı keşfeden küçük Zeze\'nin dokunaklı, sevgi dolu ve unutulmaz çocukluk hikayesi.',
      pageCount: 182,
      categories: 'Dünya Klasikleri',
      averageRating: 4.9,
      ratingsCount: 2900,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750738616-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750738616-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: '1984-george-orwell',
      isbn10: '9750718534',
      isbn13: '9789750718533',
      title: '1984',
      subtitle: 'Bin Dokuz Yüz Seksen Dört',
      authors: 'George Orwell',
      publisher: 'Can Yayınları',
      publishedDate: '1949',
      description: 'Büyük Birader\'in gözetiminde gerçeğin yeniden yazıldığı, düşünce suçunun yasaklandığı kült distopik roman.',
      pageCount: 352,
      categories: 'Distopya & Edebiyat',
      averageRating: 4.8,
      ratingsCount: 4100,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750718533-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750718533-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: 'kucuk-prens',
      isbn10: '9750724330',
      isbn13: '9789750724336',
      title: 'Küçük Prens',
      subtitle: 'Le Petit Prince',
      authors: 'Antoine de Saint-Exupéry',
      publisher: 'Can Yayınları',
      publishedDate: '1943',
      description: 'Bir çocuk kitabı görünümünde yetişkinlere sevgi, dostluk, sadakat ve hayatın anlamı üzerine yazılmış zamansız bir başyapıt.',
      pageCount: 112,
      categories: 'Şiir & Edebiyat',
      averageRating: 4.9,
      ratingsCount: 5200,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750724336-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750724336-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Şiir & Edebiyat',
    },
    {
      googleBookId: 'denemeler-montaigne',
      isbn10: '9754580928',
      isbn13: '9789754580921',
      title: 'Denemeler',
      subtitle: 'Seçmeler',
      authors: 'Michel de Montaigne',
      publisher: 'İş Bankası Kültür Yayınları',
      publishedDate: '1580',
      description: 'Montaigne\'in insan doğası, dostluk, yalnızlık ve ölüm üzerine yüzyıllardır eskimeyen özgür düşünce denemeleri.',
      pageCount: 310,
      categories: 'Felsefe & Düşünce',
      averageRating: 4.7,
      ratingsCount: 780,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789754580921-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789754580921-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Felsefe & Düşünce',
    },
    {
      googleBookId: 'donusum-kafka',
      isbn10: '9750734001',
      isbn13: '9789750734007',
      title: 'Dönüşüm',
      subtitle: 'Die Verwandlung',
      authors: 'Franz Kafka',
      publisher: 'Can Yayınları',
      publishedDate: '1915',
      description: 'Gregor Samsa bir sabah bunaltıcı düşlerden uyandığında, kendisini yatağında dev bir böceğe dönüşmüş olarak bulur.',
      pageCount: 104,
      categories: 'Dünya Klasikleri',
      averageRating: 4.6,
      ratingsCount: 1850,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789750734007-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789750734007-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: 'insan-ne-ile-yasar',
      isbn10: '9754586985',
      isbn13: '9789754586985',
      title: 'İnsan Ne İle Yaşar?',
      subtitle: 'Hasan Âli Yücel Klasikler Dizisi',
      authors: 'Lev Tolstoy',
      publisher: 'İş Bankası Kültür Yayınları',
      publishedDate: '1885',
      description: 'Tolstoy\'un sevgi, açgözlülük, alçakgönüllülük ve insan doğası üzerine kaleme aldığı ders niteliğindeki eşsiz hikayeler.',
      pageCount: 96,
      categories: 'Dünya Klasikleri',
      averageRating: 4.8,
      ratingsCount: 2100,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789754586985-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789754586985-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Dünya Klasikleri',
    },
    {
      googleBookId: 'kendime-dusunceler-marcus-aurelius',
      isbn10: '9754589216',
      isbn13: '9789754589214',
      title: 'Kendime Düşünceler',
      subtitle: 'Stoacı Felsefe Günlüğü',
      authors: 'Marcus Aurelius',
      publisher: 'İş Bankası Kültür Yayınları',
      publishedDate: '180',
      description: 'Roma İmparatoru Marcus Aurelius\'un cephelerde kendisi için tuttuğu, Stoacı felsefenin en derin rehber kitabı.',
      pageCount: 168,
      categories: 'Felsefe & Düşünce',
      averageRating: 4.8,
      ratingsCount: 1450,
      thumbnailUrl: 'https://covers.openlibrary.org/b/isbn/9789754589214-L.jpg',
      largeCoverUrl: 'https://covers.openlibrary.org/b/isbn/9789754589214-L.jpg',
      previewUrl: 'https://books.google.com.tr',
      isFeatured: true,
      curatedCategory: 'Felsefe & Düşünce',
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { googleBookId: book.googleBookId },
      update: book,
      create: book,
    });
  }

  console.log('Database Seeding Completed Successfully with 365 Unique Quotes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
