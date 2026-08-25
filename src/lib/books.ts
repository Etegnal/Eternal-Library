/**
 * Books Helper Library & Google Books API Integration
 */

export interface GoogleBookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: { type: string; identifier: string }[];
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  previewLink?: string;
}

export interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

/**
 * Strips HTML tags from text strings
 */
export function stripHtml(html?: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Ensures image URLs use HTTPS protocol
 */
export function ensureHttps(url?: string): string | null {
  if (!url) return null;
  return url.replace(/^http:/, 'https:');
}

/**
 * Generates Open Library cover URL fallback using ISBN13 or ISBN10
 */
export function getOpenLibraryCoverUrl(isbn13?: string | null, isbn10?: string | null): string | null {
  const isbn = isbn13 || isbn10;
  if (!isbn) return null;
  const cleanIsbn = isbn.replace(/[^0-9X]/gi, '');
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
}

/**
 * Generates store search/affiliate redirect links for Amazon, Kitapyurdu, and D&R
 */
export function generateAffiliateLinks(book: {
  title: string;
  authors?: string | null;
  isbn13?: string | null;
  isbn10?: string | null;
}) {
  const searchQuery = book.isbn13 || book.isbn10 || `${book.title} ${book.authors || ''}`.trim();
  const encodedQuery = encodeURIComponent(searchQuery);

  return [
    {
      platform: 'amazon',
      name: 'Amazon.com.tr',
      url: `https://www.amazon.com.tr/s?k=${encodedQuery}`,
      color: 'bg-amber-500 hover:bg-amber-600 text-white',
    },
    {
      platform: 'kitapyurdu',
      name: 'Kitapyurdu',
      url: `https://www.kitapyurdu.com/index.php?route=product/search&filter_name=${encodedQuery}`,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      platform: 'dr',
      name: 'D&R',
      url: `https://www.dr.com.tr/search?q=${encodedQuery}`,
      color: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
  ];
}

/**
 * Fetches and formats books from Google Books API
 */
export async function fetchGoogleBooks(query: string, maxResults: number = 10) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&langRestrict=tr&maxResults=${maxResults}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items)) return [];

    return data.items.map((item: GoogleBookItem) => {
      const info = item.volumeInfo;

      let isbn10: string | null = null;
      let isbn13: string | null = null;

      if (info.industryIdentifiers) {
        for (const id of info.industryIdentifiers) {
          if (id.type === 'ISBN_13') isbn13 = id.identifier;
          if (id.type === 'ISBN_10') isbn10 = id.identifier;
        }
      }

      const rawThumbnail = info.imageLinks?.extraLarge || info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
      const thumbnailUrl = ensureHttps(rawThumbnail);
      const fallbackCoverUrl = getOpenLibraryCoverUrl(isbn13, isbn10);

      return {
        googleBookId: item.id,
        isbn10,
        isbn13,
        title: info.title || 'İsimsiz Kitap',
        subtitle: info.subtitle || null,
        authors: Array.isArray(info.authors) ? info.authors.join(', ') : 'Bilinmeyen Yazar',
        publisher: info.publisher || null,
        publishedDate: info.publishedDate || null,
        description: stripHtml(info.description),
        pageCount: info.pageCount || null,
        categories: Array.isArray(info.categories) ? info.categories.join(', ') : 'Genel',
        averageRating: info.averageRating || 0,
        ratingsCount: info.ratingsCount || 0,
        thumbnailUrl: thumbnailUrl || fallbackCoverUrl,
        largeCoverUrl: fallbackCoverUrl || thumbnailUrl,
        previewUrl: info.previewLink ? ensureHttps(info.previewLink) : null,
      };
    });
  } catch (error) {
    console.error('Google Books API error:', error);
    return [];
  }
}
