export type NomeIcone =
  | "aquisicao"
  | "atendimento"
  | "conexao"
  | "criacao"
  | "inteligencia"
  | "vendas";

export const nav = [
  { rotulo: "O que fazemos", href: "#o-que-fazemos" },
  { rotulo: "Como trabalhamos", href: "#como-trabalhamos" },
  { rotulo: "Para quem", href: "#para-quem" },
  { rotulo: "Perguntas", href: "#perguntas" },
] as const;

export const cta = {
  rotulo: "Vamos conversar",
  nota: "Conversa pelo WhatsApp com quem cuida das campanhas.",
} as const;

export const hero = {
  titulo: "O próximo passo tem direção.",
  paragrafo:
    "Tráfego pago, criativos, páginas e CRM conectados ao processo comercial da sua empresa. Você conversa com quem cuida das campanhas e acompanha o que acontece depois do primeiro contato.",
  secundario: { rotulo: "Ver como trabalhamos", href: "#como-trabalhamos" },
} as const;

export const problema = {
  pergunta: "Por que os contatos chegam e as vendas não acompanham?",
  afirmacao:
    "Volume não explica a qualidade da demanda nem o avanço das conversas.",
  corpo: [
    "Entre atrair interesse e fechar uma venda existe o atendimento. Quando a campanha e a conversa comercial andam separadas, fica difícil saber o que ajustar: o anúncio, a página, a abordagem ou o momento do contato.",
  ],
  fecho: "É nessa distância que a Lemis trabalha.",
} as const;

export const servicos = {
  pergunta: "O que a Lemis faz?",
  afirmacao: "Quatro frentes, um processo comercial.",
  corpo:
    "Tráfego pago, criativos, páginas e CRM, planejados em função uns dos outros e do que o seu atendimento consegue continuar. O acompanhamento comercial liga tudo isso ao que acontece depois do contato. O escopo é definido em proposta.",
  itens: [
    {
      icone: "aquisicao",
      nome: "Tráfego pago",
      descricao:
        "Campanhas em Meta Ads e Google Ads planejadas a partir do serviço que você vende e de quem decide comprá-lo.",
      inclui: [
        "Planejamento e estrutura das campanhas",
        "Revisão contínua a partir dos contatos recebidos",
        "Ajustes de público, verba e mensagem",
      ],
    },
    {
      icone: "criacao",
      nome: "Criativos",
      descricao:
        "Anúncios que explicam valor antes de pedir o contato. Imagem, vídeo e texto alinhados ao que o atendimento consegue sustentar.",
      inclui: [
        "Direção da mensagem por campanha",
        "Variações para teste",
        "Leitura do que gera conversa, não só clique",
      ],
    },
    {
      icone: "conexao",
      nome: "Páginas",
      descricao:
        "Páginas que continuam a conversa do anúncio e preparam o contato para o atendimento.",
      inclui: [
        "Estrutura e texto",
        "Formulário ou WhatsApp integrados ao CRM",
        "Revisão conforme o retorno das campanhas",
      ],
    },
    {
      icone: "atendimento",
      nome: "CRM",
      descricao:
        "Organização dos contatos para que cada oportunidade tenha origem registrada e um próximo passo claro.",
      inclui: [
        "Configuração das etapas comerciais",
        "Registro da origem de cada contato",
        "Visão do que avança e do que trava",
      ],
    },
    {
      icone: "vendas",
      nome: "Acompanhamento comercial",
      descricao:
        "Comparamos os contatos recebidos com as conversas que avançaram e revisamos campanha e atendimento a partir disso.",
      inclui: [
        "Conversas periódicas com quem cuida das campanhas",
        "Critérios claros para decidir os próximos passos",
        "Escopo definido em proposta",
      ],
    },
  ],
} as const satisfies {
  pergunta: string;
  afirmacao: string;
  corpo: string;
  itens: readonly { icone: NomeIcone; nome: string; descricao: string; inclui: readonly string[] }[];
};

