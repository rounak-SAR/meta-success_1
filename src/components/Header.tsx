"use client";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "MARKETS", href: "/markets" },
  { name: "STATS", href: "/stats" },
  { name: "NEWS", href: "/news" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Meta Success Logo" style={{ width: '40px', height: 'auto' }} className="rounded-full" />
          <span className="text-xl font-bold tracking-tight text-white">META-SUCCESS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-widest text-white/70 transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden text-xs font-bold tracking-widest text-white md:block">SIGN IN</button>
          <button className="rounded-full bg-accent px-6 py-2 text-xs font-bold tracking-widest text-background transition-transform hover:scale-105 active:scale-95">
            JOIN NOW
          </button>
        </div>
      </div>
    </header>
  );
}
