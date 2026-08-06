import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Market1 - Universal AI & Utility Platform',
  description: 'The world\'s most complete AI, productivity, and utility platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Market1 OS (Project Atlas). Enterprise Tool Engine.</p>
        </footer>
      </body>
    </html>
  );
}