export const fundamentos = {
  pergunta: "Como vocês trabalham?",
  afirmacao:
    "Marketing próximo de quem decide. Execução conectada ao comercial.",
  corpo:
    "Três compromissos orientam cada frente do trabalho, do anúncio à conversa comercial.",
  itens: [
    {
      nome: "Proximidade",
      frase: "Você conversa com quem cuida das campanhas.",
      corpo:
        "Sem intermediário entre a decisão e a execução. Quem ajusta a campanha é quem entende o contexto do seu negócio.",
    },
    {
      nome: "Visão comercial",
      frase: "Acompanhamos o que acontece depois do primeiro contato.",
      corpo:
        "O trabalho não termina no formulário preenchido. Comparamos os contatos recebidos com as conversas que avançaram e usamos isso para decidir o que ajustar.",
    },
    {
      nome: "Execução integrada",
      frase:
        "Campanhas, criativos, páginas e CRM conectados ao processo comercial.",
      corpo:
        "O que aparece no anúncio é o que a página sustenta e o que o atendimento consegue continuar. Cada frente entra quando faz sentido para o seu escopo.",
    },
  ],
  exemplo: {
    rotulo: "Como soa uma conversa de acompanhamento",
    fala: "Vamos comparar os contatos recebidos com as conversas que avançaram. A partir disso, revisamos a campanha e o próximo passo no atendimento.",
    nota: "Modelo de abordagem. Em relatórios reais, entram dados verificados, período e decisão proposta.",
  },
} as const;

export const paraQuem = {
  pergunta: "Isso é para o meu negócio?",
  afirmacao: "Para empresas que vendem serviços de alto valor.",
  corpo:
    "Negócios em que vender exige explicar valor, construir confiança e acompanhar a decisão de compra. Clínicas de estética e escritórios de advocacia fazem parte da base atual; não são um limite.",
  listaTitulo: "Faz sentido conversar se",
  lista: [
    "Você já investe em anúncios, mas não sabe dizer quais contatos viraram conversa.",
    "O atendimento recebe contatos que ainda não estavam prontos para decidir.",
    "Marketing e comercial olham para números diferentes.",
    "Você quer falar com quem executa, não com um intermediário.",
  ],
} as const;

export const proximoPasso = {
  pergunta: "E se eu chamar agora, o que acontece?",
  afirmacao: "Você chama. Nós ouvimos antes de propor.",
  corpo:
    "A conversa começa pelo WhatsApp, com quem cuida das campanhas. Sem formulário e sem intermediário.",
  passos: [
    {
      titulo: "Conversa inicial",
      corpo:
        "Você conta como vende hoje, de onde vêm os contatos e o que acontece com eles depois. Nós ouvimos e perguntamos.",
    },
    {
      titulo: "Leitura e proposta",
      corpo:
        "Voltamos com uma leitura do cenário e uma proposta com escopo definido: quais frentes entram, o que cada uma inclui e como o acompanhamento funciona.",
    },
    {
      titulo: "Execução com acompanhamento",
      corpo:
        "Com o escopo acordado, começamos. A partir daí, revisamos campanha e atendimento em conversas periódicas com você.",
    },
  ],
} as const;

export const perguntas = {
  titulo: "Perguntas que aparecem antes da primeira conversa",
  itens: [
    {
      pergunta: "Vocês garantem uma quantidade de contatos por mês?",
      resposta:
        "Não. Trabalhamos para melhorar a qualidade das oportunidades e o que acontece com elas, e explicamos os critérios por trás de cada ajuste. Quantidade, custo e prazo dependem da oferta, do mercado e do atendimento, e por isso não entram como promessa.",
    },
    {
      pergunta: "Preciso contratar todas as frentes?",
      resposta:
        "Não. O escopo é definido em proposta a partir do que o seu processo comercial precisa. Cada frente entra quando faz sentido.",
    },
    {
      pergunta: "Vocês assumem as vendas?",
      resposta:
        "Acompanhamos as oportunidades até a venda e ajustamos o trabalho a partir do que vemos. A operação do seu time comercial continua com você, salvo escopo combinado em proposta.",
    },
    {
      pergunta: "Com quem eu falo no dia a dia?",
      resposta:
        "Com quem cuida das campanhas. Não há intermediário entre a decisão e a execução.",
    },
    {
      pergunta: "Já tenho CRM. Vocês usam o meu?",
      resposta:
        "Avaliamos a ferramenta que você já usa antes de propor qualquer mudança. O que importa é cada contato ter origem registrada e um próximo passo claro.",
    },
  ],
} as const;

export const ctaFinal = {
  titulo: "Do interesse à conversa certa.",
  apoio: "Marketing próximo de quem decide. Execução conectada ao comercial.",
  nota: "Conversa pelo WhatsApp com quem cuida das campanhas.",
} as const;

export const rodape = {
  apoio: "Marketing próximo de quem decide. Execução conectada ao comercial.",
  razaoSocial: "APL Digital — Assessoria em Marketing",
  cnpj: "CNPJ 44.840.036/0001-59",
  endereco:
    "Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG, CEP 30160-040",
  navegarRotulo: "Navegar",
  conversarRotulo: "Conversar",
  whatsappRotulo: "WhatsApp",
} as const;
