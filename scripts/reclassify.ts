import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

export const CATEGORY_MAPPINGS: Record<string, string> = {
  // Bilim Kurgu & Distopya
  '1984': 'Bilim Kurgu & Distopya',
  'cesur-yeni-dunya': 'Bilim Kurgu & Distopya',
  'hayvan-ciftligi': 'Bilim Kurgu & Distopya',
  'dune': 'Bilim Kurgu & Distopya',
  'yildiz-gezgini': 'Bilim Kurgu & Distopya',
  'gorunmez-adam': 'Bilim Kurgu & Distopya',
  'algernona-cicekler': 'Bilim Kurgu & Distopya',
  'kopek-kalbi': 'Bilim Kurgu & Distopya',
  'insanlar': 'Bilim Kurgu & Distopya',

  // Fantastik
  'yuzuklerin-efendisi': 'Fantastik',
  'taht-oyunlari': 'Fantastik',
  'krallarin-carpismasi-kisim-1': 'Fantastik',
  'krallarin-carpismasi-kisim-2': 'Fantastik',
  'kiliclarin-firtinasi-kisim-1': 'Fantastik',
  'kiliclarin-firtinasi-kisim-2': 'Fantastik',
  'kargalarin-ziyafeti-kisim-1': 'Fantastik',
  'kargalarin-ziyafeti-kisim-2': 'Fantastik',
  'ejderhalarin-dansi-kisim-1': 'Fantastik',
  'ejderhalarin-dansi-kisim-2': 'Fantastik',
  'ates-ve-kan': 'Fantastik',
  'yedi-krallik-sovalyesi': 'Fantastik',
  'buz-ve-atesin-dunyasi': 'Fantastik',
  'ruzgrin-adi-kral-katili-guncesi-birinci-gun': 'Fantastik',
  'the-witcher': 'Fantastik',
  'silber': 'Fantastik',
  'secilmis': 'Fantastik',
  'gece-yarisi-kutuphanesi': 'Fantastik',
  'gece-yarisi-treni': 'Fantastik',

  // Dünya Klasikleri
  'suc-ve-ceza': 'Dünya Klasikleri',
  'karamazov-kardesler': 'Dünya Klasikleri',
  'yeraltindan-notlar': 'Dünya Klasikleri',
  'beyaz-geceler': 'Dünya Klasikleri',
  'don-kisot': 'Dünya Klasikleri',
  'sefiller': 'Dünya Klasikleri',
  'altinci-kogus': 'Dünya Klasikleri',
  'bir-idam-mahkumunun-son-gunu': 'Dünya Klasikleri',
  'dorian-grayin-portresi': 'Dünya Klasikleri',
  'genc-wertherin-acilari': 'Dünya Klasikleri',
  'ugultulu-tepeler': 'Dünya Klasikleri',
  'donusum': 'Dünya Klasikleri',
  'gizli-bahce': 'Dünya Klasikleri',
  'kucuk-prens': 'Dünya Klasikleri',
  'yersiz-yurtsuz-bir-cocuk': 'Dünya Klasikleri',

  // Türk Klasikleri
  'kuyucakli-yusuf': 'Türk Klasikleri',
  'calikusu': 'Türk Klasikleri',
  'fatih-harbiye': 'Türk Klasikleri',
  'tutunamayanlar': 'Türk Klasikleri',

  // Öykü & Deneme
  'luzumsuz-adam': 'Öykü & Deneme',
  'sahmerdan': 'Öykü & Deneme',
  'insan-ne-ile-yasar': 'Öykü & Deneme',

  // Felsefe & Düşünce
  'devlet': 'Felsefe & Düşünce',
  'kendime-dusunceler': 'Felsefe & Düşünce',
  'denemeler': 'Felsefe & Düşünce',
  'etika': 'Felsefe & Düşünce',
  'savas-sanati': 'Felsefe & Düşünce',
  'yasam-bilgeligi-uzerine-aforizmalar': 'Felsefe & Düşünce',
  'beyaz-zambaklar-ulkesi': 'Felsefe & Düşünce',
  'siddhartha': 'Felsefe & Düşünce',
  'bozkirkurdu': 'Felsefe & Düşünce',
  'yabanci': 'Felsefe & Düşünce',
  'veba': 'Felsefe & Düşünce',
  'simyaci': 'Felsefe & Düşünce',

  // Psikoloji & Dram
  'satranc': 'Psikoloji & Dram',
  'olaganustu-bir-gece': 'Psikoloji & Dram',
  'bilinmeyen-bir-kadinin-mektubu': 'Psikoloji & Dram',
  'insanin-anlam-arayisi': 'Psikoloji & Dram',
  'yanilgi': 'Psikoloji & Dram',

  // Tarih & Tarihi Kurgu
  'koku': 'Tarih & Tarihi Kurgu',
  'bin-muhtesem-gunes': 'Tarih & Tarihi Kurgu',
  'ben-kirke': 'Tarih & Tarihi Kurgu',
  'bin-gemi': 'Tarih & Tarihi Kurgu',
  'kirik-muhur': 'Tarih & Tarihi Kurgu',

  // Biyografi & Otobiyografi
  'seker-portakali': 'Biyografi & Otobiyografi',
  'martin-eden': 'Biyografi & Otobiyografi',
  'mutsuzluga-doyum': 'Biyografi & Otobiyografi',

  // Korku & Polisiye
  'hayvan-mezarligi': 'Korku & Polisiye',
  'sapik': 'Korku & Polisiye',
  'trendeki-kiz': 'Korku & Polisiye',

  // Mizah & Hiciv
  'intihar-dukkni': 'Mizah & Hiciv',
  'tikanma': 'Mizah & Hiciv',

  // Şiir
  'hasretinden-prangalar-eskittim': 'Şiir',

  // Roman
  'korluk': 'Roman',
  'mutluluk': 'Roman',
  'bekle-beni': 'Roman',
};

