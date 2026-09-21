/**
 * Numeral de seção em serifa, cortado pela borda de cima do campo — o gesto que faz a página
 * atravessar o próprio container. Decorativo: `aria-hidden`, sem evento e sem seleção.
 * A cor é azul misturado à tinta, não texto: nunca carrega informação.
 */
export function NumeralGigante({ numero, centro = false }: { numero: number; centro?: boolean }) {
  return (
    <span aria-hidden="true" className={`numeral-gigante ${centro ? "numeral-gigante-centro" : ""}`}>
      {String(numero).padStart(2, "0")}
    </span>
  );
}
