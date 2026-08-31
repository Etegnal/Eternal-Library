import { prisma } from '../src/lib/prisma';

export const WITCHER_BOOKS = [
  {
    slug: 'witcher-1-son-dilek',
    title: 'Son Dilek (The Witcher 1. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1993,
    pages: 344,
    category: 'Fantastik & Öykü',
    rating: 4.7,
    isReadable: false,
    isPublished: false,
    coverUrl: '', // User handles covers
    summary: `Orijinal Adı: The Last Wish
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2017)
Sayfa Sayısı: 344 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.7 / 5 (Goodreads: ~4.4/5, 1000Kitap: ~4.9/5)

Rivia'lı Geralt, çocukluktan itibaren zihinsel ve fiziksel mutasyonlara tabi tutularak eğitilmiş bir Efsunlu'dur (Witcher). Canavarları gümüş ve çelik kılıçlarıyla avlayarak altın karşılığında hayatını kazanan Geralt, insan neslinin canavarlardan daha acımasız olabildiği acı bir dünyada tarafsız kalmaya çalışmaktadır.

İlk öyküde Geralt, Kral Foltest'in kızı olan ve bir lanet sonucu insansı bir yaratığa dönüşen Striga'yı kurtarmak için Wyzima kalesinde ölümcül bir gece geçirir. Bir diğer hikayede, Güzellik ve Canavar masalının karanlık bir versiyonu olan Nivellen ile tanışır. "Daha Az Kötü" ilkesi üzerinden gelişen Blaviken katliamında Geralt, prenses Renfri ve ekibini şehri korumak adına katletmek zorunda kalır ve istemeden "Blaviken Kasabı" unvanını alır.

Geralt, aşık şair ve ozan Dandelion (Jaskier) ile yoldaşlık kurar. Bir nehir kıyısında buldukları gizemli cin (Cin/Djinn) testisi, Geralt'ın hayatını sonsuza dek değiştirecek olan mor gözlü, leylak kokulu güçlü büyücü Yennefer of Vengerberg ile kesişmesine sebep olur. Cin'in son dileğiyle Geralt, kendi kaderini Yennefer'in kaderine mühürler.

Ayrıca Geralt, Cintra Kraliçesi Calanthe'nin sarayında Sürpriz Hakkı (Law of Surprise) yemini eder. Prenses Pavetta'yı lanetten kurtarması karşılığında henüz doğmamış olan çocuk Ciri, Geralt'ın kaçınılmaz kaderi haline gelir.

Editör Yorumu: Klasik peri masallarını karanlık, felsefi ve yetişkin bir dille yeniden yorumlayan, Witcher evrenine ve Geralt-Yennefer-Ciri üçgenine harika bir giriş sunan muazzam bir öykü seçkisidir.`,
  },
  {
    slug: 'witcher-2-kader-kilici',
    title: 'Kader Kılıcı (The Witcher 2. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1992,
    pages: 416,
    category: 'Fantastik & Öykü',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Sword of Destiny
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2017)
Sayfa Sayısı: 416 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~5.0/5)

Geralt, kaderin kaçınılmazlığı ve Efsunlu olmanın getirdiği yalnızlık duygusu arasında bocalamaktadır. Yennefer ile olan çalkantılı, tutkulu ve bir dargın bir barışık ilişkisi kitabın ana duygusal damarını oluşturur. Yeşil ejderhayı avlamaya çalışan bir gruba katılan Geralt, ejderha Villentretenmerth (Borch Three Jackdaws) ile tanışarak doğanın ve nadir türlerin korunması gerektiğini kavrar.

Su altı şehri ve deniz insanlarıyla ilgili hikayede Dandelion ile macera yaşayan Geralt, kaderinden kaçmak için Brokilon Ormanı'na girer. Kuruaslar (Dryadlar) tarafından yönetilen bu kadim ve tehlikeli ormanda, küçük yaştaki Cintra Prensesi Cirilla (Ciri) ile karşılaşır. Ciri, Kuruasların dönüşüm iksirini içmesine rağmen efsunlu gücü sayesinde değişime uğramaz.

Geralt, Sürpriz Hakkı nedeniyle Ciri'nin kendi kaderi olduğunu bilse de onu tehlikeli Witcher hayatından korumak için Kraliçe Calanthe'ye geri teslim eder. Ancak Nilfgaard İmparatorluğu'nun Kuzey Krallıkları'na karşı başlattığı yıkıcı işgal savaşı tüm dengeleri altüst eder. Cintra şehri düşer ve Kraliçe Calanthe ölür.

