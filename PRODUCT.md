# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Alunos (Discentes da ETEC):** Estudantes do ensino técnico e integrado que necessitam de informações confiáveis e em tempo real sobre alterações de rotina (mudanças de sala, ausências de professores, horários de aulas e prazos). Consomem prioritariamente via mobile e web no ambiente escolar.
- **Funcionários (Docentes e Gestão Escolar):** Professores, coordenadores de curso e diretores que precisam emitir avisos oficiais com entrega imediata e segmentada por turma ou discente individual, eliminando o ruído de grupos paralelos e a lentidão de murais físicos.

## Product Purpose

O **AvisaETEC** é uma plataforma web SPA de comunicação escolar em tempo real desenvolvida para a ETEC. Seu objetivo central é eliminar a fragmentação de avisos e a perda de informações críticas no ambiente educacional. Sucesso significa entrega com latência mínima via WebSockets, garantia de segmentação segura (RN01 e RN02) e rastreamento de leitura (RN04), complementado pelo calendário acadêmico da instituição (RF05).

## Positioning

O canal oficial e imediato da ETEC com autoridade institucional. Diferente de aplicativos de mensagens informais (como WhatsApp ou murais impressos), o AvisaETEC garante governança: apenas funcionários autenticados podem publicar comunicados, com direcionamento restrito por módulo ou aluno individual e preservação de privacidade sob as diretrizes da LGPD.

## Operating Context

- **Rotina Escolar Rápida:** Notificações urgentes de início de período (ex: mudança de laboratório, cancelamento de aula por intempérie, conselho de classe ou plantão de dúvidas de TCC).
- **Ambiente de Acesso Híbrido:** Discentes acessando via smartphone em conexões móveis ou Wi-Fi escolar; docentes operando no desktop ou estações da sala dos professores.
- **Ciclo Semestral ETEC:** Cronograma semestral estruturado com datas de início/fim de aulas, feriados, conselhos intermediários e bancas de TCC.

## Capabilities and Constraints

- **Capacidades Confirmadas:**
  - Autenticação com controle de acesso baseado em papéis (RBAC): Diretor, Coordenador, Professor e Aluno.
  - Envio de comunicados em tempo real orientado a salas virtuais (`Socket.io`).
  - Segmentação estrita (RN02): Envio obrigatório para Módulo OU Aluno individual (nunca ambos, nunca nenhum).
  - Rastreamento de leitura por aviso (RN04).
  - Calendário acadêmico interativo semestral com visualização mensal e detalhes de eventos (RF05).
  - Interface com alternância nativa de Modo Claro / Modo Escuro (RNF02).
- **Restrições Técnicas:**
  - Aplicação web SPA (React + Vite + Tailwind CSS + Lucide React).
  - Backend desacoplado em Node.js (Express ESModules) com persistência relacional via Prisma ORM.
  - Senhas sempre armazenadas sob hash criptográfico Bcrypt com salt rounds fator 10 (RN03).
  - Minimização de dados pessoais sob conformidade com a LGPD (RNF05).

## Brand Commitments

- **Nome:** AvisaETEC (com identidade visual destacando o "ETEC" em carmesim institucional).
- **Tom de Voz:** Institucional, claro, direto e confiável. Foco em agilidade e seriedade como canal oficial.
- **Cores & Identidade:** Vermelho Carmesim da ETEC (`#B91C1C` / `bg-red-700`) como primária; Modo Escuro elegante com tons de Slate grafite (`#0F172A`).

## Evidence on Hand

- Documentação estruturada de TCC na pasta `AvisaETEC - Documentação/` (Escopo, Regras de Negócio RN01-RN04, Requisitos Funcionais RF01-RF05 e DER).
- Suíte de testes automatizados com 10/10 aprovações em `backend/test-api.js`.
- Base de dados semente (`prisma/seed.js`) com usuários demonstrativos: Prof. Carlos, Coord. Maria, Aluno Lucas e Aluno Rodrigo.

## Product Principles

1. **Urgência e Confiança:** Notificações escolares críticas devem ser entregues imediatamente sem necessidade de recarregar a página (F5).
2. **Segmentação sem Ruído:** Cada aluno recebe estritamente os avisos pertinentes ao seu módulo ou à sua pessoa, evitando sobrecarga cognitiva.
3. **Segurança e Papéis Rígidos:** Apenas funcionários autenticados podem emitir comunicados; a autorização é validada no backend (RBAC), não apenas na interface.
4. **Acessibilidade Mobile-First:** Discentes utilizam primordialmente o celular na escola; a usabilidade tátil, tipografia legível e contraste em Dark Mode são fundamentais.
5. **Privacidade por Design (LGPD):** Coleta estritamente do mínimo necessário para a comunicação educacional, sem exposição de dados sensíveis.

## Accessibility & Inclusion

- Navegação com botões táteis de pelo menos 44px para dispositivos móveis.
- Contraste visual adequado em conformidade com WCAG AA tanto no tema Claro quanto no tema Escuro.
- Textos descritivos em ícones e rótulos de formulários para leitores de tela.
