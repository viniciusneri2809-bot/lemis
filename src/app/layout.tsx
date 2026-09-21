import type { Metadata } from "next";
import localFont from "next/font/local";
import { Grao } from "@/components/efeitos/Grao";
import { Providers } from "@/components/efeitos/Providers";
import { metadados, textosDeInterface } from "@/lib/conteudo";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

// Segunda família, só na classe `t-destaque`: uma palavra por título e os numerais de marco.
// `adjustFontFallback` casa a métrica do fallback e mantém o CLS em 0.
// Fica no `preload`: a palavra em destaque está dentro do H1, que é o elemento de LCP. Fora do
// preload, a serifada chega depois da primeira pintura, a largura da palavra muda e o
// `text-wrap: balance` do `t-display` recalcula as quebras — CLS de 0,023 no desktop, medido.
// Com o H1 curto (a frase de marca), o custo de banda do preload cabe: mobile 96, LCP 2,8 s.
// Foi medido nos dois sentidos — com o H1 longo de entrega, o mesmo preload derrubava o mobile
// para 95, e foi por isso que ele chegou a sair.
const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-serif",
  weight: "400",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: metadados.titulo,
  description: metadados.descricao,
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: metadados.titulo,
    description: metadados.descricao,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "facebook-domain-verification": "fwwylg5o7law0r7vi5cdw00gm23aw8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body className="campo-tinta font-sans">
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <a href="#conteudo" className="skip-link">
          {textosDeInterface.pularParaConteudo}
        </a>
        <Providers>{children}</Providers>
        <Grao />
      </body>
    </html>
  );
}
