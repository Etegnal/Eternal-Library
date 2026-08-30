import { prisma } from '../src/lib/prisma';

export const WHEEL_OF_TIME_BOOKS = [
  {
    slug: 'zaman-carki-1-dunyanin-gozu',
    title: 'Dünyanın Gözü (Zaman Çarkı 1. Cilt)',
    author: 'Robert Jordan',
    year: 1990,
    pages: 864,
    category: 'Fantastik & Roman',
    rating: 4.6,
    isReadable: false,
    isPublished: false, // Draft for admin review
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Eye of the World
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2003)
Platform & Okur Puanı: 4.6 / 5 (Goodreads: ~4.3/5, 1000Kitap: ~4.8/5)

Özet:
İki Nehir'in sakin ve mütevazı İki Irmak bölgesindeki İki Nehir köyü (Emond Meydanı), Karanlık Varlık'ın hizmetkarları olan Tralloklar ve Mürdranalların beklenmedik saldırısıyla sarsılır. Köyün üç genç delikanlısı Rand al'Thor, Matrim Cauthon ve Perrin Aybara, Karanlık Varlık'ın neden özellikle onları hedef aldığını anlayamadan, Aes Sedai Moiraine Damodred ve koruyucusu Lan Mandragoran'ın rehberliğinde köylerinden kaçmak zorunda kalırlar. Onlara köyün genç kadını Egwene al'Vere ve Bilge Kadın Nynaeve al'Meara da katılır.

Yolculuk boyunca karanlık güçlerin takibinde olan kafile, Shadar Logoth'un kadim laneti ve gölgelerin amansız takibi altında parçalanır. Rand ve arkadaşları, dünyanın kaderini değiştirecek olan "Yenidendoğan Ejder"in kim olduğu gerçeğiyle yüzleşirken, efsanevi Dünyanın Gözü'ne doğru tehlikelerle dolu bir yolculuğa atılırlar. Karakterler ilk kez İki Nehir'in ötesindeki koca dünyanın tehlikeleri ve Sihir (Tek Güç) gerçeğiyle tanışırlar.

Dünyanın Gözü'nde son yüzleşme gerçekleştiğinde Rand al'Thor, içindeki gizli gücü ve dünyanın üzerine çöken gölgeye karşı taşımak zorunda olduğu ağır kehanet yükünü ilk kez kavrar.

Editör Yorumu:
Zaman Çarkı serisinin bu muazzam açılış cildi, Tolkien'in epik mirasına saygı duruşunda bulunarak başlar ancak hızla Robert Jordan'ın özgün, son derece detaylı ve büyüleyici dünya inşasına evrilir. Karakter gelişimleri son derece doğal işlenmiş olup, fantastik edebiyat tarihinin en büyük efsanelerinden birine unutulmaz bir giriş sunmaktadır.`,
  },
  {
    slug: 'zaman-carki-2-buyuk-av',
    title: 'Büyük Av (Zaman Çarkı 2. Cilt)',
    author: 'Robert Jordan',
    year: 1990,
    pages: 792,
    category: 'Fantastik & Roman',
    rating: 4.7,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Great Hunt
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2003)
Platform & Okur Puanı: 4.7 / 5 (Goodreads: ~4.4/5, 1000Kitap: ~4.9/5)

Özet:
Fal Dara Kalesi'nde elde edilen efsanevi Valere Borusu ve Mat'in hayatına bağlı olan Shadar Logoth hançeri, Karanlıkdostları tarafından çalınır. Boru çalındığı takdirde ölmüş kahramanları çağırma gücü elden kaybolacaktır. Rand al'Thor, Mat Cauthon ve Perrin Aybara, boruyu ve hançeri geri almak için amansız bir av sürüşüne başlarlar.

Bu esnada Okyanus ötesinden gelen acımasız Seanchan ordusu, Batı Diyarları'nın kıyılarını işgal etmeye başlar. Kadınları birer köle (damane) olarak tasmalayan Seanchanlar, Egwene al'Vere'i esir alırlar. Egwene'in kurtarılması ve Valere Borusu'nun yeniden ele geçirilmesi için Nynaeve, Elayne ve Rand yolları Falme şehrinde kesişir.

Falme Savaşı'nda Rand al'Thor, gökyüzünde beliren devasa bir imge eşliğinde Amyrlin'in düşmanı Turak ile düello eder ve Valere Borusu çalınarak efsanevi kahramanlar yardıma çağrılır. Rand al'Thor, kendisinin Yenidendoğan Ejder olduğunu tüm dünyaya ilan etmek zorunda kalır.

Editör Yorumu:
Büyük Av, serinin temposunun ivme kazandığı ve politik/askeri boyutların derinleştiği harika bir devam kitabıdır. Seanchan tehdidinin tanıtılması ve Falme Savaşı'ndaki efsanevi final, fantastik kurgunun unutulmaz anları arasında yer alır.`,
  },
  {
    slug: 'zaman-carki-3-yenidendogan-ejder',
    title: 'Yenidendoğan Ejder (Zaman Çarkı 3. Cilt)',
    author: 'Robert Jordan',
    year: 1991,
    pages: 744,
    category: 'Fantastik & Roman',
    rating: 4.7,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Dragon Reborn
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2003)
Platform & Okur Puanı: 4.7 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

