// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">Reviews</Link>
          <nav className="space-x-4 text-sm">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/imprint" className="hover:underline">Imprint</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-4xl mx-auto w-full p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Mateo LP. All rights reserved.
      </footer>
    </div>
  );
}