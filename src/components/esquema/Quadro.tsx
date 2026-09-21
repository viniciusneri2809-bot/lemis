/** Placeholder de imagem com as duas diagonais finas: o "X" do wireframe. */
export function Quadro({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative block overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,currentColor_14%,transparent)] ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
        <path
          d="M0 0 100 100M100 0 0 100"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