Özet:
Rand al'Thor, kaderinin amansız baskısı ve zihninde yankılanan delilik fısıltıları arasında kimseden yardım almadan Tear Taşlığı'na doğru tek başına bir yolculuğa çıkar. Amacı, kehanetlerde belirtilen ve sadece Ejder'in çekip çıkarabileceği efsanevi kılıç Callandor'u ele geçirmektir. Rand'ın yokluğunda arkadaşları Mat, Perrin, Egwene ve Nynaeve onun izini sürmek ve kehaneti tamamlamak üzere yola koyulurlar.

Perrin Aybara, rüya dünyası Tel'aran'rhiod ve kurtlarla olan bağını keşfederken; Matrim Cauthon şansının muazzam bir boyuta ulaştığını ve Shadar Logoth hançerinin lanetinden tamamen arındığını fark eder. Egwene ve Nynaeve ise Tar Valon'daki Kara Ajah avına katılırlar.

Tear Taşlığı'nda geçen nefes kesici finalde Rand, Callandor'u taşlıktan çekip çıkarır ve Terkedilmişler'den Be'lal'i mağlup eder. Rand al'Thor, kehanetlerin onayladığı gerçek Ejder olarak dünyaya meydan okur.

Editör Yorumu:
Rand'ın bir gölge gibi arka planda hissettirildiği ve Mat Cauthon ile Perrin Aybara karakterlerinin parladığı edebi bir şaheserdir. Mat'in dövüş sahneleri ve Tear Taşlığı'nın düşüşü kitabın zirve noktalarıdır.`,
  },
  {
    slug: 'zaman-carki-4-golge-yukseliyor',
    title: 'Gölge Yükseliyor (Zaman Çarkı 4. Cilt)',
    author: 'Robert Jordan',
    year: 1992,
    pages: 1056,
    category: 'Fantastik & Roman',
    rating: 4.9,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Shadow Rising
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2004)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.6/5, 1000Kitap: ~5.0/5)

Özet:
Rand al'Thor, Aiel Çölü'ne gitmeye karar verir. Amacı, Aiel halkının kehanetlerde bahsettiği "Şafakla Gelen Şafak" olduğunu kanıtlamak ve Rhuidean cam sütunlarında Aiel tarihinin trajik ve gizli geçmişini görmektir. Mat Cauthon da onunla birlikte Rhuidean'a gider ve burada gizemli Yılan ve Tilki halkıyla karşılaşarak efsanevi mızrağını ve hafızasındaki kadim komutanların anılarını kazanır.

Bu sırada Perrin Aybara, memleketi İki Nehir'in Tralloklar ve Beyaz Cüppeliler tarafından kuşatıldığını öğrenerek köylülerini korumak üzere geri döner. Perrin, halkını örgütleyerek İki Nehir Savunması'nı yönetir ve bir lider (Lord Perrin) haline gelir.

Egwene, Nynaeve ve Elayne ise Tanchico şehrinde Terkedilmişler'den Moghedien ve Kara Ajah ile amansız bir mücadeleye girerek dünyayı tehdit eden bir ter'angreal'i etkisiz hale getirirler.

Editör Yorumu:
Zaman Çarkı serisinin açık ara en görkemli ve en zengin ciltlerinden biridir. Aiel kültürünün derinlemesine işlenişi ve Perrin'in İki Nehir savunması fantastik edebiyatın ders niteliğindeki bölümleridir.`,
  },
  {
    slug: 'zaman-carki-5-gogun-atesleri',
    title: 'Göğün Ateşleri (Zaman Çarkı 5. Cilt)',
    author: 'Robert Jordan',
    year: 1993,
    pages: 968,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Fires of Heaven
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2004)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

