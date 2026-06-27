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
  verification: {
    google: 'A3szLLBajYvrMDviRm79kPNMr9egsH05JCwVe6sewqw',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free SAT Score Calculator',
    url: 'https://freesatcalculator.com',
    description: 'Instantly calculate your Digital SAT score, view percentile rankings, and find college matches based on the 2025-2026 adaptive scoring curves.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-[#1A1A2E] bg-[#F0F4F8]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
