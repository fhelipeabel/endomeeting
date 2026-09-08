# Plano de Construção: 4º Endomeeting TM 2027

## 1. Visão Geral
Construir a nova landing page para o evento **4º Endomeeting TM 2027**, utilizando uma estrutura moderna, responsiva e de alta performance. O conteúdo será baseado na edição anterior, mas atualizado para 2027 e com design premium.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS (focado no vermelho escuro da logo, branco e tons neutros elegantes)
- **Ícones:** Lucide React
- **Animações:** Framer Motion (opcional) ou classes nativas do Tailwind.

## 3. Estrutura de Páginas e Componentes

### 3.1. Componentes Globais
- `Header`: Navbar responsiva com logo e links âncora para as seções.
- `Footer`: Rodapé com informações da Equipe Rodrigo Faria, direitos autorais e links úteis.
- `PaymentPopup`: Modal de aviso que aparece antes de redirecionar para a plataforma de pagamento terceirizada (Kiwify).

### 3.2. Seções da Landing Page (`app/page.tsx`)
1. **Hero Section:** Destaque do evento, data (2027), local e botão de CTA principal com o popup.
2. **Sobre o Evento:** Breve descrição do evento e seus objetivos.
3. **Palestrantes:** Grid de cards com a foto, nome e descrição dos professores renomados.
4. **Cronograma / Hands-on:** Lista ou abas com os horários das salas, atividades e palestrantes.
5. **Ingressos / Lotes:** Seção de preços e chamadas para ação (CTA para abrir o popup de compra).
6. **Localização e Hospedagem:** Mapa ou endereço do Center Convention Uberlândia e dicas de hotéis.
7. **Patrocinadores:** Área para logos de apoiadores e empresas parceiras.

## 4. Passos de Implementação

1. **Setup Inicial:**
   - Limpar arquivos no diretório e rodar o create-next-app.
   - Configurar variáveis de cor baseadas no vermelho escuro e branco.
2. **Desenvolvimento de UI:**
   - Criar layout base (Header, Footer).
   - Desenvolver cada seção da Home progressivamente.
   - Implementar a lógica do Popup de Aviso.
3. **Refinamento:**
   - Aplicar micro-interações e ajustes de responsividade (Mobile First).
   - Inserir imagens placeholder que serão posteriormente substituídas pelos assets oficiais.
4. **Validação Final:**
   - Testar o fluxo de redirecionamento do popup.
