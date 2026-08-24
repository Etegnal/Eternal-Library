import { prisma } from './prisma';

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return Math.min(Math.max(day, 1), 366);
}

export async function getTodayQuote(dayOverride?: number) {
  const targetDay = dayOverride || getDayOfYear();
  
  try {
    const quote = await prisma.dailyQuote.findUnique({
      where: { dayOfYear: targetDay },
    });

    if (quote) return quote;

    // Fallback if not found
    const firstQuote = await prisma.dailyQuote.findFirst();
    return firstQuote || {
      id: 'fallback',
      dayOfYear: targetDay,
      quote: "Dünyayı güzellik kurtaracak, bir insanı sevmekle başlayacak her şey.",
      author: "Sait Faik Abasıyanık",
      book: "Alemdağ'da Var Bir Yılan"
    };
  } catch (error) {
    console.error("Error fetching daily quote:", error);
    return {
      id: 'fallback-error',
      dayOfYear: targetDay,
      quote: "İçimde çok erken büyümüş bir çocuk, dışımda hiç büyümemiş bir adam var.",
      author: "Sabahattin Ali",
      book: "Kürk Mantolu Madonna"
    };
  }
}