Özet:
Couladin liderliğindeki asi Aiel kabilesi Çöl'den çıkarak Cairhien ülkesini yağmalamaya başlar. Rand al'Thor, Aiel ordusunun başında Cairhien'i kurtarmak ve düzeni sağlamak için harekete geçer. Cairhien Kuşatması'nda Mat Cauthon, kendi taktik zekasını sergileyerek Kızıl El Grubu ordusunun temellerini atar.

Diğer tarafta Rahvin, Caemlyn tahtını elinde tutan Kraliçe Morgase'i etkisi altına alarak şehri ele geçirmiştir. Rand, Rahvin'in bu ihanetini öğrendiğinde intikam ve adalet için Caemlyn'e yönelir. Moiraine Damodred, Rand'ı Terkedilmiş Lanfear'ın gazabından korumak için kendini feda ederek Lanfear ile birlikte gizemli bir kapıdan düşer.

Rand al'Thor, Rahvin ile krallığın koridorlarında ve düş rüyalarında son derece kanlı bir savaşa girer ve Yıldırım Gücü ile Rahvin'i tamamen yok eder.

Editör Yorumu:
Moiraine'in tarihi fedakarlığı ve Rand'ın Rahvin ile girdiği dehşet verici mücadele ile serinin duygusal ve aksiyon yükü en yüksek ciltlerinden biridir.`,
  },
  {
    slug: 'zaman-carki-6-kaos-lordu',
    title: 'Kaos Lordu (Zaman Çarkı 6. Cilt)',
    author: 'Robert Jordan',
    year: 1994,
    pages: 1072,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Lord of Chaos
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2005)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

Özet:
Rand al'Thor, erkek yönlendirenleri eğitmek ve ordusuna katmak için Asha'man kışlası olan Kara Kule'yi kurar ve Mazrim Taim'i eğitmen olarak atar. Ancak Aes Sedai'ler Rand'ın artan gücünden dehşete düşerek ona karşı tuzaklar kurarlar. Tar Valon'dan gelen Elaida'ya bağlı Aes Sedai elçileri Rand'ı yakalayarak bir sandığa kilitler ve ona kırbaçla işkence ederek Tar Valon'a kaçırmaya çalışırlar.

Dumai Kuyuları'nda geçen serinin en kanlı ve görkemli savaşında Perrin Aybara, Aiel ordusu ve Mazrim Taim liderliğindeki Asha'manlar Rand'ı kurtarmak için saldırırlar. "Asha'man, kıyım yapın!" emriyle Asha'manların sergilediği korkunç yıkım gücü karşısında Aes Sedai'ler diz çökmek zorunda kalır.

Kaos Lordu'nun sonunda Rand sandıktan kurtulur ve diyarın egemenleri artık Ejder'in karşısında diz çökmek zorundadır.

Editör Yorumu:
Dumai Kuyuları Savaşı, fantastik edebiyat tarihinin yazılmış en sarsıcı, en büyüleyici ve en unutulmaz savaş sahnelerinden birine ev sahipliği yapar. Serinin kırılma noktasıdır.`,
  },
  {
    slug: 'zaman-carki-7-kilictan-tac',
    title: 'Kılıçtan Taç (Zaman Çarkı 7. Cilt)',
    author: 'Robert Jordan',
    year: 1996,
    pages: 768,
    category: 'Fantastik & Roman',
    rating: 4.5,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: A Crown of Swords
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2006)
Platform & Okur Puanı: 4.5 / 5 (Goodreads: ~4.2/5, 1000Kitap: ~4.7/5)

Özet:
Dumai Kuyuları zaferinin ardından Rand al'Thor, Illian şehrini kontrol eden Terkedilmiş Sammael ile yüzleşmeye hazırlanır. Rand, politik dengeleri gözeterek Sammael'i tuzağa çekmek için ordularını hareket ettirir. Sonunda Shadar Logoth'un lanetli kalıntılarında Sammael ile ölümcül bir düelloya girer.

Egwene al'Vere, Salidar'daki sığınmacı Aes Sedai'lerin Amyrlin Makamı olarak otoritesini pekiştirmeye çalışır. Elayne Trakand, Nynaeve al'Meara ve Matrim Cauthon ise Ebou Dar şehrinde, dünyadaki iklim felaketini sonlandıracak olan ter'angreal "Rüzgar Çanağı"nı aramaktadırlar.

