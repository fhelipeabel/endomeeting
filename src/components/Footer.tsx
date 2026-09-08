import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-1 lg:col-span-2">
            <Image 
              src="/logo.png.png" 
              alt="Endomeeting Logo" 
              width={200} 
              height={60} 
              className="h-12 w-auto mb-6 grayscale invert brightness-200"
            />
            <p className="mb-6 max-w-sm text-neutral-400 leading-relaxed">
              O maior evento para endodontistas do Triângulo Mineiro. Venha vivenciar a endodontia com sucesso e excelência em resultados.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/endomeetingtriangulo/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-brand-600 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#sobre" className="hover:text-brand-400 transition-colors">Sobre</a></li>
              <li><a href="#palestrantes" className="hover:text-brand-400 transition-colors">Palestrantes</a></li>
              <li><a href="#cronograma" className="hover:text-brand-400 transition-colors">Cronograma</a></li>
              <li><a href="#ingressos" className="hover:text-brand-400 transition-colors">Ingressos</a></li>
              <li><a href="#localizacao" className="hover:text-brand-400 transition-colors">Localização</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-sm text-neutral-500">WhatsApp</span>
                <a 
                  href="https://api.whatsapp.com/send/?phone=5534998121269&text&type=phone_number&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-400 hover:text-brand-300 font-medium"
                >
                  (34) 99812-1269
                </a>
              </li>
              <li className="flex flex-col mt-2">
                <span className="text-sm text-neutral-500">Realização</span>
                <span className="font-medium text-white">Equipe Rodrigo Faria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Equipe Rodrigo Faria. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Desenvolvido por Is Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
