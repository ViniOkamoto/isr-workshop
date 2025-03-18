import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISR Demo for Blogs | Next.js 15",
  description:
    "A demonstration of Incremental Static Regeneration (ISR) for improving blog SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200">
          <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              ISR Demo
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <Link href="/sitemap-demo" className="hover:text-blue-600">
                Sitemap
              </Link>
              <Link href="/admin/new" className="hover:text-blue-600">
                Add Post
              </Link>
              <Link href="/admin/edit/1" className="hover:text-blue-600">
                Edit Post
              </Link>
            </div>
          </nav>
        </header>
        <main className="py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-gray-500 text-sm">
          <p>Next.js ISR Demo for Educational Purposes</p>
        </footer>
      </body>
    </html>
  );
}
