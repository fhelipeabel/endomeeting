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
    name: "Prof. Dr. Carlos Bueno",
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
    name: "Profª. Dra. Maria Ilma & Profª. Dra. Juliana Vilela",
    title: "Dupla Palestrante • Prática Clínica & Excelência",
    location: "Minas Gerais / Goiás",
    description: "Abordagem integrada combinando experiência acadêmica consagrada e protocolos contemporâneos de alta previsibilidade.",
    fullBio: "Palestra em conjunto unindo o conhecimento acadêmico de gerações e os protocolos contemporâneos de tratamento endodôntico.\n\nProfª. Dra. Maria Ilma: Doutora e docente com trajetória exemplar, formadora de inúmeros especialistas e referência no ensino odontológico.\n\nProfª. Dra. Juliana Vilela: Especialista e pesquisadora com atuação focada em técnicas de desinfecção tridimensional, condutas conservadoras e resoluções clínicas de alta performance.",
    image: "/images/palestrantes/maria-ilma_e_juliana.jpeg",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Marco Hungaro",
    title: "Professor Titular da FOB-USP",
    location: "Bauru - SP",
    description: "Bolsista Produtividade CNPq nível 1B, autor de mais de 500 artigos e livros de referência.",
    fullBio: "Professor Titular da Disciplina de Endodontia da Faculdade de Odontologia de Bauru da Universidade de São Paulo (FOB-USP). Bolsista de Produtividade em Pesquisa do CNPq (nível 1B). Autor de mais de 540 artigos científicos publicados em periódicos de alto impacto nacional e internacional, além de livros e capítulos de livros que são pilares no ensino da especialidade, como a obra 'Endodontia: Fundamentos Científicos para a Prática Clínica'. Referência mundial em pesquisas sobre biomecânica, materiais obturadores, instrumentação mecanizada e tratamentos endodônticos avançados.",
    image: "/images/palestrantes/perfil-hungaro.jpeg",
    isComingSoon: false
  },
  {
    name: "Profª. Mª. Amanda Lavor",
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
    name: "Prof. Dr. Paulo Vinícius",
    title: "Prof. Associado FOUFU • Pós-Doutor UIC Chicago",
    location: "Uberlândia - MG",
    description: "Professor Associado da FOUFU, Pós-Doutor pela University of Illinois at Chicago (EUA), autor de livros internacionais e referência em Reabilitação Oral e Estética.",
    fullBio: "Professor Associado de Dentística e Materiais Odontológicos da Faculdade de Odontologia da Universidade Federal de Uberlândia (FOUFU).\n\nPossui Pós-Doutorado pelo College of Dentistry, University of Illinois at Chicago (EUA), Doutorado em Clínica Odontológica pela UNICAMP, Mestrado em Reabilitação Oral pela FOUFU e Especialização em Dentística pela FOUFU.\n\nProfessor e Orientador do Programa de Pós-Graduação (Mestrado/Doutorado) da FOUFU, Fundador e Líder do Grupo de Pesquisa LCNC-FOUFU (CNPq) e Consultor e Professor de Pós-Graduação da Faculdade São Leopoldo Mandic (Campinas).\n\nAtua como cirurgião-dentista no corpo clínico do Instituto Paulo Vinícius (Uberlândia-MG) como responsável pela área de Reabilitação Oral e Estética. Fundador do Instituto IPV Odontologia e Centro de Treinamentos, sócio-fundador do Iknow Odonto Cursos e IK Journal, e mentor do ecossistema digital DENTISTA PRO.\n\nMembro da Sociedade Brasileira de Odontologia Estética (SBOE) e da Sociedade Brasileira de Pesquisa Odontológica (SBPqO). Autor dos livros de referência internacional 'Non Carious Cervical Lesions and Cervical Dentin Hypersensitivity' (Ed. Quintessence Publishing, Chicago - traduzido para português e mandarim), 'Hipersensibilidade Dentinária - Guia Clínico' (Editora Santos/IKnow) e da série 'ChairSide Guide - Bridges' (Volumes 1 e 2).\n\nEditor-Chefe da Journal of Clinical and Dental Research, revisor de conceituadas revistas científicas internacionais (Operative Dentistry, Journal of Prosthetic Dentistry, Australian Dental Journal, Clinical Oral Investigations, Journal of Oral Rehabilitation) e autor de dezenas de artigos científicos e capítulos de livros.",
    image: "/images/palestrantes/paulo_vinicius.jpeg",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Murilo Alcalde",
    title: "Professor da FOB-USP • Pesquisador & Autor",
    location: "Bauru - SP",
    description: "Mestre, Doutor e Pós-Doutor pela FOB/USP, coautor de livro e Coordenador de Pesquisa da Bondent América Latina.",
    fullBio: "Graduado, Especialista, Mestre, Doutor e Pós-Doutor em Endodontia pela Faculdade de Odontologia de Bauru da Universidade de São Paulo (FOB/USP). Professor dos cursos de Graduação e Pós-Graduação em Endodontia da FOB/USP. Autor e coautor de dezenas de artigos científicos publicados em periódicos de alto impacto nacionais e internacionais. Coautor do livro 'Cirurgia Parendodôntica: princípios básicos e técnicas'. Coordenador de Pesquisa da Bondent da América Latina, sendo autoridade no ensino e inovação tecnológica de ligas de NiTi e cinemáticas em Endodontia.",
    image: "/images/palestrantes/murilo-alcalde.jpeg",
    isComingSoon: false
  },
  {
    name: "Prof. Dr. Samuel Nogueira Lima",
    title: "Doutor em Clínica Odontológica & Mestre em Endodontia",
    location: "Fortaleza - CE",
    description: "Doutor e Mestre pela SLMandic, especialista em Endodontia e Ortodontia, com sólida atuação clínica e ex-1º Tenente da FAB.",
    fullBio: "Graduado em Odontologia pela Universidade de Fortaleza (UNIFOR) em 2000.\n\nDoutor em Clínica Odontológica (concluído em 2024) e Mestre em Endodontia (2018) pela Faculdade São Leopoldo Mandic.\n\nEspecialista em Endodontia pela Associação Brasileira de Endodontia - Seção Ceará (2002), Especialista em Ortodontia pela Universidade Vale do Acaraú (2011) e pós-graduado em Prótese Dentária pela Academia Cearense de Odontologia (2008).\n\nAtua na clínica privada nas áreas de Clínica Geral e Endodontia desde 2000. Atuou como cirurgião-dentista de saúde da família na cidade de Fortaleza (2001 a 2006) e como 1º Tenente Dentista / Endodontista da Força Aérea Brasileira (FAB) de 2006 a 2012.",
    image: "/images/palestrantes/samuel_nogueira.jpeg",
    isComingSoon: false
  }
];
