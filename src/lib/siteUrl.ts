export function getSiteUrl(): string {
  // If NEXTAUTH_URL is defined and is not local localhost, use it
  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes('localhost')) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, '');
  }

  // Vercel production URL variable
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`;
  }

  // Exact assigned production domain on Vercel
  return 'https://eternal-library-phi.vercel.app';
}
