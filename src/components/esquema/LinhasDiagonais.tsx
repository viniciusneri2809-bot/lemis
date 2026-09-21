/** Hachura fina nas margens externas do container. Só a partir de xl, onde a margem existe. */
export function LinhasDiagonais() {
  return (
    <>
      <span
        aria-hidden="true"
        className="hachura pointer-events-none absolute inset-y-0 left-0 hidden w-[calc((100vw-1408px)/2)] xl:block"
      />
      <span
        aria-hidden="true"
        className="hachura pointer-events-none absolute inset-y-0 right-0 hidden w-[calc((100vw-1408px)/2)] xl:block"
      />
    </>
  );
}
