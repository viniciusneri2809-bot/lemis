import type { Metadata } from "next";
import localFont from "next/font/local";
import { Grao } from "@/components/efeitos/Grao";
import { Providers } from "@/components/efeitos/Providers";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Lemis — O próximo passo tem direção",
  description:
    "Tráfego pago, criativos, páginas e CRM conectados ao processo comercial de empresas de serviços de alto valor, com acompanhamento de quem cuida das campanhas.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: "Lemis — O próximo passo tem direção",
    description:
      "Marketing próximo de quem decide. Execução conectada ao comercial.",
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
    <html lang="pt-BR" className={geist.variable}>
      <body className="campo-papel font-sans">
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
        <Grao />
      </body>
    </html>
  );
}
