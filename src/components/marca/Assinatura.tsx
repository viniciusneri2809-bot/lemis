// A assinatura da Lemis (laço + "lemis"), sempre do arquivo do manual (§1): `cor` sobre branco e névoa,
// `branco` sobre a foto. Nunca abaixo de 96 px de largura; a proporção do arquivo é 339,3 × 100.
export function Assinatura({ variante = "cor", largura = 120, className = "" }: { variante?: "cor" | "branco"; largura?: number; className?: string }) {
  const altura = Math.round((largura * 100) / 339.3);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG da marca, sem otimização a fazer
    <img src={`/marca/assinatura-${variante}.svg`} alt="Lemis" width={largura} height={altura} className={className} />
  );
}
