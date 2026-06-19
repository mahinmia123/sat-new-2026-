import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Free SAT Score Calculator - Digital SAT 2025 & 2026',
  description: 'Instantly calculate your Digital SAT score, view percentile rankings, and find college matches based on the 2025-2026 adaptive scoring curves.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased text-[#1A1A2E] bg-[#F0F4F8]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
