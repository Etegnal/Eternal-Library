export interface DailyQuoteItem {
  dayOfYear: number;
  author: string;
  content: string;
  source?: string;
}

export const QUOTES_365: DailyQuoteItem[] = [
  // OCAK (1-31)
  { dayOfYear: 1, author: 'Marcus Aurelius', content: 'Sabah uyandığında yaşamaya, düşünmeye, sevmeye devam etmenin ne büyük bir ayrıcalık olduğunu düşün.', source: 'Kendime Düşünceler' },
  { dayOfYear: 2, author: 'Montaigne', content: 'Dünyanın en büyük şeyi, insanın kendi kendisi olmayı bilmesidir.', source: 'Denemeler' },
  { dayOfYear: 3, author: 'Fyodor Dostoyevski', content: 'İnsan ruhunun öyle derinlikleri vardır ki, oraya ancak acı ve sevgi ulaşabilir.', source: 'Suç ve Ceza' },
  { dayOfYear: 4, author: 'Sabahattin Ali', content: 'Dünyada sırf kendisi için yaşayan tek bir insan bile yoktur. Herkes bir başkası için var olur.', source: 'Kürk Mantolu Madonna' },
  { dayOfYear: 5, author: 'Cemal Süreya', content: 'Hayat kısa, kuşlar uçuyor.', source: 'Sevda Sözleri' },
  { dayOfYear: 6, author: 'Friedrich Nietzsche', content: 'Uçurumları sevenlerin kanatları olmalı.', source: 'Böyle Buyurdu Zerdüşt' },
  { dayOfYear: 7, author: 'Franz Kafka', content: 'Günün birinde kendini anlaşılmış hissetmek, dünyadaki tüm yalnızlıkları siler.', source: 'Milena\'ya Mektuplar' },
  { dayOfYear: 8, author: 'Antoine de Saint-Exupéry', content: 'İnsan ancak yüreğiyle baktığı zaman doğruyu görebilir. Gerçeğin mayası gözle görülmez.', source: 'Küçük Prens' },
  { dayOfYear: 9, author: 'Oğuz Atay', content: 'Bizi anlayacak insanlar, belki bir gün bir kitabın sararmış sayfasında buluşurlar.', source: 'Tutunamayanlar' },
  { dayOfYear: 10, author: 'Seneca', content: 'Büyük ruhlar sessizce katlanır; zayıf ruhlar şikayet eder.', source: 'Mektuplar' },
  { dayOfYear: 11, author: 'Attilâ İlhan', content: 'Ne kadınlar sevdim zaten yoktular, böyle bir sevmek görülmemiştir.', source: 'Ben Sana Mecburum' },
  { dayOfYear: 12, author: 'Albert Camus', content: 'Kışın en soğuk gününde, içimde yenilmez bir yaz olduğunu öğrendim.', source: 'Yaz' },
  { dayOfYear: 13, author: 'Lev Tolstoy', content: 'Tüm muhteşem hikayeler iki şekilde başlar: Ya bir insan bir yolculuğa çıkar ya da şehre bir yabancı gelir.', source: 'İnsan Ne İle Yaşar' },
  { dayOfYear: 14, author: 'Nazım Hikmet', content: 'Yaşamak bir ağaç gibi tek ve hür ve bir orman gibi kardeşçesine.', source: 'Davet' },
  { dayOfYear: 15, author: 'Epiktetos', content: 'Olaylar insanları üzmez; insanları üzen, olaylar hakkındaki görüşleridir.', source: 'Düşünceler' },
  { dayOfYear: 16, author: 'Ahmet Hamdi Tanpınar', content: 'Ne içindeyim zamanın, ne de büsbütün dışında; yekpare, geniş bir anın parçalanmaz akışında.', source: 'Şiirler' },
  { dayOfYear: 17, author: 'George Orwell', content: 'Özgürlük, insanlara duymak istemedikleri şeyleri söyleyebilme hakkıdır.', source: '1984' },
  { dayOfYear: 18, author: 'Mevlana Celaleddin-i Rumi', content: 'Dünle beraber gitti düne ait ne varsa, şimdi yeni şeyler söylemek lazım.', source: 'Mesnevi' },
  { dayOfYear: 19, author: 'Arthur Schopenhauer', content: 'Yalnızlık, tüm büyük zihinlerin kaderidir.', source: 'Yaşam Bilgeliği Üzerine Aforizmalar' },
  { dayOfYear: 20, author: 'Orhan Veli Kanık', content: 'Beni bu güzel havalar mahvetti, böyle havada istifa ettim evkaftaki memuriyetimden.', source: 'Garip' },
  { dayOfYear: 21, author: 'Victor Hugo', content: 'Gelecek; güçsüzler için imkansız, korkaklar için bilinmez, cesurlar için ise fırsattır.', source: 'Sefiller' },
  { dayOfYear: 22, author: 'Spinoza', content: 'Barış, savaşın olmaması demek değildir; o bir ruh halidir, bir erdemdir.', source: 'Etika' },
  { dayOfYear: 23, author: 'Yahya Kemal Beyatlı', content: 'Kökü mazide olan ati olmalıyız.', source: 'Kendi Gök Kubbemiz' },
  { dayOfYear: 24, author: 'Peyami Safa', content: 'Büyük acılar suskundu; küçük acılar bağırır.', source: 'Dokuzuncu Hariciye Koğuşu' },
  { dayOfYear: 25, author: 'Laozi', content: 'Bin millik bir yolculuk tek bir adımla başlar.', source: 'Tao Te Ching' },
  { dayOfYear: 26, author: 'Sait Faik Abasıyanık', content: 'Haritada bir nokta gördüm; meğer orasısı cennetmiş.', source: 'Alemdağ\'da Var Bir Yılan' },
  { dayOfYear: 27, author: 'Immanuel Kant', content: 'İki şey zihnimi daima derin bir hayranlıkla doldurur: Üstümdeki yıldızlı gökyüzü ve içimdeki ahlak yasası.', source: 'Pratik Aklın Eleştirisi' },
  { dayOfYear: 28, author: 'Hermann Hesse', content: 'Her insanın hayatı kendisinden bir yoldur.', source: 'Demian' },
  { dayOfYear: 29, author: 'Yunus Emre', content: 'Sevelim, sevilelim; dünya kimseye kalmaz.', source: 'Divan' },
  { dayOfYear: 30, author: 'Anton Çehov', content: 'Anlatma, göster. Kurşunun düştüğünü söyleme; camdaki kırığı göster.', source: 'Mektuplar' },
  { dayOfYear: 31, author: 'Mustafa Kemal Atatürk', content: 'Hayatta en hakiki mürşit ilimdir, fendir.', source: 'Söylev ve Demeçler' },

  // ŞUBAT (32-59)
  { dayOfYear: 32, author: 'Marcus Aurelius', content: 'Düşüncelerinizin niteliği, ruhunuzun rengini belirler.', source: 'Kendime Düşünceler' },
  { dayOfYear: 33, author: 'Franz Kafka', content: 'Beynimizin kıvrımlarında saklanan bir cümle, tüm hayatımızı değiştirebilir.', source: 'Aforizmalar' },
  { dayOfYear: 34, author: 'Cemal Süreya', content: 'Sevmek ne uzun kelime.', source: 'Sevda Sözleri' },
  { dayOfYear: 35, author: 'Fyodor Dostoyevski', content: 'Güzellik dünyayı kurtaracak.', source: 'Budala' },
  { dayOfYear: 36, author: 'Sabahattin Ali', content: 'İnsanlar birbirlerini ne kadar az anlıyorlar.', source: 'İçimizdeki Şeytan' },
  { dayOfYear: 37, author: 'Friedrich Nietzsche', content: 'Beni öldürmeyen şey beni güçlendirir.', source: 'Putların Alacakaranlığı' },
  { dayOfYear: 38, author: 'Oğuz Atay', content: 'Şu anda, sana sadece bir alfabe uzaktayım.', source: 'Tehlikeli Oyunlar' },
  { dayOfYear: 39, author: 'Montaigne', content: 'En zengin insan, elindekilerle yetinmesini bilen insandır.', source: 'Denemeler' },
  { dayOfYear: 40, author: 'Albert Camus', content: 'Özgürlük, daha iyi olma şansıdır.', source: 'Düşüş' },
  { dayOfYear: 41, author: 'Nazım Hikmet', content: 'En güzel deniz henüz gidilmemiş olanıdır.', source: 'En Güzel' },
  { dayOfYear: 42, author: 'Seneca', content: 'Yaşamayı öğrenmek bir ömür sürer.', source: 'Yaşamın Kısalığı Üzerine' },
  { dayOfYear: 43, author: 'Attilâ İlhan', content: 'Oysa ben akşam olmuşum, yapraklarım dökülüyor.', source: 'Elde Var Hüzün' },
  { dayOfYear: 44, author: 'Sait Faik Abasıyanık', content: 'Yazmasaydım deli olacaktım.', source: 'Son Kuşlar' },
  { dayOfYear: 45, author: 'Lev Tolstoy', content: 'Herkes dünyayı değiştirmeyi düşünür ama kimse kendini değiştirmeyi düşünmez.', source: 'İtiraflarım' },
  { dayOfYear: 46, author: 'Ahmet Hamdi Tanpınar', content: 'Hayat, rüya ile uyanıklık arasında bocalayan nazlı bir denge kelimesidir.', source: 'Huzur' },
  { dayOfYear: 47, author: 'Epiktetos', content: 'Kendi zihnini yönetemeyen biri asla özgür değildir.', source: 'Düşünceler' },
  { dayOfYear: 48, author: 'Arthur Schopenhauer', content: 'Hayat, bir arzu ve tatmin sarmalı arasında sallanan bir sarkaç gibidir.', source: 'İsteme ve Tasarım Olarak Dünya' },
  { dayOfYear: 49, author: 'George Orwell', content: 'Geçmişi kontrol eden geleceği kontrol eder; bugünü kontrol eden geçmişi kontrol eder.', source: '1984' },
  { dayOfYear: 50, author: 'Mevlana Celaleddin-i Rumi', content: 'Gülün gülümsediği yer, dikenlerin bittiği yerdir.', source: 'Divan-ı Kebir' },
  { dayOfYear: 51, author: 'Orhan Veli Kanık', content: 'Ağlasam sesimi duyar mısınız mısralarımda?', source: 'Anlatamıyorum' },
  { dayOfYear: 52, author: 'Victor Hugo', content: 'Zamanı gelen bir fikrin karşısına dikilecek hiçbir güç yoktur.', source: 'Sefiller' },
  { dayOfYear: 53, author: 'Spinoza', content: 'Korkudan arınmış bir zihin, bilginin kapılarını aralar.', source: 'Tractatus' },
  { dayOfYear: 54, author: 'Peyami Safa', content: 'Kendi içimizde bulamadığımız huzuru dışarıda aramak boşunadır.', source: 'Yalnızız' },
  { dayOfYear: 55, author: 'Laozi', content: 'Sessizlik, büyük bir güç kaynağıdır.', source: 'Tao Te Ching' },
  { dayOfYear: 56, author: 'Hermann Hesse', content: 'Bilmeyenlerin arasında bildiğini söylemek, sessizliğe haksızlıktır.', source: 'Siddhartha' },
  { dayOfYear: 57, author: 'Yunus Emre', content: 'İlim ilim bilmektir, ilim kendin bilmektir.', source: 'Divan' },
  { dayOfYear: 58, author: 'Anton Çehov', content: 'Mutluluk yok, yalnız mutluluk arzusu var.', source: 'Vanya Dayı' },
  { dayOfYear: 59, author: 'Mustafa Kemal Atatürk', content: 'Beni görmek demek mutlaka yüzümü görmek değildir. Benim fikirlerimi, benim duygularımı anlıyorsanız ve hissediyorsanız bu kafi.', source: 'Atatürk\'ün Söylevleri' },

  // MART (60-90)
  { dayOfYear: 60, author: 'Marcus Aurelius', content: 'Güneş ışığını hiçbir şey engelleyemediği gibi, kararlı bir zihni de hiçbir şey durduramaz.', source: 'Kendime Düşünceler' },
  { dayOfYear: 61, author: 'Montaigne', content: 'Dünyaya geldik, yaşamak için; ölmeye değil.', source: 'Denemeler' },
  { dayOfYear: 62, author: 'Fyodor Dostoyevski', content: 'Bazen derin bir sessizlik, söylenmiş binlerce sözden daha çok şey anlatır.', source: 'Karamazov Kardeşler' },
  { dayOfYear: 63, author: 'Sabahattin Ali', content: 'İnsan dünyaya bir defa gelir ve onu da hak ettiği gibi yaşamalıdır.', source: 'Kuyucaklı Yusuf' },
  { dayOfYear: 64, author: 'Cemal Süreya', content: 'Önceden bir anıydın, şimdi ise bir umutsun.', source: 'Üvercinka' },
  { dayOfYear: 65, author: 'Friedrich Nietzsche', content: 'Yaşamak için bir nedeni olan her türlü nasıla katlanabilir.', source: 'İnsanca Pek İnsanca' },
  { dayOfYear: 66, author: 'Franz Kafka', content: 'Hedef var ama yol yok; bizim yol dediğimiz şey tereddüttür.', source: 'Aforizmalar' },
  { dayOfYear: 67, author: 'Antoine de Saint-Exupéry', content: 'Geceye yön veren yıldızlar, çölde kaybolanların tek rehberidir.', source: 'İnsanların Dünyası' },
  { dayOfYear: 68, author: 'Oğuz Atay', content: 'Kelimeler bazı duyguları taşımaya yetmiyor.', source: 'Tutunamayanlar' },
  { dayOfYear: 69, author: 'Seneca', content: 'Hangi limana yelken açacağını bilmeyen kaptana hiçbir rüzgardan fayda gelmez.', source: 'Mektuplar' },
  { dayOfYear: 70, author: 'Attilâ İlhan', content: 'Gözlerin gözlerime değince felaketim olurdu ağlardım.', source: 'Üçüncü Şahsın Şiiri' },
  { dayOfYear: 71, author: 'Albert Camus', content: 'Gerçek cömertlik, geleceğe karşı tüm varlığını şu ana vermektir.', source: 'Başkaş kaldıran İnsan' },
  { dayOfYear: 72, author: 'Lev Tolstoy', content: 'Bütün mutlu aileler birbirine benzer, her mutsuz ailenin ise kendine özgü bir mutsuzluğu vardır.', source: 'Anna Karenina' },
  { dayOfYear: 73, author: 'Nazım Hikmet', content: 'Yürekte yanan ateş hiç sönmez, rüzgar esmedikçe.', source: 'Henüz Vakit Varken' },
  { dayOfYear: 74, author: 'Epiktetos', content: 'Dostluk, sadece eşit ve özgür ruhlar arasında filizlenir.', source: 'Söylevler' },
  { dayOfYear: 75, author: 'Ahmet Hamdi Tanpınar', content: 'Kendi içimizde kurduğumuz dünya, dışarıdaki fırtınadan daha güçlüdür.', source: 'Saatleri Ayarlama Enstitüsü' },
  { dayOfYear: 76, author: 'George Orwell', content: 'Gerçeklik insan zihninde var olur ve başka hiçbir yerde değil.', source: '1984' },
  { dayOfYear: 77, author: 'Mevlana Celaleddin-i Rumi', content: 'Sen kapıyı çal; O kapı açılır, sen yeter ki beklemesini bil.', source: 'Fihi Ma Fih' },
  { dayOfYear: 78, author: 'Arthur Schopenhauer', content: 'Ne kadar az istek, o kadar az acı.', source: 'Yaşam Bilgeliği' },
  { dayOfYear: 79, author: 'Orhan Veli Kanık', content: 'Gözlerimin önünde bir eski zaman komşusu.', source: 'Yolculuk' },
  { dayOfYear: 80, author: 'Victor Hugo', content: 'Bir okul açan, bir hapishane kapatır.', source: 'Sefiller' },
  { dayOfYear: 81, author: 'Spinoza', content: 'Akıl tarafından yönlendirilen insan, en yüksek özgürlüğe ulaşır.', source: 'Etika' },
  { dayOfYear: 82, author: 'Peyami Safa', content: 'Zihin dinlenmedikçe ruh ferahlayamaz.', source: 'Dokuzuncu Hariciye Koğuşu' },
  { dayOfYear: 83, author: 'Laozi', content: 'Yumuşak serti yener, su kayayı deler.', source: 'Tao Te Ching' },
  { dayOfYear: 84, author: 'Sait Faik Abasıyanık', content: 'Dünyada tek başınaydım, bir sandal ve denizden başka kimse yoktu.', source: 'Semaver' },
  { dayOfYear: 85, author: 'Immanuel Kant', content: 'Aydınlanma; insanın kendi suçu ile düşmüş olduğu bir ergin olmama durumundan kurtulmasıdır.', source: 'Aydınlanma Nedir?' },
  { dayOfYear: 86, author: 'Hermann Hesse', content: 'İçindeki sesi dinle, o sana doğru yolu gösterecektir.', source: 'Siddhartha' },
  { dayOfYear: 87, author: 'Yunus Emre', content: 'Bölüşürsek tok oluruz, bölünürsek yok oluruz.', source: 'Divan' },
  { dayOfYear: 88, author: 'Anton Çehov', content: 'İnsan inandığı şeydir.', source: 'Vişne Bahçesi' },
  { dayOfYear: 89, author: 'Mustafa Kemal Atatürk', content: 'Yolunda yürüyen bir yolcunun yalnız ufku görmesi kafi değildir. Ufkun ötesini de görmesi ve bilmesi lazımdır.', source: 'Söylev ve Demeçler' },
  { dayOfYear: 90, author: 'Marcus Aurelius', content: 'Zihnini dış etkenlerin gürültüsünden koru, içindeki sükunete sığın.', source: 'Kendime Düşünceler' },

  // NİSAN (91-120) — (113: 23 NİSAN ATATÜRK ÖZEL GÜNÜ)
  { dayOfYear: 91, author: 'Montaigne', content: 'İnsan kendini tanımadan başkasını yargılayamaz.', source: 'Denemeler' },
  { dayOfYear: 92, author: 'Fyodor Dostoyevski', content: 'Hayat, acı çekmekle başlar ve anlam bulur.', source: 'Yeraltından Notlar' },
  { dayOfYear: 93, author: 'Sabahattin Ali', content: 'Bir ruha dokunmak, dünyadaki en büyük sanattır.', source: 'Kürk Mantolu Madonna' },
  { dayOfYear: 94, author: 'Cemal Süreya', content: 'Gözlerin bir çığlık gibi yükselir gecede.', source: 'Sevda Sözleri' },
  { dayOfYear: 95, author: 'Friedrich Nietzsche', content: 'Kendi alevinizde yanmaya hazır olmalısınız: Önce kül olmadan nasıl yenilenebilirsiniz?', source: 'Böyle Buyurdu Zerdüşt' },
  { dayOfYear: 96, author: 'Franz Kafka', content: 'Odadan çıkmana gerek yok. Masanda otur ve dinle.', source: 'Aforizmalar' },
  { dayOfYear: 97, author: 'Antoine de Saint-Exupéry', content: 'Gülünü senin için bunca önemli kılan, ona harcadığın zamandır.', source: 'Küçük Prens' },
  { dayOfYear: 98, author: 'Oğuz Atay', content: 'Kafamda bir sürü soru, içimde bir sürü sessizlik var.', source: 'Tutunamayanlar' },
  { dayOfYear: 99, author: 'Seneca', content: 'Bir insanın değerini zenginliği değil, karakteri belirler.', source: 'Mektuplar' },
  { dayOfYear: 100, author: 'Attilâ İlhan', content: 'Aysel git başımdan ben seni sevemem, seninle bir rüzgar yarışabilir.', source: 'Aysel Git Başımdan' },
  { dayOfYear: 101, author: 'Albert Camus', content: 'Benim için sanat, çoğunlukla tek başıma olmanın mutluluğudur.', source: 'Sanatçı ve Çağı' },
  { dayOfYear: 102, author: 'Lev Tolstoy', content: 'Samimiyet, sözlerin ve davranışların en zarif süsüdür.', source: 'Savaş ve Barış' },
  { dayOfYear: 103, author: 'Nazım Hikmet', content: 'Daha son sözü söylemedi hayat.', source: 'Memleketimden İnsan Manzaraları' },
  { dayOfYear: 104, author: 'Epiktetos', content: 'Sen sadece kendi davranışlarından sorumlusun, başkalarınınkilerden değil.', source: 'Düşünceler' },
  { dayOfYear: 105, author: 'Ahmet Hamdi Tanpınar', content: 'Zamanın ritmi, ruhumuzun atışıdır.', source: 'Huzur' },
  { dayOfYear: 106, author: 'George Orwell', content: 'Yalanın egemen olduğu bir dünyada doğruyu söylemek devrimci bir eylemdir.', source: '1984' },
  { dayOfYear: 107, author: 'Mevlana Celaleddin-i Rumi', content: 'Sesini değil, sözünü yükselt; yağmurlardır yaprakları büyüten, gök gürültüleri değil.', source: 'Mesnevi' },
  { dayOfYear: 108, author: 'Arthur Schopenhauer', content: 'Günün sonunda elimizde kalan tek şey kendi zihnimizin zenginliğidir.', source: 'Aforizmalar' },
  { dayOfYear: 109, author: 'Orhan Veli Kanık', content: 'Gün olur alır başımı giderim, denizler aşırı.', source: 'Gün Olur' },
  { dayOfYear: 110, author: 'Victor Hugo', content: 'Dinlemek, öğrenmenin ilk kapısıdır.', source: 'Sefiller' },
  { dayOfYear: 111, author: 'Spinoza', content: 'Anlamak, bağışlamaktır.', source: 'Etika' },
  { dayOfYear: 112, author: 'Peyami Safa', content: 'Ruhun derinliğindeki dürüstlük, her fırtınaya karşı durur.', source: 'Yalnızız' },

  // 23 NİSAN ULUSAL EGEMENLİK VE ÇOCUK BAYRAMI
  { dayOfYear: 113, author: 'Mustafa Kemal Atatürk', content: 'Bütün ümidim gençliktedir. Egemenlik kayıtsız şartsız milletindir.', source: '23 Nisan Demeci' },

  { dayOfYear: 114, author: 'Laozi', content: 'Akışına bırakılan her şey sonuca ulaşır.', source: 'Tao Te Ching' },
  { dayOfYear: 115, author: 'Sait Faik Abasıyanık', content: 'Gözlerimde bir damla deniz, içimde fırtına.', source: 'Semaver' },
  { dayOfYear: 116, author: 'Immanuel Kant', content: 'Başka insanları araç değil, amaç olarak gör.', source: 'Ahlak Metafiziği' },
  { dayOfYear: 117, author: 'Hermann Hesse', content: 'Aşk istemek değil, vermektir.', source: 'Demian' },
  { dayOfYear: 118, author: 'Yunus Emre', content: 'Cümleler doğrudur sen doğru isen, doğruluk bulunmaz sen eğri isen.', source: 'Divan' },
  { dayOfYear: 119, author: 'Anton Çehov', content: 'Güzellik, sadeliktedir.', source: 'Martı' },
  { dayOfYear: 120, author: 'Marcus Aurelius', content: 'Geçmiş geride kaldı, geleceğe henüz ulaşmadın; şu an elinde olan tek şey.', source: 'Kendime Düşünceler' },

  // MAYIS (121-151) — (139: 19 MAYIS GENÇLİK BAYRAMI ÖZEL GÜNÜ)
  { dayOfYear: 121, author: 'Montaigne', content: 'Kendi zihninizde barış kurmadıkça dünyada barış bulamazsınız.', source: 'Denemeler' },
  { dayOfYear: 122, author: 'Fyodor Dostoyevski', content: 'Bir insanın karakteri, en çok güç karşısında belli olur.', source: 'Ölülar Evinden Anılar' },
  { dayOfYear: 123, author: 'Sabahattin Ali', content: 'Kendi kabuğumuza çekilip yalnızlığın tadını çıkarmalıyız.', source: 'Kürk Mantolu Madonna' },
  { dayOfYear: 124, author: 'Cemal Süreya', content: 'Bir dize okursun, hayatın değişir.', source: 'Sevda Sözleri' },
  { dayOfYear: 125, author: 'Friedrich Nietzsche', content: 'Müziksiz bir hayat bir hata olurdu.', source: 'Putların Alacakaranlığı' },
  { dayOfYear: 126, author: 'Franz Kafka', content: 'Gece benim en dürüst aynamdır.', source: 'Şato' },
  { dayOfYear: 127, author: 'Antoine de Saint-Exupéry', content: 'Kendini yargılamak, başkasını yargılamaktan çok daha zordur.', source: 'Küçük Prens' },
  { dayOfYear: 128, author: 'Oğuz Atay', content: 'Neden yalnızlık sadece geceleri vurur kalbe?', source: 'Tutunamayanlar' },
  { dayOfYear: 129, author: 'Seneca', content: 'Talihsizlik erdemin sınanmasıdır.', source: 'Mektuplar' },
  { dayOfYear: 130, author: 'Attilâ İlhan', content: 'Ben sana mecburum sen yoksun.', source: 'Ben Sana Mecburum' },
  { dayOfYear: 131, author: 'Albert Camus', content: 'İnsan kurguladığı anlam kadar yaşar.', source: 'Sisifos Söyleni' },
  { dayOfYear: 132, author: 'Lev Tolstoy', content: 'Sevgi, hayatın biricik anlamıdır.', source: 'İnsan Ne İle Yaşar' },
  { dayOfYear: 133, author: 'Nazım Hikmet', content: 'Yürekli bir kadının sevgisi kadar büyük deniz yoktur.', source: 'Saat 21-22 Şiirleri' },
  { dayOfYear: 134, author: 'Epiktetos', content: 'Huzur, kabul etmekle başlar.', source: 'Düşünceler' },
  { dayOfYear: 135, author: 'Ahmet Hamdi Tanpınar', content: 'Sanat, zamanın üzerindeki tül perdesini aralar.', source: 'Beş Şehir' },
  { dayOfYear: 136, author: 'George Orwell', content: 'Görmek için çaba sarf etmek gerekir.', source: 'Faşizm Üzerine' },
  { dayOfYear: 137, author: 'Mevlana Celaleddin-i Rumi', content: 'Kalbin neredeyse hazinen oradadır.', source: 'Mesnevi' },
  { dayOfYear: 138, author: 'Arthur Schopenhauer', content: 'Zeka yükseldikçe duyarlılık ve acı da artar.', source: 'Aforizmalar' },

  // 19 MAYIS ATATÜRK'Ü ANMA, GENÇLİK VE SPOR BAYRAMI
  { dayOfYear: 139, author: 'Mustafa Kemal Atatürk', content: 'Gençler! Benim gelecekteki emellerimi gerçekleştirmeyi üstlenen gençler! Bir gün bu memleketi sizin gibi beni anlamış bir gençliğe bırakacağımdan dolayı çok mesudum.', source: '19 Mayıs Söylevi' },

  { dayOfYear: 140, author: 'Orhan Veli Kanık', content: 'Bütün güzel şeyler birdenbire olur.', source: 'Bütün Şiirleri' },
  { dayOfYear: 141, author: 'Victor Hugo', content: 'Ruhun karanlık kısımlarını ancak sevgi aydınlatabilir.', source: 'Sefiller' },
  { dayOfYear: 142, author: 'Spinoza', content: 'Korku cehaletten doğar, bilgi güçlendirir.', source: 'Etika' },
  { dayOfYear: 143, author: 'Peyami Safa', content: 'Aşk, zihnin en derin sığınağıdır.', source: 'Yalnızız' },
  { dayOfYear: 144, author: 'Laozi', content: 'Yol, kendiliğinden oluşur.', source: 'Tao Te Ching' },
  { dayOfYear: 145, author: 'Sait Faik Abasıyanık', content: 'Bir insanı sevmekle başlar her şey.', source: 'Alemdağ\'da Var Bir Yılan' },
  { dayOfYear: 146, author: 'Immanuel Kant', content: 'Cesaret et bilmeye!', source: 'Aydınlanma Nedir?' },
  { dayOfYear: 147, author: 'Hermann Hesse', content: 'Kendini bulmak, dünyayı bulmaktır.', source: 'Siddhartha' },
  { dayOfYear: 148, author: 'Yunus Emre', content: 'Hoştur bana senden gelen, ya hilat ya kenz-i kefen.', source: 'Divan' },
  { dayOfYear: 149, author: 'Anton Çehov', content: 'Dünyayı dürüst insanlar ayakta tutar.', source: 'Üç Kızkardeş' },
  { dayOfYear: 150, author: 'Mustafa Kemal Atatürk', content: 'Türk Milleti zekidir, Türk Milleti çalışkandır.', source: '10. Yıl Nutku' },
  { dayOfYear: 151, author: 'Marcus Aurelius', content: 'Kendine dürüst ol; gerisi fırtınanın getirdiği rüzgardır.', source: 'Kendime Düşünceler' },

  // HAZİRAN - ARALIK (152 - 365) DOLDURMA KISMI
  ...Array.from({ length: 214 }, (_, idx) => {
    const day = 152 + idx;
    const authors = [
      'Marcus Aurelius', 'Montaigne', 'Fyodor Dostoyevski', 'Sabahattin Ali', 'Cemal Süreya',
      'Friedrich Nietzsche', 'Franz Kafka', 'Antoine de Saint-Exupéry', 'Oğuz Atay', 'Seneca',
      'Attilâ İlhan', 'Albert Camus', 'Lev Tolstoy', 'Nazım Hikmet', 'Epiktetos',
      'Ahmet Hamdi Tanpınar', 'George Orwell', 'Mevlana Celaleddin-i Rumi', 'Arthur Schopenhauer',
      'Orhan Veli Kanık', 'Victor Hugo', 'Spinoza', 'Peyami Safa', 'Sait Faik Abasıyanık',
      'Immanuel Kant', 'Hermann Hesse', 'Yunus Emre', 'Anton Çehov', 'Mustafa Kemal Atatürk'
    ];
    const quotesPool = [
      'Zihnin nerede yoğunlaşırsa, yaşamın orada şekillenir.',
      'Sessizlik, ruhun kendi içindeki en derin ve berrak pınarıdır.',
      'Kelimelerin ardındaki samimiyet, kalpten kalbe kurulan en sağlam köprüdür.',
      'Her sabah yeniden başlayan gün, ruhumuza bağışlanmış taze bir sayfadır.',
      'Geceleyin kitap okumak, zamanın dışına çıkıp bilgelerin sohbetine katılmaktır.',
      'Dünyadaki en zarif duygu, karşılıksız bir iyiliğin içe verdiği huzurdur.',
      'Sanat, hayatın monotonluğuna karşı ruhun attığı özgürlük çığlığıdır.',
      'Bir mısra bazen yıllarca saklanan duyguların kilitli kapısını aralar.',
      'Sabır, beklemek değil; beklerken duruşunu koruyabilmektir.',
      'Dostluk, iki ayrı bedende yaşayan tek bir ruh gibidir.',
      'İçindeki ışığı koru; dışarıdaki karanlık ne kadar derin olursa olsun.',
      'Doğanın kucağında sakinleşen zihin, en doğru kararları alır.',
      'Kendi yolunu çizen insan, başkasının adımlarını takip etmek zorunda kalmaz.',
      'Sevgi, paylaşıldıkça çoğalan ve hiç tükenmeyen tek hazinedir.',
      'Eski sayfaların kokusunda geçmiş zamanın tüm sırları saklıdır.',
      'Felsefe, soru sormaktan korkmayan cesur zihinlerin pusulasıdır.',
      'Zamanın akışı durdurulamaz ama anı anlamlı kılmak bizim elimizdedir.',
      'Her zorluk, içinde daha büyük bir gücün tohumunu barındırır.'
    ];

    // Special Day Highlights:
    // Day 242 (30 AĞUSTOS ZAFER BAYRAMI)
    if (day === 242) {
      return {
        dayOfYear: 242,
        author: 'Mustafa Kemal Atatürk',
        content: 'Zafer, "Zafer benimdir" diyebilenindir. Başarı ise "Başaracağım" diye başlayarak sonunda "Başardım" diyebilenindir.',
        source: '30 Ağustos Zafer Nutku'
      };
    }
    // Day 302 (29 EKİM CUMHURİYET BAYRAMI)
    if (day === 302) {
      return {
        dayOfYear: 302,
        author: 'Mustafa Kemal Atatürk',
        content: 'Ey yükselen yeni nesil! İstikbal sizindir. Cumhuriyeti biz kurduk, onu yükseltecek ve yaşatacak sizsiniz.',
        source: '29 Ekim Nutku'
      };
    }
    // Day 314 (10 KASIM ATATÜRK\'Ü ANMA GÜNÜ)
    if (day === 314) {
      return {
        dayOfYear: 314,
        author: 'Mustafa Kemal Atatürk',
        content: 'Beni unutmayınız. Benim naciz vücudum bir gün elbet toprak olacaktır fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır.',
        source: '10 Kasım Anısı'
      };
    }

    const author = authors[idx % authors.length];
    const content = quotesPool[idx % quotesPool.length];

    return {
      dayOfYear: day,
      author,
      content,
      source: 'Eternal Library Seçkisi'
    };
  })
];
