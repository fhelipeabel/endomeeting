export interface Speaker {
  name: string;
  title: string;
  description: string;
  fullBio?: string;
  image?: string;
  video?: string;
  location?: string;
  socials?: {
    instagram?: string;
    website?: string;
  };
  isInternational?: boolean;
  isComingSoon?: boolean;
}

export const speakers: Speaker[] = [
  {
    name: "Prof. Dr. Rui Pereira da Costa",
    title: "Convidado Internacional",
    location: "Portugal",
    description: "Diretor do Instituto Português de Endodontia e Professor na Universidade de Lisboa e Barcelona.",
    fullBio: "Licenciado pela Faculdade de Medicina Dentária da Universidade do Porto. Mestre em Endodontia pela Universitat Internacional de Catalunya - Barcelona. Doutor em Ciências (Endodontia) pela Faculdade de Odontologia de Ribeirão Preto da USP. Fellow do International College of Dentists. Professor Associado no Curso de Especialização em Endodontia e nas disciplinas de Endodontia da Faculdade de Medicina Dentária da Universidade de Lisboa. Professor no Mestrado em Endodontia na Universitat Internacional de Catalunya - Barcelona. Professor convidado na Pós-Graduação em Endodontia da CESPU – Porto. Autor de diversos artigos científicos em revistas nacionais e internacionais na área da Endodontia. Palestrante em congressos nacionais e internacionais, incluindo Espanha, Itália, Brasil, Chile, Argentina, Colômbia, Uruguai, Angola, Dubai, Bahrein, Líbano, Itália, Hungria, etc. Coordenador dos cursos de formação pós-graduada em Endodontia RPCendo. Diretor do Instituto Português de Endodontia. Prática exclusiva em Endodontia em Portugal e na Irlanda.",
    isInternational: true,
    image: "/images/palestrantes/rui-pereira.jpeg",
    video: "/videos/video-rui.mp4"
  },
  {
    name: "Prof. Dr. Mário Zuolo",
    title: "Excelência e Prática Clínica em Endodontia",
    location: "São Paulo",
    description: "Doutor pela FOP/UNICAMP e autor de referências bibliográficas fundamentais na Endodontia.",
    fullBio: "Cirurgião Dentista formado pela Faculdade de Odontologia de Ribeirão Preto – USP em 1981. Especialista em Endodontia pela APCD. Preceptorship Endodontic Course at UHSC - San Antonio (Texas) – USA. Teaching Fellow in Endodontics at University of Iowa – College of Dentistry. Mestre em Biologia Molecular pela UNIFESP – Escola Paulista de Medicina. Doutor em Clínica Odontológica – Endodontia na FOP / UNICAMP. Professor de Endodontia da FAOA – APCD. Autor dos livros: 'Endodontia para o Clínico Geral', 'Reintervenção em Endodontia' e 'Remoção de Pinos: Protocolos Clínicos'. Conferencista nacional e internacional. Autor de inúmeros artigos sobre Endodontia publicados em revistas nacionais e internacionais. Consultório particular limitado à prática de Endodontia na cidade de São Paulo há 35 anos.",
    image: "/images/palestrantes/img-mario-zuolo.jpeg",
    video: "/videos/video-mario-zuolo.mp4"
  },
  {
    name: "Prof. Dr. Carlos Eduardo Bueno",
    title: "Autor do Livro 'Excelência em Endodontia Clínica'",
    location: "Campinas",
    description: "Mestre e Doutor pela FOP-UNICAMP. Coordenador de Especialização e Mestrado na SLMandic.",
    fullBio: "Especialista, Mestre e Doutor em Endodontia pela F.O.P.-UNICAMP. Pós-Doutor pela F.O.P.-UNICAMP. Coordenador dos cursos de Especialização e Mestrado em Endodontia da SLMandic Campinas. Coordenador dos cursos de Especialização em Endodontia da SLMandic de Vitória e São Paulo. Professor do Programa de Pós-Graduação da SLMandic nível Doutorado. Autor do livro 'Excelência em Endodontia Clínica'.",
    image: "/images/palestrantes/img-bueno.jpeg",
    video: "/videos/video-carlos-eduardo.mp4"
  },
  {
    name: "Profª. Dra. Patrícia Ferrari",
    title: "A Infecção Endodôntica e Sua Resolução",
    location: "São Paulo",
    description: "Doutora em Endodontia pela FOUSP e vencedora do Prêmio Ápice em Endodontia (2022).",
    fullBio: "Cirurgiã-dentista com atuação exclusiva em Endodontia. Graduada, mestre e doutora pela FOUSP e especialista pela APCD, coordena o Instituto PF de Ensino em Endodontia e é autora do livro 'A Infecção Endodôntica e Sua Resolução'. Na clínica privada, alia diagnóstico preciso, tratamento e retratamento com protocolos claros e baseados em evidência, priorizando conforto, segurança e previsibilidade. Em sala, transforma ciência em prática com foco em planejamento, controle da dor, desinfecção e modelagem de canais, além de retratamentos e casos complexos. Vencedora do Prêmio Ápice em Endodontia (2022).",
    socials: {
      instagram: "https://www.instagram.com/profpatferrari/",
      website: "https://patriciaferrariendodontia.com.br/"
    },
    image: "/images/palestrantes/img-patricia.webp",
    video: "/videos/video-patricia.mp4"
  },
  {
    name: "Prof. Dr. Marco Antonio Hungaro Duarte",
    title: "Professor Titular da FOB-USP",
    location: "Bauru - SP",
    description: "Bolsista Produtividade CNPq nível 1B, autor de mais de 500 artigos e livros de referência.",
    fullBio: "Professor Titular da Disciplina de Endodontia da Faculdade de Odontologia de Bauru da Universidade de São Paulo (FOB-USP). Bolsista de Produtividade em Pesquisa do CNPq (nível 1B). Autor de mais de 540 artigos científicos publicados em periódicos de alto impacto nacional e internacional, além de livros e capítulos de livros que são pilares no ensino da especialidade, como a obra 'Endodontia: Fundamentos Científicos para a Prática Clínica'. Referência mundial em pesquisas sobre biomecânica, materiais obturadores, instrumentação mecanizada e tratamentos endodônticos avançados.",
    image: "/images/palestrantes/perfil-hungaro.jpeg",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Murilo Priori Alcalde",
    title: "Professor e Pesquisador na FOB-USP",
    location: "Bauru - SP",
    description: "Mestre, Doutor e Pós-Doutor pela FOB-USP com destaque em cinemáticas e tecnologia de NiTi.",
    fullBio: "Graduado, Especialista, Mestre, Doutor e Pós-Doutor em Ciências Odontológicas Aplicadas (Endodontia) pela Faculdade de Odontologia de Bauru da Universidade de São Paulo (FOB-USP). Atualmente é Professor no Departamento de Dentística, Endodontia e Materiais Odontológicos da FOB-USP e docente do programa de pós-graduação. Pesquisador de destaque internacional com foco nas propriedades mecânicas e tratamentos térmicos de ligas de Níquel-Titânio (NiTi), agitação ultrassônica de cimentos obturadores e desinfecção de canais radiculares.",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Paulo Vinícius",
    title: "Professor e Pesquisador em Endodontia",
    location: "Uberlândia",
    description: "Referência em protocolos clínicos avançados, instrumentação mecanizada e biomecânica.",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Alexandre Capelli",
    title: "Mestre e Doutor em Endodontia",
    location: "Ribeirão Preto",
    description: "Especialista em novas tecnologias, odontologia restauradora e preparos anatômicos.",
    isComingSoon: false
  },
  {
    name: "Profª. Dra. Amanda Lavor",
    title: "Mestre em Endodontia • Referência em MV2 & Atrésicos",
    location: "Brasil",
    description: "Mestre em Endodontia e criadora do Protocolo AL-MV2 para localização e instrumentação de canais atrésicos e complexos.",
    fullBio: "Cirurgiã-dentista, Mestre e Especialista em Endodontia. Reconhecida nacionalmente pela sua metodologia e didática clínica inovadora na abordagem de anatomias desafiadoras, sendo criadora do consagrado Protocolo AL-MV2 voltado para localização, desinfecção e instrumentação segura de canais atrésicos e de alta complexidade. Mentora de centenas de especialistas pelo país, unindo evidência científica rigorosa, previsibilidade e resolutividade no consultório.",
    socials: {
      instagram: "https://www.instagram.com/amandadelavor/"
    },
    image: "/images/palestrantes/amanda-lavor.jpg",
    isComingSoon: false
  },
  {
    name: "Profª. Maria Ilma & Profª. Juliana Vilela",
    title: "Dupla Palestrante • Prática Clínica & Excelência",
    location: "Minas Gerais / Goiás",
    description: "Abordagem integrada combinando experiência acadêmica consagrada e protocolos contemporâneos de alta previsibilidade.",
    fullBio: "Palestra em conjunto unindo o conhecimento acadêmico de gerações e os protocolos contemporâneos de tratamento endodôntico.\n\nProfª. Dra. Maria Ilma: Doutora e docente com trajetória exemplar, formadora de inúmeros especialistas e referência no ensino odontológico.\n\nProfª. Dra. Juliana Vilela: Especialista e pesquisadora com atuação focada em técnicas de desinfecção tridimensional, condutas conservadoras e resoluções clínicas de alta performance.",
    image: "/images/palestrantes/maria-ilma_e_juliana.jpeg",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Samuel Nogueira",
    title: "Cirurgião-Dentista e Especialista",
    location: "São Paulo",
    description: "Prática clínica focada em microscopia operatória, obturação termoplastificada e resoluções anatômicas.",
    isComingSoon: false
  }
];