Savaşın ardından tüccar Yurga'yı yaratıklardan kurtaran Geralt, Sürpriz Hakkı olarak Yurga'nın evinde saklanan küçük Ciri ile yeniden karşılaşır. Geralt, kaderden kaçılamayacağını kabul ederek Ciri'yi bağrına basar.

Editör Yorumu: Kader ve seçim temalarının işlendiği, Geralt ile Ciri arasındaki manevi baba-kız bağının temelini atan son derece duygusal ve sürükleyici bir geçiş kitabıdır.`,
  },
  {
    slug: 'witcher-3-elflerin-kani',
    title: 'Elflerin Kanı (The Witcher 3. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1994,
    pages: 352,
    category: 'Fantastik & Roman',
    rating: 4.7,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Blood of Elves
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2017)
Sayfa Sayısı: 352 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.7 / 5 (Goodreads: ~4.3/5, 1000Kitap: ~4.9/5)

Nilfgaard savaşı sonrasında Geralt, Ciri'yi Efsunluların dağ kalesi olan Kaer Morhen'e götürür. Burada diğer Efsunlular (Vesemir, Eskel, Lambert, Coën) ve kadın büyücü Triss Merigold eşliğinde Ciri kılıç ve dövüş eğitimi almaya başlar. Ancak Ciri'nin nöbetler esnasında kehanetler fısıldaması ve kontrol edemediği muazzam Kadim Kan (Elder Blood) büyüsü, Triss'in sınırlarını aşar.

Geralt, Ciri'nin zihinsel ve büyülü eğitimi için yardım istemek üzere Yennefer'a başvurur. Bu sırada Kuzey Krallıkları'nın kralları gizli bir toplantı yaparak Nilfgaard ile yeni bir savaşa hazırlanır ve Ciri'nin hayatta olduğunu öğrenerek onu ele geçirme planları yaparlar. Ayrıca "Scoia'tael" (Sincaplar) adı verilen elfi ve cüce asi çeteleri, insanlara karşı kanlı bir gerilla savaşı başlatır.

Geralt, Ciri'nin peşindeki gizemli ve tehlikeli büyücü Rience'ın izini sürer. Ciri ise Yennefer'in yanında Ellander'deki Melitele Tapınağı'nda büyü ve etiket eğitimi almaya başlar. Yennefer ile Ciri arasında anne-kız şefkati gelişir.

Ancak Ciri'nin sahip olduğu Kadim Kan soyu, onun tüm dünyayı değiştirebilecek ya da yok edebilecek efsanevi bir güce sahip olduğunu ortaya koymaktadır.

Editör Yorumu: Witcher destanının ilk uzun soluklu romanıdır. Politik entrikaların, dünya inşasının ve Ciri'nin kişisel gelişiminin odak noktasında olduğu harika bir başlangıç kitabıdır.`,
  },
  {
    slug: 'witcher-4-nefret-cagi',
    title: 'Nefret Çağı (The Witcher 4. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1995,
    pages: 384,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Time of Contempt
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2018)
Sayfa Sayısı: 384 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.4/5, 1000Kitap: ~4.9/5)

Kuzey Krallıkları ve Nilfgaard İmparatorluğu arasındaki gerilim tırmanırken, Yennefer Ciri'yi Büyücü Konseyi'nin toplanacağı Thanedd Adası'na götürür. Thanedd Darbesi sırasında, büyücülerin bir kısmının Nilfgaard İmparatoru Emhyr var Emreis ile işbirliği yaptığı ortaya çıkar. Büyük bir ihanet ve kanlı bir çatışma patlak verir.

Geralt, Ciri'yi korumak için Thanedd Adası'na sızar ve acımasız hain büyücü Vilgefortz ile düelloya girer. Vilgefortz, büyülü asa saldırısıyla Geralt'ın bacağını kırarak onu ölümcül şekilde yaralar. Yennefer kaybolur, Büyücüler Konseyi dağılır.

Ciri, Thanedd kulesindeki bozuk bir ışınlanma kapısından (Tor Lara) kaçarken kendisini Korath Çölü'nün kızgın kumlarında bulur. Devasa çöl sıcağında açlık ve susuzlukla boğuşan Ciri, küçük bir tekboynuzlu at ile dostluk kurar ve içindeki ateş büyüsünü kullanarak hayatta kalır.

Çölden kurtulduktan sonra haydutlar tarafından yakalanan Ciri, "Sıçanlar" (The Rats) adlı genç ve suça batmış haydut çetesine katılır. Adını "Falka" olarak değiştiren Ciri, acımasız bir asi ve katil olarak karanlık bir yola sapar.

