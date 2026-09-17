import type { NomeIcone } from "@/lib/conteudo";

const CAMINHOS: Record<NomeIcone, string[]> = {
  aquisicao: ["M4 5h16l-6 7v6l-4 2v-8Z", "M7 8h10"],
  atendimento: ["M5 17H3V9h2m14 8h2V9h-2M5 13V9a7 7 0 0 1 14 0v8c0 3-3 4-6 4", "M10 21h3"],
  conexao: ["M3 4v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V4", "M12 17v4"],
  criacao: ["M4 17 16 5l3 3L7 20H4Z", "m13 8 3 3M13 20h7"],
  inteligencia: ["M4 4v11a5 5 0 0 0 5 5h11M4 12h11a5 5 0 0 0 5-5V4"],
  vendas: ["M5 4h14v16l-3-2-4 2-4-2-3 2Z", "m8 11 3 3 5-6"],
};

const CIRCULOS: Partial<Record<NomeIcone, [number, number][]>> = {
  conexao: [[3, 3], [21, 3]],
  inteligencia: [[4, 3], [21, 20], [20, 3]],
};

type Props = { nome: NomeIcone; tamanho?: 24 | 32; className?: string };

export function Icone({ nome, tamanho = 24, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {CAMINHOS[nome].map((d) => (
        <path key={d} d={d} />
      ))}
      {(CIRCULOS[nome] ?? []).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.5} />
      ))}
    </svg>
  );
}
