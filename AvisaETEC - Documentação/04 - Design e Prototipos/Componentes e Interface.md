# Componentes e Interface — AvisaETEC

## 1. Visão Geral do Design System

A interface do **AvisaETEC** foi desenhada para proporcionar máxima legibilidade, agilidade no recebimento de notificações críticas e excelente usabilidade tanto em dispositivos móveis (smartphones) quanto em navegadores desktop.

- **Framework de Estilo:** Tailwind CSS
- **Biblioteca de Ícones:** Lucide React
- **Tema:** Suporte nativo a Modo Claro (*Light Mode*) e Modo Escuro (*Dark Mode*).
- **Paleta de Cores:**
  - Primária (Identidade ETEC): Carmesim institucional (`#B91C1C` / Tailwind `red-700`)
  - Fundo Dark Mode: Slate Profundo (`#0F172A` / Tailwind `slate-900`)
  - Cartões e Superfícies: Slate (`#1E293B` / Tailwind `slate-800` no escuro e `white` no claro)
  - Cores Semânticas de Alertas:
    - Informativo: Azul (`#2563EB`)
    - Urgente / Atenção: Âmbar (`#D97706`)
    - Sucesso / Letivo: Esmeralda (`#059669`)

---

## 2. Mapa de Páginas e Telas

### 2.1. Tela de Login (`/login`)
- **Objetivo:** Ponto único de entrada para Alunos e Funcionários.
- **Componentes:**
  - `LoginCard`: Caixa centralizada com logotipo do AvisaETEC.
  - `InputField`: Campos de e-mail e senha com máscara e botão para exibir/ocultar senha.
  - `RoleBadgeSelector` / Informação visual das credenciais aceitas.
  - `SubmitButton`: Botão com estado de carregamento (*spinner*).
  - Alerta de erro de autenticação com mensagem amigável.

### 2.2. Mural de Avisos (`/mural` ou `/`)
- **Objetivo:** Exibir a timeline de notificações recebidas em tempo real.
- **Componentes:**
  - `HeaderBar`: Saudação ao usuário logado, status de conexão Socket.io (*Online/Offline*) e alternador de tema.
  - `FilterTabs`: Filtro rápido entre *Todos*, *Não Lidos*, *Avisos da Turma* e *Avisos Diretos*.
  - `NoticeCard`:
    - Cabeçalho: Nome do remetente (Professor/Coordenador), perfil, tag de turma ou individual e data formatada.
    - Corpo: Título em destaque e mensagem completa formatada.
    - Rodapé: Botão de ação "Marcar como Lido" (se não lido) e indicador de status (badge verde quando lido).
  - `EmptyState`: Ilustração e texto motivacional quando não houver avisos não lidos.
  - `FloatingActionButton (FAB)`: Botão de ação rápida flutuante (ícone de sino com `+`) disponível **exclusivamente para Funcionários**.

### 2.3. Modal de Criação de Aviso (`CreateNoticeModal`)
- **Acesso:** Exclusivo para Funcionários (Professores, Coordenadores e Diretores).
- **Campos e Validações:**
  - Campo *Título do Aviso* (obrigatório, até 120 caracteres).
  - Campo *Tipo de Destino* (Switch de opção exclusiva: "Turma Inteira" OU "Aluno Específico").
  - Dropdown dinâmico dependente da escolha anterior:
    - Se *Turma*: Dropdown populado via `/api/modulos`.
    - Se *Aluno*: Busca por autocomplete ou dropdown populado via `/api/alunos`.
  - Campo *Mensagem / Conteúdo do Aviso* (Textarea com suporte a quebras de linha).
  - Botão *Publicar e Notificar Agora*: Faz requisição `POST /api/notificacoes` e fecha o modal ao concluir.

### 2.4. Calendário Acadêmico (`/calendario`)
- **Objetivo:** Centralizar datas relevantes (início de aulas, feriados, conselhos e eventos escolares).
- **Componentes:**
  - `CalendarControls`: Seleção de mês anterior/próximo e retorno para o mês atual.
  - `MonthGrid`: Grade de 7 colunas (dias da semana) com marcação visual dos dias com evento.
  - `EventPill`: Marcador colorido dentro de cada dia indicando a categoria (Ex: Feriado, Conselho de Classe, Feira Tecnológica).
  - `EventDetailModal`: Ao clicar no dia, abre um resumo completo das atividades programadas.

---

## 3. Árvore de Componentes React

```text
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   └── ThemeToggle.jsx
│   ├── layout/
│   │   ├── MainLayout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── BottomNav.jsx          # Barra inferior para telas mobile
│   ├── feed/
│   │   ├── NoticeCard.jsx
│   │   ├── NoticeList.jsx
│   │   ├── NoticeFilterBar.jsx
│   │   └── NoticeSkeleton.jsx     # Feedback visual durante carregamento
│   ├── modals/
│   │   └── CreateNoticeModal.jsx
│   └── calendar/
│       ├── CalendarView.jsx
│       ├── CalendarHeader.jsx
│       ├── DayCell.jsx
│       └── EventModal.jsx
```

---

## 4. Guia de Responsividade (Mobile-First)

| Breakpoint | Layout da Barra Lateral | Mural de Avisos | Modal de Criação |
| :--- | :--- | :--- | :--- |
| **Mobile (< 768px)** | Oculta. Navegação transferida para a barra inferior fixa (*BottomNav*). | Cartões ocupam 100% da largura, com botões de toque confortáveis (mínimo 44px). | Modal renderizado como *Bottom Sheet* expansível de baixo para cima. |
| **Tablet / Desktop (≥ 768px)** | Sidebar esquerda fixa com menu, perfil e atalhos. | Grade centralizada com largura máxima confortável (`max-w-4xl`). | Modal centralizado com fundo escurecido (*backdrop-blur*). |
