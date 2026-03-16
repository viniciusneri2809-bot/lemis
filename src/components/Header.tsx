"use client";

import { useState } from "react";

const navLinks = [
  { label: "O que fazemos?", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-black tracking-tight text-white uppercase">
          APL<span className="text-[#2563eb]">Digital</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-[#facc15] text-black px-5 py-2.5 text-sm font-semibold rounded hover:bg-[#eab308] transition-colors"
          >
            Quero leads agora
          </a>
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 font-medium text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-[#facc15] text-black px-5 py-3 text-sm font-semibold rounded text-center hover:bg-[#eab308] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Quero leads agora
          </a>
        </div>
      )}
    </header>
  );
}
