/**
 * Intelligently chunks long text into readable pages.
 * - If explicit '---' delimiter is present, splits by '---'.
 * - Otherwise, chunks text by paragraphs (~1000-1300 characters per page)
 *   preserving paragraph and sentence boundaries so text is never cut in half.
 */
export function chunkTextIntoPages(text: string, maxCharsPerPage = 1200): string[] {
  if (!text || !text.trim()) return [];

  // If explicit '---' separator is used by the admin, respect it
  if (text.includes('---')) {
    const rawParts = text.split(/---/).map((p) => p.trim()).filter(Boolean);
    if (rawParts.length > 0) return rawParts;
  }

  // Split into paragraphs
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length <= 1 && text.length <= maxCharsPerPage) {
    return [text.trim()];
  }

  const pages: string[] = [];
  let currentPage = '';

  for (const para of paragraphs) {
    // If adding this paragraph fits in current page
    if ((currentPage.length + para.length + 2) <= maxCharsPerPage) {
      currentPage += (currentPage ? '\n\n' : '') + para;
    } else {
      if (currentPage) {
        pages.push(currentPage.trim());
      }

      // If single paragraph is exceptionally long, split by sentences
      if (para.length > maxCharsPerPage) {
        const sentences = para.match(/[^.!?]+[.!?]+(\s+|$)/g) || [para];
        let sentencePage = '';

        for (const sentence of sentences) {
          if ((sentencePage.length + sentence.length) <= maxCharsPerPage) {
            sentencePage += sentence;
          } else {
            if (sentencePage) pages.push(sentencePage.trim());
            sentencePage = sentence;
          }
        }
        currentPage = sentencePage.trim();
      } else {
        currentPage = para;
      }
    }
  }

  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }

  return pages.length > 0 ? pages : [text.trim()];
}
