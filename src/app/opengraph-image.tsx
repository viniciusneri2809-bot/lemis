import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, interfaceTextos } from "@/lib/conteudo";

// A imagem de compartilhamento (1200 × 630), na identidade de 23/10: fundo branco, assinatura em cor,
// a frase de marca na Plus Jakarta Sans 700 e, à direita, o laço sobre o pontilhado azul do manual (§5).
// As fontes são instâncias estáticas da variável (o gerador não lê fonte variável).
export const alt = interfaceTextos.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagem() {
  const raiz = process.cwd();
  const [negrito, medio, assinatura, simbolo] = await Promise.all([
    readFile(join(raiz, "src/assets/PlusJakartaSans-Bold.ttf")),
    readFile(join(raiz, "src/assets/PlusJakartaSans-Medium.ttf")),
    readFile(join(raiz, "public/marca/assinatura-cor.svg"), "utf8"),
    readFile(join(raiz, "public/marca/simbolo-cor.svg"), "utf8"),
  ]);
  const svg = (conteudo: string) => `data:image/svg+xml;base64,${Buffer.from(conteudo).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", fontFamily: "Jakarta" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720, padding: "72px 0 72px 80px" }}>
          <img src={svg(assinatura)} width={204} height={60} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.035em", color: "#0B1020" }}>{hero.titulo}</div>
            <div style={{ marginTop: 28, fontSize: 26, fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.01em", color: "#5A6273" }}>{hero.apoio}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: "40px 40px 40px 0",
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EDF3FF",
            backgroundImage: "radial-gradient(circle, rgba(31,94,242,0.22) 1px, transparent 1.4px)",
            backgroundSize: "14px 14px",
          }}
        >
          <img src={svg(simbolo)} width={280} height={280} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: negrito, weight: 700, style: "normal" },
        { name: "Jakarta", data: medio, weight: 500, style: "normal" },
      ],
    },
  );
}
