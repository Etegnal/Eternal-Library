import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const LITERARY_QUOTES = [
  { quote: "Dünyayı güzellik kurtaracak, bir insanı sevmekle başlayacak her şey.", author: "Sait Faik Abasıyanık", book: "Alemdağ'da Var Bir Yılan" },
  { quote: "İçimde çok erken büyümüş bir çocuk, dışımda hiç büyümemiş bir adam var.", author: "Sabahattin Ali", book: "Kürk Mantolu Madonna" },
  { quote: "Gözlerin gözlerime değince felaketim olurdu ağlardım...", author: "Attilâ İlhan", book: "Ben Sana Mecburum" },
  { quote: "Hayat, bisiklete binmek gibidir. Dengede kalmak için hareket etmeye devam etmelisiniz.", author: "Albert Einstein", book: "Mektuplar" },
  { quote: "Kitaplar soğuk ama sadık dostlardır.", author: "Victor Hugo", book: "Sefiller" },
  { quote: "Sevebildiğin kadar sev, hayat kısa ve dünya yorgun.", author: "Cemal Süreya", book: "Sevda Sözleri" },
  { quote: "Bütün muhteşem hikayeler iki şekilde başlar: Ya bir insan bir yolculuğa çıkar ya da şehre bir yabancı gelir.", author: "Lev Tolstoy", book: "İnsan Ne İle Yaşar" },
  { quote: "Güzellik görenin gözündedir.", author: "Oscar Wilde", book: "Dorian Gray'in Portresi" },
  { quote: "Bazen en uzun yolculuk iki insan arasındaki mesafedir.", author: "Oğuz Atay", book: "Tutunamayanlar" },
  { quote: "Sesini değil, sözünü yükselt; yağmurlardır çiçekleri büyüten, gök gürültüleri değil.", author: "Mevlana Celaleddin-i Rumi", book: "Mesnevi" },
  { quote: "İnsan en çok akşamüstleri yalnızdır.", author: "Ahmet Hamdi Tanpınar", book: "Huzur" },
  { quote: "Düşünüyorum, öyleyse varım.", author: "René Descartes", book: "Metot Üzerine Konuşma" },
  { quote: "Bir insanı unutabilirsin, bir insanın sana ne hissettirdiğini asla unutamazsın.", author: "Maya Angelou", book: "Şiirler" },
  { quote: "Umut, uyanık insanın rüyasıdır.", author: "Aristoteles", book: "Etik" },
  { quote: "En derin nehirler en sessiz akanlardır.", author: "Curtius Rufus", book: "Tarih" },
  { quote: "Dünya herkese yetecek büyüklüktedir. Onun için başkasının yerini kapmaktansa, kendi yerinizi bulunuz.", author: "Charlie Chaplin", book: "Otobiyografi" },
  { quote: "İnsanlar birbirlerine gülümsediğinde, karanlık bir oda aydınlanır.", author: "Antoine de Saint-Exupéry", book: "Küçük Prens" },
  { quote: "Yaşamak bir ağaç gibi tek ve hür ve bir orman gibi kardeşçesine...", author: "Nazım Hikmet", book: "Davet" },
  { quote: "Kelimeler albayım, bazı anlamlara gelmiyor.", author: "Oğuz Atay", book: "Tehlikeli Oyunlar" },
  { quote: "İnsan kalbinin derinliklerinde fırtınalar kopar ama dışarıdan sadece bir duman görünür.", author: "Vincent van Gogh", book: "Mektuplar" },
  { quote: "Aşk bir sudur, iç iç kudur.", author: "Anonim Lo-Fi Deyim", book: "Kütüphane Seçkileri" },
  { quote: "Yalnızlık, kendi içindeki zenginliği keşfetme fırsatıdır.", author: "Arthur Schopenhauer", book: "Yaşam Bilgeliği Üzerine Aforizmalar" },
  { quote: "Sessizlik, ruhun en berrak aynasıdır.", author: "Franz Kafka", book: "Milena'ya Mektuplar" },
  { quote: "Yarın bambaşka bir insan olacağım diyorsun. Neden bugünden başlamıyorsun?", author: "Epiktetos", book: "Düşünceler" },
  { quote: "Okumak, gidenin yerine gelmeyeni beklemek gibidir; ama kitaplar hep gelir.", author: "Cemil Meriç", book: "Bu Ülke" },
  { quote: "Bir mum diğer bir mumu tutuşturmakla ışığından bir şey kaybetmez.", author: "Mevlana Celaleddin-i Rumi", book: "Divan-ı Kebir" },
  { quote: "Zaman, ruhumuzun aşınmayan tek kumaşıdır.", author: "Marcel Proust", book: "Kayıp Zamanın İzinde" },
  { quote: "Hayat gezgin bir gölgedir.", author: "William Shakespeare", book: "Macbeth" },
  { quote: "Kalbin kendine has nedenleri vardır ki akıl bunları hiç bilmez.", author: "Blaise Pascal", book: "Düşünceler" },
  { quote: "Ruhun şarkı söylerse, hayat seni dansa kaldırır.", author: "Sufi Atasözü", book: "Gönül Aynası" },
];

