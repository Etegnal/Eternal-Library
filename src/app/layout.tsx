import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientAudio from '@/components/AmbientAudio';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Eternal Library | Sıcak Lo-Fi Edebiyat & Blog Platformu',
  description: 'Sıcak ahşap tonları, loş şömine ateşi ve eski kitap kokuları eşliğinde kişisel blog, denemeler, şiirler ve 365 günlük ilham sözleri.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#362215] antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AmbientAudio />
        </Providers>
      </body>
    </html>
  );
}
