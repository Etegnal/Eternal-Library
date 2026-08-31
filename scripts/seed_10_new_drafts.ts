import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_DRAFT_BOOKS = [
  {
    title: 'Fareler ve İnsanlar',
    author: 'John Steinbeck',
    year: 1937,
    pages: 111,
    category: 'Klasikler',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/fareler-ve-insanlar/126743.html',
    summary: `Orijinal Adı: Of Mice and Men
Yayıncı: Sel Yayıncılık (Türkiye Basım Yılı: 1937)
Sayfa Sayısı: 111 sayfa
Platform & Okur Puanı: 4.8 / 5

Fareler ve İnsanlar; 1929 Büyük Buhranı sırasında Kaliforniya'da ziraat işçisi olarak çalışan iki gezgin arkadaşın, zihinsel engelli ama devasa bir güce sahip Lennie Small ile akıllı ve koruyucu George Milton'ın trajik hikâyesini anlatır.

George ve Lennie, kendi küçük topraklarına sahip olup tavşan yetiştirme hayali kuran iki yakın dosttur. Lennie'nin çocuksu zihni ve yumuşak şeyleri okşama takıntısı (fareler, köpek yavruları), devasa fiziksel gücüyle birleştiğinde sürekli başlarını belaya sokar. Bir önceki çiftlikten Lennie'nin bir kadının elbisesine dokunması yüzünden kaçmak zorunda kalan ikili, Salinas Vadisi'nde yeni bir çiftlikte işe başlarlar.

Çiftlikte zalim patronun oğlu Curley ve onun yalnız, dikkat çekmeye çalışan karısıyla karşılaşırlar. Lennie, Curley'nin karısının yumuşak saçlarını okşarken kadının paniklemesi üzerine korkuya kapılır ve istemeden kadının boynunu kırarak ölümüne yol açar. Dehşete düşen Lennie, George'un önceden tembihlediği nehir kıyısındaki çalılığa kaçar.

Çiftlik çalışanları ve linç çetesi Lennie'yi işkenceyle öldürmek üzere peşine düşerken, George arkadaşını Curley'nin vahşetinden korumak için en acı kararı alır. Nehir kıyısında hayal ettikleri küçük çiftliği ve tavşanları Lennie'ye son kez anlatırken, onu şakak kısmından tabancayla vurarak huzur içinde ölmesini sağlar.`,
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    pages: 208,
    category: 'Bilimkurgu',
    rating: 4.7,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/fahrenheit-451/470438.html',
    summary: `Orijinal Adı: Fahrenheit 451
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 1953)
Sayfa Sayısı: 208 sayfa
Platform & Okur Puanı: 4.7 / 5

Fahrenheit 451; kitapların kesinlikle yasaklandığı, düşünmenin suç sayıldığı ve "itfaiyecilerin" yangın söndürmek yerine kitap yaktığı distopik bir gelecekte geçer.

Ana karakter Guy Montag, mesleği gizli kitapları yakmak olan bir itfaiyecidir. Montag, sıra dışı genç komşusu Clarisse McClellan ile tanışana kadar sürdürdüğü yüzeysel hayattan ve televizyon duvarlarıyla çevrili evliliğinden memnundur. Clarisse'in ona sorduğu "Mutlu musun?" sorusu Montag'ın zihninde derin bir uyanış başlatır.

Montag, yaktığı evlerden birinde yaşlı bir kadının kitaplarıyla birlikte kendini diri diri yakmasına şahit olunca sarsılır ve gizlice kurtardığı kitapları okumaya başlar. İtfaiye Şefi Beatty, kitapların insanları mutsuz ettiğini ve toplumda eşitliği bozduğunu savunarak Montag'ı uyarır. Ancak Montag, emekli profesör Faber ile iş birliği yaparak rejime karşı direnmeye karar verir.

Karısı Mildred'ın ihbarı üzerine Montag kendi evini yakmaya zorlanır. Öfkeye kapılan Montag, Şef Beatty'yi alev makinesiyle öldürür ve mekanik tazının takibinden kaçarak şehri terk eder. Nehir boyunca kaçan Montag, her biri zihninde bir kitabı ezberleyerek koruyan "Kitap İnsanlar" topluluğuna katılır. Tam bu sırada şehir nükleer bir savaşla yok olur; Kitap İnsanlar medeniyeti yeniden inşa etmek üzere küllerinden doğan şehre doğru yürürler.`,
  },
  {
    title: 'Puslu Kıtalar Atlası',
    author: 'İhsan Oktay Anar',
    year: 1995,
    pages: 238,
    category: 'Klasikler',
    rating: 4.9,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/puslu-kitalar-atlasi/10006.html',
    summary: `Orijinal Adı: Puslu Kıtalar Atlası
Yayıncı: İletişim Yayınları (Türkiye Basım Yılı: 1995)
Sayfa Sayısı: 238 sayfa
Platform & Okur Puanı: 4.9 / 5

Puslu Kıtalar Atlası; 17. yüzyıl Osmanlı İstanbul'unda, felsefi sorgulamalar, düşler ve masalsı bir atmosfer içinde geçen Türk edebiyatının postmodern başyapıtıdır.

Eser, evinden hiç çıkmadan uyku şurubu içerek rüyalarında dünyayı gezen ve "Puslu Kıtalar Atlası"nı çizen Uzun İhsan Efendi ile oğlu Bünyamin'in maceralarını konu alır. Bünyamin, babasının çizdiği haritaların ve rüyaların peşine düşerek Konstantiniyye'nin karanlık sokaklarında, lağımcı ocağında ve gizli teşkilatlarda tehlikeli bir yolculuğa çıkar.

Bünyamin, sadrazamın casus teşkilatı Efrasiyab ve Rendekar'ın kehanetleri etrafında dönen büyük bir komplonun ortasında kalır. Yüzü tanınmaz hale gelen Bünyamin, babasının ona bıraktığı tılsımlı parayı ve kehanetleri takip ederek kendi varoluş amacını keşfetmeye çalışır.

Descartes'ın "Düşünüyorum öyleyse varım" felsefesini tersyüz eden roman, varlığın ve gerçekliğin Uzun İhsan Efendi'nin bir rüyasından ibaret olup olmadığını sorgulayan unutulmaz bir zihinsel finalle sona erer.`,
  },
  {
    title: 'Kürk Mantolu Madonna',
    author: 'Sabahattin Ali',
    year: 1943,
    pages: 160,
    category: 'Klasikler',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/kurk-mantolu-madonna/10634.html',
    summary: `Orijinal Adı: Kürk Mantolu Madonna
Yayıncı: Yapı Kredi Yayınları (Türkiye Basım Yılı: 1943)
Sayfa Sayısı: 160 sayfa
Platform & Okur Puanı: 4.8 / 5

Kürk Mantolu Madonna; içine kapanık, toplum tarafından silik ve pısırık görülen Raif Efendi'nin hatıra defteri aracılığıyla ortaya çıkan tutkulu ve trajik aşk hikâyesini anlatır.

Gençliğinde babası tarafından sabunculuk öğrenmesi için Berlin'e gönderilen Raif Efendi, bir sanat galerisinde Andrea del Sarto'nun "Meryem Ana" tablosuna benzettiği Kürk Mantolu Madonna otoportresini görür. Tabloya büyülenen Raif, ressamı Maria Puder ile tanışır. İkili arasında ruhsal ve derin bir yakınlık doğar.

Maria Puder'in bağımsız ruhu ile Raif Efendi'nin hassasiyeti unutulmaz bir aşka dönüşür. Ancak Raif Efendi babasının ölümü üzerine Türkiye'ye dönmek zorunda kalır. Mektuplaşmaları bir süre devam ettikten sonra Maria'dan haber kesilir. Raif Efendi, Maria'nın kendisini unuttuğunu sanarak derin bir kırgınlıkla hayatına devam eder ve istemediği bir evlilik yapar.

Yıllar sonra Ankara'da bir tren garında Maria'nın kuzeniyle karşılaşan Raif Efendi, Maria'nın doğum yaparken öldüğünü ve yanında taşıdığı küçük kız çocuğunun kendi öz kızı olduğunu öğrenir. Raif Efendi, sevdiği kadının kendisine asla ihanet etmediğini anlayarak hayatının son günlerini bu acı gerçekle tamamlar.`,
  },
  {
    title: 'Saatleri Ayarlama Enstitüsü',
    author: 'Ahmet Hamdi Tanpınar',
    year: 1961,
    pages: 384,
    category: 'Klasikler',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/saatleri-ayarlama-enstitusu/4882.html',
    summary: `Orijinal Adı: Saatleri Ayarlama Enstitüsü
Yayıncı: Dergâh Yayınları (Türkiye Basım Yılı: 1961)
Sayfa Sayısı: 384 sayfa
Platform & Okur Puanı: 4.8 / 5

Saatleri Ayarlama Enstitüsü; Doğu ile Batı, gelenek ile modernleşme arasında bocalayan Türk toplumunun bürokratik absürtlüğünü ve zihniyet değişimini mizahi bir dille eleştiren anıtsal bir romandır.

Romanın kahramanı Hayri İrdal, çocukluğundan itibaren saat ustası Nuri Efendi'nin yanında yetişmiş, zaman ve saatlere tutkulu bir kimsedir. Cumhuriyet sonrası değişen toplumsal yapıda işsiz ve bocalayan Hayri İrdal, karizmatik ve pragmatik Halit Ayarcı ile tanışır.

Halit Ayarcı, topluma "zaman disiplini" getirmek bahanesiyle tamamen hayali ve lüzumsuz bir kurum olan "Saatleri Ayarlama Enstitüsü"nü kurar. Sokaktaki tüm saatlerin birbirine uymasını sağlama bahanesiyle cezalar kesen, içi boş şube ve müdürlükler ihdas eden enstitü, bürokrasinin ve modernleşme takıntısının sembolü haline gelir.

Enstitü uluslararası başarılar elde edip fonlar sağlarken, roman modernleşme adı altında üretilen mantıksızlığı ve Hayri İrdal'ın içsel çelişkilerini hicvederek sona erer.`,
  },
  {
    title: 'Yüzyıllık Yalnızlık',
    author: 'Gabriel García Márquez',
    year: 1967,
    pages: 464,
    category: 'Klasikler',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/yuzyillik-yalnizlik/10495.html',
    summary: `Orijinal Adı: Cien años de soledad
Yayıncı: Can Yayınları (Türkiye Basım Yılı: 1967)
Sayfa Sayısı: 464 sayfa
Platform & Okur Puanı: 4.8 / 5

Yüzyıllık Yalnızlık; Buendía ailesinin kurduğu kurgusal Macondo kasabasının kuruluşunu, yükselişini ve yüz yıllık bir yalnızlık döngüsünün ardından yok oluşunu anlatan büyülü gerçekçilik başyapıtıdır.

José Arcadio Buendía ve Ursula Iguarán çifti tarafından bataklıklar ortasında kurulan Macondo kasabası, Çingene Melquíades'in getirdiği icatlar ve doğaüstü olaylarla büyür. Ailenin nesiller boyu devam eden erkekleri (Aureliano ve José Arcadio isimlerini taşıyanlar) savaşlar, simya, aşk ve kehanetlerle dolu yalnız hayatlar sürerler.

Albay Aureliano Buendía'nın 32 iç savaş çıkarması, muz şirketi katliamı ve Macondo üzerine yıllarca yağan aralıksız yağmurlar kasabanın kaderini mühürler. Buendía soyu ensest korkusu ve yalnızlık lanetiyle sürüklenir.

Soyun son bireyi olan domuz kuyruklu bebeğin karıncalar tarafından yenmesiyle, Melquíades'in Sanskritçe yazılmış kehanet tomarı çözülür: Yüz yıllık yalnızlığa mahkûm edilen soyların ikinci bir şansı olmayacaktır ve Macondo kasabası bir kasırgayla yeryüzünden silinir.`,
  },
  {
    title: 'Bülbülü Öldürmek',
    author: 'Harper Lee',
    year: 1960,
    pages: 355,
    category: 'Klasikler',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/bulbulu-oldurmek/27330.html',
    summary: `Orijinal Adı: To Kill a Mockingbird
Yayıncı: Sel Yayıncılık (Türkiye Basım Yılı: 1960)
Sayfa Sayısı: 355 sayfa
Platform & Okur Puanı: 4.8 / 5

Bülbülü Öldürmek; 1930'ların Alabama eyaletinde, 8 yaşındaki Scout Finch'in gözünden ırkçılık, adalet, empati ve masumiyetin yitimini anlatan Pulitzer ödüllü başyapıttır.

Scout, ağabeyi Jem me avukat babaları Atticus Finch, küçük Maycomb kasabasında yaşamaktadır. İki kardeş, gizemli komşuları "Boo" Radley hakkındaki efsanelerle büyürler. Kasaba, beyaz bir kadına tecavüz etmekle suçlanan siyahi genç Tom Robinson'ın davasıyla çalkalanmaya başlar.

Atticus Finch, tüm kasabanın baskısına ve ırkçı tepkilerine rağmen Tom Robinson'ın savunmasını üstlenir. Mahkemede Tom'un suçsuz olduğunu, kadının ırkçı babası Bob Ewell tarafından şiddete uğradığını açıkça kanıtlamasına rağmen, jüri ön yargıları nedeniyle Tom'u suçlu bulur.

Dava sonrası intikam hırsıyla yanıp tutuşan Bob Ewell, cadılar bayramı gecesi Scout ve Jem'e saldırır. Çocukları ölümden kurtaran gizemli komşu Boo Radley olur. Atticus me Scout, hiçbir zararı olmayan bir canlıyı öldürmenin günah olduğunu ifade eden "Bülbülü öldürmek günahtır" fikriyle insanlığın ve adaletin anlamını kavrarlar.`,
  },
  {
    title: 'Uçurtma Avcısı',
    author: 'Khaled Hosseini',
    year: 2003,
    pages: 375,
    category: 'Roman',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/ucurtma-avcisi/55869.html',
    summary: `Orijinal Adı: The Kite Runner
Yayıncı: Everest Yayınları (Türkiye Basım Yılı: 2003)
Sayfa Sayısı: 375 sayfa
Platform & Okur Puanı: 4.8 / 5

Uçurtma Avcısı; Kabil'de büyüyen zengin bir zümreye mensup Emir ile onun sadık Hazara hizmetkârı Hasan arasındaki dostluk, ihanet me vicdan azabıyla örülü sarsıcı bir hikâyedir.

1975 yılındaki geleneksel uçurtma dövüşü turnuvasında Emir şampiyon olur. Hasan, Emir'in düşen son uçurtmasını yakalamak için koşar fakat sokak çetesi lideri Assef tarafından cinsel saldırıya uğrar. Korkaklığı yüzünden saklanan ve Hasan'a yardım edemeyen Emir, suçluluk duygusuyla Hasan'a hırsızlık iftirası atarak onun evden gönderilmesini sağlar.

Sovyet işgali üzerine Emir me babası Amerika'ya kaçar. Yıllar sonra Amerika'da yazar olan Emir, babasının kadim dostu Rahim Han'dan bir telefon alır: "Yeniden iyi biri olmak için bir yol var." Kabil'e dönen Emir, Hasan'ın aslında kendi öz üvey kardeşi olduğunu me Taliban tarafından öldürüldüğünü öğrenir.

Emir, Hasan'ın yetim kalan oğlu Sohrab'ı Taliban elindeki Assef'in zulmünden kurtarmak için hayatını tehlikeye atar. Sohrab'ı Amerika'ya getiren Emir, gökyüzünde uçurtma uçurarak geçmişindeki vicdan azabıyla yüzleşir ve bağışlanma yolculuğunu tamamlar.`,
  },
  {
    title: 'Otomatik Portakal',
    author: 'Anthony Burgess',
    year: 1962,
    pages: 176,
    category: 'Bilimkurgu',
    rating: 4.7,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/otomatik-portakal/27329.html',
    summary: `Orijinal Adı: A Clockwork Orange
Yayıncı: Türkiye İş Bankası Kültür Yayınları (Türkiye Basım Yılı: 1962)
Sayfa Sayısı: 176 sayfa
Platform & Okur Puanı: 4.7 / 5

Otomatik Portakal; şiddet bağımlısı genç Alex me çetesinin eylemleri üzerinden özgür irade, devlet kontrolü me kötülüğün doğasını sorgulayan kült distopyadır.

15 yaşındaki Alex, Beethoven tutkusu me "ultra-şiddet" takıntısıyla arkadaşlarıyla birlikte soygun me darp olaylarına karışır. Yaşlı bir kadının evini soyarken kadının ölümüne sebep olan Alex, çete arkadaşları tarafından polise ihbar edilir me 14 yıl hapse mahkûm edilir.

Alex, cezasını indirmek için devletin geliştirdiği "Ludovico Tekniği" adlı ıslah deneyine gönüllü olur. Bu yöntemde Alex'e şiddet görüntüleri izletilerek mide bulantısı me mide kasılması yaşatılır. Alex, artık şiddete me Beethoven müziğine karşı fiziksel olarak tiksinti duyan, kötülük yapma yeteneği elinden alınmış bir "otomatik portakala" dönüşür.

Tahliye edildikten sonra eski kurbanları me polis olan eski çete arkadaşları tarafından işkence gören Alex, intihara teşebbüs eder. Hastanede bilinci yerine geldiğinde devlet tekniği geri alır me Alex özgür iradesine me kötülük yapabilme potansiyeline yeniden kavuşur.`,
  },
  {
    title: 'Gülün Adı',
    author: 'Umberto Eco',
    year: 1980,
    pages: 672,
    category: 'Tarihi',
    rating: 4.8,
    isReadable: true,
    isPublished: false, // DRAFT
    coverUrl: '',
    buyUrl: 'https://www.kitapyurdu.com/kitap/gulun-adi/10008.html',
    summary: `Orijinal Adı: Il nome della rosa
Yayıncı: Can Yayınları (Türkiye Basım Yılı: 1980)
Sayfa Sayısı: 672 sayfa
Platform & Okur Puanı: 4.8 / 5

Gülün Adı; 1327 yılında İtalya'daki zengin bir Benedikten manastırında geçen, semiyoterapi, Hristiyan mezhep çatışmaları me cinayet sırlarıyla dolu anıtsal tarihi polisiye romanıdır.

Eski engizisyon yargıcı Baskerville'li William me çömezi Adso, Francisken me Papalık temsilcileri arasındaki yoksulluk tartışması toplantısı için manastıra gelirler. Ancak manastırda genç bir keşişin şüpheli ölümü üzerine Başrahip, William'dan olayı aydınlatmasını ister.

William me Adso, 7 gün boyunca devam eden me her gün bir başka keşişin zehirlenerek öldüğü gizemli cinayetleri soruşturur. İpuçları onları manastırın dünyanın en büyük kütüphanesi olan labirent biçimindeki kulesine götürür. Cinayetlerin odağında, Aristoteles'in kayıp olduğu sanılan me "komediyi me gülmeyi" savunan İkinci Şiir Sanatı kitabı yer almaktadır.

Manastırın kör me fanatik kütüphanecisi Jorge de Burgos'un, insanların dinle me tanrıyla dalga geçmesini engellemek için kitabın sayfalarını zehirlediği ortaya çıkar. Çıkan yangında dev kütüphane me kayıp kitap küllere dönerken, William me Adso hakikatin me bağnazlığın sınırlarını sorgulayarak manastırdan ayrılırlar.`,
  },
];

async function seed() {
  console.log('Seeding 10 NEW draft books into DB...');

  for (const book of NEW_DRAFT_BOOKS) {
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
        summary: book.summary,
        isReadable: book.isReadable,
        isPublished: false, // DRAFT MODE
        buyUrl: book.buyUrl,
        coverUrl: '', // Admin will set cover
      },
      create: {
        slug,
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        category: book.category,
        rating: book.rating,
        summary: book.summary,
        isReadable: book.isReadable,
        isPublished: false, // DRAFT MODE
        buyUrl: book.buyUrl,
        coverUrl: '', // Admin will set cover
      },
    });

    console.log(`✓ Seeded Draft: "${book.title}" by ${book.author} (${book.pages}p, ${book.year})`);
  }

  await prisma.$disconnect();
  console.log('\nSUCCESS! All 10 NEW draft books seeded into database cleanly.');
}

seed().catch(console.error);