Editör Yorumu: Thanedd Darbesi sahnesiyle serinin en yüksek aksiyonlu, en kırılmalı ve en dramatik ciltlerinden biridir. Ciri'nin masumiyetini kaybedip Falka'ya dönüşmesi sarsıcıdır.`,
  },
  {
    slug: 'witcher-5-atesle-imtihan',
    title: 'Ateşle İmtihan (The Witcher 5. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1996,
    pages: 384,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Baptism of Fire
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2018)
Sayfa Sayısı: 384 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.4/5, 1000Kitap: ~4.9/5)

Vilgefortz ile yaptığı düelloda ağır yaralanan Geralt, Brokilon Ormanı'nda Kuruaslar tarafından tedavi edilir. Henüz tam iyileşmeden Ciri'nin Nilfgaard'ın elinde olduğu haberini alan Geralt, kızını kurtarmak için güneye doğru tehlikeli bir arayış yolculuğuna çıkar.

Yolculuk boyunca Geralt'ın etrafında unutulmaz bir "Hansa" (yoldaş grubu) toplanır: Sadık şair Dandelion, okçu kadın Milva, eski Nilfgaard askeri Cahir, cüce Zoltan Chivay ve binlerce yıllık usta simyacı vampir Emiel Regis. Geralt, bu sıra dışı dost grubuyla savaşın yakıp yıktığı Nilfgaard-Kuzey cephe hatlarında ilerler.

Ciri ise Sıçanlar çetesiyle birlikte yağma ve cinayetlerine devam etmektedir. Ancak peşinde, Nilfgaard tarafından kiralanan son derece acımasız kelle avcısı Leo Bonhart vardır.

Kitabın finalinde Geralt ve Hansa grubu, Yaruga Köprüsü Savaşı'nda kendilerini Meve liderliğindeki Lyria ordusu ile Nilfgaard askerlerinin çatışmasının ortasında bulurlar. Geralt ve Cahir, köprüyü cesurca savunarak Meve'in zafer kazanmasını sağlarlar. Kraliçe Meve, Geralt'ı şövalye ilan ederek ona resmi olarak "Rivia'lı Geralt" unvanını verir.

Editör Yorumu: Regis, Milva ve Zoltan gibi muazzam yan karakterlerin katılımıyla serinin arkadaşlık, sadakat ve mizah duygusu en yüksek, sürükleyici yol hikayesidir.`,
  },
  {
    slug: 'witcher-6-kirlangic-kulesi',
    title: 'Kırlangıç Kulesi (The Witcher 6. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1997,
    pages: 480,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: The Tower of the Swallow
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2019)
Sayfa Sayısı: 480 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

Sıçanlar çetesi, acımasız kelle avcısı Leo Bonhart tarafından tek tek katledilir. Bonhart, Ciri'yi öldürmez; ona işkence eder, arena dövüşlerinde yarıştırır ve yüzünde kalıcı bir yara izi bırakır. Ciri, Bonhart'ın elinden kaçmayı başararak Bataklıkta yaşayan münzevi filozof Wysogota'nın kulübesine sığınır ve burada yaralarını sarar.

Bu sırada Geralt ve Hansa grubu, Ciri'nin yerini öğrenmek ve Vilgefortz'un izini bulmak için Toussaint ve Druid ormanlarına doğru ilerlerler. Yennefer ise Vilgefortz'un gizli sığınağını ararken Sedna Çukuru'nda tuzağa düşer ve Vilgefortz tarafından tutsak edilerek işkenceye uğrar.

Wysogota'nın kulübesinde iyileşen Ciri, kaderiyle yüzleşmek üzere Kırlangıç Kulesi'ne (Tor Zireael) doğru yola çıkar. Bonhart ve Rience liderliğindeki takipçilerini donmuş bir göl üzerinde paten sürerek ve kılıcıyla buzları keserek dehşet verici bir intikamla katleder.

Ciri, Kırlangıç Kulesi'ndeki kadim geçitten geçerek farklı bir boyuta — Elflerin dünyasına (Aen Elle) kaçmayı başarır.

Editör Yorumu: Ciri'nin donmuş göldeki efsanevi intikam sahnesi ve Wysogota ile felsefi sohbetleri kitabın edebi doruk noktalarıdır. Karanlık ve gerilimi yüksek bir cilddir.`,
  },
  {
    slug: 'witcher-7-golun-hanimi',
    title: 'Gölün Hanımı (The Witcher 7. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 1999,
    pages: 560,
    category: 'Fantastik & Roman',
    rating: 4.9,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Lady of the Lake
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2020)
Sayfa Sayısı: 560 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.6/5, 1000Kitap: ~5.0/5)

