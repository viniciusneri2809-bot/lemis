import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    platform: "Meta Ads",
    color: "#2563eb",
    title: "Tráfego pago no Meta Ads",
    description:
      "Campanhas no Facebook e Instagram com criativos que param o scroll e geram leads qualificados no piloto automático.",
    items: ["Campanha de geração de leads", "Criativos em vídeo e imagem", "Otimização de CPL", "Remarketing estratégico"],
  },
  {
    platform: "Google Ads",
    color: "#16a34a",
    title: "Tráfego pago no Google Ads",
    description:
      "Anúncios na busca, display e YouTube para capturar quem já está procurando o que você vende — no momento certo.",
    items: ["Rede de Pesquisa", "Performance Max", "Display & YouTube", "Rastreamento de conversões"],
  },
];

const results = [
  {
    metric: "R$ 18/lead",
    label: "Custo por lead",
    desc: "Clínica estética em SP — campanha de captação para procedimentos",
    before: "Antes: R$ 87/lead",
  },
  {
    metric: "340%",
    label: "Aumento de leads em 60 dias",
    desc: "Escola de cursos profissionalizantes — Meta Ads + Google Ads combinados",
    before: "Antes: 45 leads/mês",
  },
  {
    metric: "8x",
    label: "ROAS alcançado",
    desc: "E-commerce de moda — Performance Max com criativos dinâmicos",
    before: "Antes: ROAS 1.8",
  },
];