async function main() {
  console.log('Starting book category reclassification...');
  const books = await prisma.book.findMany();
  let updatedCount = 0;

  for (const book of books) {
    const cleanSlug = book.slug.trim();
    let newCategory = CATEGORY_MAPPINGS[cleanSlug];

    if (!newCategory) {
      // Fallback matching by title or current category
      const currentCat = book.category;
      if (currentCat.includes('Fantastik') || currentCat.includes('Fantazi')) {
        newCategory = 'Fantastik';
      } else if (currentCat.includes('Distopya') || currentCat.includes('Bilim Kurgu')) {
        newCategory = 'Bilim Kurgu & Distopya';
      } else if (currentCat.includes('Felsefe')) {
        newCategory = 'Felsefe & Düşünce';
      } else if (currentCat.includes('Psikoloji')) {
        newCategory = 'Psikoloji & Dram';
      } else if (currentCat.includes('Tarihi')) {
        newCategory = 'Tarih & Tarihi Kurgu';
      } else if (currentCat.includes('Öykü')) {
        newCategory = 'Öykü & Deneme';
      } else if (currentCat.includes('Biyografi')) {
        newCategory = 'Biyografi & Otobiyografi';
      } else if (currentCat.includes('Korku')) {
        newCategory = 'Korku & Polisiye';
      } else if (currentCat.includes('Türk')) {
        newCategory = 'Türk Klasikleri';
      } else if (currentCat.includes('Klasik')) {
        newCategory = 'Dünya Klasikleri';
      } else {
        newCategory = 'Roman';
      }
    }

    await prisma.book.update({
      where: { id: book.id },
      data: { category: newCategory },
    });
    updatedCount++;
  }

  console.log(`Successfully updated ${updatedCount} books in PostgreSQL DB!`);

  // Check unique categories after update
  const updatedBooks = await prisma.book.findMany({ select: { category: true } });
  const uniqueCategories = [...new Set(updatedBooks.map((b) => b.category))];
  console.log('NEW CLEAN CATEGORIES IN DB:', uniqueCategories);
}

main().catch(console.error).finally(() => process.exit());
