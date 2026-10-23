import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { interfaceTextos, metadados } from "@/lib/conteudo";
import "./globals.css";

// As duas famílias do manual (§3), subconjunto latino, licença OFL ao lado do arquivo.
// Plus Jakarta Sans no título e no número grande; Inter no texto, na interface e no botão.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin.woff2",
  variable: "--fonte-titulo",
  weight: "200 800",
  display: "swap",
});

// Sem preload: no celular, a foto do hero é o LCP e disputava banda com as duas fontes (Lighthouse
// mobile 95 com as duas no preload). A métrica da fonte de reserva é ajustada pelo Next: CLS segue 0.
const inter = localFont({
  src: "./fonts/Inter-latin.woff2",
  variable: "--fonte-texto",
  weight: "100 900",
  display: "swap",
  preload: false,
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
  twitter: { card: "summary_large_image", title: metadados.titulo, description: metadados.descricao },
  other: {
    "facebook-domain-verification": "fwwylg5o7law0r7vi5cdw00gm23aw8",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a href="#conteudo" className="pular">
          {interfaceTextos.pular}
        </a>
        {children}
      </body>
    </html>
  );
}
