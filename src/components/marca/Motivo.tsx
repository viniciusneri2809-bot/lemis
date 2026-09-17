type Props = { className?: string };

export function Motivo({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 640 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M40 0v180q0 60 60 60h220q60 0 60-60V60q0-40 40-40h220"
        stroke="currentColor"
        strokeWidth={24}
      />
    </svg>
  );
}
