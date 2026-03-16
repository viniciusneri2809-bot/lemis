export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <span className="text-xl font-black tracking-tight text-white">
            APL<span className="text-[#2563eb]">Digital</span>
          </span>
          <p className="text-white/30 text-xs mt-3 leading-relaxed">
            APL Digital — Assessoria em Marketing<br />
            CNPJ: 44.840.036/0001-59<br />
            Rua Rio de Janeiro, 243, Sala 802 — Centro<br />
            Belo Horizonte — MG, CEP 30160-040
          </p>
        </div>

        <div className="flex gap-6 text-sm items-start">
          <a href="#servicos" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Serviços</a>
          <a href="#resultados" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Resultados</a>
          <a href="#contato" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Contato</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/5 mt-8 pt-6">
        <p className="text-white/20 text-xs text-center">
          &copy; {new Date().getFullYear()} APL Digital. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
