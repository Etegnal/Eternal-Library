import { prisma } from '../src/lib/prisma';

export const DUNE_AND_STORMLIGHT_BOOKS = [
  // --- DUNE SERİSİ (FRANK HERBERT) ---
  {
    slug: 'dune-1-dune',
    title: 'Dune (Dune Serisi 1. Cilt)',
    originalTitle: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    trYearPublisher: '2015 (İthaki Yayınları)',
    pages: 712,
    category: 'Bilimkurgu & Roman',
    rating: 4.7,
    ratingDetails: 'Goodreads: ~4.5/5, 1000Kitap: ~4.9/5',
    isReadable: false,
    isPublished: false, // Draft for admin review
    coverUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Dune
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2015)
Sayfa Sayısı: 712 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.7 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Uzak gelecekte, galaktik feodal bir imparatorluk hüküm sürmektedir. Evrenin en değerli kaynağı olan Baharat (Melanj), yalnızca "Dune" olarak bilinen çöl gezegeni Arrakis'te çıkarılmaktadır. Baharat, zihinsel kapasiteyi genişletmekte, uzaylar arası seyahati olanaklı kılmakta ve ömrü uzatmaktadır. İmparator Shaddam IV, Atreides Hanedanı'nın artan popülaritesinden çekindiği için Arrakis'in yönetimini Dük Leto Atreides'e devreder. Ancak bu hamle, Atreideslerin amansız düşmanı Harkonnen Hanedanı ile İmparator'un ortaklaşa kurduğu kanlı bir tuzaktır.

Arrakis'e yerleşen Dük Leto Atreides, Harkonnen baskını ve iç hain Dr. Yueh'in ihaneti sonucu hayatını kaybeder. Dük'ün cariyesi Bene Gesserit rahibesi Lady Jessica ve oğlu Paul Atreides, çölün derinliklerine kaçmayı başarırlar. Çölün yerli ve savaşçı halkı Fremenler ile karşılaşan Paul, Bene Gesserit ekimlerinin de etkisiyle Fremen efsanelerindeki kurtarıcı "Lisan al-Gaib" (Dışarıdan Gelen Ses) ve "Kwisatz Haderach" olarak kabul görmeye başlar.

Paul, çöl yaşamına uyum sağlar, Baharat'ın yoğun etkisine maruz kalarak geçmişi, geleceği ve tüm olasılıkları görme yetisini kazanır. Fremenlerin kültürünü benimseyerek "Muad'Dib" adını alır. Dev kum solucanlarını (Şeyh-Hulud) evcilleştirip sürmeyi öğrenen Paul, Fremen ordularını örgütleyerek Harkonnen ve İmparatorluk kuvvetlerine karşı büyük bir çöl gerilla savaşı başlatır.

Arrakeen şehrine düzenlenen destansı nihai taarruzda Paul, dev kum solucanlarının sırtında fırtınayla şehre girer. Harkonnen liderlerini etkisiz hale getirir ve İmparator Shaddam IV'ü tahttan çekilmeye zorlar. Prenses Irulan ile evlenerek galaktik tahta oturan Paul Muad'Dib, galaksiyi kasıp kavuracak engellenemez bir Fremen Cihadı'nın kapısını aralamış olur.

#### [EDİTÖR YORUMU]
Frank Herbert'ın Dune'u, bilimkurgu edebiyatının tartışmasız zirve noktası ve ekolojik/politik kurgunun anıtsal şaheseridir. Din, politika, ekoloji, insan evrimi ve feodal güç savaşlarını kusursuz bir katmanlılıkla işleyen eser, okuyucuya yalnızca bir uzay macerası değil, felsefi ve sosyolojik bir evren inşası sunmaktadır.

Kwisatz Haderach ve Muad'Dib mitosu üzerinden kahraman kurgusunu dekonstrükte eden Herbert, kurtarıcı figürlerin kitleleri sürükleyebileceği felaketleri cesurca sorgular. Edebi derinliği, zengin terminolojisi ve Arrakis'in nefes alan ekolojisiyle Dune, çağdaş edebiyatın en etkili klasiklerinden biridir.`,
  },
  {
    slug: 'dune-2-dune-mesihi',
    title: 'Dune Mesihi (Dune Serisi 2. Cilt)',
    originalTitle: 'Dune Messiah',
    author: 'Frank Herbert',
    year: 1969,
    trYearPublisher: '2016 (İthaki Yayınları)',
    pages: 304,
    category: 'Bilimkurgu & Politik',
    rating: 4.4,
    ratingDetails: 'Goodreads: ~4.1/5, 1000Kitap: ~4.7/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Dune Messiah
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2016)
Sayfa Sayısı: 304 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.4 / 5 (Goodreads: ~4.1/5, 1000Kitap: ~4.7/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Paul Atreides'in (Muad'Dib) tahta çıkışının üzerinden 12 yıl geçmiştir. Paul'ün adına başlatılan Fremen Cihadı galakside 61 milyardan fazla insanın ölümüne yol açmış, Paul istemeden tanrılaştırılmıştır. Kendi kehanetlerinin ve vizyonlarının tutsağı haline gelen Paul, kontrol edemediği bu kutsal savaşın vicdan azabıyla boğuşmaktadır.

Bene Gesserit, Lonca Dümencileri, Tleilaxu ve Paul'ün resmi eşi Prenses Irulan, Paul'ü devirmek için büyük bir komplo kurarlar. Tleilaxular, Paul'e öldürülen sadık dostu Duncan Idaho'nun klonu olan bir Ghola (Hayt) hediye ederler. Hayt'ın içine yerleştirilen gizli şartlanma, Paul'ün psikolojik yıkımını hedeflemektedir.

Paul'ün gerçek aşkı Chani hamiledir ancak Irulan'ın gizlice verdiği doğum kontrol zehirleri nedeniyle hayati tehlike altındadır. Chani, ikiz bebekleri Leto II ve Ghanima'yı dünyaya getirirken hayatını kaybeder. Sualtı nükleer bombasıyla gözleri kör edilen Paul, kehanet vizyonları sayesinde görmeye devam etse de ikizlerin doğumuyla vizyonlarının ötesindeki gelecekle karşılaşır.

Chani'nin ölümü üzerine Hayt (Duncan Idaho) eski anılarını hatırlayarak komploya karşı Paul'e sadakatini kanıtlar. Kör olan bir Fremen'in gelenek gereği çöle yürüyüp ölmesi kuralına uyan Paul Muad'Dib, ikizlerini kız kardeşi Alia'ya emanet ederek tek başına Arrakis çölünün derinliklerine yürür.

#### [EDİTÖR YORUMU]
Dune Mesihi, ilk kitabın kahramanlık mitini yıkan, sarsıcı ve trajik bir politik dökümdür. Frank Herbert, ilk kitapta okuyucunun bağ kurduğu "kurtarıcı mesih" figürünün kendi kehanet sisteminin içinde nasıl bir tutsağa dönüştüğünü usta işi bir psikolojik derinlikle sergiler.

Eser, iktidarın yozlaştırıcı doğasını, dinin siyasi bir araç haline geldiğinde yaratabileceği yıkımı ve kehanetlerin kader üzerindeki bağlayıcı yükünü sorgular. Trajik atmosferi ve yoğun diyaloglarıyla Dune üçlemesinin en olgun metinlerinden biridir.`,
  },
  {
    slug: 'dune-3-dune-cocuklari',
    title: 'Dune Çocukları (Dune Serisi 3. Cilt)',
    originalTitle: 'Children of Dune',
    author: 'Frank Herbert',
    year: 1976,
    trYearPublisher: '2016 (İthaki Yayınları)',
    pages: 536,
    category: 'Bilimkurgu & Epik',
    rating: 4.5,
    ratingDetails: 'Goodreads: ~4.2/5, 1000Kitap: ~4.8/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Children of Dune
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2016)
Sayfa Sayısı: 536 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.5 / 5 (Goodreads: ~4.2/5, 1000Kitap: ~4.8/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Paul Muad'Dib'in çöle yürüyüşünün üzerinden dokuz yıl geçmiştir. Arrakis, terraforming (yeşillendirme) projeleriyle yavaş yavaş çöl olmaktan çıkmakta, bu durum kum solucanlarının ve baharatın yok olma tehlikesini doğurmaktadır. Paul'ün kız kardeşi Alia, imparatorluk naibi olarak hüküm sürerken, ana rahminde baharata maruz kaldığı için atalarının genetik anılarının hücumuna uğrar ve merhum dedesi Baron Harkonnen'ın zihinsel ele geçirmesine (Abomination) yenik düşer.

Paul'ün ikiz çocukları Leto II ve Ghanima, teyzeleri Alia'nın deliliğini fark ederler. Leto II, insanlığın tek yok olmayacağı ve neslinin devamını sağlayacak olan çetin geleceği — "Altın Yol"u (Golden Path) vizyonlarında görür. Ancak Altrenatif yolda insanlığın mutlak yok oluşu beklemektedir. Leto II, babası Paul'ün bile almaktan çekindiği feda kararlarını almaya hazır olduğunu kavrar.

Leto II, Jacurutu çölünde kum solucanlarının lavraları (kum tropları) ile bedenini birleştirerek insanüstü dayanıklılığa, hıza ve zırha kavuşan symbiotik bir dönüşüm başlatır. Bu sırada çölden çıkan gözleri kör "Vaiz" adlı gizemli figürün aslında Paul Atreides olduğu ortaya çıkar. Paul, Alia'nın yozlaşmış din anlayışını ve kendi adına kurulan mabedi halkın önünde lanetler.

Alia'nın emriyle Paul öldürülür. Dönüşümünü tamamlayan Leto II, Arrakeen'e gelerek Alia'nın rejimini yıkar. Alia intihar eder. Leto II, insanlığı binlerce yıl sürecek olan otoriter ama koruyucu "Altın Yol" yönetimine hazırlamak üzere Tanrı İmparator olarak tahta geçer.

#### [EDİTÖR YORUMU]
Dune Çocukları, evrimin, genetik hafızanın ve insanlığın uzun vadeli bekasının felsefi sorgulamalarla derinleştiği muazzam bir devam halkasıdır. Leto II'nin kendi insanlığını feda ederek Altın Yol'u seçmesi, fantastik ve bilimkurgu edebiyatının en radikal fedakarlık arklarından biridir.

Arrakis'in ekolojik dönüşümünün gezegenin ruhunu nasıl etkilediği, dini fanatizmin devlete dönüşmesi ve genetik mirasın getirdiği psikolojik krizler son derece yetkin bir üslupla işlenir.`,
  },
  {
    slug: 'dune-4-dune-tanri-imparatoru',
    title: 'Dune Tanrı İmparatoru (Dune Serisi 4. Cilt)',
    originalTitle: 'God Emperor of Dune',
    author: 'Frank Herbert',
    year: 1981,
    trYearPublisher: '2017 (İthaki Yayınları)',
    pages: 552,
    category: 'Bilimkurgu & Felsefe',
    rating: 4.5,
    ratingDetails: 'Goodreads: ~4.2/5, 1000Kitap: ~4.8/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: God Emperor of Dune
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2017)
Sayfa Sayısı: 552 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.5 / 5 (Goodreads: ~4.2/5, 1000Kitap: ~4.8/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Leto II'nin tahta çıkışından bu yana 3.500 yıl geçmiştir. Leto, kum solucanıyla birleşmiş devasa bir hibrit yaratığa dönüşmüş, "Tanrı İmparator" olarak bilinen ölümsüz bir despot gibi evreni yönetmektedir. Arrakis tamamen yeşermiş, çöl ve dev kum solucanları yok olmuştur. Baharat stoku sadece Leto'nun elindedir ve bu stok sayesinde evreni mutlak bir Barış ("Leto Barışı") altında tutmaktadır.

Leto'nun amacı, "Altın Yol"un nihai hedefini gerçekleştirmektir: İnsanlığı kehanet vizyonlarıyla tespit edilemeyen ve tiranlıklara karşı sonsuza dek bağışıklık kazanan bir türe dönüştürmek. Bu amaçla Atreides soyunu titizlikle genetik ayıklamaya tabi tutar ve Siona Atreides adlı genç kadını yetiştirir. Siona, kehanet vizyonlarında görünmeyen ilk insandır.

Leto, Tleilaxulardan sürekli yeni Duncan Idaho gholaları sipariş eder. Son Duncan Idaho ve Siona, Tanrı İmparator'un tiranlığına karşı suikast planlarlar. Leto, kendi ölümünün Altın Yol'u tamamlayacağını bildiği için bu suikasta örtülü şekilde izin verir.

Leto II ve müstakbel eşi Hwi Noree'nin düğün alayı bir köprüden geçerken Siona ve Duncan köprüyü yıkar. Leto nehre düşer. Su, dev solucan bedenini çözer; Leto parçalanarak kum troplarına ayrışır ve Arrakis yeniden çöle dönmeye başlar. İnsanlık, Leto'nun tiranlığından kurtularak galaksinin dört bir yanına dağılacağı "Büyük Dağılma" (The Scattering) dönemini başlatır.

#### [EDİTÖR YORUMU]
Dune Tanrı İmparatoru, serinin felsefi, sosyolojik ve teolojik bakımdan en derin, en radikal kitabıdır. Neredeyse tamamen Leto II'nin günlükleri ve söyleşileri üzerinden ilerleyen roman, tiranlığın insanlık evrimindeki zorunlu rolünü sarsıcı bir mantıkla savunur.

Frank Herbert, durağanlaşan medeniyetlerin çöküşünü ve özgürlüğün ancak tiranlığın yaşattığı travmatik hafızayla korunabileceği tezini işler. Bilimkurgu edebiyatının en özgün zihinsel deneylerinden biridir.`,
  },
  {
    slug: 'dune-5-dune-sapkinlari',
    title: 'Dune Sapkınları (Dune Serisi 5. Cilt)',
    originalTitle: 'Heretics of Dune',
    author: 'Frank Herbert',
    year: 1984,
    trYearPublisher: '2017 (İthaki Yayınları)',
    pages: 608,
    category: 'Bilimkurgu & Distopya',
    rating: 4.4,
    ratingDetails: 'Goodreads: ~4.1/5, 1000Kitap: ~4.7/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Heretics of Dune
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2017)
Sayfa Sayısı: 608 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.4 / 5 (Goodreads: ~4.1/5, 1000Kitap: ~4.7/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Tanrı İmparator Leto II'nin ölümünün üzerinden 1500 yıl geçmiş, "Büyük Dağılma" ile evrenin uzak köşelerine yayılan insan toplulukları geri dönmeye başlanmıştır. Geri Dönenler arasında, Bene Gesserit'in karanlık ve acımasız bir versiyonu olan ve cinsellik yoluyla erkekleri zihinsel köle yapan "Honored Matres" (Kutsanmış Matralar) adlı tehlikeli bir örgüt bulunmaktadır.

Bene Gesserit Rahibeler Meclisi Baş Rahibesi Taraza ve Baş Rahibe adayı Darwi Odrade, evreni Honored Matres tehdidinden korumak için yeni bir strateji geliştirirler. Arrakis'te (artık Rakis olarak anılır) Sheeana adlı genç bir kızın dev kum solucanlarını emriyle kumanda edebildiği keşfedilir.

Aynı zamanda Tleilaxulardan son ve en mükemmel Duncan Idaho gholası eğitilmektedir. Baş Savaşçı Miles Teg, Duncan Idaho'yu korumak ve eğitmekle görevlendirilir. Honored Matres'in Rakis ve Bene Gesserit gezegenlerine düzenlediği saldırıda Miles Teg yakalanarak işkenceye uğrar; ancak bu işkence Teg'in genetik kilitlerini açarak ona zamanı yavaşlatma ve inanılmaz bir fiziksel hız/güç kazandırır.

Honored Matres, Rakis gezegenini nükleer ve termal silahlarla yakarak tüm gezegeni küle çevirir ve kum solucanlarını soykırıma uğratır. Ancak Darwi Odrade ve Sheeana, tek bir kum solucanını kaçırarak Bene Gesserit ana gezegeni Chapterhouse'a taşımayı başarırlar.

#### [EDİTÖR YORUMU]
Dune Sapkınları, serinin aksiyon ve ivmesinin yeniden tavan yaptığı, yeni güç odaklarının ve radikal dişi örgütlerin kapıştığı dinamik bir romandır. Miles Teg karakterinin süper-insan dönüşümü ve Honored Matres'in yıkıcı güç gösterisi olay örgüsünü sürekli canlı tutar.

Herbert, din ve güç kavramlarının evrimleşmiş formlarını incelemeye devam ederken, koruyucu dişi erki (Bene Gesserit) ile yıkıcı/yozlaşmış dişi erki (Honored Matres) karşı karşıya getirerek cinsellik, kontrol ve bağımlılık temalarını işler.`,
  },
  {
    slug: 'dune-6-dune-rahibeler-meclisi',
    title: 'Dune Rahibeler Meclisi (Dune Serisi 6. Cilt)',
    originalTitle: 'Chapterhouse: Dune',
    author: 'Frank Herbert',
    year: 1985,
    trYearPublisher: '2018 (İthaki Yayınları)',
    pages: 560,
    category: 'Bilimkurgu & Epik',
    rating: 4.4,
    ratingDetails: 'Goodreads: ~4.1/5, 1000Kitap: ~4.7/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Chapterhouse: Dune
Yayıncı: İthaki Yayınları (Türkiye Basım Yılı: 2018)
Sayfa Sayısı: 560 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.4 / 5 (Goodreads: ~4.1/5, 1000Kitap: ~4.7/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Rakis gezegeninin Honored Matres tarafından yok edilmesinin ardından Bene Gesserit'in elinde kalan son koz, Chapterhouse gezegenidir. Yeni Baş Rahibe Darwi Odrade, gezegeni hızla çölleştirerek kurtarılan tek kum solucanı sayesinde yeni bir Baharat döngüsü başlatmaya çalışmaktadır.

Honored Matres, Bene Gesserit kalesi olan gezegenleri birer birer yok ederek ilerlemektedir. Odrade, tutsak alınan Honored Matres lideri Murbella'yı hem bir Bene Gesserit rahibesi hem de bir Matra olarak eğitir. Murbella, Duncan Idaho ile yaşadığı derin bağ sayesinde iki örgütün tekniklerini bünyesinde birleştirir.

Bene Gesserit orduları, gholası yeniden diriltilen efsanevi Komutan Miles Teg önderliğinde Honored Matres merkezine karşı büyük bir karşı taarruz başlatır. Savaş sırasında Odrade öldürülür ancak Murbella hem Honored Matres liderliğini hem de Bene Gesserit Baş Rahibelik makamını ele geçirerek iki düşman yapıyı birleştirir.

Duncan Idaho, Sheeana, Miles Teg ve bir grup mülteci, kehanetlerin ve taramaların tespit edemeyeceği özel bir kovan uzay gemisine (no-ship) binerek galaksinin ve bilinen evrenin ötesine, bilinmeyene doğru kaçarlar. Frank Herbert'ın vefatı öncesi yazdığı son Dune eseri bu ucu açık kaçışla son bulur.

#### [EDİTÖR YORUMU]
Dune Rahibeler Meclisi, Frank Herbert'ın 1986'daki vefatından önce kaleme aldığı altı kitaplık orijinal Dune destanının son halkasıdır. Eser, kadın merkeziyetçi güç odaklarının felsefi mücadelesini ve kültürlerin hayatta kalma adaptasyonunu işler.

Murbella'nın iki zıt kutbu kendi şahsında birleştirmesi ve Duncan Idaho'nun bilinmeyen uzaya doğru çıktığı yolculuk, Herbert'ın evreninin sonsuz dönüşümünü sembolize eder. Bilimkurgu tarihinin en saygın külliyatının veda halkasıdır.`,
  },

  // --- FIRTINA IŞIĞI ARŞİVİ (BRANDON SANDERSON) ---
  {
    slug: 'firtina-isigi-1-krallarin-yolu',
    title: 'Kralların Yolu (Fırtına Işığı Arşivi 1. Cilt)',
    originalTitle: 'The Way of Kings',
    author: 'Brandon Sanderson',
    year: 2010,
    trYearPublisher: '2014 (Akıl Çelen Kitaplar)',
    pages: 1104,
    category: 'Epik Fantastik & Roman',
    rating: 4.9,
    ratingDetails: 'Goodreads: ~4.7/5, 1000Kitap: ~5.0/5',
    isReadable: false,
    isPublished: false, // Draft for admin review
    coverUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Way of Kings
Yayıncı: Akıl Çelen Kitaplar (Türkiye Basım Yılı: 2014)
Sayfa Sayısı: 1104 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.7/5, 1000Kitap: ~5.0/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Roshar, amansız Yüce Fırtınaların kasıp kavurduğu, kayalık ve çetin bir dünyadır. Yüzyıllar önce insanlığı koruyan Parlayan Şövalyeler, efsanevi Zırh ve Kılıçlarını (Zırhpeyk ve Kılıçpeyk) geride bırakarak sırra kadem basmıştır. Alethkar Kralı Gavilar'ın Parseşler tarafından suikasta uğramasının ardından Alethi yüksekprensleri, Parshandi halkına karşı Parçalanmış Ovalar'da yıllar sürecek kanlı bir İntikam Savaşı başlatırlar.

Eski bir asker ve tabip olan Kaladin, ihanete uğrayarak köleleştirilmiş ve Parçalanmış Ovalar'da "Köprü Dört" adlı intihar müfrezesine verilmiştir. Kaladin, yanındaki köle köprücüleri hayatta tutmak için direşirken, rüzgar spreni Sylphrena (Syl) ile bağ kurarak kadim Parlayan Şövalyelik güçlerini (Rüzgardüzeltici) yeniden uyandırmaya başlar.

Kralın amcası Yüksekprens Dalinar Kholin, Yüce Fırtınalar sırasında insanlığın mahvını ve kadim kehanetleri içeren vizyonlar görmeye başlar. Dalinar, prenslerin iç çekişmelerini bırakıp birleşmesi gerektiğine inanır ancak diğer lordlar tarafından delilikle suçlanır. Genç araştırmacı Shallan Davar ise ailesini iflastan kurtarmak için Kralın kız kardeşi Jasnah Kholin'in yanına çırak olarak girer ve "Ruhdöküm" büyüsünü keşfeder.

Parçalanmış Ovalar'daki büyük ihanet savaşında Dalinar Kholin kapana kısılır. Kaladin ve Köprü Dört, kendi özgürlükleri pahasına geri dönerek Dalinar'ın ordusunu yok olmaktan kurtarır. Dalinar, Kaladin'in köprücülerinin özgürlüğü için kendi paha biçilemez Kılıçpeyk'ini feda eder. Kaladin ve Dalinar, kadim tehdit "Hainlik" (Voidbringers) ve yaklaşan Ilıkfırtına'ya karşı omuz omuza verirler.

#### [EDİTÖR YORUMU]
Brandon Sanderson'ın Cosmere evreninin taç mücevheri olan Kralların Yolu, epik fantastik türünün modern dönemdeki en görkemli ve kusursuz başlangıç romanıdır. Roshar'ın ekolojik yapısı, spren ekosistemi ve büyü sistemi (Fırtınaışığı) eşsiz bir özgünlüğe sahiptir.

Kaladin'in depresyon ve travmayla mücadelesi, Dalinar'ın onur ve liderlik sınavı edebi bakımdan son derece sarsıcı işlenmiştir. "Ölümden önce hayat, zayıflıktan önce kuvvet, varıştan önce yolculuk" yemini, fantastik edebiyatın en ikonik motifi haline gelmiştir.`,
  },
  {
    slug: 'firtina-isigi-2-parlayan-sozler',
    title: 'Parlayan Sözler (Fırtına Işığı Arşivi 2. Cilt)',
    originalTitle: 'Words of Radiance',
    author: 'Brandon Sanderson',
    year: 2014,
    trYearPublisher: '2015 (Akıl Çelen Kitaplar)',
    pages: 1200,
    category: 'Epik Fantastik & Roman',
    rating: 5.0,
    ratingDetails: 'Goodreads: ~4.8/5, 1000Kitap: ~5.0/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Words of Radiance
Yayıncı: Akıl Çelen Kitaplar (Türkiye Basım Yılı: 2015)
Sayfa Sayısı: 1200 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 5.0 / 5 (Goodreads: ~4.8/5, 1000Kitap: ~5.0/5)

#### [TAM METİN OKUMA MODU - ÖZET]
Kaladin, Yüksekprens Dalinar Kholin'in şahsi muhafız birliğinin komutanı olmuştur. Ancak bir yandan gözbağlayıcı büyülü güçlerini geliştirmeye çalışırken diğer yandan Alethi soylularına duyduğu derin güvensizlikle boğuşur. Yüksekprens Amaram'ın geçmişteki ihanetini kanıtlamak ve Dalinar'ı korumak ana hedefidir.

Shallan Davar, gemi kazasının ardından Parçalanmış Ovalar'a ulaşır. Yalanörücü yeteneklerini ve desen spreni Pattern ile bağını derinleştirerek Dalinar'ın sarayında casusluk ve istihbarat ağını yönetmeye başlar. Efsanevi kayıp şehir Urithiru'nun yerini bulmak için araştırmalarını sürdürür.

Parshendi halkı, Alethi ordularına karşı hayatta kalabilmek için kadim ve tehlikeli "Fırtına Formu"nu kabul eder. Bu durum, dünyayı yok edecek olan efsanevi Ilıkfırtına'yı (Everstorm) çağırma ritüelini başlatır.

Parçalanmış Ovalar'daki devasa final savaşında Shallan, kadim ışınlanma geçidi Geçitağzı'nı (İşleniş Kapısı) aktif ederek ordunun hayatını kurtarır ve kayıp şehir Urithiru'ya geçiş sağlar. Kaladin, İkinci Yemin'i ederek Rüzgardüzeltici Şövalye olarak göklerde Szeth (Beyazlar İçindeki Suikastçı) ile destansı bir düelloya girer. Ilıkfırtına patlak verir ve Hainlik serbest kalır.

#### [EDİTÖR YORUMU]
Parlayan Sözler, kurgusal temposu, karakter gelişimleri ve dövüş sahneleriyle epik fantastik kurgunun başyapıt mertebesindeki ikinci cildidir. Shallan'ın geçmişindeki karanlık sırların ortaya çıkışı ve Kaladin'in arenas sahnesindeki "Kralın koruması benim!" haykırışı unutulmazdır.

Sanderson, Roshar dünyasının tarihini ve Cosmere evreninin derinliklerini muazzam bir ustalıkla genişletir. Düello sahneleri ve finaldeki fırtına savaşı fantastik edebiyat tarihinin en heyecan verici bölümlerindendir.`,
  },
  {
    slug: 'firtina-isigi-3-ogedusuren',
    title: 'Ogedüşüren (Fırtına Işığı Arşivi 3. Cilt)',
    originalTitle: 'Oathbringer',
    author: 'Brandon Sanderson',
    year: 2017,
    trYearPublisher: '2018 (Akıl Çelen Kitaplar)',
    pages: 1320,
    category: 'Epik Fantastik & Roman',
    rating: 4.9,
    ratingDetails: 'Goodreads: ~4.6/5, 1000Kitap: ~5.0/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Oathbringer
Yayıncı: Akıl Çelen Kitaplar (Türkiye Basım Yılı: 2018)
Sayfa Sayısı: 1320 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.6/5, 1000Kitap: ~5.0/5)

#### [TAM METİN OKUMA MODU - ÖZET]
İnsanlık ve Parlayan Şövalyeler, dağların tepesindeki kadim Urithiru şehrine sığınmışlardır. Ancak Ilıkfırtına tüm Roshar'da esmekte, dünyadaki köle Parseşler serbest kalarak Hainlik ordusuna katılmaktadır. Dalinar Kholin, tüm insan krallıklarını Odium'un (Nefret) yıkıcı gücüne karşı bir koalisyonda birleştirmek için diplomasi yürütür.

Bu ciltte Dalinar'ın kanlı geçmişi — "Rift Yakanı" olarak yaptığı katliamlar ve eşi Evi'yi kazara diri diri yakışının trajik anıları — üzerindeki unutkanlık büyüsünün kalkmasıyla gün yüzüne çıkar. Odium, Dalinar'ın bu suçluluk duygusunu kullanarak onu kendi şampiyonu yapmaya çalışır.

Kaladin, memleketi Taşçalar'a dönerek Parseşlerin de aslında kandırılmış bir halk olduğunu kavrar. Shallan, çoklu kişilik bozuklukları (Veil ve Radiant) arasında zihinsel kırılmalar yaşar. Şövalyeler, Gölgediyar (Shadeamar) rüya/spren dünyasına geçerek Urithiru'nun kapılarını savunmak için tehlikeli bir yolculuğa çıkarlar.

Thaylen Alanı Savaşı'nda Odium, Dalinar'a acılarını kendisine devretmesini söyler. Ancak Dalinar, "En önemli adım bir sonraki adımdır!" diyerek tüm acılarının sorumluluğunu üstlenir ve Üçüncü Yemin'i eder. Dalinar, Gerçekliği birleştirerek Büyücü Şövalye (Perdebağlayan) olarak parlak bir zafer kazanır.

#### [EDİTÖR YORUMU]
Ogedüşüren, Dalinar Kholin'in günahları, vicdanı ve reddedişi üzerinden yükselen edebi bir trajedi ve redemption (arınma) şaheseridir. Dalinar'ın geçmişiyle yüzleştiği Thaylen Alanı sahnesi, fantezi kurgunun en ilham verici anlarındandır.

Sanderson, savaşın her iki tarafındaki trajediyi (insanlar ve Parseşler) eşit insani derinlikle işleyerek "iyi-kötü" dikotomisini aşar. Cosmere evrensel büyü kurallarının en kapsamlı sergilendiği kitaptır.`,
  },
  {
    slug: 'firtina-isigi-4-ritimlerin-savasi',
    title: 'Ritimlerin Savaşı (Fırtına Işığı Arşivi 4. Cilt)',
    originalTitle: 'Rhythm of War',
    author: 'Brandon Sanderson',
    year: 2020,
    trYearPublisher: '2021 (Akıl Çelen Kitaplar)',
    pages: 1360,
    category: 'Epik Fantastik & Roman',
    rating: 4.8,
    ratingDetails: 'Goodreads: ~4.5/5, 1000Kitap: ~4.9/5',
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Rhythm of War
Yayıncı: Akıl Çelen Kitaplar (Türkiye Basım Yılı: 2021)
Sayfa Sayısı: 1360 sayfa (Doğrulanan kaynak: Kitapyurdu / BKM Kitap)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

#### [TAM METİN OKUMA MODU - ÖZET]
İnsanlar ve Odium güçleri arasındaki savaş bir teknoloji ve bilim yarışına dönüşmüştür. Navani Kholin ve Parseş bilim insanı Raboniel, Fırtınaışığı, Boşlukışığı ve Işık ritimleri üzerindeki büyülü-bilimsel (Fabrial) sırları çözmek için zihinsel bir yarışa girerler. Savaşın ortasında Raboniel liderliğindeki Fused güçleri, Urithiru şehrini işgal ederek kulenin koruyucu spreni Kardeş'i uyutur ve tüm Parlayan Şövalyeleri komaya sokar.

Ağır Travma Sonrası Stres Bozukluğu (TSSB) yaşayan ve şövalyelik görevinden çekilen Kaladin, komadaki şövalyeleri ve kulenin sivillerini korumak için tek başına bir "Zor Ölüm" (Die Hard) tarzı gerilla direnişi başlatır. Kaladin, kuponsuz tek şövalye olarak gölgelerde savaşır.

Adolin Kholin ve Shallan, Onursprenlerinin desteğini almak üzere Düzensizlik diyarı Lasting Integrity'ye elçilik heyeti olarak giderler. Adolin, kılıçpeykinin ölmemiş bir spren (Maya) olduğunu ve Parlayan Şövalyelerin geçmişteki "Aharietiam" ihanetinin ardındaki gerçekleri mahkemede kanıtlar.

Kaladin, babasının ve dostlarının hayatı tehlikedeyken dördüncü İdeali ("Kurtaramayacaklarımı kabul edeceğim") ederek Zırhpeyk'ini kazanır ve Raboniel'i mağlup ederek Urithiru'yu kurtarır. Odium'un taşıyıcısı Rayse, Taravangian tarafından suikasta uğrar ve Taravangian yeni Odium haline gelir. Dalinar, yeni Odium ile 10 gün sonra gerçekleşecek Şampiyonlar Düellosu için anlaşma yapar.

#### [EDİTÖR YORUMU]
Ritimlerin Savaşı, büyülü bilimin, zihinsel sağlık temalarının (TSSB ve depresyon) ve klostrofobik şehir savunmasının harmanlandığı muazzam bir dördüncü kitaptır. Kaladin'in dördüncü yemini ve Navani'nin bilimsel aydınlanması öne çıkar.

Taravangian'ın Odium tahtını ele geçirmesi, serinin gelecek kitapları için muazzam bir ters köşe ve tehdit seviyesi yaratır. Sanderson, büyü sistemlerinin bilimsel mantığını epik kurguyla kusursuz birleştirmiştir.`,
  },
];

async function main() {
  console.log('Seeding 10 Dune & Stormlight Archive books as DRAFTS into PostgreSQL DB...');
  let count = 0;
  for (const book of DUNE_AND_STORMLIGHT_BOOKS) {
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
  console.log(`Successfully seeded ${count} Dune & Stormlight books as DRAFTS in DB!`);
}

main().catch(console.error).finally(() => process.exit());
