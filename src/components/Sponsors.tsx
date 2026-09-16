"use client";

import { motion } from "framer-motion";

const sponsors = {
  diamante: ["/placeholder-sponsor.webp"],
  ouro: ["/placeholder-sponsor.webp", "/placeholder-sponsor.webp"],
  prata: ["/placeholder-sponsor.webp", "/placeholder-sponsor.webp", "/placeholder-sponsor.webp"],
  apoiadores: ["/placeholder-sponsor.webp", "/placeholder-sponsor.webp", "/placeholder-sponsor.webp", "/placeholder-sponsor.webp"]
};

export function Sponsors() {
  return (
    <section id="patrocinadores" className="w-full py-32 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-50/30 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
          >
            Patrocinadores
          </motion.h2>
          <p className="text-neutral-500 max-w-2xl text-xl font-medium">
            Parceiros que tornam o <span className="text-brand-900 font-bold">4º Endomeeting TM</span> uma grande realidade.
          </p>
        </div>

        <div className="flex flex-col gap-20 max-w-6xl mx-auto">
          {/* Cota Diamante */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-10">
              <span className="text-sm font-black text-cyan-700 tracking-[0.3em] uppercase bg-cyan-50 border border-cyan-200/80 px-8 py-2.5 rounded-full shadow-sm">
                💎 Cota Diamante
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 w-full">
              {sponsors.diamante.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="w-72 h-36 sm:w-96 sm:h-44 bg-gradient-to-b from-white to-cyan-50/30 rounded-[2.5rem] border-2 border-cyan-100 shadow-[0_20px_50px_rgba(6,182,212,0.1)] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-2xl hover:border-cyan-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/0 via-cyan-100/30 to-cyan-200/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-cyan-900/60 group-hover:text-cyan-900 font-extrabold text-lg tracking-tight transition-colors">
                    Logo Diamante
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cota Ouro */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xs font-bold text-amber-600 tracking-[0.3em] uppercase mb-10 bg-amber-50 border border-amber-200/70 px-6 py-2 rounded-full">
              Cota Ouro
            </h3>
            <div className="flex flex-wrap justify-center gap-10 w-full">
              {sponsors.ouro.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="w-60 h-28 sm:w-72 sm:h-36 bg-white rounded-[2rem] border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-xl hover:border-amber-200 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/0 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-neutral-400 group-hover:text-neutral-700 font-bold text-base tracking-tight transition-colors">
                    Logo Ouro
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cota Prata */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mb-8 bg-slate-50 border border-slate-200/70 px-6 py-2 rounded-full">
              Cota Prata
            </h3>
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {sponsors.prata.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -4 }}
                  className="w-44 h-22 sm:w-56 sm:h-28 bg-white rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:shadow-md hover:border-slate-300 group"
                >
                  <span className="text-neutral-400 group-hover:text-neutral-600 font-bold text-sm tracking-tight transition-colors">
                    Logo Prata
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Apoiadores */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center pt-6 border-t border-neutral-100"
          >
            <h3 className="text-xs font-bold text-neutral-400 tracking-[0.3em] uppercase mb-8">
              Apoiadores
            </h3>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
              {sponsors.apoiadores.map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-16 sm:w-40 sm:h-20 bg-neutral-50/60 rounded-xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500"
                >
                  <span className="text-neutral-400 text-xs font-semibold">Apoio</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
