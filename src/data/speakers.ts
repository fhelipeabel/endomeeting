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
    image: "/images/img-rui.jpeg",
    video: "/videos/video-rui.mp4"
  },
  {
    name: "Prof. Dr. Mário Zuolo",
    title: "Excelência e Prática Clínica em Endodontia",
    location: "São Paulo",
    description: "Doutor pela FOP/UNICAMP e autor de referências bibliográficas fundamentais na Endodontia.",
    fullBio: "Cirurgião Dentista formado pela Faculdade de Odontologia de Ribeirão Preto – USP em 1981. Especialista em Endodontia pela APCD. Preceptorship Endodontic Course at UHSC - San Antonio (Texas) – USA. Teaching Fellow in Endodontics at University of Iowa – College of Dentistry. Mestre em Biologia Molecular pela UNIFESP – Escola Paulista de Medicina. Doutor em Clínica Odontológica – Endodontia na FOP / UNICAMP. Professor de Endodontia da FAOA – APCD. Autor dos livros: 'Endodontia para o Clínico Geral', 'Reintervenção em Endodontia' e 'Remoção de Pinos: Protocolos Clínicos'. Conferencista nacional e internacional. Autor de inúmeros artigos sobre Endodontia publicados em revistas nacionais e internacionais. Consultório particular limitado à prática de Endodontia na cidade de São Paulo há 35 anos.",
    image: "/images/img-mario-zuolo.jpeg",
    video: "/videos/video-mario-zuolo.mp4"
  },
  {
    name: "Prof. Dr. Carlos Eduardo Bueno",
    title: "Autor do Livro 'Excelência em Endodontia Clínica'",
    location: "Campinas",
    description: "Mestre e Doutor pela FOP-UNICAMP. Coordenador de Especialização e Mestrado na SLMandic.",
    fullBio: "Especialista, Mestre e Doutor em Endodontia pela F.O.P.-UNICAMP. Pós-Doutor pela F.O.P.-UNICAMP. Coordenador dos cursos de Especialização e Mestrado em Endodontia da SLMandic Campinas. Coordenador dos cursos de Especialização em Endodontia da SLMandic de Vitória e São Paulo. Professor do Programa de Pós-Graduação da SLMandic nível Doutorado. Autor do livro 'Excelência em Endodontia Clínica'.",
    image: "/images/img-bueno.jpeg",
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
    image: "/images/img-patricia.webp",
    video: "/videos/video-patricia.mp4"
  },
  {
    name: "Prof. Dr. Paulo Vinícius",
    title: "Professor e Pesquisador em Endodontia",
    description: "Referência em protocolos clínicos avançados, instrumentação mecanizada e biomecânica.",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Alexandre Capelli",
    title: "Mestre e Doutor em Endodontia",
    description: "Especialista em novas tecnologias, odontologia restauradora e preparos anatômicos.",
    isComingSoon: false
  },
  {
    name: "Profª. Dra. Amanda Leal",
    title: "Especialista em Endodontia Clínica",
    description: "Excelência e precisão técnica em casos complexos, retratamento e microscopia clínica.",
    isComingSoon: false
  },
  {
    name: "Profª. Dra. Maria Ilma",
    title: "Docente e Especialista em Endodontia",
    description: "Referência acadêmica formadora de gerações de endodontistas e destaque no ensino odontológico.",
    isComingSoon: false
  },
  {
    name: "Profª. Dra. Juliana Vilela",
    title: "Especialista em Endodontia",
    description: "Abordagens contemporâneas de desinfecção tridimensional e conduta clínica de alta previsibilidade.",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Samuel Nogueira",
    title: "Cirurgião-Dentista e Especialista",
    description: "Prática clínica focada em microscopia operatória, obturação termoplastificada e resoluções anatômicas.",
    isComingSoon: false
  }
];