Ebou Dar'da Rüzgar Çanağı bulunurken, Seanchan ordusu şehri ansızın basar. Mat Cauthon geride kalarak arkadaşlarının kaçışını sağlarken ağır yaralanır. Rand ise Illian'ı fetheder ve Kılıçtan Taç'ı takar.

Editör Yorumu:
Sammael ve Rand arasındaki Shadar Logoth mücadelesi ile Ebou Dar'daki Rüzgar Çanağı arayışı kitaba yüksek bir sürükleyicilik katar. Karakterlerin politik olgunlaşması belirgindir.`,
  },
  {
    slug: 'zaman-carki-8-hancer-yolu',
    title: 'Hançer Yolu (Zaman Çarkı 8. Cilt)',
    author: 'Robert Jordan',
    year: 1998,
    pages: 672,
    category: 'Fantastik & Roman',
    rating: 4.4,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Path of Daggers
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2007)
Platform & Okur Puanı: 4.4 / 5 (Goodreads: ~4.0/5, 1000Kitap: ~4.6/5)

Özet:
Elayne, Nynaeve ve Deniz Halkı yönlendirenleri, Rüzgar Çanağı'nı kullanarak Karanlık Varlık'ın dünyaya dayattığı mevsimsiz kavurucu sıcakları sona erdirir ve dünyayı normal iklim döngüsüne kavuştururlar. Ancak bu devasa yönlendirme, Seanchanların dikkatini çeker.

Rand al'Thor, Asha'man ordusunu yanına alarak Altara topraklarını işgal eden Seanchan güçlerine karşı sefer başlatır. Efsanevi Callandor kılıcını kontrolsüzce kullandığında, Saidin'in bozunumu ve kılıcın kontrolden çıkması nedeniyle kendi ordusuna da zarar verir ve geri çekilmek zorunda kalır.

Bu sırada Perrin Aybara, Rand'ın emriyle Masema'yı (Ejder Yoldaşları) kontrol altına almak için güneye gider. Ancak Shaido Aiel kabilesi Perrin'in sevgili eşi Faile'i kaçırır ve Perrin için amansız bir kurtarma mücadelesi başlar.

Editör Yorumu:
Askeri stratejilerin ve Seanchan savaşlarının öne çıktığı Hançer Yolu, Rand'ın güç sınırlarını sınaması ve Perrin'in Faile'i kurtarma motivasyonuyla serinin önemli bir köprüsüdür.`,
  },
  {
    slug: 'zaman-carki-9-kisin-yuregi',
    title: 'Kışın Yüreği (Zaman Çarkı 9. Cilt)',
    author: 'Robert Jordan',
    year: 2000,
    pages: 688,
    category: 'Fantastik & Roman',
    rating: 4.4,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Winter's Heart
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2008)
Platform & Okur Puanı: 4.4 / 5 (Goodreads: ~4.1/5, 1000Kitap: ~4.6/5)

Özet:
Matrim Cauthon, Seanchan işgali altındaki Ebou Dar'dan kaçış planları yaparken, kaderin garip bir cilvesiyle Seanchan Dokuz Ayın Kızı Tuon ile tanışır ve kehanet gereği onunla evlenmek zorunda olduğunu anlar. Mat, Tuon'u kaçırarak şehirden uzaklaşır.

Perrin Aybara, eşi Faile'i Shaido Aiel esaretinden kurtarmak için Elyas ve Berelain ile güçlerini birleştirerek iz sürer. Elayne Trakand ise Caemlyn'de Andor tahtı üzerindeki hak iddiasını kanıtlamak için soylularla politik savaş yürütür.

Kitabın ve tüm serinin en büyük dönüm noktalarından birinde Rand al'Thor ve Nynaeve al'Meara, Shadar Logoth'un lanetli enerjisini ve Choedan Kal ter'angreal'lerini kullanarak erkeklerin yönlendirme gücü olan Saidin'in üzerindeki binyıllık lekeyi (bozunumu) temizlerler. Terkedilmişler bu temizliği engellemek için saldırsalar da başarısız olurlar.

Editör Yorumu:
Saidin'in temizlenmesi sahnesi, fantastik edebiyatın en büyük ve en epik büyülü başarılarından biridir. Mat ve Tuon dinamikleri kitaba harika bir mizah ve çekim katmaktadır.`,
  },
  {
    slug: 'zaman-carki-10-alacakaranlik-kavsagi',
    title: 'Alacakaranlık Kavşağı (Zaman Çarkı 10. Cilt)',
    author: 'Robert Jordan',
    year: 2003,
    pages: 752,
    category: 'Fantastik & Roman',
    rating: 4.2,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Crossroads of Twilight
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2009)
Platform & Okur Puanı: 4.2 / 5 (Goodreads: ~3.8/5, 1000Kitap: ~4.4/5)

