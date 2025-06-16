// components/Layout.js
import Link from "next/link";
// 👇 Add the import at the top
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-lg font-bold">Review Platform</div>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/imprint">Imprint</Link>
            {/* 👇 Add the theme toggle right after the links */}
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="flex-grow p-6">{children}</main>
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Mateo LP. All rights reserved.
      </footer>
    </div>
  );
}