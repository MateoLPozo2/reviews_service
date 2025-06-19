// components/Layout.js
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-4">
        <nav className="flex justify-between items-center">
          <div className="text-lg font-bold">Review Platform</div>
          <div className="flex items-center space-x-4">
            <Link href="/" locale={locale}>Home</Link>
            <Link href="/about" locale={locale}>About</Link>
            <Link href="/imprint" locale={locale}>Imprint</Link>
            <Link href="/contact" locale={locale}>Contact</Link>
            <ThemeToggle />
            {/* Language Switcher (basic, replace with dropdown/accordion later) */}
            <select
              value={locale}
              onChange={e =>
                router.push(asPath, asPath, { locale: e.target.value })
              }
              className="ml-2 px-2 py-1 rounded text-black"
              aria-label="Change language"
            >
              {locales && locales.map(lng => (
                <option key={lng} value={lng}>
                  {lng.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </nav>
      </header>
      <main className="flex-grow p-6">{children}</main>
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MLP. All rights reserved.
      </footer>
    </div>
  );
}