Özet:
Saidin'in temizlenmesi sırasında gökyüzünde beliren muazzam güç dalgası tüm dünyadaki yönlendirenler tarafından hissedilir. Karakterler bu devasa olayın şokunu yaşarken kendi yerel mücadelelerine odaklanırlar.

Mat Cauthon, Dokuz Ayın Kızı Tuon ile birlikte Seanchan bölgesinde seyahat ederken aralarında derin bir bağ gelişir. Perrin Aybara, Faile'i kurtarmak için Shaido Aiel'lerine karşı gizlice Seanchan komutanlarıyla ittifak yapma fikrini değerlendirir.

Egwene al'Vere, Tar Valon kulesini kuşatan asi Aes Sedai ordusunun başında limanı engellemek için zincir yönlendirme operasyonu düzenlerken hileyle yakalanarak Beyaz Kule'ye esir düşer.

Editör Yorumu:
Fırtına öncesi sessizliğin ve politik satranç hamlelerinin hakim olduğu bir hazırlık cildidir. Karakterlerin duygusal ve zihinsel sınırlarının zorlandığı bir köprü eser niteliğindedir.`,
  },
  {
    slug: 'zaman-carki-11-dus-hanceri',
    title: 'Düş Hançeri (Zaman Çarkı 11. Cilt)',
    author: 'Robert Jordan',
    year: 2005,
    pages: 864,
    category: 'Fantastik & Roman',
    rating: 4.8,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Knife of Dreams
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2010)
Platform & Okur Puanı: 4.8 / 5 (Goodreads: ~4.5/5, 1000Kitap: ~4.9/5)

Özet:
Robert Jordan'ın bizzat tamamladığı bu son kitapta olaylar muazzam bir ivme kazanır. Perrin Aybara, Malden Savaşı'nda Shaido Aiel'lerini imha ederek Faile'i esaretten kurtarır. Mat Cauthon, Tuon ile evlenerek "Dokuz Ayın Prensi" unvanını alır ve Kızıl El Grubu ile Seanchan takipçilerini hezimete uğratır.

Egwene al'Vere, Beyaz Kule'deki esareti sırasında hapsedilmesine rağmen kuledeki çömezleri ve Novisleri etkileyerek Elaida'nın otoritesini içeriden sarsar. Elayne Trakand ise Caemlyn tahtını kesin olarak güvenceye alır.

Rand al'Thor, Terkedilmiş Semirhage'in tuzağına düşer ve sol elini kaybeder. Ancak Semirhage'i tutsak etmeyi başarır. Desen son savaşa (Tarmon Gai'don) doğru hızla yaklaşmaktadır.

Editör Yorumu:
Robert Jordan'ın vefatından önceki son eseri olan Düş Hançeri, usta yazarın seriyi getirdiği en yüksek edebi zirvelerden biridir. Düğümlerin çözüldüğü muazzam bir aksiyon fırtınasıdır.`,
  },
  {
    slug: 'zaman-carki-12-firtina-toplaniyor',
    title: 'Fırtına Toplanıyor (Zaman Çarkı 12. Cilt)',
    author: 'Robert Jordan & Brandon Sanderson',
    year: 2009,
    pages: 848,
    category: 'Fantastik & Roman',
    rating: 4.9,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: The Gathering Storm
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2011)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.6/5, 1000Kitap: ~5.0/5)

Özet:
Robert Jordan'ın notlarını devralan Brandon Sanderson'ın kaleme aldığı bu ciltte Rand al'Thor, yaşadığı ağır kayıplar ve omuzundaki devasa yük nedeniyle kalbini tamamen çeliğe dönüştürür. Zihnindeki Lews Therin fısıltıları ve Semirhage'in büyüsü yüzünden kendi sevdiklerine zarar verme noktasına gelir. Ejder Dağı'nın tepesinde Rand, kendi varlığını ve dünyayı yok etme kararı alacak kadar karanlığa batar, ancak son anda aydınlanma yaşayarak (Veins of Gold) yeniden umudun ve ışığın lideri haline gelir.

Egwene al'Vere, Seanchanların Beyaz Kule'ye düzenlediği baskında kuleyi cesurca savunarak Aes Sedai'leri birleştirir ve Elaida'nın esir düşmesi üzerine Beyaz Kule'nin tartışmasız tek Amyrlin Makamı seçilir.

