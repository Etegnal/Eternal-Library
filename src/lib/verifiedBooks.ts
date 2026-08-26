export interface VerifiedBook {
  slug: string;
  title: string;
  author: string;
  year: number; // MÖ 375 -> -375
  displayYear: string;
  pages: number;
  category: string;
  summary: string;
  rating: number;
  isReadable: boolean;
  coverUrl: string;
  fullPages?: string[]; // Full text multi-page chapter data
}

export const verifiedBooksData: VerifiedBook[] = [
  {
    slug: 'devlet',
    title: 'Devlet',
    author: 'Platon',
    year: -375,
    displayYear: 'MÖ 375',
    pages: 370,
    category: 'Felsefe & Politika',
    summary: 'Adaletin doğası, ideal toplum düzeni, yöneticilerin nitelikleri ve Mağara Benzetmesi üzerinden bilginin ve varoluşun sorgulandığı felsefe tarihinin temel kurucu metni.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'kendime-dusunceler',
    title: 'Kendime Düşünceler',
    author: 'Marcus Aurelius',
    year: 180,
    displayYear: '180',
    pages: 160,
    category: 'Felsefe & Stoa',
    summary: 'Roma İmparatoru ve Stoacı filozof Marcus Aurelius’un cephelerde kendisiyle yaptığı içsel konuşmalar, erdem, dayanıklılık ve evrensel düzen üzerine özlü notlar.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'denemeler',
    title: 'Denemeler',
    author: 'Montaigne',
    year: 1580,
    displayYear: '1580',
    pages: 320,
    category: 'Deneme & Felsefe',
    summary: 'İnsan doğası, dostluk, ölüm, okuma sevgisi ve yalnızlık üzerine Montaigne’in samimi ve sorgulayıcı üslubuyla kaleme aldığı modern deneme türünün öncüsü.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'don-kisot',
    title: 'Don Kişot',
    author: 'Cervantes',
    year: 1605,
    displayYear: '1605',
    pages: 1000,
    category: 'Roman & Klasik',
    summary: 'Şövalye romanlarının etkisiyle yollara düşen Don Kişot ile sadık yaveri Sancho Panza’nın hayal ile gerçek arasındaki trajikomik serüveni ve modern romanın doğuşu.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'suc-ve-ceza',
    title: 'Suç ve Ceza',
    author: 'Dostoyevski',
    year: 1866,
    displayYear: '1866',
    pages: 680,
    category: 'Roman & Psikoloji',
    summary: 'Raskolnikov’un vicdanı, ahlakı ve adalet fikrini sınamak için işlediği cinayetin ardından yaşadığı derin psikolojik bunalım ve ruhsal arınma süreci.',
    rating: 5.0,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'karamazov-kardesler',
    title: 'Karamazov Kardeşler',
    author: 'Dostoyevski',
    year: 1880,
    displayYear: '1880',
    pages: 840,
    category: 'Roman & Felsefe',
    summary: 'Baba Fyodor Karamazov ve farklı mizaçtaki oğulları üzerinden inanç, özgür irade, baba katli ve insan ruhunun karanlık derinliklerinin muazzam anatomisi.',
    rating: 5.0,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'beyaz-geceler',
    title: 'Beyaz Geceler',
    author: 'Dostoyevski',
    year: 1848,
    displayYear: '1848',
    pages: 80,
    category: 'Klasik & Roman',
    summary: 'St. Petersburg’un mehtaplı beyaz gecelerinde yalnız bir hayalperest ile Nastenka’nın beş aşamalı sevdalı ve hüzünlü karşılaşması.',
    rating: 4.7,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `BİRİNCİ GECE: Karşılaşma

St. Petersburg'da harika bir geceydi; çocukluğumdan beri öylesine güzel bir gece görmemiştim. Gökyüzü o kadar yıldızlı, o kadar aydınlıktı ki, ona bakan insan ister istemez kendi kendine soruyordu: Böyle bir gökyüzünün altında kötü huylu, huysuz insanlar nasıl yaşayabilir? Bu soru tam anlamıyla gençlik işi bir sorudur dostum, ama dilerim Tanrı sizin de ruhunuza sık sık böyle sorular fısıldasın...

Ben yalnız bir insandım. Yıllardır bu kentin sokaklarında tek başıma yürür, evlerin yüzlerini, pencerelerini tanırdım. Evler bile benimle konuşurdu sanki. Biri derdi ki: "Bugün sarıya boyanıyorum!", öteki: "Yarın restorasyona giriyorum!" 

İşte o gece, Nevski Bulvarı'nda yürürken hüzünlü bir kız gördüm. Kanal kıyısındaki korkuluklara dayanmış, başını nehrin karanlık sularına eğmiş sessizce ağlıyordu. Yanına yaklaşmaya cesaret edemedim önce. Fakat biraz sonra caddeden geçen sarhoş bir adam kıza laf atıp onu rahatsız etmeye başlayınca hemen araya girdim. Adamı uzaklaştırdım. Kız koluma tutundu.

İşte Nastenka ile ilk karşılaşmamız böyle oldu. O gece boyunca birbirimize hayatlarımızı anlattık. O, anneannesiyle yaşayan ve sevdiği adamı bekleyen masum bir ruhtu. Bense sadece hayallerinde yaşayan, gerçek dünyayı teğet geçen bir hülyaperest...`,

      `BİRİNCİ GECE (Devamı): Hayalperestin İtirafı

Nastenka bana sordu: "Siz kimsiniz? Ne iş yaparsınız?"

Ona dedim ki: "Ben bir hayalperestim Nastenka! Hayalperest öyle bir varlıktır ki, insan sayılmaz artık; o nötr bir yaratıktır. Genellikle odasının bir köşesine çekilir, dış dünyadan kopar. Kendi zihninde saraylar kurar, şiirler yazar, hiç tanışmadığı kadınlara aşık olur.

Benim hiç gerçek dostum olmadı Nastenka. İnsanlarla nasıl konuşulacağını bile bilmem. Sokaklarda yürürken insanları izlerim, onların sevinçlerine ve kederlerine uzaktan ortak olurum. Ama evime döndüğümde, o karanlık ve nemli odamda yalnızlığımla baş başa kalırım. 

Bu gece sizinle konuşurken ilk kez kanımın damarlarımda akışını hissettim. İlk kez gerçek bir insanın sesini duyuyorum ve gözlerine bakıyorum."

Nastenka gözlerini bana dikti, hafifçe gülümsedi ve elini elimin üzerine koydu: "Siz çok iyi bir insansınız," dedi. "Sizinle dost olacağız!"`,

      `İKİNCİ GECE: Nastenka'nın Hikayesi

Sözleştiğimiz gibi ertesi gece yine aynı saatte kanal kıyısında buluştuk. Nastenka bana dedi ki: "Bana aşık olmayacaksın, söz ver! Sadece dost olacağız. Çünkü kalbim başkasına ait."

Oysa kalbim onun her cümlesiyle biraz daha fazla çarpıyordu. Nastenka kendi hikayesini anlatmaya başladı:

"Anneannem kördür benim. Beni korumak için elbisesinin eteğini kendi elbisesine çengelli iğneyle iğnelerdi. Bütün gün o küçük odada oturur, ona kitap okurdum. Hayatım tekdüze ve renksizdi.

Derken evimizin üst katındaki küçük odaya yeni bir kiracı geldi. Genç, fakir ama gururlu bir öğrenciydi. Bana kitaplar getirmeye başladı: Walter Scott, Puşkin... İğnelendiğim o koltuktan zihnimin kanatlarıyla uçmaya başladım. O gence aşık oldum. Annem fark etmeden ona mektuplar yazdım."`,

      `İKİNCİ GECE (Devamı): Söz ve Bekleyiş

"Bir gün genç adam yanıma geldi ve Moskova'ya gitmek zorunda olduğunu söyledi. Orada iş bulup para kazanacak, durumunu düzeltecekti. Bana dedi ki: 'Nastenka, tam bir yıl sonra bugün buraya dönüp seni isteyeceğim. Eğer beni hala seviyorsan benimle evlenirsin.'

O günün üzerinden tam bir yıl geçti. Dün gece o yıldı Nastenka! O genç adam St. Petersburg'a döndü, biliyorum. Ama üç gündür buradayım, ne yanıma geldi ne de bir mektup yolladı. 

İşte dünkü ağlayışım bundandı dostum. Beni unuttu mu acaba? Başka birini mi sevdi?"

Onun gözlerindeki hüzün benim kalbimi dilim dilim kesti. "Ona bir mektup yazalım," dedim. "Ben senin mektubunu ona ulaştırırım. Belki de bir engeli çıkmıştır, seni unutması imkansız!" Nastenka sevinçle boynuma sarıldı.`,

      `ÜÇÜNCÜ GECE: Mektup ve Umutsuzluk

Üçüncü gece hava biraz bulutluydu, içimdeki hüzün gibi. Nastenka mektubu yazdığını ve bir tanıdık vasıtasıyla gence ilettiğini söyledi.

"Bu gece yanıt gelecektir," diyordu heyecanla. "Saat dokuzda kanal kıyısında olacağını söyledi."

Saat dokuz oldu, dokuzu çeyrek geçti, dokuz yarım oldu... Kimse gelmedi. Nastenka'nın yüzündeki o canlı umut ışığı yavaş yavaş söndü. Gözlerinden yaşlar süzülmeye başladı.

"Neden gelmiyor?" diye haykırdı. "Beni unuttu işte! Ben onu böyle severken o benim acımı umursamıyor!"

Onu teselli etmeye çalıştım: "Yarın gelecektir Nastenka, mutlaka geçerli bir sebebi vardır!" Ama içten içe biliyordum ki, eğer o adam Nastenka gibi saf bir ruhu bekletiyorsa, dünyadaki en gaddar insandı.`,

      `DÖRDÜNCÜ GECE: İtiraf

Dördüncü gece Nastenka tamamen umudunu kesmişti. Ağlayarak bana döndü: "Artık onu sevmiyorum!" dedi. "Beni böyle yüzüstü bırakan bir adam için gözyaşı dökmeyeceğim. Sen bana ondan bin kat daha iyisin. Beni içtenlikle seven, acımı paylaşan tek insan sensin."

O an kendimi tutamadım. Bütün duygularımı döktüm:

"Nastenka! Ben seni ilk gördüğüm andan beri seviyorum! Senin için canımı vermeye hazırım. Senden hiçbir şey talep etmiyorum, sadece yanında olmama, seni korumama izin ver!"

Nastenka şaşırdı, gözleri doldu. "Ben de seni seveceğim," dedi. "Kalbimdeki o eski yarayı saracaksın. Birlikte yaşayacağız!" El ele tutuştuk. Hayatımda ilk kez kendimi bir hayalperest değil, yaşayan bir insan olarak hissettim.`,

      `SON SABAH VE VEDA

Tam o an, karanlığın içinden bir gölge yavaşça yaklaşmaya başladı. Genç bir adam silueti belirdi.

Nastenka aniden donakaldı. Adama baktı, sonra bana baktı. "O!" diye bağırdı. Sevinç çığlığı atarak benim elimi bıraktı ve o adamın kollarına koştu. Adam onu kucakladı, öptü.

Nastenka bir an durdu, bana doğru geri koştu. Boynuma sarıldı, beni yanağımdan öptü: "Beni bağışla! Seni hep bir kardeş gibi seveceğim, beni unutma!" dedi. Sonra o adamın koluna girip gecenin karanlığında kayboldu.

Ertesi sabah odamda uyandığımda St. Petersburg daha soğuk, odam daha karanlıktı. Masamda Nastenka'nın bıraktığı veda mektubu duruyordu. Ama ona kırgın değildim. Bana yaşattığı o dört gecelik mutluluk için ona minnettardım.

Bütün bir ömür için tek bir anlık tam mutluluk yetmez mi insan ruhuna? Tanrım, o tek anlık mutluluk için sana şükürler olsun!`
    ]
  },
  {
    slug: 'sefiller',
    title: 'Sefiller',
    author: 'Victor Hugo',
    year: 1862,
    displayYear: '1862',
    pages: 1400,
    category: 'Roman & Klasik',
    summary: 'Bir somun ekmek çaldığı için 19 yıl hapis yatan Jean Valjean’ın vicdan, adalet, merhamet ve Cosette’e duyduğu babalık sevgisi etrafında 19. yüzyıl Fransa’sının görkemli panoraması.',
    rating: 5.0,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'bir-idam-mahkumunun-son-gunu',
    title: 'Bir İdam Mahkumunun Son Günü',
    author: 'Victor Hugo',
    year: 1829,
    displayYear: '1829',
    pages: 120,
    category: 'Klasik & Roman',
    summary: 'Ölüm cezasına çarptırılan bir mahkumun infaz saatine kadar hücresinde hissettiği korku, umut, çaresizlik ve insanlık onurunun idam cezasına karşı güçlü başkaldırısı.',
    rating: 4.8,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. GECE VE BİCETRE ZİNDANI

İdam mahkûmu!

Beş haftadan beri bu düşünceyle yaşıyorum; her an bu fikirle baş başayım, onun soğuk ağırlığı altında eziliyorum. Eskiden zihnim genç ve zengindi; fantezilerle, çiçeklerle, genç kadınlarla dolu hayaller kurardım. Şimdiyse tutsağım. Bedenim bir zindanda zincirlenmiş, zihnim ise tek bir düşüncenin parmaklıkları arkasında: İdam mahkûmu!

Bicêtre cezaevinin taş duvarları soğuk ve nemli. Dışarıda güneş açıyor olabilir, kuşlar ötüyor olabilir ama burada zaman sadece giyotinin giyotine yaklaşan adımlarıyla ölçülüyor. Neden ben? Bir anlık bir öfke, bir talihsizlik yüzünden bir insanın hayatına son vermek hangi adaletin kuralıdır?`,

      `2. YARGILAMA VE KARAR ANISINI HATIRLAMA

Oğustos ayının o sıcak sabahını hatırlıyorum. Mahkeme salonu ağzına kadar doluydu. Yargıçlar, jüri üyeleri, avukatlar... Hepsi sıcak havada yelpazeleniyor, sabırsızlıkla kararın okunmasını bekliyordu.

Karar açıklandı: "Ölüm!"

O an etrafımdaki tüm sesler kesildi. Hakimlerin yüzleri buz gibi soğudu. Salondaki kalabalık mırıltıyla dışarı döküldü. Bense celladın eline teslim edilecek bir et parçası haline gelmiştim. Beni ölüme mahkum eden insanlar akşam evlerine gidip çocuklarını öpecekler, yemek yiyeceklerdi. Oysa benim için dünya o salonda durmuştu.`,

      `3. HÜCREDEKİ DUVAR YAZILARI

Hücremin taş duvarları benden önceki mahkumların kazıdığı isimlerle ve tarihlerle dolu. Bir köşede "Lemaire - 1815", öbür köşede "Papavoine" yazıyor. Hepsi bu yoldan geçti. Hepsi giyotinin o soğuk bıçağının altında can verdi.

Ben de isimlerimi o taşlara kazıdım. Belki benden sonra buraya atılacak bir baksana, ölüme giderken yalnız olmadığını hatırlatır. 

İnsan öldürmek günahsa, devletin yasal kılıf altında bir insanı koyun gibi boğazlaması nasıl adalet sayılabilir?`,

      `4. KÜÇÜK KIZIM MARIE'NİN ZİYARETİ

Giyotin hazırlıkları başlamadan önce küçük kızım Marie'yi ziyaretime getirdiler. Üç yaşındaki melek yüzlü kızım... 

Onu kucağıma aldım, öptüm, kokladım. Ama o bana baktı ve mırıldandı: "Siz benim babam değilsiniz, babam gökyüzünde!"

Kendi öz çocuğum bile beni tanıyamadı artık. İçimdeki son yaşam kırıntısı da o an yok oldu. Beni öldüren şey giyotin bıçağı değil, kızımın o yabancı bakışları oldu.`,

      `5. SON SAATLER VE GREVE MEYDANI

Saat dört. Arabaya bindirildim. Greve Meydanı'na doğru ilerliyoruz. Sokaklar meraklı kalabalıklarla dolu; bir insanın ölüme gidişini bir tiyatro oyunu gibi izlemeye gelmişler.

Cellat arkamda duruyor. Merdivenleri çıkıyorum. Gökyüzüne son bir kez bakıyorum. Yaşamak ne kadar güzelmiş meğer... Kuşların sesi, rüzgarın dokunuşu... Hepsini ne kadar kolay gözden çıkarıyoruz. 

Bıçak yukarıda parıldıyor. Ve son nefesimde haykırıyorum: Merhamet! Ama insanlık duymaz adalet tiyatrosunun gürültüsünde...`
    ]
  },
  {
    slug: 'insan-ne-ile-yasar',
    title: 'İnsan Ne İle Yaşar?',
    author: 'Tolstoy',
    year: 1885,
    displayYear: '1885',
    pages: 64,
    category: 'Öykü & Klasik',
    summary: 'Yeryüzüne sürgün edilen Melek Mikail’in üç temel gerçeği öğrenme yolculuğu: İnsanda ne vardır, insana ne verilmemiştir ve insan ne ile yaşar?',
    rating: 4.9,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Yoksul Kunduracı Semen

Yoksul bir kunduracı olan Semen, karısı Matryona ve çocuklarıyla birlikte küçük bir köy evinde yaşardı. Kendi evi bile yoktu, kirada kalıyorlardı. Semen'in tek bir eski kürkü vardı, o da karısıyla ortak kullanılıyordu.

Bir kış günü Semen, koyun derisi almak için kasabaya gitti fakat alacaklılardan parasını toplayamadığı için koyun derisini alamadan köye dönmek zorunda kaldı. Yolda cebindeki son kopeklerle biraz şarap içti, içi ısındı ama eli boş eve dönmenin hüznüyle yürüyordu.`,

      `2. BÖLÜM: Kilise Duvarındaki Yabancı

Köyün dışındaki küçük kilisenin yanından geçerken duvarın dibinde beyaz bir şey gördü. Yaklaştığında, dondurucu soğukta çıplak ve hareketsiz yatan genç bir adam fark etti. 

Semen önce korktu: "Belki bir soyguncudur ya da başıma belaya sokar," diye düşünüp hızla uzaklaşmaya çalıştı. Fakat birkaç adım attıktan sonra vicdanı el vermedi. "Utan kendinden Semen!" dedi kendi kendine. Geri döndü, üzerindeki eski kürkünü çıkarıp adama giydirdi, kendi çizmelerini ona verdi ve onu kolundan tutup evine getirdi.`,

      `3. BÖLÜM: Matryona'nın Öfkesi ve Yumuşaması

Karısı Matryona evde çocuklara verecek ekmek bile yokken Semen'in eli boş ve üstelik yanında çıplak bir yabancıyla eve geldiğini görünce öfkeden çılgına döndü. Semen'e bağırdı, yabancıya hakaret etti.

Semen sakince karısının gözlerine baktı ve dedi ki: "Matryona, Tanrı aşkına söyle, sende hiç Tanrı korkusu ve merhamet yok mu?"

Bu sözler üzerine Matryona'nın yüreği aniden yumuşadı. Utandı. Masaya son ekmek kırıntılarını ve çorbayı koydu. Yabancıya kendi elleriyle yemek verdi. O an yabancı adam ilk kez gülümsedi ve yüzünden ilahi bir ışık saçıldı.`,

      `4. BÖLÜM: Mikail'in İşe Başlaması

Görünüşte sessiz ve garip olan bu adamın adı Mikail'di. Nereden geldiğini, kim olduğunu söylemiyordu. Semen onu yanına çırak olarak aldı. 

Mikail inanılmaz bir el çabukluğuna sahipti. Bir kez gösterilen dikişi hemen öğreniyor, diktiği çizmeler kentin en sağlam çizmeleri oluyordu. Çevreden insanlar sadece Mikail'in diktiği çizmeleri almak için Semen'in dükkanına akın etmeye başladı. Semen'in durumu düzeldi, zenginleşti.`,

      `5. BÖLÜM: Zengin Beyin Çizmeleri

Aradan beş yıl geçti. Bir gün dükkanın önüne görkemli bir atlı araba yanaştı. İçinden devasa cüsseli, gururlu zengin bir bey indi. Yanında pahalı bir Alman derisi getirmişti.

Bey masaya deriyi vurup dedi ki: "Bu deriden bana öyle bir çizme dikeceksiniz ki, bir yıl boyunca ne yırtılacak ne de şekli bozulacak! Eğer bir yıldan önce bozulursa sizi hapse attırırım!"

Semen korktu, bu sorumluluğu almaktan çekindi. Fakat Mikail öne çıktı, deriyi kabul etti. Bey gittikten sonra Mikail deriyi ölçtü ama çizme dikmek yerine deriyi kesti ve bir kefen patiği dikmeye başladı. Semen bunu görünce dehşete düştü: "Ne yaptın sen Mikail! Mahvolduk!" dedi.`,

      `6. BÖLÜM: Ölüm Haberi

Semen henüz şaşkınlığını atlatamamışken, akşamüstü beyin uşağı at sırtında kan ter içinde dükkana geri geldi.

Uşak dedi ki: "Usta, çizmeleri dikmeyi bırakın. Beyimiz eve dönerken arabada ansızın kriz geçirdi ve öldü. Hanımım dedi ki: 'Cesete giydirmek için hafif deriden bir patik diksinler.' Eğer başladıysanız patik yapın."

Mikail diktiği patikleri uşağa teslim etti ve yüzünde ikinci kez ilahi bir tebessüm belirdi.`,

      `7. BÖLÜM: İkiz Yetimler

Yıllar sonra bir kadın dükkana iki küçük kız çocuğuyla geldi. Kızlardan birinin bacağı aksıyordu. Kadın ikizler için sağlam ayakkabılar istedi.

Matryona kadınla sohbet ederken öğrendi ki, bu çocuklar kadının öz çocukları değildi. Komşusu olan anne doğumda ölmüş, kadın bu iki yetime kendi çocukları gibi bakıp büyütmüştü.

Mikail çocuklara ve kadına baktı, gözlerinden yaşlar süzüldü ve yüzünde üçüncü kez görkemli bir tebessüm belirdi. Kadınlar gittikten sonra dükkan ilahi bir ışıkla doldu.`,

      `8. BÖLÜM: Meleğin İtirafı ve Üç Gerçek

Mikail üzerindeki eski giysileri çıkardı; vücudundan güneş gibi bir ışık yayılmaya başladı. Semen ve Matryona korkuyla diz çöktüler.

Mikail dedi ki: "Ben Tanrı'nın bir meleğiyim. İkiz çocukları doğuran o kadının ruhunu almakla görevlendirilmiştim. Fakat kadının 'Bebeklerim yetim kalır' diye ağlamasına kıyamayıp ruhunu almadan göğe döndüm. Tanrı bana dedi ki: 'Git ve yeryüzünde üç gerçeği öğreninceye kadar kal:

1. İnsanda ne vardır?
2. İnsana ne verilmemiştir?
3. İnsan ne ile yaşar?'"`,

      `9. BÖLÜM: Üç Gerçeğin Açıklanması

"1. Matryona bana öfkelenip sonra merhamet gösterdiğinde öğrendim ki: **İnsanda sevgi vardır.**

2. Zengin bey bir yıllık çizme isterken birkaç saat sonra öleceğini bilmiyordu. Orada öğrendim ki: **İnsana kendi geleceğini ve neye ihtiyacı olduğunu bilme yetisi verilmemiştir.**

3. İkiz yetimleri öz çocuğu gibi büyüten o kadını gördüğümde öğrendim ki: **İnsan kendi kaygılarıyla değil, Tanrı'nın kalplerine koyduğu sevgi ile yaşar.**"

Bu sözlerin ardından Mikail göğe doğru yükseldi, melek kanatları açıldı ve ilahi bir ezgi eşliğinde gökyüzünde kayboldu.`
    ]
  },
  {
    slug: 'donusum',
    title: 'Dönüşüm',
    author: 'Franz Kafka',
    year: 1915,
    displayYear: '1915',
    pages: 80,
    category: 'Klasik & Modernizm',
    summary: 'Gregor Samsa’nın bir sabah kendini dev bir böceğe dönüşmüş olarak bulmasıyla başlayan, yabancılaşma, aile içi çıkar ilişkileri ve modern insanın yalnızlık tragedyası.',
    rating: 4.9,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1509021436468-d51039746b42?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `BÖLÜM 1: Uyanış ve Böcek

Gregor Samsa bir sabah huzursuz düşlerden uyandığında, kendini yatağında devasa bir böceğe dönüşmüş olarak buldu. Zırh gibi sertleşmiş sırtının üzerinde yatıyordu; kafasını biraz kaldırdığında kahverengi, kubbemsi, sert şeritlerle bölünmüş karnını gördü. Karnının tepesinde yorgan neredeyse tamamen kaymak üzereydi. Çok sayıda, bedeninin geri kalanına göre acınacak kadar ince bacakları gözlerinin önünde çaresizce çırpınıyordu.

"Bana ne oldu böyle?" diye düşündü. Bu bir düş değildi. Odası, biraz küçükçe ama gerçek bir insan odasıydı.

Duvara asılı duran kürk kasketli ve kürk etollü kadının resmi yerinde duruyordu. Gregor gözlerini pencereye çevirdi; kasvetli hava (sinekliğin sacına vuran yağmur damlalarının sesi duyuluyordu) onu iyice hüzünlendirdi. "Biraz daha uyusam da bütün bu saçmalıkları unutsam nasıl olur?" diye düşündü. Ama bu imkansızdı, çünkü sağ yanına yatma alışkanlığı vardı ve şu anki durumunda bu duruma geçmesi mümkün değildi.`,

      `BÖLÜM 1 (Devamı): İşe Geç Kalış ve Temsilci

Saat altı buçuktu ve çalar saat çalmaya devam ediyordu. Gregor ticaret firmasında gezici tezgahtar olarak çalışıyordu. Babasının eski borçlarını ödemek ve kız kardeşi Grete'yi konservatuvara gönderebilmek için bu nefret ettiği işte gece gündüz çalışmak zorundaydı.

Kapının ardında annesi ve babası sırayla ona sesleniyor, treni kaçırıp kaçırmadığını soruyorlardı. Gregor yanıt vermeye çalıştı ama sesinin arasından cırtlak, insan dışı bir gıcırtı çıkıyordu.

Derken dış kapı çaldı: Şirket temsilcisi eve kadar gelmişti! Şirket yönetimi Gregor'un bir saatlik gecikmesini bile hırsızlık veya şüpheyle karşılıyordu. Gregor yataktan yuvarlanarak kapıya doğru süründü.`,

      `BÖLÜM 1 (Devamı): Kapının Açılışı

Gregor kilidi çenesi ve ağzıyla açmaya çalışırken ağzından kahverengi bir sıvı aktı. Sonunda kilit açıldı ve kapı aralandı.

Dışarıdakilerin çığlığı evi kapladı! Şirket temsilcisi elini ağzına götürerek dehşet içinde geriledi. Annesi dizlerinin üzerine çöküp ellerini yüzüne kapattı. Babası ise gözlerinde öfke ve kinsizlikle elindeki bastonu ve gazeteyi sallayarak Gregor'u odasına kovaladı.

Gregor kapı esnetmesinde sıkıştı, kabukları kanadı ve babasının arkadan attığı bir tekmeyle odasına yuvarlanıp hapsedildi. Kapı arkasından kilitlendi.`,

      `BÖLÜM 2: Kız Kardeş ve Süt

Gregor uyandığında akşam olmuştu. Odasına hafif bir ışık sızıyordu. Kapının yanına konulmuş taze süt ve ekmek dilimlerini fark etti. Normalde süte bayılırdı ama taze süt ona iğrenç geldi.

Ertesi gün kız kardeşi Grete odaya girdi. Sütün içilmediğini görünce onu alıp yerine çürümüş sebzeler, küflü peynirler ve eski kemik parçaları getirdi. Gregor bu çürümüş yiyecekleri büyük bir iştahla yedi.

Grete her gün abisinin odasına giriyor, pencereyi açıyor ve çöpleri temizliyordu. Ancak abisinin iğrenç görüntüsünü görmemek için onun kanepenin altına saklanmasını bekliyordu.`,

      `BÖLÜM 2 (Devamı): Odadaki Mobilyalar

Geçen haftalar içinde Gregor tavanlarda ve duvarlarda tırmanma yeteneğini keşfetti. Tavanda baş aşağı durmak ona büyük bir özgürlük hissi veriyordu.

Bunu fark eden Grete, annesiyle birlikte Gregor'un odasındaki mobilyaları boşaltmaya karar verdi. Böylece Gregor rahatça tırmanabilecekti. Fakat mobilyalar çıkarılırken Gregor insani geçmişinin tek tek yok edildiğini hissetti.

Duvardaki kürk etollü kadının resmini korumak için resmin üzerine tırmandı ve göğsünü cama dayadı. Annesi odaya girip böceğin resmi kapladığını görünce bayıldı.`,

      `BÖLÜM 2 (Devamı): Elma Yaralanması

O sırada eve dönen baba, kızının "Gregor kaçtı!" çığlığını duyunca öfkeye kapıldı. Banka üniformasını giymiş olan baba, masadaki elmaları alıp Gregor'a fırlatmaya başladı.

Elmalardan biri Gregor'un sırtına saplandı ve etine gömüldü. Bu ağır yara Gregor'un hareket kabiliyetini tamamen kısıtladı. Haftalarca sırtında çürüyen elmayla yatağında acı içinde yattı.`,

      `BÖLÜM 3: Kiracılar ve Keman Sesi

Aile geçimini sağlayabilmek için evin odalarından birini üç sert sakallı kiracıya kiralamıştı. Gregor artık odasında tamamen yalnızdı, eşyalar depolama alanı gibi odasına yığılmıştı.

Bir akşam kız kardeşi Grete salonda kiracılara keman çalmaya başladı. Kemanın büyüleyici melodisi Gregor'un ruhuna dokundu. "Eğer bir hayvan olsaydım müzik beni böyle derinden etkiler miydi?" diye düşündü.

Gregor keman çalan kardeşinin elbisesini çekip onu odasına davet etmek için salona doğru süzüldü. Kiracılar böceği görünce tiksintiyle bağırıp kira ödemeden evi terk edeceklerini bildirdiler.`,

      `BÖLÜM 3 (Devamı): Grete'nin Kararı ve Son

Kız kardeşi Grete gözyaşları içinde anne babasına haykırdı:

"Ondan kurtulmalıyız! Başka yolu yok! O yaratığın Gregor olduğunu düşünmeyi bırakmalısınız. Eğer o gerçekten Gregor olsaydı, insanların böyle bir mahlukla yaşayamayacağını anlar ve kendiliğinden giderdi!"

Gregor bu sözleri duydu. Odasına geri sürüklendi. Kapı arkasından kilitlendi. Karanlıkta sabaha kadar düşündü. Ailesine karşı duyduğu tek şey sonsuz bir sevgi ve acımaydı.

Şafak vakti sökerken Gregor Samsa son nefesini verdi. Hizmetçi kadın sabah onun cansız bedenini süpürgeyle çöpe attığında, aile rahat bir nefes alıp kıra gezintisine çıkma kararı aldı.`
    ]
  },
  {
    slug: '1984',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    displayYear: '1949',
    pages: 330,
    category: 'Distopya & Roman',
    summary: 'Büyük Birader’in her anı gözetlediği, Gerçek Bakanlığı’nın geçmişi yeniden yazdığı ve düşünce suçunun ölümle cezalandırıldığı totaliter bir dünya kabusu.',
    rating: 5.0,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'hayvan-ciftligi',
    title: 'Hayvan Çiftliği',
    author: 'George Orwell',
    year: 1945,
    displayYear: '1945',
    pages: 150,
    category: 'Distopya & Hiciv',
    summary: 'İnsan sömürüsüne karşı başkaldırıp yönetimi ele geçiren çiftlik hayvanlarının, domuzların liderliğinde zamanla eski zalim efendilerine dönüşmesinin çarpıcı fablı.',
    rating: 4.9,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `BÖLÜM 1: Koca Reis'in Konuşması ve Düşü

Beylik Çiftlik'in sahibi Bay Jones sızıp uyuduğunda, ihtiyar domuz Koca Reis tüm hayvanları büyük samanlıkta topladı.

Koca Reis hayvanlara seslendi: "Yoldaşlar! Hayatımızın ne olduğunu gözden geçirelim: Ömrümüz sefalet ve kölelik içinde geçiyor. İnsan, üretmeden tüketen tek yaratıktır! Sütümüzü alır, yumurtalarımızı çalar, yaşlandığımızda bizi boğazlar! Bütün kötülüklerin kaynağı insandır. İnsanı ortadan kaldırın, açlık ve kölelik sonsuza dek bitsin!"

Koca Reis rüyasında duyduğu *İngiltere'nin Hayvanları* şarkısını öğretti. Bütün hayvanlar coşkuyla bağırmaya başladı.`,

      `BÖLÜM 2: Ayaklanma ve Yedi Emir

Koca Reis birkaç gün sonra öldü. Zeki iki genç domuz olan Snowball ve Napoleon onun fikirlerini "Hayvancılık" adı altında sistemleştirdiler.

Bir gün Bay Jones hayvanları yemlemeyi unutunca hayvanlar dayanamayıp ambarın kapısını kırdı. Bay Jones ve adamları kamçılarıyla müdahale etmek istedi ama hayvanlar güç birliği yaparak insanları çiftlikten kovaladı.

Çiftliğin adı **Hayvan Çiftliği** yapıldı. Snowball duvara Yedi Emir'i yazdı:
1. İki ayak üstünde yürüyen herkes düşmandır.
2. Dört ayak üstünde yürüyen veya kanatları olan herkes dosttur.
3. Hiçbir hayvan giysi giymeyecektir.
4. Hiçbir hayvan yatakta yatmayacaktır.
5. Hiçbir hayvan içki içmeyecektir.
6. Hiçbir hayvan başka bir hayvanı öldürmeyecektir.
7. Bütün hayvanlar eşittir.`,

      `BÖLÜM 3: Ağıl Savaşı ve Yel Değirmeni

İlk yıl ürünler bollukla toplandı. Sadık at Boxer "Daha çok çalışacağım!" ve "Napoleon her zaman haklıdır!" parolalarıyla gecesini gündüzüne katıyordu.

Snowball çiftliği modernize etmek için bir yel değirmeni projesi çizdi. Ancak Napoleon bu projeye karşı çıktı.

Yel değirmeni oylamasında Snowball muazzam bir konuşma yaparken, Napoleon gizlice büyüttüğü dokuz azgın köpeği salona saldırtıp Snowball'u ölümden zor kurtararak çiftlikten sürdü.`,

      `BÖLÜM 4: Propaganda ve İnfazlar

Snowball gittikten sonra Napoleon değirmen projesini kendi fikriymiş gibi yürütmeye başladı. Sözcü domuz Squealer halka dedi ki: "Snowball bir haindi, Bay Jones'un ajanıydı!"

Napoleon emirlere uymayan domuz ve tavukları köpeklerine boğazlattı. Altıncı Emir yavaşça değiştirildi:
* "Hiçbir hayvan başka bir hayvanı **sebepsiz yere** öldürmeyecektir."

Domuzlar çiftlik evine taşındı. Dördüncü Emir değiştirildi:
* "Hiçbir hayvan yatakta **çarşaflı** yatmayacaktır."`,

      `BÖLÜM 5: Boxer'ın Sonu ve Son Dönüşüm

Yel değirmeni bir fırtınada yıkıldı ama suç Snowball'a atıldı. Sadık at Boxer ağır taşları taşırken ciğerini patlattı ve sakatlandı.

Napoleon, Boxer'ı tedavi ettirme bahnesiyle bir arabaya bindirdi. Arabanın üzerinde "Kesimhane ve Tutkal Fabrikası" yazıyordu. Boxer kurtulmaya çalıştı ama gücü yetmedi. Squealer ertesi gün Boxer'ın hastanede huzur içinde öldüğünü yalanını söyledi ve o gece domuzlar Boxer'ın satışından gelen parayla viski alemi yaptılar.

Yıllar geçti. Yedi Emir silindi. Yerine tek bir kural yazıldı:
**"BÜTÜN HAYVANLAR EŞİTTİR, AMA BAZI HAYVANLAR ÖTEKİLERDEN DAHA EŞİTTİR."**

İnsan komşular domuzların evine davet edildi. Pencereden içeri bakan hayvanlar domuzların yüzüne ve insanların yüzüne baktılar; ama hangisinin insan hangisinin domuz olduğunu ayırt edemiyorlardı.`
    ]
  },
  {
    slug: 'yabanci',
    title: 'Yabancı',
    author: 'Albert Camus',
    year: 1942,
    displayYear: '1942',
    pages: 110,
    category: 'Felsefe & Varoluşçuluk',
    summary: 'Meursault’nun annesinin ölümüne ve işlediği cinayete karşı gösterdiği duygusal kayıtsızlık üzerinden toplumsal normların ve varoluşun absürtlüğü.',
    rating: 4.8,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Annenin Ölümü

"Bugün annem öldü. Belki de dün, bilmiyorum. Huzurevinden bir telgraf aldım: 'Anneniz vefat etti. Cenaze yarın. Derin taziyelerimizle.' Bu pek bir şey ifade etmiyor. Belki de dün ölmüştür."

Cezayir'de yaşayan sıradan bir büro memuru olan Meursault, Marengo'daki bakımevine gitti. Annesinin tabutunu açtırmadı, cenaze nöbetinde kahve içip sigara yaktı. Ağlamadı.

Ertesi gün Cezayir'e döndü. Eski iş arkadaşı Marie ile karşılaştı, birlikte denize girdiler, komedi filmi izlediler ve geceyi birlikte geçirdiler. Meursault için yaşam anlık duyusal deneyimlerden ibaretti.`,

      `2. BÖLÜM: Sahildeki Cinayet

Bir pazar günü Meursault, Marie ve komşusu Raymond ile birlikte sahildeki bir kulübeye gittiler. Raymond'un husumetli olduğu Arap bir grup onları takip ediyordu.

Sahilde kavga çıktı, Raymond yaralandı. Meursault silahı eline alıp yalnız başına kayalıklara yürüdü. Güneş alnına bir bıçak gibi saplanıyordu, ter gözlerini yakıyordu.

Karşısında duran Arap bıçağını çıkardı. Güneş ışığı bıçağın çeliğinden yansıyıp Meursault'nun gözünü aldı. Meursault tetiğe bastı. Adam düştü. Ardından kurşunun sessizliği bozduğunu bilerek cansız bedene dört kez daha ateş etti.`,

      `3. BÖLÜM: Mahkeme ve İdam

Meursault tutuklandı. Mahkemede yargıçlar cinayetin nedeninden çok, annesinin cenazesinde ağlamamış olmasını ve ertesi gün komedi filmine gitmesini sorguladılar.

Savcı haykırdı: "Bu adam annesinin ölümüne kayıtsız kalmış bir canavardır!" Toplum yalan söylemeyi ve yapmacık duygular sergilemeyi reddeden Meursault'yu cezalandırmak istiyordu.

İdam cezasına çarptırıldı. Hücresine gelen rahibin din telkinlerini öfkeyle reddetti. Dünyanın şefkatli umursamazlığına kendini açtı ve infaz gününde kalabalığın nefret dolu çığlıklarıyla karşılanmayı diledi.`
    ]
  },
  {
    slug: 'veba',
    title: 'Veba',
    author: 'Albert Camus',
    year: 1947,
    displayYear: '1947',
    pages: 300,
    category: 'Roman & Felsefe',
    summary: 'Oran kentini kuşatan veba salgını karşısında Doktor Rieux ve bir avuç insanın dayanışması, umutsuzluk içinde direnişi ve kötülüğe karşı ahlaki mücadelesi.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'satranc',
    title: 'Satranç',
    author: 'Stefan Zweig',
    year: 1942,
    displayYear: '1942',
    pages: 80,
    category: 'Klasik & Psikoloji',
    summary: 'Gestapo hücresindeki mutlak yalnızlıktan çalınmış bir satranç kitabıyla kurtulmaya çalışan Dr. B’nin, dünya şampiyonu Czentovic ile gemideki nefes kesen zihinsel düellosu.',
    rating: 5.0,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Mirko Czentovic ve Gemi

New York'tan Buenos Aires'e gitmekte olan büyük bir okyanus gemisinde, dünya satranç şampiyonu Mirko Czentovic de bulunmaktaydı. Czentovic, çocukluğundan itibaren zihinsel olarak oldukça ağır hareket eden, kaba ve satranç dışında hiçbir entelektüel ilgisi olmayan tuhaf bir dahiydi.

Gemideki hırslı milyarder McConnor, Czentovic ile parası karşılığında bir gösteri maçı yapmak istedi. Czentovic kabul etti ve gemideki amatör oyuncuların tamamını aynı anda zahmetsizce mağlup etti.`,

      `2. BÖLÜM: Dr. B'nin Sahneye Çıkışı

İkinci gösteri maçında Czentovic amatör grubu tam köşeye sıkıştırmışken, kalabalığın arasından zayıf, solgun bir adam (Dr. B.) öne atıldı:

"Durun! Vezir'i oraya oynarsanız üç hamlede mat olursunuz! Atı c4'e çekmelisiniz!"

Dr. B'nin yönlendirmesiyle hamleler yapıldı ve dünya şampiyonu beklenmedik bir şekilde berabere kalmaya zorlandı. Czentovic şaşkınlıkla dedi ki: "Bu beyefendi bana karşı tek başına oynamalı!"`,

      `3. BÖLÜM: Hücre Yalnızlığı ve Satranç Kitabı

Dr. B. hikayesini gemideki anlatıcıya itiraf etti: Viyana'da Avusturya krallığının mal varlığını yöneten bir avukattı. Gestapo onu tutuklamış ve tek bir mobilyanın, saatin veya kitabın bulunmadığı bir otel odasında mutlak tecride mahkûm etmişti.

Aylar süren zihinsel işkence altında aklını kaybetmek üzereydi. Bir gün sorgu sırasını beklerken bir paltodan küçük bir kitap çaldı. Bu kitap ünlü ustaların 150 şampiyonluk maçını içeriyordu.`,

      `4. BÖLÜM: Zihinsel Yarılma (Satranç Humması)

Dr. B. odasında ekmek kırıntılarından ve kareden yapılmış örtüden taşlar yaparak 150 maçı yüzlerce kez oynadı. Ezberledikten sonra taşları bıraktı ve zihninde oynamaya başladı.

Fakat zamanla zihni ikiye bölündü: Beyaz Dr. B. ve Siyah Dr. B.! Zihni sürekli kendi kendine karşı savaşıyor, uyumasına bile izin vermiyordu. Bu "Satranç Humması" krizi sonucu krize girdi, hastaneye kaldırıldı ve hekiminin yardımıyla serbest bırakıldı.`,

      `5. BÖLÜM: Son Maç ve Veda

Gemide Czentovic ile ilk maçı Dr. B. muazzam bir zekayla kazandı. Ancak ikinci maçta Czentovic onun sabırsızlığını fark edip hamlelerini kasıtlı olarak çok yavaş yapmaya başladı.

Dr. B'nin zihnindeki eski hücre kabusu yeniden canlandı. Taşları yanlış yerlerde görmeye başladı. Tehlikeyi fark eden Dr. B. tahtadan kalktı: "Beni bağışlayın, satrançla işim bitti," diyerek sonsuza dek tahtadan uzaklaştı.`
    ]
  },
  {
    slug: 'bilinmeyen-bir-kadinin-mektubu',
    title: 'Bilinmeyen Bir Kadının Mektubu',
    author: 'Stefan Zweig',
    year: 1922,
    displayYear: '1922',
    pages: 60,
    category: 'Klasik & Roman',
    summary: 'Viyanalı ünlü bir yazara ömrü boyunca karşılıksız ve gizli bir tutkuyla bağlı kalan bir kadının, çocuğunun ölümünün ardından ölmeden önce yazdığı sarsıcı itiraf mektubu.',
    rating: 4.9,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: İtiraf Mektubu

"Sana, beni hiç tanımamış olan sana!

Çocuğum dün öldü... Şimdiyse bu dünyada tek başıma kaldım. Sana bu mektubu yazıyorum çünkü beni dinleyecek başka kimsem yok. Bu mektubu eline aldığında ben de ölmüş olacağım.

Henüz on üç yaşında küçük bir kızken komşumuz oldun. Senin kapından giren kitap kokularını, şıklığını, gülüşünü izlerdim. Sen benim tek dünyam oldun. Büyüdüm, başka şehirlere gittim ama kalbim hep senin Viyana'daki kapının önünde kaldı."`,

      `2. BÖLÜM: Karşılaşmalar

"Yıllar sonra Viyana'ya döndüm. Gece kulüplerinde, sokaklarda karşına çıktım. Beni evine götürdün, geceler geçirdik. Ama sen beni hiçbir zaman o eski küçük komşu kızı olarak tanımadın! Beni sadece bir gecelik güzel bir kadın sandın.

Senden bir çocuğum oldu. Onu senden tek bir kuruş istemeden, lekesiz büyüttüm. Ama dün difteriden öldü... Şimdi ben de gidiyorum."`,

      `3. BÖLÜM: Beyaz Güller ve Son

"Masanda duran beyaz gülleri her doğum gününde sana yollayan bendim. Artık bu yıl güller gelmeyecek.

Beni hiç tanımayan sana sonsuz sevgilerimle..."

Yazar mektubu bitirdiğinde elleri titriyordu. Vazodaki beyaz güllere baktı ve belirsiz bir hayalin anısını hatırlamaya çalıştı ama hatırlayamadı.`
    ]
  },
  {
    slug: 'olaganustu-bir-gece',
    title: 'Olağanüstü Bir Gece',
    author: 'Stefan Zweig',
    year: 1922,
    displayYear: '1922',
    pages: 75,
    category: 'Klasik & Psikoloji',
    summary: 'Duygusal olarak hissizleşmiş zengin bir aristokratın, hipodromda işlediği küçük bir hırsızlıkla uyanan vicdanı ve insanlığa dönüşünün sürükleyici hikayesi.',
    rating: 4.7,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Hissizlik ve Hipodrom

Viyana burjuvazisinin zengin ve kaygısız bir üyesiydim. Hayatta her şeye sahiptim ama hiçbir şeyden heyecan duymuyordum. İçimde derin bir hissizlik, buz gibi bir kabuk oluşmuştu.

Bir pazar günü hipodromda yarış izlerken yanımda duran adamın düşürdüğü kuponu bilerek ayağımın altına aldım ve cebime attım. Zengindim, paraya ihtiyacım yoktu ama bu küçük suç içimde aniden bir heyecan kıvılcımı çaktı.`,

      `2. BÖLÜM: Gece Gezintisi ve İnsanlığa Dönüş

O gece kentin en karanlık sokaklarında yürüdüm. Hırsızlık yapmanın verdiği suçluluk duygusu beni insanlara yaklaştırdı. Yoksul insanlara yardım etmeye, cebimdeki tüm parayı tanımadığım insanlara dağıtmaya başladım.

İçimdeki buz dağı erimişti. İlk kez başka insanların acısını ve sevincini hissedebiliyordum. O gece hayatımın dönüm noktası oldu.`
    ]
  },
  {
    slug: 'altinci-kogus',
    title: 'Altıncı Koğuş',
    author: 'Anton Çehov',
    year: 1892,
    displayYear: '1892',
    pages: 72,
    category: 'Klasik & Öykü',
    summary: 'Taşra hastanesinin akıl hastalıkları koğuşundaki felsefi akıl hastası İvan Gromov ile Doktor Ragin’in zihinsel tartışmaları ve doktorun zamanla deli muamelesi görmesi.',
    rating: 4.9,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Altıncı Koğuş ve Sakinleri

Kasaba hastanesinin arka bahçesindeki küçük, bakımsız binada Altıncı Koğuş yer alıyordu. Burası akıl hastalarının kaldığı, pis kokulu ve bakımsız bir yerdi.

Koğuş sakinlerinden biri İvan Dmitriç Gromov'du. Eski bir zabıt katibi olan Gromov, zulüm görme hezeyanları yaşıyordu. Felsefeye son derece meraklıydı.`,

      `2. BÖLÜM: Doktor Ragin ve Tartışmalar

Hastanenin başhekimi Andrey Yefimıç Ragin, kasabanın cehaletinden bıkmış bir Stoacıydı. Bir gün koğuşa girip Gromov ile konuşmaya başladı.

Gromov ona dedi ki: "Siz sıcak odanızda oturup 'Acı sadece bir algıdır' diyorsunuz. Parmağınızı kapıya sıkıştırın da bakalım acı algı mıymış!" Doktor Ragin kasabada konuşabildiği tek zeki insanın bu deli olduğunu anladı.`,

      `3. BÖLÜM: Trajik Son

Doktorun her gün bir deliyle saatlerce konuşması kasabada dedikoduya yol açtı. Doktorun çıldırdığına karar verip onu görevden aldılar.

Sonunda meslektaşları Ragin'i kandırarak Altıncı Koğuş'a bir hasta olarak kapattılar. Ragin gardiyan Nikita'nın dayağını yediğinde gerçek acıyı anladı ve ertesi gün felç geçirerek öldü.`
    ]
  },
  {
    slug: 'insanin-anlam-arayisi',
    title: 'İnsanın Anlam Arayışı',
    author: 'Viktor Frankl',
    year: 1946,
    displayYear: '1946',
    pages: 160,
    category: 'Psikoloji & Felsefe',
    summary: 'Nazi toplama kamplarından sağ kurtulan psikiyatrist Frankl’ın Logoterapi kuramı: "Yaşamak için bir nedeni olan insan, her türlü nasıla katlanabilir."',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'siddhartha',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    year: 1922,
    displayYear: '1922',
    pages: 148,
    category: 'Felsefe & Roman',
    summary: 'Hindistan’da genç bir Brahman’ın öz aydınlanmasını aramak için inzivaya, zevk dünyasına ve nihayetinde bir kayıkçının nehir kenarındaki bilgeliğine uzanan arayışı.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'bozkirkurdu',
    title: 'Bozkırkurdu',
    author: 'Hermann Hesse',
    year: 1927,
    displayYear: '1927',
    pages: 240,
    category: 'Felsefe & Roman',
    summary: 'Harry Haller’in içindeki insan tarafı ile ilkel bozkırkurdu tarafı arasındaki ölümcül çatışma ve Büyülü Tiyatro’da gülmeyi öğrenme deneyimi.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'kucuk-prens',
    title: 'Küçük Prens',
    author: 'Saint-Exupéry',
    year: 1943,
    displayYear: '1943',
    pages: 96,
    category: 'Klasik & Felsefe',
    summary: 'Sahra Çölü’ne düşen bir pilot ile B-612 asteroidinden gelen Küçük Prens’in dostluk, gül, tilki ve yetişkinlerin sığ dünyası üzerine zamansız masalı.',
    rating: 5.0,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. BÖLÜM: Çöl ve Küçük Prens

Sahra Çölü'ne uçağım arızalandığı için inmek zorunda kalmıştım. Yanımda sadece bir haftalık içme suyu vardı.

İlk sabah şafak vakti tuhaf bir sesle uyandım: "Lütfen... Bana bir koyun çizer misin?"

Gözlerimi ovuşturdum. Karşımda altın sarısı saçlı, olağanüstü küçük bir prens duruyordu. Ona boğa yılanının fili yuttuğu çizimimi gösterdim, yetişkinlerin aksine o hemen tanıdı: "Hayır! Ben fil yutmuş bir boğa yılanı istemiyorum, bana bir koyun çiz!"`,

      `2. BÖLÜM: Gül ve Gezegenler

Küçük Prens B-612 adlı küçük bir asteroidden geliyordu. Gezegeninde tek bir özel gül vardı. Ama Küçük Prens gezegenleri gezerken Kral, Kibirli, Sarhoş ve İşadamı gibi sığ yetişkinlerle karşılaştı.

Dünya'da binlerce gül gördüğünde çiçeğinin eşsiz olmadığını sanıp ağladı.`,

      `3. BÖLÜM: Tilki ve Veda

O sırada bir tilki çıktı karşısına. "Beni evcilleştir!" dedi tilki. "Evcilleştirmek bağlar kurmak demektir."

Ve tilki ona en büyük sırrı verdi: **"İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez."**

Küçük Prens çiçeğine dönmek için yılanın dokunuşunu kabul etti. Yıldızlara baktığımda onun kahkahasını duyacağımı söyledi.`
    ]
  },
  {
    slug: 'yasam-bilgeligi-uzerine-aforizmalar',
    title: 'Yaşam Bilgeliği Üzerine Aforizmalar',
    author: 'Schopenhauer',
    year: 1851,
    displayYear: '1851',
    pages: 230,
    category: 'Felsefe',
    summary: 'İnsanın ne olduğu, neye sahip olduğu ve neyi temsil ettiği üzerine Schopenhauer’in karamsar ama bir o kadar pratik yaşam bilgeliği rehberi.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'simyaci',
    title: 'Simyacı',
    author: 'Paulo Coelho',
    year: 1988,
    displayYear: '1988',
    pages: 188,
    category: 'Roman & Felsefe',
    summary: 'Endülüslü çoban Santiago’nun Mısır Piramitleri’ne uzanan Kişisel Menkıbe arayışı ve yüreğinin sesini dinleme felsefesi.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'cesur-yeni-dunya',
    title: 'Cesur Yeni Dünya',
    author: 'Aldous Huxley',
    year: 1932,
    displayYear: '1932',
    pages: 270,
    category: 'Distopya & Roman',
    summary: 'Tüp bebek fabrikaları, Soma uyuşturucusu ve kitlesel tüketimle acının yok edildiği ama özgürlüğün ve duygunun tamamen feda edildiği teknolojik distopya.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'korluk',
    title: 'Körlük',
    author: 'José Saramago',
    year: 1995,
    displayYear: '1995',
    pages: 336,
    category: 'Roman',
    summary: 'Bilinmeyen bir kentte aniden yayılan "beyaz körlük" salgını ve karantinaya alınan insanların ahlaki çöküşü karşısında tek gören kadının mücadelesi.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'etika',
    title: 'Etika',
    author: 'Spinoza',
    year: 1677,
    displayYear: '1677',
    pages: 300,
    category: 'Felsefe',
    summary: 'Geometrik yöntemle kanıtlanmış Tanrı, Doğa, zihin özgürlüğü ve insanın tutkulardan arınarak duyduğu rasyonel sevgi üzerine felsefi abide.',
    rating: 4.9,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
  },
];