const faqs = [
  {
    q: "Em quanto tempo vejo resultado?",
    a: "As primeiras semanas são de aprendizado do algoritmo. Em média, clientes veem resultados concretos entre 30 e 45 dias de campanha ativa.",
  },
  {
    q: "Qual o investimento mínimo em mídia?",
    a: "Recomendamos ao menos R$ 1.500/mês em mídia para ter volume suficiente para otimização. Trabalhamos com orçamentos maiores conforme o objetivo.",
  },
  {
    q: "Vocês criam os criativos?",
    a: "Sim. Produzimos os criativos de anúncio (imagem e vídeo) baseados em dados e melhores práticas de cada plataforma.",
  },
  {
    q: "Como funciona o relatório de resultados?",
    a: "Você recebe relatório semanal com as principais métricas: impressões, cliques, CPL, leads gerados e ROAS. Sem enrolação.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-[65px]">

        {/* ── HERO ── */}
        <section id="inicio" className="min-h-screen bg-[#0a0a0a] flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-white/50 text-sm  font-semibold mb-4">
                Agência especialista em tráfego pago
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Mais leads.<br />
                Mais vendas.<br />
                <span className="text-[#facc15]">Todo mês.</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
                A APL Digital transforma investimento em Meta Ads e Google Ads em leads
                qualificados prontos para fechar com o seu time comercial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#contato"
                  className="bg-[#facc15] text-black px-8 py-4 font-semibold rounded hover:bg-[#eab308] transition-colors text-center"
                >
                  Quero mais leads agora
                </a>
                <a
                  href="#servicos"
                  className="border border-white/30 text-white px-8 py-4 font-bold text-base  hover:border-white/60 transition-colors text-center"
                >
                  Ver como funciona
                </a>
              </div>

              {/* Social proof numbers */}
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-black text-white">
                    +<span className="text-[#22c55e]">50</span>
                  </p>
                  <p className="text-white/40 text-xs ">clientes atendidos</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-black text-white">
                    <span className="text-[#22c55e]">R$2M+</span>
                  </p>
                  <p className="text-white/40 text-xs ">em mídia gerenciada</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-2xl font-black text-white">
                    <span className="text-[#22c55e]">4.8</span>★
                  </p>
                  <p className="text-white/40 text-xs ">avaliação média</p>
                </div>
              </div>
            </div>

            {/* Right side — visual card */}
            <div className="hidden md:block">
              <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
                <p className="text-white/40 text-xs  mb-6">Performance em tempo real</p>

                <div className="space-y-4">
                  {[
                    { label: "Leads gerados (mês)", value: "1.247", change: "+38%" },
                    { label: "Custo por lead", value: "R$ 22,40", change: "-18%" },
                    { label: "Taxa de conversão", value: "7,3%", change: "+2.1pp" },
                    { label: "ROAS total", value: "5.8x", change: "+1.2x" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between bg-[#1a1a1a] rounded-xl px-5 py-4">
                      <div>
                        <p className="text-white/40 text-xs ">{item.label}</p>
                        <p className="text-white text-xl font-black mt-0.5">{item.value}</p>
                      </div>
                      <span className="bg-[#22c55e]/15 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full">
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                  <p className="text-white/40 text-xs">Campanhas ativas — atualizando ao vivo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section id="servicos" className="bg-white py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#2563eb] text-sm font-bold  mb-3">O que fazemos</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                Geramos leads com as duas<br />
                <span className="text-[#2563eb]">maiores plataformas do mundo</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Meta Ads e Google Ads na mesma agência. Estratégia integrada para você aparecer onde seu cliente está.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {services.map((s) => (
                <div key={s.platform} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                  <div
                    className="inline-block text-white text-xs font-black  px-3 py-1.5 rounded mb-6"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.platform}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">{s.description}</p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                        <span className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#contato"
                className="inline-block bg-[#facc15] text-black px-10 py-4 font-semibold rounded hover:bg-[#eab308] transition-colors"
              >
                Agendar diagnóstico gratuito
              </a>
            </div>
          </div>
        </section>

        {/* ── RESULTADOS ── */}
        <section id="resultados" className="bg-[#0a0a0a] py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#facc15] text-sm font-bold  mb-3">Cases reais</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Resultados que <span className="text-[#22c55e]">provam</span> a estratégia
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {results.map((r) => (
                <div key={r.label} className="bg-[#111] border border-white/10 rounded-2xl p-8">
                  <p className="text-[#22c55e] text-4xl font-black mb-1">{r.metric}</p>
                  <p className="text-white font-bold text-lg mb-4">{r.label}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{r.desc}</p>
                  <span className="inline-block bg-white/5 text-white/40 text-xs px-3 py-1 rounded-full font-medium">
                    {r.before}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#contato"
                className="inline-block bg-[#facc15] text-black px-10 py-4 font-semibold rounded hover:bg-[#eab308] transition-colors"
              >
                Quero esse resultado também
              </a>
            </div>
          </div>
        </section>

        {/* ── POR QUE A APL ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2563eb] text-sm font-bold  mb-3">Por que a APL Digital</p>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-6">
                Especialistas em performance,<br />
                <span className="text-[#2563eb]">não em desculpas</span>
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Foco exclusivo em tráfego pago", desc: "Não tentamos fazer tudo. Somos especialistas em Meta Ads e Google Ads — e é nisso que entregamos resultado." },
                  { title: "Relatório semanal sem enrolação", desc: "Toda semana você recebe um relatório direto com CPL, volume de leads e ROAS. Você acompanha tudo." },
                  { title: "Criativos inclusos", desc: "Produzimos os anúncios (imagem e vídeo) baseados nas melhores práticas de cada plataforma." },
                  { title: "Sem contrato longo", desc: "Confiança se constrói com resultado. Trabalhamos com contratos mensais renováveis." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-6 h-6 bg-[#2563eb] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">{item.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Meta Business\nPartner", bg: "#2563eb", sub: "Certificados pela Meta para gestão de campanhas" },
                { name: "Google\nPartner", bg: "#16a34a", sub: "Certificação oficial Google Ads" },
                { name: "CPL\nOtimizado", bg: "#0a0a0a", sub: "Custo por lead reduzido mês a mês" },
                { name: "ROAS\nPositivo", bg: "#eab308", sub: "Retorno mensurável desde o primeiro mês", dark: true },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`rounded-2xl p-6 flex flex-col justify-between min-h-[160px] ${item.dark ? "text-black" : "text-white"}`}
                  style={{ backgroundColor: item.bg }}
                >
                  <p className="font-black text-xl leading-tight whitespace-pre-line">{item.name}</p>
                  <p className={`text-xs mt-3 leading-relaxed ${item.dark ? "text-black/60" : "text-white/70"}`}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#0a0a0a] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#facc15] text-sm font-bold  mb-3">Dúvidas frequentes</p>
              <h2 className="text-4xl font-black text-white">Perguntas &amp; Respostas</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-[#111] border border-white/10 rounded-xl p-6">
                  <p className="text-[#facc15] font-bold text-base mb-2">{faq.q}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTATO / LEAD FORM ── */}
        <section id="contato" className="bg-[#111] py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#2563eb] text-sm font-bold  mb-3">Diagnóstico gratuito</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Vamos gerar leads<br />
                <span className="text-[#facc15]">para o seu negócio?</span>
              </h2>
              <p className="text-white/50 text-base">
                Preencha o formulário e um especialista entra em contato para entender seu negócio e montar uma estratégia.
              </p>
            </div>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 px-5 py-4 rounded-xl focus:outline-none focus:border-[#2563eb] transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp com DDD"
                className="bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 px-5 py-4 rounded-xl focus:outline-none focus:border-[#2563eb] transition-colors"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 px-5 py-4 rounded-xl focus:outline-none focus:border-[#2563eb] transition-colors"
              />
              <select
                className="bg-[#1a1a1a] border border-white/10 text-white/60 px-5 py-4 rounded-xl focus:outline-none focus:border-[#2563eb] transition-colors"
              >
                <option value="">Qual plataforma te interessa?</option>
                <option>Meta Ads (Facebook/Instagram)</option>
                <option>Google Ads</option>
                <option>Ambas as plataformas</option>
              </select>
              <input
                type="text"
                placeholder="Investimento mensal atual em tráfego (ex: R$ 3.000)"
                className="bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 px-5 py-4 rounded-xl focus:outline-none focus:border-[#2563eb] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#facc15] text-black px-8 py-4 font-semibold rounded hover:bg-[#eab308] transition-colors mt-2"
              >
                Quero meu diagnóstico gratuito
              </button>
              <p className="text-white/30 text-xs text-center">
                Sem spam. Entraremos em contato apenas pelo WhatsApp informado.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