async function main() {
  console.log('🌱 Veritabanı tohumlama (seed) işlemi başlatılıyor...');

  // Admin Kullanıcısı
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@eternallibrary.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@eternallibrary.com',
        name: 'Kütüphane Yöneticisi',
        passwordHash,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin kullanıcısı oluşturuldu (admin@eternallibrary.com / admin123)');
  }

  // 365 Günün Sözü
  console.log('📜 365 Günlük İlham Sözleri oluşturuluyor...');
  await prisma.dailyQuote.deleteMany({});
  
  const dailyQuotesData = [];
  for (let day = 1; day <= 366; day++) {
    const quoteTemplate = LITERARY_QUOTES[(day - 1) % LITERARY_QUOTES.length];
    dailyQuotesData.push({
      dayOfYear: day,
      quote: quoteTemplate.quote,
      author: quoteTemplate.author,
      book: quoteTemplate.book || 'Kütüphane Arşivi',
    });
  }

  await prisma.dailyQuote.createMany({
    data: dailyQuotesData,
  });
  console.log('✅ 365 günlük sözler başarıyla yüklendi.');

  // Başlangıç Yazıları ve Şiirleri
  console.log('📚 Başlangıç yazıları ve şiirleri oluşturuluyor...');
  await prisma.post.deleteMany({});

  const postsData = [
    {
      title: "Lo-Fi Yaşam Sanatı: Yavaşlamanın ve Sessizliğin Poetiği",
      slug: "lo-fi-yasam-sanati-yavaslamanin-ve-sessizligin-poetigi",
      excerpt: "Hızlı akan dünyanın ritminden çıkıp, bir fincan sıcak çay ve çıtırdayan şömine eşliğinde iç dünyamıza yaptığımız huzurlu yolculuk.",
      content: `Günün ilk ışıkları pencerelerden süzülürken veya akşamın loş karanlığı odayı kaplarken, hayatın telaşından sıyrılmak bir lüks değil, ruhun temel bir ihtiyacıdır. 

Lo-fi estetiği sadece bir müzik türü veya görsel tarz değildir; aynı zamanda mükemmel olmama özgürlüğü, pürüzlü seslerdeki samimiyet ve anın tadını çıkarma felsefesidir. Olduğu gibi kabul edilen detaylar — eski bir plak cızırtısı, yağmur damlalarının cama vururken çıkardığı ritim, ahşap zeminin hafif gıcırtısı — bize dinginliğin kapılarını aralar.

### Yavaşlamanın Değeri

Modern çağ bize sürekli hızlanmamızı öğütlüyor. Ancak yaratıcılık ve derin düşünce hızlı adımlarla değil, duraklamalarla beslenir. Bir kitabı acele etmeden, satırların altını çizerek okumak; kelimelerin zihnimizde bıraktığı tortuları hissetmek edebiyatın özüdür.

> "Sessizlik bir boşluk değil, aksine cevaplarla dolu derin bir alandır."

Şöminenin çıtırtısını dinlerken yazılan her satır, zamanın akışına bırakılmış küçük birer mesajdır. Kendinize bugün birkaç dakika ayırın, bir fincan sıcak içecek alın ve sadece var olmanın tadını çıkarın.`,
      type: "YAZI",
      coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
      readingTime: "4 dk okuma",
      publishedAt: new Date(),
    },
    {
      title: "Gece Yarısı Okumaları: Eski Kitap Kokusu ve Şömine Ateşi",
      slug: "gece-yarisi-okumalari-eski-kitap-kokusu-ve-somine-atesi",
      excerpt: "Gece yarısı saat ikiye gelirken sararmış sayfalar arasında kaybolmanın ve unutulmuş hikayeleri yeniden canlandırmanın büyüsü.",
      content: `Gece, okurun en mahrem sığınağıdır. Herkes uykudayken dünyanın gürültüsü çekilir ve geriye sadece siz ve sayfadaki harfler kalır.

Eski kitapların kokusu vanilya, ahşap ve zamanın birleşimidir. Cildin hafifçe aşınmış köşelerine dokunmak, o kitabı daha önce okuyan meçhul dostlarla görünmez bir bağ kurmamızı sağlar. 

### Parşömenin Dokusu

Şömine ateşinin duvara yansıttığı sıcak turuncu gölgeler altında okunan bir Klasik, gündüz vakti okunan aynı eserden çok daha derin izler bırakır. Ateşin alevi titredikçe hikayedeki karakterler de odanın içinde canlanır sanki.

- **Sıcak Işık:** Loş sarı ışık gözleri dinlendirirken zihni hayal gücüne açar.
- **Sessizliğin Ritimleri:** Yağmur tıpırtıları ile sayfa çevirme sesinin uyumu.

Bu gece bir sonraki bölüme geçmeden önce durun ve pencereden dışarı bakın. Karanlıkta parıldayan yıldızlar da sizinle aynı hikayeyi izliyor olabilir.`,
      type: "YAZI",
      coverImage: "https://images.unsplash.com/photo-1474939557548-f84244685449?auto=format&fit=crop&w=1200&q=80",
      readingTime: "5 dk okuma",
      publishedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      title: "Zamanın Ruhunda Bir Yağmur Sesine Sığınmak",
      slug: "zamanin-ruhunda-bir-yagmur-sesine-siginmak",
      excerpt: "Pencere kenarında oturup yağmur damlalarının camdaki dansını izlerken tutulan içsel notlar.",
      content: `Yağmur gökyüzünün yeryüzüne yazdığı uzun bir mektuptur. Her damla, toprağa dokunduğunda unutulmuş bir kokuyu, beklenmedik bir hatırayı uyandırır.

Rüzgarın ahşap kepenkleri hafifçe salladığı anlarda, sıcak bir battaniyeye sarılıp çayınızı yudumlamak hayatın sunduğu en sade ve en güzel armağanlardan biridir. Edebiyat da tıpkı bu yağmur gibi ruhumuzun kurak yanlarını sular.`,
      type: "YAZI",
      coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80",
      readingTime: "3 dk okuma",
      publishedAt: new Date(Date.now() - 86400000 * 5),
    },
    {
      title: "Sessiz Odada Mum Işığı",
      slug: "sessiz-odada-mum-isigi",
      excerpt: "Ahşap masanın üzerinde süzülen hafif bir alev ve geceye bırakılan mısralar.",
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
      type: "SIIR",
      coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      readingTime: "2 dk okuma",
      publishedAt: new Date(),
    },
    {
      title: "Sonbaharın Yaprak Fısıltıları",
      slug: "sonbaharin-yaprak-fisiltilari",
      excerpt: "Sarı yaprakların rüzgardaki şarkısı ve kalbe dokunan serinlik.",
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
      type: "SIIR",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      readingTime: "2 dk okuma",
      publishedAt: new Date(Date.now() - 86400000 * 3),
    },
    {
      title: "Geceye Yazan Mürekkep",
      slug: "geceye-yazan-murekkep",
      excerpt: "Dolma kalemin ucundan dökülen koyu mavi mürekkebin yolculuğu.",
      content: `Mürekkep koyu, kağıt krem rengi,
Gece yarısı bulunur kalbin dengi.
Hiç söylenmemiş sözler gizlidir satırlarda,
Sessizliğin müziği çalar arka planda.

Adım adım yürürüz lo-fi ritminde,
Bir masal saklıdır her bir kelimede.
Işıklar sönerken şehirde tek tek,
Bizim dünyamızda bir alev parlayacak.`,
      type: "SIIR",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      readingTime: "1 dk okuma",
      publishedAt: new Date(Date.now() - 86400000 * 7),
    },
  ];

  for (const post of postsData) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('✅ Başlangıç yazıları ve şiirleri başarıyla yüklendi.');
  console.log('🎉 Veritabanı seed işlemi başarıyla tamamlandı!');
}

main()
  .catch((e) => {
    console.error('❌ Seed işleminde hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
