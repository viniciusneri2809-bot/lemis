/** Quatro "L" nos cantos. O pai precisa ser `relative`. */
export function Cantoneiras({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="cantoneira cantoneira-tl" />
      <span className="cantoneira cantoneira-tr" />
      <span className="cantoneira cantoneira-bl" />
      <span className="cantoneira cantoneira-br" />
    </span>
  );
}
