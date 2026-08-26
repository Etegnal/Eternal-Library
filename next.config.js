/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'books.google.com' },
      { protocol: 'https', hostname: 'books.google.com.tr' },
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'openlibrary.org' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'spotifycdn.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

module.exports = nextConfig;
