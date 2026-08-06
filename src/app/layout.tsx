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
      <body className="antialiased bg-[#090d16] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
