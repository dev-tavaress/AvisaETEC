# AvisaETEC — Comunicação Escolar em Tempo Real

> **Trabalho de Conclusão de Curso (TCC) — ETEC**  
> Aplicação Web SPA desenvolvida para modernizar e agilizar a transmissão de avisos e comunicados acadêmicos urgentes entre o corpo docente e os alunos.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React SPA, Vite, Tailwind CSS, Lucide React, Socket.io-client, Axios.
- **Backend:** Node.js (ESModules), Express, Socket.io (WebSockets), JSON Web Token (JWT), Bcryptjs.
- **Banco de Dados:** Prisma ORM com suporte a PostgreSQL e SQLite local imediato.

---

## 📁 Estrutura do Monorepo

```text
AvisaETEC/
├── backend/                       # API REST + Servidor WebSocket
│   ├── prisma/
│   │   ├── schema.prisma          # Modelagem relacional
│   │   └── seed.js                # Carga de turmas e usuários de demonstração
│   ├── src/                       # Controllers, Middlewares, Sockets e Serviços
│   ├── server.js                  # Ponto de entrada do servidor
│   └── test-api.js                # Suíte de testes automatizados de API e regras
│
├── frontend/                      # Single Page Application (SPA)
│   ├── src/
│   │   ├── components/            # Componentes modulares (feed, calendar, modals)
│   │   ├── context/               # AuthContext, NotificationContext, ThemeContext
│   │   ├── pages/                 # Login, Mural de Avisos e Calendário
│   │   └── data/                  # Mock do Calendário Acadêmico (RF05)
│   └── index.html
│
└── AvisaETEC - Documentação/      # Especificações, DER, RNs e Requisitos de TCC
```

---

## ⚡ Como Executar o Projeto

### 1. Iniciar o Backend
```bash
cd backend
npm install
npm run prisma:push    # Cria as tabelas do banco
npm run prisma:seed    # Popula dados de demonstração
npm run dev            # Inicia em http://localhost:3001
```

*Para rodar os testes automatizados de validação de regras (RN01 a RN04):*
```bash
npm test # ou: node test-api.js
```

### 2. Iniciar o Frontend (SPA)
Em um novo terminal:
```bash
cd frontend
npm install
npm run dev            # Inicia em http://localhost:5173
```

---

## 🔑 Credenciais de Demonstração (Seed)

| Nome | E-mail | Senha Padrão | Perfil / Cargo | Turma Vinculada |
| :--- | :--- | :--- | :--- | :--- |
| **Prof. Carlos Eduardo** | `professor@etec.sp.gov.br` | `senha123` | Funcionário (Professor) | Institucional |
| **Coord. Maria Fernandes** | `coordenadora@etec.sp.gov.br` | `senha123` | Funcionário (Coordenador) | Institucional |
| **Lucas Silva** | `lucas@aluno.etec.sp.gov.br` | `senha123` | Aluno | 1º Módulo DS (Tarde) |
| **Rodrigo Alves** | `rodrigo@aluno.etec.sp.gov.br` | `senha123` | Aluno | 2º Módulo DS (Noite) |

> [!TIP]
> Na tela de login, você pode clicar nos botões de **"Acesso Rápido para Demonstração"** para autenticar qualquer um dos usuários com apenas 1 clique durante a apresentação da banca examinadora!

---

## 🛡️ Regras de Negócio e Segurança Validadas

- **RN 01 — Hierarquia e Perfis:** Apenas Funcionários autenticados podem emitir comunicados. Alunos têm acesso exclusivo de leitura no backend.
- **RN 02 — Segmentação Exclusiva:** Todo aviso deve ser obrigatoriamente para uma turma inteira OU para um aluno individual (nunca ambos, nunca nenhum).
- **RN 03 — Criptografia de Senhas:** Senhas armazenadas com hash Bcrypt com salt rounds de fator 10.
- **RN 04 — Rastreamento de Leitura:** Indicador de status lido/não lido com persistência no banco e atualização reativa.
- **RNF 01 — Tempo Real:** WebSocket (Socket.io) com salas virtuais segmentadas (`modulo:X`, `user:Y`, `staff`).
- **RNF 05 — LGPD:** Minimização de dados, consultas parametrizadas e proteção de dados sensíveis.
