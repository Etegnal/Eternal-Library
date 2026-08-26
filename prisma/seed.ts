import { PrismaClient, Role, PostType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { verifiedBooksData } from '../src/lib/verifiedBooks';

const prisma = new PrismaClient();

// 365 Daily Quotes dataset
const LITERARY_QUOTES = [
  { quote: "Bir insanı sevmekle başlar her şey.", author: "Sait Faik Abasıyanık", book: "Alemdağ'da Var Bir Yılan" },
  { quote: "Hayat, yaşandığı kadar vardır. Gerisi ya hafızadaki hatıra ya hayaldeki ümittir.", author: "Ahmet Hamdi Tanpınar", book: "Huzur" },
  { quote: "Dünyayı güzellik kurtaracak, bir insanı sevmekle başlayacak her şey.", author: "Dostoyevski", book: "Budala" },
  { quote: "İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez.", author: "Antoine de Saint-Exupéry", book: "Küçük Prens" },
  { quote: "Kuşlar uçarlar, uçarlar; sonra konarlar bir dala... Ruh da böyledir işte.", author: "Yaşar Kemal", book: "İnce Memed" },
  { quote: "Ne içindeyim zamanın, ne de büsbütün dışında; tek bir geniş anın parçalanmaz akışında.", author: "Ahmet Hamdi Tanpınar", book: "Şiirler" },
  { quote: "Bütün muhteşem sonlar, bir hüzünle başlar.", author: "Attilâ İlhan", book: "Ben Sana Mecburum" },
  { quote: "Kelimeler bir insanı öldürebilir de, yaşatabilir de.", author: "Oğuz Atay", book: "Tutunamayanlar" },
  { quote: "Günün birinde acıyı keşfeden küçük bir çocuğun öyküsüyüm ben.", author: "José Mauro de Vasconcelos", book: "Şeker Portakalı" },
  { quote: "Ben sana mecburum bilemezsin, adını mıh gibi aklımda tutuyorum.", author: "Attilâ İlhan", book: "Ben Sana Mecburum" },
  { quote: "Sevmek, bir başkasının hayatını kendi hayatından daha önemli görmektir.", author: "Tolstoy", book: "İnsan Ne İle Yaşar?" },
  { quote: "Yaşamak bir ağaç gibi tek ve hür, ve bir orman gibi kardeşçesine.", author: "Nâzım Hikmet", book: "Davet" },
  { quote: "Yaş 35! Yolun yarısı eder. Dante gibi ortasındayız ömrün.", author: "Cahit Sıtkı Tarancı", book: "Otuz Beş Yaş" },
  { quote: "Sana gitme demeyeceğim. Üşüyorsun ceketimi al. Günün en güzel saatleri bunlar...", author: "Özdemir Asaf", book: "Lavinia" },
  { quote: "Şimdi ben sonbahar gibi hüzünlüyüm, yaprak yaprak dökülüyorum.", author: "Sabahattin Ali", book: "Kürk Mantolu Madonna" },
];

async function main() {
  console.log('🌱 Eternal Library Veritabanı Yeniden Yükleniyor...');

  // 1. ADMIN USER
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@eternallibrary.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Kütüphane Yöneticisi',
        email: 'admin@eternallibrary.com',
        password: passwordHash,
        role: Role.ADMIN,
      },
    });
    console.log('✅ Admin kullanıcısı oluşturuldu (admin@eternallibrary.com)');
  }

  // 2. DAILY QUOTES (365 GÜNÜN SÖZÜ)
  await prisma.quote.deleteMany({});
  for (let day = 1; day <= 366; day++) {
    const template = LITERARY_QUOTES[(day - 1) % LITERARY_QUOTES.length];
    await prisma.quote.create({
      data: {
        dayOfYear: day,
        content: template.quote,
        author: template.author,
        source: template.book,
      },
    });
  }
  console.log('✅ 365 Günün Sözü başarıyla yüklendi.');

  // 3. MASTER POETS (ÜSTAT KALEMLER)
  await prisma.masterPoet.deleteMany({});
  const masterPoetsData = [
    {
      author: 'Attilâ İlhan',
      title: 'Ben Sana Mecburum',
      slug: 'ben-sana-mecburum',
      excerpt: 'Ben sana mecburum bilemezsin\nAdını mıh gibi aklımda tutuyorum\nBüyüdükçe büyüyor gözlerin\nBen sana mecburum bilemezsin\nİçimi seninle ısıtıyorum...',
      content: `Ben sana mecburum bilemezsin
Adını mıh gibi aklımda tutuyorum
Büyüdükçe büyüyor gözlerin
Ben sana mecburum bilemezsin
İçimi seninle ısıtıyorum

Ağaçlar sonbahara hazırlanıyor
Bu şehir o eski şehir değil
Karanlıkta gözlerin parıldıyor
Sevdiğim bildiğim kadın değilsin
Ben sana mecburum bilemezsin
İçimi seninle ısıtıyorum.`,
      year: '1960',
      order: 1,
    },
    {
      author: 'Nâzım Hikmet',
      title: 'Tahir ile Zühre Meselesi',
      slug: 'tahir-ile-zuhre-meselesi',
      excerpt: 'Tahir olmak da ayıp değil Zühre olmak da\nhatta sevda yüzünden ölmek de ayıp değil,\nbütün iş Tahir ile Zühre olabilmekte\nyani yürekte...',
      content: `Tahir olmak da ayıp değil Zühre olmak da
hatta sevda yüzünden ölmek de ayıp değil,
bütün iş Tahir ile Zühre olabilmekte
yani yürekte.

Meselâ bir barikatta dövüşerek
meselâ kuzey kutbunu keşfe giderken
meselâ denerken damarlarında bir serumu
ölmek ayıp olur mu?

Tahir olmak da ayıp değil Zühre olmak da
hatta sevda yüzünden ölmek de ayıp değil.

Seversin dünyayı doludizgin
ama o bunun farkında değildir
ayrılmak istemezsin dünyadan
ama o senden ayrılacak
yani sen elmayı seviyorsun diye
elmanın da seni sevmesi şart mı?
Yani Tahir'i Zühre sevmeseydi artik
yahut hic sevmeseydi
Tahir ne kaybederdi Tahirliğinden?

Tahir olmak da ayıp değil Zühre olmak da
hatta sevda yüzünden ölmek de ayıp değil.`,
      year: '1948',
      order: 2,
    },
    {
      author: 'Özdemir Asaf',
      title: 'Lavinia',
      slug: 'lavinia',
      excerpt: 'Sana gitme demeyeceğim.\nÜşüyorsun ceketimi al.\nGünün en güzel saatleri bunlar.\nYalnız kalma okuma salonunda...',
      content: `Sana gitme demeyeceğim.
Üşüyorsun ceketimi al.
Günün en güzel saatleri bunlar.
Yalnız kalma okuma salonunda.

Sana gitme demeyeceğim.
Yine de sen bilirsin.
Yalanlar istiyorsan yalanlar söyleyeyim,
İnançsızsan inançsız yapayım seni.

Sana gitme demeyeceğim.
Ama gitme, Lavinia.
Adını gizleyeceğim
Sen de bilme, Lavinia.`,
      year: '1957',
      order: 3,
    },
    {
      author: 'Cahit Sıtkı Tarancı',
      title: 'Otuz Beş Yaş',
      slug: 'otuz-bes-yas',
      excerpt: 'Yaş thirty five! Yolun yarısı eder.\nDante gibi ortasındayız ömrün.\nDelikanlı çağımızdaki cevher,\nGözünün yaşına bakmadan gider...',
      content: `Yaş otuz beş! yolun yarısı eder.
Dante gibi ortasındayız ömrün.
Delikanlı çağımızdaki cevher,
Gözünün yaşına bakmadan gider,
Yalvarmak, yakarmak nafile bugün.

Şakaklarıma kar mı yağdı ne var?
Benim mi Allahım bu çizgili yüz?
Ya gözler altındaki mor halkalar?
Neden böyle düşman görünürsünüz,
Yıllar yılı dost bildiğim aynalar?

Zamanla nasıl değişiyor insan!
Hangi resmime baksam ben değilim.
Nerde o günler, o şevk, o heyecan?
Bu güler yüzlü adam ben değilim;
Yalan fitillik ediyor hafızam.`,
      year: '1946',
      order: 4,
    },
    {
      author: 'Ahmed Arif',
      title: 'Hasretinden Prangalar Eskittim',
      slug: 'hasretinden-prangalar-eskittim',
      excerpt: 'Seni, anlatabilmek seni.\nİyi çocuklara, kahramanlara.\nSeni anlatabilmek seni,\nNamussuza, halden bilmeze,\nKahpe yalanlara...',
      content: `Seni, anlatabilmek seni.
İyi çocuklara, kahramanlara.
Seni anlatabilmek seni,
Namussuza, halden bilmeze,
Kahpe yalanlara.

Ard-arda kaç zemheri,
Kurt uyur, kuş uyur, zindan uyurdu.
Dışarda gürül-gürül akan bir dünya...
Bir ben uyumadım,
Kaç leylim bahar,
Hasretinden prangalar eskittim.
Saçlarına kan gülleri takayım,
Bir de sen bak şu dünyaya!`,
      year: '1968',
      order: 5,
    },
    {
      author: 'Sezai Karakoç',
      title: 'Monna Rosa',
      slug: 'monna-rosa',
      excerpt: 'Monna Rosa. Siyah güller, ak güller.\nGülhanenin gülleri ve güller.\nKanayan gülümseme ve neşeli hüzün,\nGül bahçesi gülşen olur gülünce yüzün...',
      content: `Monna Rosa. Siyah güller, ak güller.
Gülhanenin gülleri ve güller.
Kanayan gülümseme ve neşeli hüzün,
Gül bahçesi gülşen olur gülünce yüzün.

Zeytin ağaçları, karanlık kuyu.
Bir sızı var içimde kökten köke.
Geceleyin akıp giden bir suyu
Beklerim gün doğana dek tepede.`,
      year: '1952',
      order: 6,
    },
  ];

  for (const poet of masterPoetsData) {
    await prisma.masterPoet.create({
      data: poet,
    });
  }
  console.log('✅ Üstat Kalemler şiirleri başarıyla yüklendi.');

  // 4. POSTS (YAZILAR VE ŞİİRLER)
  await prisma.post.deleteMany({});
  const samplePosts = [
    {
      title: 'Lo-Fi Yaşam Sanatı: Yavaşlamanın ve Sessizliğin Poetiği',
      slug: 'lo-fi-yasam-sanati-yavaslamanin-ve-sessizligin-poetigi',
      excerpt: 'Hızlı akan dünyanın ritminden çıkıp, bir fincan sıcak çay ve çıtırdayan şömine eşliğinde iç dünyamıza yaptığımız huzurlu yolculuk.',
      content: `Günün ilk ışıkları pencerelerden süzülürken veya akşamın loş karanlığı odayı kaplarken, hayatın telaşından sıyrılmak bir lüks değil, ruhun temel bir ihtiyacıdır. 

Lo-fi estetiği sadece bir müzik türü veya görsel tarz değildir; aynı zamanda mükemmel olmama özgürlüğü, pürüzlü seslerdeki samimiyet ve anın tadını çıkarma felsefesidir. Olduğu gibi kabul edilen detaylar — eski bir plak cızırtısı, yağmur damlalarının cama vururken çıkardığı ritim, ahşap zeminin hafif gıcırtısı — bize dinginliğin kapılarını aralar.

### Yavaşlamanın Değeri

Modern çağ bize sürekli hızlanmamızı öğütlüyor. Ancak yaratıcılık ve derin düşünce hızlı adımlarla değil, duraklamalarla beslenir. Bir kitabı acele etmeden, satırların altını çizerek okumak; kelimelerin zihnimizde bıraktığı tortuları hissetmek edebiyatın özüdür.

> "Sessizlik bir boşluk değil, aksine cevaplarla dolu derin bir alandır."

Şöminenin çıtırtısını dinlerken yazılan her satır, zamanın akışına bırakılmış küçük birer mesajdır. Kendinize bugün birkaç dakika ayırın, bir fincan sıcak içecek alın ve sadece var olmanın tadını çıkarın.`,
      type: PostType.YAZI,
      author: 'Eternal Library Arşivi',
      readingTime: '4 dk okuma',
      isFeatured: true,
      likes: 18,
      views: 142,
    },
    {
      title: 'Gece Yarısı Okumaları: Eski Kitap Kokusu ve Şömine Ateşi',
      slug: 'gece-yarisi-okumalari-eski-kitap-kokusu-ve-somine-atesi',
      excerpt: 'Gece yarısı saat ikiye gelirken sararmış sayfalar arasında kaybolmanın ve unutulmuş hikayeleri yeniden canlandırmanın büyüsü.',
      content: `Gece, okurun en mahrem sığınağıdır. Herkes uykudayken dünyanın gürültüsü çekilir ve geriye sadece siz ve sayfadaki harfler kalır.

Eski kitapların kokusu vanilya, ahşap ve zamanın birleşimidir. Cildin hafifçe aşınmış köşelerine dokunmak, o kitabı daha önce okuyan meçhul dostlarla görünmez bir bağ kurmamızı sağlar. 

### Parşömenin Dokusu

Şömine ateşinin duvara yansıttığı sıcak turuncu gölgeler altında okunan bir Klasik, gündüz vakti okunan aynı eserden çok daha derin izler bırakır. Ateşin alevi titredikçe hikayedeki karakterler de odanın içinde canlanır sanki.

- **Sıcak Işık:** Loş sarı ışık gözleri dinlendirirken zihni hayal gücüne açar.
- **Sessizliğin Ritimleri:** Yağmur tıpırtıları ile sayfa çevirme sesinin uyumu.

Bu gece bir sonraki bölüme geçmeden önce durun ve pencereden dışarı bakın. Karanlıkta parıldayan yıldızlar da sizinle aynı hikayeyi izliyor olabilir.`,
      type: PostType.YAZI,
      author: 'Yasin Alacahan',
      readingTime: '5 dk okuma',
      isFeatured: true,
      likes: 24,
      views: 215,
    },
    {
      title: 'Zamanın Ruhunda Bir Yağmur Sesine Sığınmak',
      slug: 'zamanin-ruhunda-bir-yagmur-sesine-siginmak',
      excerpt: 'Pencere kenarında oturup yağmur damlalarının camdaki dansını izlerken tutulan içsel notlar.',
      content: `Yağmur gökyüzünün yeryüzüne yazdığı uzun bir mektuptur. Her damla, toprağa dokunduğunda unutulmuş bir kokuyu, beklenmedik bir hatırayı uyandırır.

Rüzgarın ahşap kepenkleri hafifçe salladığı anlarda, sıcak bir battaniyeye sarılıp çayınızı yudumlamak hayatın sunduğu en sade ve en güzel armağanlardan biridir. Edebiyat da tıpkı bu yağmur gibi ruhumuzun kurak yanlarını sular.`,
      type: PostType.YAZI,
      author: 'Eren Alacahan',
      readingTime: '3 dk okuma',
      isFeatured: true,
      likes: 12,
      views: 98,
    },
    {
      title: 'Sessiz Odada Mum Işığı',
      slug: 'sessiz-odada-mum-isigi',
      excerpt: 'Ahşap masanın üzerinde süzülen hafif bir alev ve geceye bırakılan mısralar.',
      content: `Bir mum yanar masanın kenarında,
Gölgesi dans eder ahşap duvarda.
Zaman durur, gece derinleşir,
Kelimeler dökülür sessizce kağıda.

Dışarıda rüzgar fısıldar eski bir masalı,
İçeride sıcak bir çay, biraz da hüzün.
Geçip giden yılların izi var sayfada,
Gözlerin aradığı o sakin yüzün.

Alev titrer, hatıralar uyanır tek tek,
Yalnızlık burada bir yük değil, ipekten bir örtü.
Ruhum hafifler bu loş akşamda,
Sevgiyle sarar beni gecenin bürüsü.`,
      type: PostType.SIIR,
      author: 'Edebiyat Sever',
      readingTime: '2 dk okuma',
      isFeatured: true,
      likes: 31,
      views: 280,
    },
    {
      title: 'Sonbaharın Yaprak Fısıltıları',
      slug: 'sonbaharin-yaprak-fisiltilari',
      excerpt: 'Sarı yaprakların rüzgardaki şarkısı ve kalbe dokunan serinlik.',
      content: `Dökülen her yaprak bir hatıra gibi,
Rüzgarın kollarında süzülür yere.
Toprak kokar nemli ve dingin,
Kuşlar veda eder eski şehre.

Şöminede odunlar çıtırdayarak yanar,
Ateşin turuncusu ısıtır ellerimi.
Bir dize takılır aklıma gecenin ortasında,
Unuturum dünyanın bütün kederini.

Güz, ruhun kendi içine çekilişidir,
Yapraklar gibi dökmek dertleri bir bir.
Bir fincan sıcak kahve ve sararmış kağıt,
Yeniden başlar içimizdeki o en güzel şiir.`,
      type: PostType.SIIR,
      author: 'Yasin Alacahan',
      readingTime: '2 dk okuma',
      isFeatured: true,
      likes: 19,
      views: 165,
    },
  ];

  for (const post of samplePosts) {
    await prisma.post.create({
      data: post,
    });
  }
  console.log('✅ Tüm yayınlanmış yazı ve şiirler başarıyla geri yüklendi.');

  // 5. BOOKS & BOOKPAGES (MUTLAK KİTAPLIK 30 ESER)
  console.log('📚 Mutlak Kitaplık 30 Eser yükleniyor...');
  for (const item of verifiedBooksData) {
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
        coverUrl: item.coverUrl,
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
        coverUrl: item.coverUrl,
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
          update: {
            content: item.fullPages[i],
          },
          create: {
            bookId: book.id,
            pageNumber: i + 1,
            content: item.fullPages[i],
          },
        });
      }
    }
  }
  console.log('✅ 30 Eser ve Tam Metin Sayfaları eksiksiz yüklendi.');
  console.log('🎉 Veritabanı senkronizasyonu eksiksiz tamamlandı!');
}

main()
  .catch((e) => {
    console.error('❌ Seed işleminde hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
