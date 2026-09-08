"use client";
// Force refresh 1

import { useState, useEffect } from "react";
import Image from "next/image";
import { PaymentPopup } from "@/components/PaymentPopup";
import { Sponsors } from "@/components/Sponsors";
import { speakers } from "@/data/speakers";
import { MapPin, Calendar, CheckCircle2, ChevronRight, User, Stethoscope, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import SpeakerModal from "@/components/SpeakerModal";
import { Speaker } from "@/data/speakers";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<{ title: string, message: string, url: string } | undefined>(undefined);
  const [currentLot, setCurrentLot] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Data de virada de lote: 02 de maio de 2026 às 08:00 (Horário de Brasília)
    const switchDate = new Date('2026-05-02T08:00:00-03:00');
    if (new Date() >= switchDate) {
      setCurrentLot(2);
    }
  }, []);

  const scrollToTickets = () => {
    const section = document.getElementById('ingressos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPopup = (title: string, audience: string | null, url: string) => {
    setPopupContent({
      title: `Ingresso: ${title}`,
      message: audience 
        ? `Atenção: Este ingresso é destinado exclusivamente para ${audience}. Será necessário comprovar sua categoria no credenciamento do evento. Caso não haja comprovação, será cobrada a diferença para o valor do ingresso integral no local. Deseja prosseguir?`
        : "Você está sendo redirecionado para a plataforma de pagamentos (Kiwify). Os ingressos são limitados e os lotes podem esgotar rapidamente. Tem certeza que deseja continuar?",
      url: url
    });
    setIsPopupOpen(true);
  };

  const handleOpenSpeakerModal = (speaker: Speaker) => {
    if (speaker.isComingSoon) return;
    setSelectedSpeaker(speaker);
    setIsSpeakerModalOpen(true);
  };

  const lotData = {
    1: {
      label: "Lançamento",
      students: "250,00",
      partners: "350,00",
      dentists: "550,00"
    },
    2: {
      label: "1º Lote",
      students: "300,00",
      partners: "400,00",
      dentists: "600,00"
    }
  };

  const prices = mounted ? lotData[currentLot] : lotData[1];

  // O link do Kiwify atualizado (pode ser ajustado conforme a necessidade)
  const kiwifyCheckoutUrl = "https://pay.kiwify.com.br/xxxxx";

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {mounted && (
        <>
          <PaymentPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            checkoutUrl={popupContent?.url || ""}
            title={popupContent?.title}
            message={popupContent?.message}
          />

          <SpeakerModal 
            speaker={selectedSpeaker}
            isOpen={isSpeakerModalOpen}
            onClose={() => setIsSpeakerModalOpen(false)}
          />
        </>
      )}

      {/* INTRO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/intro-dark.png" 
            alt="Endomeeting Background" 
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-neutral-950" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <div className="w-20 h-1 bg-brand-600 mb-8 rounded-full" />
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <Image 
              src="/logo.png.png" 
              alt="4º Endomeeting" 
              width={500} 
              height={150} 
              className="w-full max-w-[320px] md:max-w-[450px] h-auto brightness-200 invert grayscale transition-all duration-700"
              priority
            />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-neutral-500"
          >
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Role para entrar</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-600 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* HERO & VIDEO SECTION */}
      <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden bg-white/50 backdrop-blur-sm border-t border-neutral-100">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-medium text-sm mb-6 border border-brand-100/50">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Inscrições Abertas - Lote de Lançamento
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-neutral-900 tracking-tight leading-[0.9] mb-8">
              A Excelência<br/>
              <span className="text-brand-900">Redefinida</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed">
              O evento que reúne os maiores especialistas em endodontia do Brasil para dois dias de imersão tecnológica e científica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTickets}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-brand-900 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-brand-900/40"
              >
                Garantir Ingresso
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              
              <button className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-neutral-900 border border-neutral-200 rounded-2xl text-lg font-bold hover:bg-neutral-50 transition-colors">
                <span className="w-8 h-8 flex items-center justify-center bg-brand-50 rounded-full text-brand-600">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent ml-1" />
                </span>
                Ver Teaser
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-8 border-white group"
          >
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
                </div>
                <span className="text-white/60 font-bold uppercase tracking-widest text-sm">Assista ao Vídeo de 2026</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="w-full py-12 bg-neutral-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-wrap justify-between gap-8 md:gap-12">
          {[
            { icon: <Calendar className="w-5 h-5" />, label: "DATA", val: "30/04 e 01/05, 2027" },
            { icon: <MapPin className="w-5 h-5" />, label: "LOCAL", val: "Center Convention, Uberlândia" },
            { icon: <User className="w-5 h-5" />, label: "PÚBLICO", val: "CDs e Acadêmicos" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="text-brand-500">{item.icon}</div>
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-neutral-500">{item.label}</p>
                <p className="text-sm font-bold">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="w-full py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 tracking-tight leading-tight">Excelência em <span className="text-brand-900">Foco</span></h2>
            <p className="text-xl text-neutral-500 mb-10 leading-relaxed font-medium">
              Organizado pela Equipe Rodrigo Faria de Endodontia, o Endomeeting é o epicentro da inovação endodôntica no Brasil.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { title: "Alta Tecnologia", desc: "Acesso às mais recentes inovações e microscopia de ponta.", icon: <CheckCircle2 className="w-6 h-6" /> },
              { title: "Networking Elite", desc: "Conexões valiosas com os maiores nomes da endodontia nacional.", icon: <User className="w-6 h-6" /> },
              { title: "Imersão Prática", desc: "Vivencie protocolos clínicos reais com hands-on especializados.", icon: <Stethoscope className="w-6 h-6" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-neutral-50 p-10 rounded-[2.5rem] border border-neutral-100 hover:border-brand-200/50 hover:bg-white hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-white shadow-sm border border-neutral-100 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-900 group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section id="palestrantes" className="w-full py-32 bg-neutral-50/50 relative overflow-hidden">
        {/* International Badge/Text Highlight */}
        <div className="absolute top-0 left-0 w-full bg-brand-900 text-white py-3 z-20 shadow-lg">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs md:text-sm font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4">
              <MapPin className="w-4 h-4 text-brand-400 animate-pulse" />
              O maior congresso de odontologia do triângulo mineiro, agora se torna <span className="text-brand-400">Internacional!</span>
              <MapPin className="w-4 h-4 text-brand-400 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12">
          <div className="flex flex-col items-center mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
            >
              Mestres da Endodontia
            </motion.h2>
            <p className="text-neutral-500 max-w-2xl text-xl font-medium">Aprenda com professores experientes que aliam alta tecnologia e resultados de excelência.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                onClick={() => handleOpenSpeakerModal(speaker)}
                className={`group bg-white rounded-[2rem] p-8 border border-neutral-100 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden ${speaker.isComingSoon ? 'opacity-60 cursor-default' : 'hover:border-brand-200 hover:shadow-2xl cursor-pointer'}`}
              >
                {!speaker.isComingSoon && (
                  <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shadow-md md:shadow-none">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                )}

                <div className={`w-32 h-32 rounded-3xl bg-neutral-100 mb-6 overflow-hidden flex items-center justify-center relative transition-transform duration-500 ${!speaker.isComingSoon && 'group-hover:scale-105'}`}>
                  {speaker.isComingSoon ? (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-neutral-400 animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <Image 
                        src={speaker.image || "/placeholder-speaker.webp"} 
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500" />
                      {speaker.isInternational && (
                        <div className="absolute top-2 left-2 bg-brand-600 text-white p-1 rounded-lg z-10">
                          <MapPin className="w-4 h-4" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{speaker.name}</h3>
                <h4 className="text-sm font-bold text-brand-700 mb-4 tracking-wider uppercase">{speaker.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-medium line-clamp-3">{speaker.description}</p>
                
                {!speaker.isComingSoon && (
                  <div className="mt-6 pt-6 border-t border-neutral-50 w-full flex justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-600 flex items-center gap-2">
                      Ver Bio Completa <ChevronRight className="w-3 h-3 md:hidden" />
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETS SECTION */}
      <section id="ingressos" className="w-full py-32 bg-neutral-950 relative overflow-hidden">
        {/* Decorator Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square rounded-full bg-brand-900/30 blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
              Oferta Especial
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Garanta sua Vaga</h2>
            <p className="text-brand-200/80 max-w-2xl mx-auto text-lg mb-2">Lotes limitados para o 4º Endomeeting.</p>
            <p className="text-yellow-500 font-bold">Valores de lançamento: Apenas para dias 01/05 e 02/05/26 durante o evento.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Categoria 1: Estudantes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="mb-4 text-xs font-bold text-brand-400 tracking-wider uppercase">{prices.label}</div>
              <h3 className="text-xl font-bold text-white mb-4">Graduação e Pós</h3>
              <div className="space-y-3 mb-8 pb-6 border-b border-white/10 flex-grow">
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Destinado exclusivamente para <strong className="text-white">estudantes de graduação ou pós-graduação</strong> em Odontologia.
                </p>
                <div className="flex items-start gap-2 text-xs text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Necessário comprovação de matrícula ativa.</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-sm text-neutral-400 block mb-1">Investimento</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">R$</span>
                  <span className="text-5xl font-black text-white">{prices.students}</span>
                </div>
                <span className="text-sm text-brand-400/80 font-medium block mt-2">Em até 4x no cartão</span>
              </div>

              <button
                onClick={() => handleOpenPopup("Graduação e Pós", "estudantes de graduação e pós-graduação", "https://pay.kiwify.com.br/rrtPxfL")}
                className="w-full py-4 rounded-xl font-bold text-brand-900 bg-white hover:bg-brand-50 hover:scale-[1.02] transition-all duration-300"
              >
                Comprar Agora
              </button>
            </motion.div>

            {/* Categoria 2: Parceiros */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-brand-900/40 to-brand-950/80 backdrop-blur-xl rounded-[2rem] p-8 border border-brand-500/30 flex flex-col relative overflow-hidden group shadow-2xl"
            >
              <div className="mb-4 text-xs font-bold text-brand-300 tracking-wider uppercase">{prices.label}</div>
              <h3 className="text-xl font-bold text-white mb-4">Ex-alunos & Parceiros</h3>
              <div className="space-y-3 mb-8 pb-6 border-b border-brand-700/50 flex-grow">
                <p className="text-brand-100 text-sm leading-relaxed">
                  Para <strong className="text-white">Ex-alunos Equipe Rodrigo Faria, UNIODONTO, Grupo Patrícia Ferrari e Associados SBEndo.</strong>
                </p>
                <div className="flex items-start gap-2 text-xs text-brand-300/70">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Válido para membros ativos das instituições citadas.</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-sm text-brand-200/80 block mb-1">Investimento</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">R$</span>
                  <span className="text-5xl font-black text-white">{prices.partners}</span>
                </div>
                <span className="text-sm text-brand-300 font-medium block mt-2">Em até 4x no cartão</span>
              </div>

              <button
                onClick={() => handleOpenPopup("Ex-alunos & Parceiros", "ex-alunos Equipe Rodrigo Faria, cooperados UNIODONTO, membros do Grupo de Estudos Patrícia Ferrari e associados SBEndo", "https://pay.kiwify.com.br/sQSX4he")}
                className="w-full py-4 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-brand-900/50"
              >
                Comprar Agora
              </button>
            </motion.div>

            {/* Categoria 3: Dentistas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="mb-4 text-xs font-bold text-brand-400 tracking-wider uppercase">{prices.label}</div>
              <h3 className="text-xl font-bold text-white mb-4">Cirurgiões-dentistas</h3>
              <div className="space-y-3 mb-8 pb-6 border-b border-white/10 flex-grow">
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Destinado a <strong className="text-white">Cirurgiões-dentistas formados</strong> que buscam atualização e excelência clínica.
                </p>
                <div className="flex items-start gap-2 text-xs text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Acesso completo a todas as palestras e feira comercial.</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-sm text-neutral-400 block mb-1">Investimento</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">R$</span>
                  <span className="text-5xl font-black text-white">{prices.dentists}</span>
                </div>
                <span className="text-sm text-brand-400/80 font-medium block mt-2">Em até 4x no cartão</span>
              </div>

              <button
                onClick={() => handleOpenPopup("Cirurgiões-dentistas", null, "https://pay.kiwify.com.br/7HjGskz")}
                className="w-full py-4 rounded-xl font-bold text-brand-900 bg-white hover:bg-brand-50 hover:scale-[1.02] transition-all duration-300"
              >
                Comprar Agora
              </button>
            </motion.div>
          </div>

          {/* Policy Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-brand-900/20 border border-brand-500/20 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-brand-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Política de Inscrição e Responsabilidade</h4>
                <p className="text-brand-100/70 text-sm leading-relaxed">
                  Ao adquirir seu ingresso, o participante assume a responsabilidade de garantir que sua categoria profissional condiz com o ingresso selecionado.
                  <strong className="text-white"> É obrigatória a comprovação da categoria no momento do credenciamento.</strong>
                  Caso não seja apresentada a documentação comprobatória, será cobrada a diferença de valor para o ingresso integral vigente no dia do evento para a liberação da credencial.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* LOCATION SECTION */}
      <section id="localizacao" className="relative w-full py-32 bg-white overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-8">Local do Evento</h2>
              <div className="flex items-start gap-5 mb-10 p-6 bg-white rounded-3xl shadow-lg shadow-neutral-200/40 border border-neutral-100">
                <div className="p-4 bg-brand-50 rounded-2xl text-brand-600">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Center Convention Uberlândia</h3>
                  <p className="text-neutral-500 leading-relaxed text-lg">
                    Center Shopping - Av. João Naves de Ávila, 1331<br />
                    Piso L4 - Tibery, Uberlândia/MG<br />
                    CEP 38408-902
                  </p>
                </div>
              </div>


              {/* Convention Photos Gallery */}
              <div className="grid grid-cols-3 gap-4 h-[240px]">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/centerconvention/img-aerea-predio.webp" alt="Center Convention Aérea" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/centerconvention/salao-cadeiras.webp" alt="Center Convention Salão" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/centerconvention/img-desfocada-palestra.webp" alt="Evento no Center Convention" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neutral-100 rounded-[3rem] overflow-hidden aspect-square relative shadow-2xl border-4 border-white"
            >
              <iframe
                src="https://maps.google.com/maps?q=Center%20Convention%20Uberl%C3%A2ndia&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION SECTION */}
      <section id="hospedagem" className="w-full py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
            >
              Onde se hospedar para o <span className="text-brand-900">Endomeeting</span>
            </motion.h2>
            <p className="text-neutral-500 max-w-2xl text-xl font-medium leading-relaxed">
              Para facilitar sua experiência no evento, reunimos o hotel oficial e algumas opções próximas ao local do Endomeeting em Uberlândia.
            </p>
          </div>

          {/* Featured Hotel: Mercure */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-neutral-50 border border-neutral-100 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
                <Image 
                  src="/images/hoteis/mercure-hotel-principal.jpg" 
                  alt="Mercure Uberlândia Plaza Shopping" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 bg-brand-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Hotel do Evento
                </div>
              </div>
              
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-brand-700 font-black uppercase tracking-[0.3em] text-xs mb-4">Hospedagem Oficial</span>
                <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 leading-tight">Mercure Uberlândia Plaza Shopping</h3>
                <p className="text-neutral-500 mb-10 leading-relaxed font-medium">
                  Opção oficial do evento, com localização estratégica e estrutura ideal para quem busca praticidade, conforto e fácil acesso.
                </p>

                <div className="space-y-6 mb-12">
                  <div className="p-5 bg-white rounded-2xl border border-neutral-100 group hover:border-brand-500/30 transition-colors shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">Endereço</span>
                    <p className="text-neutral-900 font-medium">Rua da Bandeira, 400, Uberlândia - MG, 38405-174</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white rounded-2xl border border-neutral-100 group hover:border-brand-500/30 transition-colors shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">E-mail</span>
                      <p className="text-neutral-900 font-medium text-sm truncate">h9602-re@accor.com</p>
                    </div>
                    <div className="p-5 bg-white rounded-2xl border border-neutral-100 group hover:border-brand-500/30 transition-colors shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">Telefone</span>
                      <p className="text-neutral-900 font-medium">(34) 3239-8000</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Mercure+Uberlândia+Plaza+Shopping" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-brand-900 hover:bg-brand-950 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-brand-900/20"
                  >
                    Ver localização
                  </a>
                  <a 
                    href="https://api.whatsapp.com/send/?phone=553432398000" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 font-bold rounded-xl border border-neutral-200 transition-all hover:scale-105"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Hotels Grid */}
          <div className="mt-24 text-center">
            <h4 className="text-2xl font-bold text-neutral-400 mb-12 uppercase tracking-widest text-sm">Hotéis próximos ao evento</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Ibis Uberlândia", img: "/images/hoteis/ibis.jpg" },
                { name: "Ibis Budget Uberlândia", img: "/images/hoteis/ibis-budget.jpg" },
                { name: "Villalba Hotel", img: "/images/hoteis/image-uberlandia-villalba-hotel-16.jpg" }
              ].map((hotel, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <Image 
                    src={hotel.img} 
                    alt={hotel.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <h5 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{hotel.name}</h5>
                    <p className="text-xs text-neutral-300 uppercase tracking-widest mt-2">Próximo ao evento</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <Sponsors />
    </div>
  );
}