Editör Yorumu:
Rand al'Thor'un Ejder Dağı'ndaki ruhsal kırılması ve aydınlanması, fantastik edebiyat tarihinin en güçlü ve duygusal karakter dönüşümlerinden biridir. Sanderson, Jordan'ın mirasını harika taşımıştır.`,
  },
  {
    slug: 'zaman-carki-13-gece-yarisi-kuleleri',
    title: 'Gece Yarısı Kuleleri (Zaman Çarkı 13. Cilt)',
    author: 'Robert Jordan & Brandon Sanderson',
    year: 2010,
    pages: 928,
    category: 'Fantastik & Roman',
    rating: 4.9,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: Towers of Midnight
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2012)
Platform & Okur Puanı: 4.9 / 5 (Goodreads: ~4.7/5, 1000Kitap: ~5.0/5)

Özet:
Perrin Aybara, içindeki kurt ile olan çelişkisini çözer, Mah'alleinir adlı efsanevi güç baltasını döverek gerçek bir lider olarak ordusunu hazırlar ve Luc/Slayer'a karşı Tel'aran'rhiod'da zafer kazanır.

Matrim Cauthon, Thom Merrilin ve Noal ile birlikte Moiraine Damodred'i kurtarmak için Ghenjei Kulesi'ne sızar. Yılan ve Tilki halkının (Aelfinn ve Eelfinn) karanlık diyarında amansız bir mücadele vererek Moiraine'i kurtarırlar; ancak Mat bu uğurda sol gözünü feda eder.

Rand al'Thor, aydınlanmış Ejder olarak dünya liderlerini Merrilor Alanı'nda toplar ve Son Savaş öncesinde Işık güçlerini tek bir sancak altında birleştirmeye çalışır.

Editör Yorumu:
Ghenjei Kulesi kurtarma operasyonu ve Perrin'in çekiç dövme sahnesi fantastik kurgunun aksiyon zirvelerindendir. Son Savaş öncesi tüm parçalar kusursuzca yerine oturur.`,
  },
  {
    slug: 'zaman-carki-14-isigin-anisi',
    title: 'Işığın Anısı (Zaman Çarkı 14. Cilt)',
    author: 'Robert Jordan & Brandon Sanderson',
    year: 2013,
    pages: 992,
    category: 'Fantastik & Roman',
    rating: 5.0,
    isReadable: false,
    isPublished: false,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    summary: `Orijinal Adı: A Memory of Light
Yayıncı: İthaki Yayınları (Türkiye İlk/Güncel Basım Yılı: 2014)
Platform & Okur Puanı: 5.0 / 5 (Goodreads: ~4.8/5, 1000Kitap: ~5.0/5)

Özet:
Tarmon Gai'don — Son Savaş nihayet başlamıştır. Merrilor Alanı'nda Işık Güçleri ile Gölge orduları (Tralloklar, Oğuzlar, Dışlanmışlar, Gölgedostları) karşı karşıya gelir. Matrim Cauthon tüm Işık ordularının Başkomutanı olarak stratejik dehasını sergiler.

Rand al'Thor, Shayol Ghul'un derinliklerinde Karanlık Varlık ile varoluşsal ve felsefi bir düelloya girer. Gerçekliğin dokusunu yeniden şekillendirirken karanlığın olmadığı bir dünyanın insan iradesini yok edeceğini kavrar. Egwene al'Vere, Kralların ve Aes Sedai'lerin başında destansı bir fedakarlıkla hayatını verir.

Sonunda Rand, Karanlık Varlık'ı öldürmeden zindanına yeniden mühürler. Savaş kazanılır, Zaman Çarkı dönmeye devam eder. Rand al'Thor bedenini değiştirerek özgür bir gezgin olarak dünyaya karışır.

Editör Yorumu:
Dünya edebiyat tarihinin en uzun ve en görkemli epik fantastik serisinin muazzam, tatmin edici ve unutulmaz finalidir. "Son Yoktur. Ama Bu Bir Sondu."`,
  },
];

async function main() {
  console.log('Seeding 14 Wheel of Time books as DRAFTS for Admin Review...');
  let count = 0;
  for (const book of WHEEL_OF_TIME_BOOKS) {
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
  console.log(`Successfully seeded ${count} Wheel of Time books as DRAFTS in DB!`);
}

main().catch(console.error).finally(() => process.exit());
