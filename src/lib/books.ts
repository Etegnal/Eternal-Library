/**
 * Open Library API & Books Service Library
 */

export interface OpenLibrarySearchResult {
  key: string; // e.g. "/works/OL27448W"
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  ratings_average?: number;
  ratings_count?: number;
  number_of_pages_median?: number;
  subject?: string[];
}

export interface FormattedBook {
  googleBookId?: string | null; // used as unique key or Open Library key
  workKey: string;
  isbn10?: string | null;
  isbn13?: string | null;
  title: string;
  subtitle?: string | null;
  authors: string;
  publisher?: string | null;
  publishedDate?: string | null;
  description?: string | null;
  pageCount?: number | null;
  categories: string;
  averageRating?: number | null;
  ratingsCount?: number | null;
  thumbnailUrl?: string | null;
  largeCoverUrl?: string | null;
  previewUrl?: string | null;
}

export const LOFI_BOOK_PLACEHOLDER =
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

/**
 * Strips HTML and Markdown tags from description strings
 */
export function stripHtml(html?: string | null): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\[\d+\]/g, '')
    .trim();
}

/**
 * Generates Open Library Cover URL from cover_i ID or ISBN
 */
export function getOpenLibraryCoverUrl(coverId?: number | null, isbn?: string | null): string {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
  if (isbn) {
    const cleanIsbn = isbn.replace(/[^0-9X]/gi, '');
    return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
  }
  return LOFI_BOOK_PLACEHOLDER;
}

/**
 * Generates search/affiliate redirect links for Amazon TR, Kitapyurdu, and D&R
 */
export function generateStoreLinks(book: {
  title: string;
  authors?: string | null;
  isbn13?: string | null;
  isbn10?: string | null;
}) {
  const searchQuery = book.isbn13 || book.isbn10 || `${book.title} ${book.authors || ''}`.trim();
  const encodedQuery = encodeURIComponent(searchQuery);
  const encodedTitle = encodeURIComponent(book.title);

  return [
    {
      platform: 'amazon',
      name: 'Amazon TR',
      url: `https://www.amazon.com.tr/s?k=${encodedQuery}`,
      color: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      platform: 'kitapyurdu',
      name: 'Kitapyurdu',
      url: `https://www.kitapyurdu.com/index.php?route=product/search&filter_name=${encodedTitle}`,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      platform: 'dr',
      name: 'D&R',
      url: `https://www.dr.com.tr/search?q=${encodedTitle}`,
      color: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
  ];
}

/**
 * Search Books on Open Library API
 * Endpoint: https://openlibrary.org/search.json?q={query}&limit=10&fields=...
 */
export async function searchBooks(query: string): Promise<FormattedBook[]> {
  if (!query || !query.trim()) return [];

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const fields = 'key,title,author_name,first_publish_year,isbn,cover_i,ratings_average,ratings_count,number_of_pages_median,subject';
    const url = `https://openlibrary.org/search.json?q=${encodedQuery}&limit=10&fields=${fields}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'EternalLibrary/1.0 (contact@eternallibrary.com)',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Open Library Search Error: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    if (!data.docs || !Array.isArray(data.docs)) return [];

    return data.docs.map((doc: OpenLibrarySearchResult) => {
      const isbn13 = doc.isbn?.find((i) => i.length === 13) || doc.isbn?.[0] || null;
      const isbn10 = doc.isbn?.find((i) => i.length === 10) || doc.isbn?.[0] || null;

      const coverUrl = getOpenLibraryCoverUrl(doc.cover_i, doc.isbn?.[0]);
      const categories = doc.subject && doc.subject.length > 0
        ? doc.subject.slice(0, 3).join(', ')
        : 'Genel Edebiyat';

      const workKey = doc.key; // e.g. "/works/OL27448W"
      const cleanId = workKey.replace('/works/', '');

      return {
        googleBookId: cleanId,
        workKey,
        isbn10,
        isbn13,
        title: doc.title || 'İsimsiz Eser',
        authors: doc.author_name ? doc.author_name.join(', ') : 'Bilinmeyen Yazar',
        publisher: 'Open Library Arşivi',
        publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : null,
        description: null, // Fetched lazily or via getBookDetails
        pageCount: doc.number_of_pages_median || null,
        categories,
        averageRating: doc.ratings_average ? Number(doc.ratings_average.toFixed(1)) : null,
        ratingsCount: doc.ratings_count || null,
        thumbnailUrl: coverUrl,
        largeCoverUrl: coverUrl,
        previewUrl: `https://openlibrary.org${workKey}`,
      };
    });
  } catch (error) {
    console.error('Error fetching from Open Library Search API:', error);
    return [];
  }
}

/**
 * Fetch Deep Book Details & Description from Open Library Work Endpoint
 * Endpoint: https://openlibrary.org{workKey}.json
 */
export async function getBookDetails(workKey: string): Promise<string> {
  const cleanKey = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
  const DEFAULT_DESCRIPTION = 'Bu eser için özet kütüphane arşivine henüz eklenmemiştir.';

  try {
    const url = `https://openlibrary.org${cleanKey}.json`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'EternalLibrary/1.0 (contact@eternallibrary.com)',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return DEFAULT_DESCRIPTION;

    const data = await res.json();
    let rawDesc = data.description;

    if (!rawDesc) return DEFAULT_DESCRIPTION;

    // Handle object vs string response format
    if (typeof rawDesc === 'object') {
      rawDesc = rawDesc.value || rawDesc.string || '';
    }

    const cleanDesc = stripHtml(String(rawDesc));
    return cleanDesc || DEFAULT_DESCRIPTION;
  } catch (error) {
    console.error('Error fetching Open Library book details:', error);
    return DEFAULT_DESCRIPTION;
  }
}
