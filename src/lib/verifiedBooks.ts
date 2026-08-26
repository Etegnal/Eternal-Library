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
  fullPages?: string[]; // Full text pages for readable classics
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
    summary: 'St. Petersburg’un mehtaplı beyaz gecelerinde yalnız bir hayalperest ile Nastenka’nın dört gece süren sevdalı ve hüzünlü karşılaşması.',
    rating: 4.7,
    isReadable: true,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    fullPages: [
      `1. GECE

St. Petersburg'da harika bir geceydi, çocukluğumdan beri öylesine güzel bir gece görmemiştim. Gökyüzü o kadar yıldızlı, o kadar aydınlıktı ki, ona bakan insan ister istemez kendi kendine soruyordu: Böyle bir gökyüzünün altında kötü huylu, huysuz insanlar nasıl yaşayabilir?

Ben yalnız bir insandım. Yıllardır bu kentin sokaklarında tek başıma yürür, evlerin yüzlerini, pencerelerini tanırdım. Evler bile benimle konuşurdu sanki. Bir gün Nevski Bulvarı'nda yürürken hüzünlü bir kız gördüm. Kanal kıyısındaki korkuluklara dayanmış, sessizce ağlıyordu. Yanına yaklaşmaya cesaret edemedim önce, ama bir sarhoş onu rahatsız edince araya girdim.

İşte Nastenka ile ilk karşılaşmamız böyle oldu. O gece boyunca birbirimize hayatlarımızı anlattık. O, anneannesiyle yaşayan ve sevdiği adamı bekleyen masum bir ruhtu. Bense sadece hayallerinde yaşayan, gerçek dünyayı teğet geçen bir hülyaperest...`,

      `2. GECE

Nastenka ile sözleştiğimiz gibi ertesi gece yine aynı yerde buluştuk. Bana dedi ki: "Bana aşık olmayacaksın, söz ver! Sadece dost olacağız." Oysa kalbim onun her cümlesiyle biraz daha fazla çarpıyordu.

Nastenka kendi hikayesini anlattı: Anneannesinin çengelli iğneyle elbisesine iğnelediği o dar odada yaşarken, üst kattaki kiracı genç adama nasıl aşık olduğunu söyledi. O genç adam Moskova'ya gitmek zorunda kalmıştı ama tam bir yıl sonra, bu mehtaplı gecelerde döneceğine dair söz vermişti. İşte Nastenka bir yıldır bu sözün tutulacağı geceyi bekliyordu.

Bense dinledim... Onun gözlerindeki umudu, yüreğindeki saf bekleyişi dinledim. Kendi yalnızlığımı onun umuduna feda etmeye hazırdım. Hayalperest bir adam için bir başkasının mutluluğuna şahit olmak bile en büyük mutluluk sayılmaz mıydı?`,

      `3. GECE

Üçüncü gece hava biraz bulutluydu, içimdeki hüzün gibi. Nastenka endişeliydi; çünkü beklediği adam hala gelmemişti, hiçbir mektup da yollamamıştı.

"Neden gelmiyor?" diye ağladı. "Beni unuttu mu yoksa?"

Onun gözyaşlarını silmek için elimin tersiyle kendi yüreğimi ezdim. "Gelecektir," dedim, "mutlaka geçerli bir sebebi vardır, yarın yine bekleyeceğiz." O gece ona hissettiklerimi açıklamak istedim ama tuttum kendimi. Onun kırgın kalbine yük olmak istemedim. Nastenka elimi tuttu ve "Sen öyle iyi, öyle yüce bir insansın ki," dedi. Bu kelimeler kalbime sıcak bir bıçak gibi saplandı.`,

      `4. GECE VE SABAH

Dördüncü gece... Nastenka tam umudunu kesmişken, karanlığın içinden bir gölge belirdi. Sevdiği adam gelmişti! Nastenka sevinç çığlığı atarak onun kollarına koştu. Bir an durdu, bana döndü, beni öptü ve "Beni bağışla, seni hiç unutmayacağım!" diyerek onunla birlikte gecenin içinde kayboldu.

Ertesi sabah uyandığımda odam daha karanlık, St. Petersburg daha soğuk görünüyordu. Ama kırgın değildim. Bana yaşattığı o dört gecelik mutluluk için ona minnettardım. 

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
      `Giyotin ve Mahkumiyet

İdam mahkûmu!

Beş haftadan beri bu düşünceyle yaşıyorum; her an bu fikirle baş başayım, onun soğuk ağırlığı altında eziliyorum. Eskiden zihnim genç ve zengindi; fantezilerle, çiçeklerle, genç kadınlarla dolu hayaller kurardım. Şimdiyse tutsağım. Bedenim bir zindanda zincirlenmiş, zihnim ise tek bir düşüncenin parmaklıkları arkasında: İdam mahkûmu!

Bicêtre cezaevinin taş duvarları soğuk ve nemli. Dışarıda güneş açıyor olabilir, kuşlar ötüyor olabilir ama burada zaman sadece giyotinin giyotine yaklaşan adımlarıyla ölçülüyor. Neden ben? Bir anlık bir öfke, bir talihsizlik yüzünden bir insanın hayatına son vermek hangi adaletin kuralıdır?`,

      `Zamanın Daralması ve Küçük Kızım

Giyotin hazırlıkları başladı. Saçlarımı kestiler, boynumu açtılar. Gardiyanlar görevlerini sıradan bir iş gibi yapıyorlar; onlar için ben sadece sıradaki bir dosya numarasından ibaretim.

En çok küçük kızım Marie'yi düşünüyorum. Onu bugün ziyaretime getirdiler. Küçük meleğim bana baktı ve "Siz benim babam değilsiniz, babam gökyüzünde!" dedi. Kendi öz çocuğum bile beni tanıyamadı artık. İçimdeki son yaşam kırıntısı da o an yok oldu. Beni öldüren şey giyotin bıçağı değil, kızımın o yabancı bakışları oldu.

Toplum kendisini korumak adına bir insanı yok ederken aslında neyi temizlediğini sanıyor? İdam cezası bir adalet değil, yasal bir intikamdır!`,

      `Son Anlar ve Cellat

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
      `BÖLÜM 1: Yoksul Kunduracı ve Yabancı

Yoksul bir kunduracı olan Semen, karısı Matryona ve çocuklarıyla birlikte küçük bir köy evinde yaşardı. Bir kış günü Semen, koyun derisi almak için kasabaya gitti fakat parası yetmediği için koyun derisini alamadan köye dönmek zorunda kaldı.

Yolda, kilisenin duvarının dibinde çıplak ve donmak üzere olan bir adam gördü. Semen önce korktu, yanından geçip gitmek istedi. Fakat vicdanı el vermedi. Geri döndü, üzerindeki eski kürkünü çıkarıp adama giydirdi ve onu evine getirdi.

Karısı Matryona önce çok kızdı; evde ekmek bile yokken tanımsız bir yabancıyı eve getirdiği için Semen'e bağırdı. Fakat Semen "Matryona, Tanrı aşkına söyle, sende hiç merhamet yok mu?" deyince kadının yüreği yumuşadı. Yabancıya yemek verdi. O an yabancının yüzünde hafif bir tebessüm belirdi.`,

      `BÖLÜM 2: Üç Gerçek

Görünüşte sessiz ve garip olan bu adamın adı Mikail'di. Mikail, Semen'in yanında kunduracılık öğrenmeye başladı ve kısa sürede kentin en mahir ustası oldu. Yıllar geçti. Bir gün zengin bir bey evlerine geldi ve kendisi için bir yıl boyunca yıpranmayacak sağlam çizmeler yapmasını istedi.

Mikail beye baktı ve birden arkasında ölüm meleğini gördü. Çizme yapmak yerine hafif deriden bir kefen patiği dikti. Beyin uşağı akşamüstü gelip beyin yolda ansızın öldüğünü bildirdi. Mikail ikinci kez tebessüm etti.

Sonunda Mikail gerçeği açıkladı: O bir melekti. Bir kadının ruhunu alması emredilmişti ama kadının yetim ikiz bebekleri için yalvarması üzerine kıyamamış, ruhu almamıştı. Tanrı da onu cezalandırıp yeryüzüne üç gerçeği öğrenmesi için göndermişti.`,

      `BÖLÜM 3: Sevgi

Mikail öğrendiği üç gerçeği şöyle sıraladı:

1. İnsanda ne vardır? İnsanda **sevgi** vardır. Matryona melek gibi yüreğini açtığında ilk gerçeği öğrendim.
2. İnsana ne verilmemiştir? İnsana **kendi geleceğini bilme yetisi** verilmemiştir. Zengin bey bir yıllık çizme isterken birkaç saat sonra öleceğini bilmiyordu.
3. İnsan ne ile yaşar? İnsan **sevgi ile yaşar**. Yetim çocukları kendi çocuğu gibi büyüten kadın bana öğretti ki, insanlar kendi kaygılarıyla değil, Tanrı'nın kalplerine koyduğu sevgi ile yaşarlar.

Bu sözlerin ardından Mikail göğe doğru yükseldi ve melek suretine bürünüp kayboldu.`
    ]
  },
  {
    slug: 'savas-ve-baris',
    title: 'Savaş ve Barış',
    author: 'Tolstoy',
    year: 1869,
    displayYear: '1869',
    pages: 1225,
    category: 'Roman & Tarih',
    summary: 'Napolyon’un Rusya seferi fonunda Pierre Bezukhov, Prens Andrey ve Nataşa Rostova’nın hayatları, aşkları, varoluşsal arayışları ve insanlık tarihinin felsefi analizi.',
    rating: 5.0,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
  },
  {
    slug: 'boyle-buyurdu-zerdust',
    title: 'Böyle Buyurdu Zerdüşt',
    author: 'Nietzsche',
    year: 1883,
    displayYear: '1883',
    pages: 350,
    category: 'Felsefe',
    summary: 'Üstinsan, Güç İstenci ve Ebedi Dönüş düşüncelerinin şiirsel bir üslupla anlatıldığı, "Tanrı öldü" nidasıyla eski ahlakın yıkılışını müjdeleyen başyapıt.',
    rating: 4.8,
    isReadable: false,
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600',
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
      `BÖLÜM 1: Değişim

Gregor Samsa bir sabah huzursuz düşlerden uyandığında, kendini yatağında devasa bir böceğe dönüşmüş olarak buldu. Zırh gibi sertleşmiş sırtının üzerinde yatıyordu; kafasını biraz kaldırdığında kahverengi, kubbemsi, sert şeritlerle bölünmüş karnını gördü. Karnının tepesinde yorgan neredeyse tamamen kaymak üzereydi.

"Bana ne oldu böyle?" diye düşündü. Bu bir düş değildi. Odası, biraz küçükçe ama gerçek bir insan odasıydı.

Duvara asılı duran kürk kasketli ve kürk etollü kadının resmi yerinde duruyordu. Gregor gözlerini pencereye çevirdi; kasvetli hava (sinekliğin sacına vuran yağmur damlalarının sesi duyuluyordu) onu iyice hüzünlendirdi. "Biraz daha uyusam da bütün bu saçmalıkları unutsam nasıl olur?" diye düşündü. Ama bu imkansızdı, çünkü sağ yanına yatma alışkanlığı vardı ve şu anki durumunda bu duruma geçmesi mümkün değildi.`,

      `BÖLÜM 2: Aile ve Yabancılaşma

Kapının ardında annesi, babası ve kız kardeşi Grete sırayla ona sesleniyor, işe neden geç kaldığını soruyorlardı. Gregor treni kaçırmıştı ve ticaret şirketinin temsilcisi eve kadar gelmişti. 

Gregor binbir güçlükle kapının kilidini ağzıyla açmayı başardığında dışarıdakilerin çığlığı evi kapladı. Annesi bayıldı, temsilci korkuyla kaçtı, babası ise elindeki bastonla Gregor'u odasına geri kovalamaya çalıştı. Gregor kapı eşiğinde sıkışarak kabuklarını kanattı ve odasına hapsedildi.

İlk günlerde sadece kız kardeşi Grete ona çürümüş yiyecekler getirip odasını temizliyordu. Ancak zamanla Grete bile ondan iğrenmeye başladı. Artık Gregor insan dilini anlıyor ama konuşamıyordu.`,

      `BÖLÜM 3: Son

Bir akşam Grete keman çalarken Gregor müziğin büyüsüne kapılıp salona çıktı. Eve alınan kiracılar böceği görünce evi terk edeceklerini söylediler. 

Kız kardeşi Grete gözyaşları içinde haykırdı: "Ondan kurtulmalıyız! O artık Gregor değil. Eğer Gregor olsaydı, insanların böyle bir yaratıkla yaşayamayacağını anlar ve kendiliğinden giderdi!"

Gregor odasına geri sürüklendi. Kapı arkasından kilitlendi. Karanlıkta sabaha kadar düşündü. Ailesine karşı hissettiği tek şey sevgiydi. Şafak vakti sökerken Gregor Samsa son nefesini verdi. Hizmetçi kadın sabah onun cansız bedenini süpürgeyle çöpe attığında, aile rahat bir nefes alıp kıra gezintisine çıkma kararı aldı.`
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
      `BÖLÜM 1: İsyan ve Yedi Emir

Beylik Çiftlik'in sahibi Bay Jones sızıp uyuduğunda, ihtiyar domuz Koca Reis tüm hayvanları samanlıkta topladı. İnsanların hayvanları nasıl sömürdüğünü, ürettikleri süt ve yumurtayı çaldıklarını anlattı. "Bütün insanlar düşmandır, bütün hayvanlar yoldaştır!" rüyasını paylaştı.

Koca Reis birkaç gün sonra öldü ama fikirleri Snowball ve Napoleon adlı iki zeki domuz tarafından önderlik edilen bir isyana dönüştü. Bay Jones çiftlikten kovuldu. Çiftliğin adı **Hayvan Çiftliği** olarak değiştirildi ve duvara Yedi Emir yazıldı:

1. İki ayak üstünde yürüyen herkes düşmandır.
2. Dört ayak üstünde yürüyen veya kanatları olan herkes dosttur.
3. Hiçbir hayvan giysi giymeyecektir.
4. Hiçbir hayvan yatakta yatmayacaktır.
5. Hiçbir hayvan içki içmeyecektir.
6. Hiçbir hayvan başka bir hayvanı öldürmeyecektir.
7. Bütün hayvanlar eşittir.`,

      `BÖLÜM 2: Yozlaşma ve İktidar Savaşı

Başta işler harika gitti. At Boxer "Daha çok çalışacağım!" parolasıyla herkese örnek oluyordu. Ancak zamanla Napoleon ile Snowball arasında iktidar kavgası başladı. Yel değirmeni projesi tartışılırken Napoleon, gizlice yetiştirdiği dokuz vahşi köpeği Snowball'un üzerine saldırtıp onu çiftlikten sürdü.

Artık Napoleon tek liderdi. Kararları kendi alıyor, Squealer adlı domuz ise hayvanları kandırmak için propaganda yapıyordu. Yavaş yavaş emirler değiştirilmeye başlandı:

- "Hiçbir hayvan yatakta yatmayacaktır" kuralına "çarşaflı" kelimesi eklendi.
- "Hiçbir hayvan içki içmeyecektir" kuralına "aşırı" kelimesi eklendi.
- Sadık Boxer yaşlanıp sakatlandığında mezbahaya satıldı, parasıyla domuzlara viski alındı.`,

      `BÖLÜM 3: Dönüşüm

Yıllar geçti. Hayvanlar başlangıçtaki ideallerini unuttular. Domuzlar iki ayak üzerinde yürümeye, ellerinde kırbaç taşımaya ve Bay Jones'un eski elbiselerini giymeye başladılar.

Duvardaki Yedi Emir silinmiş, yerine tek bir cümle yazılmıştı:

**"BÜTÜN HAYVANLAR EŞİTTİR, AMA BAZI HAYVANLAR ÖTEKİLERDEN DAHA EŞİTTİR."**

Son gece, komşu insan çiftlik sahipleri domuzları ziyaret etti. Birlikte iskambil oynayıp içki içiyorlardı. Dışarıdaki diğer hayvanlar pencereden içeri baktılar: Bir domuzların yüzüne, bir insanların yüzüne baktılar; ama hangisinin insan, hangisinin domuz olduğunu ayırt edemiyorlardı.`
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
      `BÖLÜM 1: Annenin Ölümü ve Sahil

"Bugün annem öldü. Belki de dün, bilmiyorum."

Cezayir'de yaşayan sıradan bir büro memuru olan Meursault, bakımevindeki annesinin cenazesine gitti. Ağlamadı, cenazede kahve içip sigara yaktı. Ertesi gün Cezayir'e dönüp kız arkadaşı Marie ile denize girdi, komedi filmi izledi.

Birkaç hafta sonra komşusu Raymond ile birlikte sahile gittiler. Sahilde Raymond'un husumetli olduğu Araplarla karşılaştılar. Sıcak hava yakıcıydı, güneş Meursault'nun alnına bir bıçak gibi saplanıyordu. Gözlerini silerken cebindeki tabancaya dokundu ve sebebsizce tetiğe bastı. Adam yere düştü. Ardından dört kez daha ateş etti.`,

      `BÖLÜM 2: Mahkeme ve Saçma

Meursault tutuklandı. Mahkemede asıl yargılanan şey işlediği cinayet değil, annesinin cenazesinde ağlamamış olmasıydı. Savcı onu "ruhen bir canavar" olarak nitelendirdi; toplumun duygusal kalıplarına uymadığı için toplum dışına itildi.

Meursault yalan söylemeyi reddetti. Pişmanlık tiyatrosu oynamadı. Sadece gerçeğe sadık kaldı.

Hücresinde idama hazırlanırken rahibin din telkinlerini reddetti. Dünyanın şefkatli umursamazlığına kendini açtı ve idam gününde kalabalığın nefret dolu çığlıklarıyla karşılanmayı diledi.`
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
      `BÖLÜM 1: Okyanus Gemisi ve Czentovic

New York'tan Buenos Aires'e gitmekte olan bir yolcu gemisinde, dünya satranç şampiyonu Mirko Czentovic de bulunmaktaydı. Czentovic, çocukluğundan itibaren ketum, kaba ve satranç dışında hiçbir entelektüel becerisi olmayan kaba bir dahiydi.

Gemideki zengin yolculardan McConnor, Czentovic ile parası karşılığında bir gösteri maçı yapması için anlaştı. Czentovic, gemideki tüm amatör oyuncuları aynı anda rahatça yeniyordu.`,

      `BÖLÜM 2: Dr. B'nin Müdahalesi ve Hücre Geçmişi

Maçın en kritik anında kalabalığın arasından zayıf, solgun bir adam (Dr. B.) öne çıktı ve McConnor'un hamlesini durdurdu: "Yapmayın! Kale'yi oynatırsanız üç hamlede mat olursunuz!" Dr. B'nin yönlendirmesiyle amatörler grubu dünya şampiyonunu berabere kalmaya zorladı.

Herkes şaşkındı. Dr. B. daha sonra hikayesini anlattı: Viyana'da Avusturya aristokrasisinin paralarını koruyan bir avukattı. Gestapo onu tutuklamış ve tek bir mobilyanın bile bulunmadığı otel odasında mutlak tecride mahkûm etmişti. Ses yoktu, kitap yoktu, insan yoktu.

Bir gün sorgu sırasını beklerken bir paltonun cebinden bir kitap çaldı. Bu kitap ünlü satranç ustalarının 150 maçlık analizlerini içeriyordu.`,

      `BÖLÜM 3: Zihinsel Yarılma ve Son Oyun

Dr. B. odasında ekmek kırıntılarından yaptığı taşlarla bu 150 maçı yüzlerce kez oynadı. Ezberledikten sonra zihninde oynamaya başladı: Beyaz Dr. B. siyah Dr. B'ye karşı! Bu durum zihninin ikiye bölünmesine, "Satranç Humması" adı verilen ağır bir sinir krizine yol açtı. Hastaneye kaldırıldı ve serbest bırakıldı.

Gemide Czentovic ile teke tek maça çıktı. İlk maçı Dr. B. muazzam bir zekayla kazandı. Ancak ikinci maçta Czentovic onun sabırsızlığını fark edip hamlelerini kasıtlı olarak çok yavaş yapmaya başladı. Dr. B'nin zihnindeki eski hücre kabusu yeniden canlandı. Sonunda zihninin dengesini kaybetmemek için tahtadan kalktı ve satrancı sonsuza dek bıraktı.`
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
      `Sana, Beni Hiç Tanımamış Olana...

"Sana, beni hiç tanımamış olan sana!

Çocuğum dün öldü... Şimdiyse bu dünyada tek başıma kaldım. Sana bu mektubu yazıyorum çünkü beni dinleyecek başka kimsem yok. Bu mektubu eline aldığında ben de ölmüş olacağım.

Henüz on üç yaşında küçük bir kızken komşumuz oldun. Senin kapından giren kitap kokularını, şıklığını, gülüşünü izlerdim. Sen benim tek dünyam oldun. Büyüdüm, başka şehirlere gittim ama kalbim hep senin Viyana'daki kapının önünde kaldı."`,

      `Karşılaşmalar ve Unutuluş

"Yıllar sonra Viyana'ya döndüm. Gece kulüplerinde, sokaklarda karşına çıktım. Beni evine götürdün, geceler geçirdik. Ama sen beni hiçbir zaman o eski küçük komşu kızı olarak tanımadın! Beni sadece bir gecelik güzel bir kadın sandın.

Senden bir çocuğum oldu. Onu senden tek bir kuruş istemeden, lekesiz büyüttüm. Ama dün difteriden öldü... Şimdi ben de gidiyorum."`,

      `Veda

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
      `Hissizlikten Uyanış

Viyana burjuvazisinin zengin ve kaygısız bir üyesiydim. Hayatta her şeye sahiptim ama hiçbir şeyden heyecan duymuyordum. İçimde derin bir hissizlik, buz gibi bir kabuk oluşmuştu.

Bir pazar günü hipodromda yarış izlerken yanımda duran adamın düşürdüğü kuponu bilerek ayağımın altına aldım ve cebime attım. Zengindim, paraya ihtiyacım yoktu ama bu küçük suç içimde aniden bir heyecan kıvılcımı çaktı.`,

      `Gece Yolculuğu ve Şefkat

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
      `Doktor Ragin ve İvan Gromov

Kasaba hastanesinin bakımsız, pis kokulu Altıncı Koğuşu'nda akıl hastaları kalıyordu. Hastanenin doktoru Andrey Yefimıç Ragin, hayattan bıkmış, Stoacı felsefeye sığınarak kasabadaki cehaleti teğet geçen bir adamdı.

Bir gün Altıncı Koğuş'a girdiğinde, zulüm görmekten çıldırmış olan zeki hasta İvan Dmitriç Gromov ile sohbet etmeye başladı. Gromov ona dedi ki: "Siz sıcak odanızda oturup 'Acı sadece bir algıdır' felsefesi yapıyorsunuz. Parmağınızı kapıya sıkıştırın da bakalım acı algı mıymış!"`,

      `Akıl Sağlığı ve İzolasyon

Doktor Ragin, kasabada entelektüel düzeyde konuşabildiği tek insanın bu "deli" olduğunu fark etti ve her gün Altıncı Koğuş'a gidip onunla saatlerce tartıştı.

Fakat toplum bunu kabullenemezdi. Bir doktorun bir deliyle arkadaşlık etmesi kasabalılar tarafından doktorun da çıldırdığı şeklinde yorumlandı. Ragin görevinden alındı, parası bitirildi.`,

      `Son Kaçınılmaz

Sonunda meslektaşları Doktor Ragin'i kandırarak Altıncı Koğuş'a bir hasta olarak kapattılar. 

Ragin, yıllarca uzaktan izlediği o soğuk parmaklıkların ve gardiyan Nikita'nın dayağının acısını bizzat yaşadı. Ertesi gün geçirdiği felç sonucu öldü. Stoacı felsefe gerçek acının karşısında yok olmuştu.`
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
      `BÖLÜM 1: Çöl ve Küçük Prens

Sahra Çölü'ne uçağım arızalandığı için inmek zorunda kalmıştım. Yanımda sadece bir haftalık içme suyu vardı.

İlk sabah şafak vakti tuhaf bir sesle uyandım: "Lütfen... Bana bir koyun çizer misin?"

Gözlerimi ovuşturdum. Karşımda altın sarısı saçlı, olağanüstü küçük bir prens duruyordu. Ona boğa yılanının fili yuttuğu çizimimi gösterdim, yetişkinlerin aksine o hemen tanıdı: "Hayır! Ben fil yutmuş bir boğa yılanı istemiyorum, bana bir koyun çiz!"`,

      `BÖLÜM 2: Gül ve Tilki

Küçük Prens B-612 adlı küçük bir asteroidden geliyordu. Gezegeninde tek bir özel gül vardı. Ama Küçük Prens gezegenleri gezerken Dünya'da binlerce gül gördü ve çiçeğinin eşsiz olmadığını sanıp ağladı.

O sırada bir tilki çıktı karşısına. "Beni evcilleştir!" dedi tilki. 

"Evcilleştirmek ne demek?" diye sordu Küçük Prens.

"Bağlar kurmak demek," dedi tilki. "Şimdi sen benim için sadece yüz bin küçük çocuktan birisin. Ama beni evcilleştirirsen birbirimize muhtaç oluruz. Sen benim için dünyada tek olursun, ben de senin için..."

Ve tilki ona en büyük sırrı verdi: **"İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez."**`,

      `BÖLÜM 3: Veda

Küçük Prens çiçeğine karşı sorumlu olduğunu anladı. "Gülüme harcadığım zaman, gülümü bu kadar önemli kılan," dedi.

Gezegenine dönmek için yılanın zehirli dokunuşunu kabul etti. Yıldızlara baktığımda onun kahkahasını duyacağımı söyledi.

"Gökyüzüne bakın ve sorun kendi kendinize: Koyun çiçeği yedi mi, yemedi mi? Ve görün bakın nasıl değişiyor her şey..."`
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
