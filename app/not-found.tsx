import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F4F8] px-4 text-center">
      <h1 className="text-4xl font-bold text-[#0A2342] mb-4">404 - Page Not Found</h1>
      <p className="text-[#6B7280] mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#0097A7] text-white font-bold rounded-xl shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Go Back Home
      </Link>
    </div>
  );
}