Ciri, kendisini Aen Elle elflerinin dünyasında tutsak bulur. Kral Auberon ve Eredin (Vahşi Av lideri), Ciri'den Kadim Kan soyunu devam ettirecek bir çocuk istemektedir. Ciri, unicorn Ihuarraquax'ın yardımıyla zaman ve uzayda yolculuk yapma yetisini (Zamanın ve Uzayın Hanımı) kullanarak boyutlar arası kaçışına başlar.

Geralt ve Hansa grubu, Stygga Kalesi'nde tutulan Yennefer ve Ciri'yi kurtarmak için kalede son derece kanlı bir nihai savaşa girer. Milva, Cahir ve Regis bu savaşta kahramanca can verirler. Geralt, Vilgefortz'u mağlup eder; Ciri ise Leo Bonhart'ı öldürerek intikamını alır.

İmparator Emhyr var Emreis kaleye ulaşır. Emhyr'in aslında Ciri'nin öz babası Duny olduğu ortaya çıkar. Ancak Emhyr, Ciri ve Geralt'ın arasındaki sarsılmaz bağı görerek merhamet gösterir ve onları serbest bırakır.

Kuzey Krallıkları ile Nilfgaard arasındaki Brenna Savaşı insanlığın zaferiyle biter. Ancak Rivia şehrinde patlak veren pogromda (ırkçı ayaklanma) Geralt, insan olmayanları korurken bir köylünün yaba darbesiyle ölümcül şekilde yaralanır. Yennefer onu kurtarmak için tüm enerjisini harcayarak düşer. Ciri, her ikisini de sisten kaplı efsanevi Avallach/Elma Ağaçları Adası'na taşır.

Editör Yorumu: Destansı Witcher serisinin duygusal, trajik ve efsanevi final romanıdır. Karakterlerin vedaları ve Ciri'nin boyutlar arası yolculuğu fantastik edebiyatın klasiklerindendir.`,
  },
  {
    slug: 'witcher-8-firtina-mevsimi',
    title: 'Fırtına Mevsimi (The Witcher 8. Cilt)',
    author: 'Andrzej Sapkowski',
    year: 2013,
    pages: 384,
    category: 'Fantastik & Roman',
    rating: 4.6,
    isReadable: false,
    isPublished: false,
    coverUrl: '',
    summary: `Orijinal Adı: Season of Storms
Yayıncı: Pegasus Yayınları (Türkiye Basım Yılı: 2021)
Sayfa Sayısı: 384 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.6 / 5 (Goodreads: ~4.2/5, 1000Kitap: ~4.8/5)

Ana serinin olaylarından öncesinde geçen bu bağımsız romanda Geralt, Kerack Krallığı'nda çalınan iki efsanevi Efsunlu kılıcını (çelik ve gümüş kılıçları) geri almak için mücadele eder.

Şehirdeki politik entrikalara, saray hilelerine ve büyücülerin kirli deneylerine bulaşmak zorunda kalan Geralt, güzel ve tehlikeli büyücü Lytta Neyd (Coral) ile yakınlaşır. Devasa yaratıklar, deniz canavarları ve fırtına büyüleriyle karşılaşır.

Dandelion'ın desteği ve kılıç ustalarının iz sürmesiyle Geralt, çalınan kılıçlarını yeniden ele geçirmeyi başarır. Romanın sonunda, yıllar sonrasına dair gizemli bir gelecekte genç bir kızın ormanda Geralt'a benzeyen bir Efsunlu ile karşılaşması aktarılır.

Editör Yorumu: Geralt'ın yalnız bir Efsunlu olarak canavar avladığı günlere eğlenceli ve aksiyon dolu bir dönüş sağlayan, ana seriyi tamamlayıcı nefis bir prequel (öncül) eserdir.`,
  },
];

async function main() {
  console.log('Seeding 8 Witcher books as DRAFTS into PostgreSQL DB...');

  // Also clear coverUrl for existing Dune and Stormlight drafts if user prefers empty coverUrls
  await prisma.book.updateMany({
    where: { isPublished: false },
    data: { coverUrl: '' },
  });

  let count = 0;
  for (const book of WITCHER_BOOKS) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        category: book.category,
        summary: book.summary,
        rating: book.rating,
        isReadable: book.isReadable,
        isPublished: book.isPublished,
        coverUrl: book.coverUrl,
      },
      create: {
        slug: book.slug,
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        category: book.category,
        summary: book.summary,
        rating: book.rating,
        isReadable: book.isReadable,
        isPublished: book.isPublished,
        coverUrl: book.coverUrl,
      },
    });
    count++;
  }
  console.log(`Successfully seeded ${count} Witcher books as DRAFTS in DB and cleared draft coverUrls!`);
}

main().catch(console.error).finally(() => process.exit());
