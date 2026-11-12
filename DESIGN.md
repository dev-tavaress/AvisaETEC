---
name: AvisaETEC
description: Sistema Web SPA de Comunicação Escolar em Tempo Real
colors:
  primary: "#b91c1c"
  primary-hover: "#991b1b"
  primary-subtle: "#fef2f2"
  neutral-light-bg: "#f8fafc"
  neutral-light-surface: "#ffffff"
  neutral-light-border: "#e2e8f0"
  neutral-dark-bg: "#020617"
  neutral-dark-surface: "#0f172a"
  neutral-dark-card: "#1e293b"
  neutral-dark-border: "#1e293b"
  accent-success: "#059669"
  accent-warning: "#d97706"
  accent-info: "#2563eb"
  accent-individual: "#7c3aed"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-light-surface}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-notice:
    backgroundColor: "{colors.neutral-light-surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input-field:
    backgroundColor: "{colors.neutral-light-bg}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: AvisaETEC

## Overview

**Creative North Star: "O Farol Carmesim" (The Crimson Signal)**

O AvisaETEC opera como um farol de comunicação escolar em tempo real: claro, focado, confiável e com alta autoridade institucional. A interface foi concebida sob o modo **Operate** (completar tarefas e consumir avisos críticos sem ruído cognitivo), garantindo que mensagens sobre mudanças de salas, prazos de TCC, conselhos e convocações sejam absorvidas instantaneamente tanto em smartphones quanto em telas desktop.

O sistema rejeita conscientemente os dois extremos que degradam a experiência educacional: a poluição caótica de redes sociais (sem likes, sem rolagem infinita sem fim, sem elementos de distração visual) e a frieza burocrática dos sistemas escolares legados (sem formulários cinzas densos, sem ausência de modo escuro e sem layouts estáticos incompatíveis com mobile).

**Key Characteristics:**
- **Hierarquia de Sinal Limpo:** O carmesim institucional atua como um feixe de luz que direciona os olhos para comunicados novos, urgências e ações primárias.
- **Tonal Layering de Alta Densidade de Foco:** Superfícies planas em repouso com bordas milimétricas e iluminação suave de acento apenas quando há interação ou notificação recebida em tempo real.
- **Toque Confiante e Arredondado:** Raios generosos de 12px a 24px, garantindo ergonomia tátil para uso com uma só mão em telas móveis.

---

## Colors

A paleta cromática combina a autoridade do Carmesim Institucional com a elegância da Ardósia Noturna, complementada por códigos semânticos inequívocos.

### Primary
- **Carmesim Institucional ETEC** (`#B91C1C` / Tailwind `red-700`): O coração da identidade da escola. Usado no logotipo, no botão de ação principal, nos avisos de maior urgência e no status em tempo real.
- **Carmesim Escurecido (Hover)** (`#991B1B` / Tailwind `red-800`): Estado ativo e de foco do botão primário.
- **Carmesim Sutil** (`#FEF2F2` no claro / `#450A0A` no escuro): Planos de fundo de avisos novos e cards com leitura pendente.

### Neutral
- **Ardósia Noturna Profunda (Fundo Dark)** (`#020617` / Tailwind `slate-950`): Base escura projetada para máxima economia de energia em telas OLED e redução drástica da fadiga visual.
- **Superfície Dark (Painéis & Sidebar)** (`#0F172A` / Tailwind `slate-900`): Nível 1 de elevação em modo escuro.
- **Card Dark** (`#1E293B` / Tailwind `slate-800`): Nível 2 de elevação onde repousam os comunicados e módulos.
- **Giz / Chalk Paper (Fundo Light)** (`#F8FAFC` / Tailwind `slate-50`): Fundo claro suave que evita o branco puro `#ffffff` ofuscante.
- **Superfície Light** (`#FFFFFF`): Cartões e modais no modo claro.
- **Divisores e Bordas** (`#E2E8F0` no claro / `#1E293B` no escuro): Linhas estruturais sutis de 1px.

### Semantics
- **Esmeralda Letivo / Lido** (`#059669`): Marcação de confirmação de leitura e dias letivos no calendário.
- **Âmbar Atenção / Não Lido** (`#D97706`): Alerta para comunicados pendentes de leitura e reuniões pedagógicas.
- **Azul Módulo / Turma** (`#2563EB`): Identificação de comunicados endereçados à turma inteira.
- **Roxo Individual** (`#7C3AED`): Identificação de comunicados particulares direcionados a um discente específico.

### Named Rules
**A Regra da Sobriedade do Carmesim.** O vermelho carmesim nunca deve ultrapassar 15% da área visível de qualquer tela. Sua autoridade vem de ser o destaque de ação e urgência; saturar a interface em vermelho reduz seu impacto comunicativo.

---

## Typography

**Display & Body Font:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
A tipografia adota o sistema sans-serif nativo otimizado pelo navegador com `font-feature-settings: "cv02", "cv03", "cv04", "cv11"`, garantindo renderização ultra-nítida e carregamento com zero latência (sem dependência de fontes externas bloqueantes).

