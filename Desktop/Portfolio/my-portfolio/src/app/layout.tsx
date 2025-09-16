import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Professional portfolio of Your Name, Your Title',
  keywords: 'portfolio, developer, web developer, software engineer',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Professional portfolio of Your Name, Your Title',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}