### Hierarchy
- **Display** (Bold 900, `1.875rem` / 30px, line-height 1.25, tracking `-0.025em`): Título do Mural e Calendário Acadêmico.
- **Headline** (Bold 700, `1.25rem` / 20px, line-height 1.35): Títulos de seções, cabeçalhos de modais e avisos em destaque.
- **Title** (Bold 700, `1rem` / 16px, line-height 1.5): Título de cada `NoticeCard`.
- **Body** (Regular 400, `0.875rem` / 14px, line-height 1.6, max 75ch): Conteúdo textual completo das notificações e descrições de eventos.
- **Label / Meta** (SemiBold 600, `0.75rem` / 12px, tracking `0.05em`, uppercase em badges): Remetente, status de turma, contadores e datas.

---

## Layout

O layout baseia-se em um grid fluído adaptativo com contêiner centralizado (`max-w-7xl` geral e `max-w-5xl` para leitura de timeline):
- **Desktop (≥ 768px):** Cabeçalho superior translúcido com `backdrop-blur` de 64px (`h-16`), barra lateral esquerda fixa de 256px (`w-64`) e feed central com cartões espaçados a 16px (`gap-4` ou `space-y-4`).
- **Mobile (< 768px):** Sidebar recolhida e substituída por uma barra de navegação inferior ergonômica (*BottomNav*) de 64px com alvos de toque de 48px, permitindo navegação fluida com o polegar.
- **Ritmo Espacial:** Escala estrita em múltiplos de 4px/8px (`gap-2`, `gap-3`, `gap-4`, `p-5`, `p-6`).

---

## Elevation & Depth

O sistema adota **Tonal Layering** com sombras ambientais coloridas. Em estado de repouso, os cartões são visualmente limpos, separados por bordas sutis de 1px.

### Shadow Vocabulary
- **Sombra de Repouso** (`shadow-sm`): Leve separação para cartões normais no modo claro.
- **Sombra de Notificação Não Lida** (`shadow-md shadow-red-500/5`): Discreto halo avermelhado ao redor de avisos que o discente ainda não visualizou.
- **Sombra de Botão Primário** (`shadow-lg shadow-red-700/25`): Elevação tátil no botão de ação principal.
- **Sombra Flutuante de Modal** (`shadow-2xl` com `backdrop-blur-sm`): Elevação máxima isolando o contexto ao criar um aviso ou visualizar um evento.

### Named Rules
**A Regra da Elevação por Estado.** Elementos só recebem sombras estruturais quando há interação ativa (hover/focus), urgência (não lido) ou sobreposição modal. Superfícies estáticas permanecem no plano.

---

## Shapes

- **Raios de Borda (Border Radius):**
  - `rounded-xl` (12px): Botões principais, inputs de texto, células de calendário e tabs de filtros.
  - `rounded-2xl` (16px): Cartões de avisos (`NoticeCard`) e painéis de dados.
  - `rounded-3xl` (24px): Janelas modais (`CreateNoticeModal`, `EventModal`) e cartões mestres.
  - `rounded-full` (9999px): Badges de status, pílulas de contagem e botões circulares de ação.
- **Bordas:** Delimitadas em 1px contínuo (`border-slate-200` no claro e `border-slate-800` no escuro).

---

## Components

### Buttons
- **Shape:** `rounded-xl` (12px), altura mínima de 42px.
- **Primary:** `bg-red-700 hover:bg-red-800 text-white font-bold shadow-lg shadow-red-700/20`.
- **Secondary / Filter:** `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold`.
- **Success Action (Marcar como Lido):** `bg-emerald-600 hover:bg-emerald-700 text-white font-semibold`.

### Cards (NoticeCard)
- **Corner Style:** `rounded-2xl` (16px), padding interno de 20px (`p-5`).
- **Background:** `bg-white dark:bg-slate-900` para lidos; borda `border-red-300 dark:border-red-900/60` para não lidos.
- **Rodapé:** Divisor de 1px separando o corpo do aviso da identificação do docente e botões de ação.

### Inputs & Selects
- **Corner Style:** `rounded-xl` (12px), preenchimento interno `px-3.5 py-2.5`.
- **Background:** `bg-slate-50 dark:bg-slate-800/80` com borda `border-slate-200 dark:border-slate-700`.
- **Focus:** Anel de foco com halo vermelho `focus:ring-2 focus:ring-red-600`.

### Navigation & Pills
- **Sidebar Links:** Padding `px-3 py-2.5`, raio de 12px; estado ativo com `bg-red-700 text-white`.
- **Badges Semânticos:** Raio `rounded-md` ou `rounded-lg`, texto `text-[10px]` ou `text-xs` font-bold.

---

## Do's and Don'ts

### Do:
- **Do** utilizar sempre a combinação de ícone e texto em ações críticas (ex: ícone de sino + contagem, ícone de check + "Marcar como Lido").
- **Do** manter contraste mínimo de 4.5:1 (WCAG AA) para todos os textos informativos em ambos os temas.
- **Do** garantir que toques em elementos interativos no mobile tenham no mínimo 44x44px de área de clique.
- **Do** preservar a diferenciação clara entre avisos coletivos de turma (azul) e individuais (roxo).

### Don't:
- **Don't** utilizar o vermelho carmesim em fundos de cartões inteiros (use apenas em bordas, badges ou botões para não causar cansaço visual).
- **Don't** exibir botões de criação de aviso para alunos (a RN01 exige bloqueio estrito na interface e no servidor).
- **Don't** utilizar fontes serifadas decorativas ou manuscritas que comprometam a legibilidade rápida de avisos de emergência.
- **Don't** emitir alertas intrusivos sem opção de descarte rápido pelo usuário.
