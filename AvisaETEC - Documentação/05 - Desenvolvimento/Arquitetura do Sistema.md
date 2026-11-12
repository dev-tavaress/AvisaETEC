# Arquitetura do Sistema — AvisaETEC

> Documento oficial de especificação técnica e de engenharia de software para o Trabalho de Conclusão de Curso (TCC).

---

## 1. Topologia da Solução

O **AvisaETEC** adota uma arquitetura em camadas moderna baseada em Node.js e React:

- **Frontend:** Single Page Application (SPA) construída com React, empacotada com Vite, estilizada com Tailwind CSS e ícones Lucide React.
- **Backend:** Servidor REST e WebSocket em Node.js (Express com ESModules), integrando Socket.io para envio de avisos em tempo real com baixa latência.
- **Camada de Persistência:** Banco de dados relacional PostgreSQL mapeado via Prisma ORM.

---

## 2. Estrutura do Monorepo

```text
AvisaETEC/
├── backend/                  # Servidor API REST + Socket.io
│   ├── prisma/
│   │   ├── schema.prisma     # Definição das tabelas e relacionamentos
│   │   └── seed.js           # Dados iniciais para demonstração
│   ├── src/
│   │   ├── config/           # Variáveis de ambiente e Prisma Client
│   │   ├── controllers/      # Controladores de rota
│   │   ├── middlewares/      # JWT, autenticação e verificação de perfil (RBAC)
│   │   ├── routes/           # Mapeamento de rotas HTTP
│   │   ├── services/         # Lógica de negócio e regras de validação (RN01, RN02)
│   │   ├── sockets/          # Gerenciamento de eventos e salas Socket.io
│   │   └── app.js            # Montagem do Express
│   ├── server.js             # Entrada do servidor (HTTP + WebSocket)
│   └── package.json
│
└── frontend/                 # Aplicação SPA React
    ├── src/
    │   ├── components/       # Componentes modulares (layout, feed, calendar, modal)
    │   ├── context/          # Provedores de estado (AuthContext, NotificationContext)
    │   ├── data/             # Mock de eventos acadêmicos (RF05)
    │   ├── hooks/            # Hooks customizados (useAuth, useNotifications, useTheme)
    │   ├── pages/            # Telas (Login, Mural de Avisos, Calendário)
    │   ├── services/         # Clientes Axios e Socket.io
    │   └── App.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 3. Modelo do Banco de Dados (schema.prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Modulo {
  id_modulo    Int           @id @default(autoincrement())
  nome         String        @db.VarChar(100)
  alunos       Aluno[]
  notificacoes Notificacao[]

  @@map("modulo")
}

model Funcionario {
  id_funcionario Int           @id @default(autoincrement())
  nome           String        @db.VarChar(150)
  email          String        @unique @db.VarChar(150)
  senha_hash     String        @db.VarChar(255)
  perfil         String        @db.VarChar(30) // 'professor', 'coordenador', 'diretor'
  criado_em      DateTime      @default(now())
  notificacoes   Notificacao[]

  @@map("funcionario")
}

model Aluno {
  id_aluno       Int           @id @default(autoincrement())
  nome           String        @db.VarChar(150)
  email          String        @unique @db.VarChar(150)
  senha_hash     String        @db.VarChar(255)
  id_modulo      Int
  criado_em      DateTime      @default(now())
  
  modulo         Modulo        @relation(fields: [id_modulo], references: [id_modulo], onDelete: Restrict)
  notificacoes   Notificacao[]

  @@map("aluno")
}

model Notificacao {
  id_notificacao     Int          @id @default(autoincrement())
  titulo             String       @db.VarChar(120)
  mensagem           String       @db.Text
  status             Boolean      @default(false)
  data               DateTime     @default(now())
  id_funcionario     Int
  id_modulo_destino  Int?
  id_aluno_destino   Int?

  funcionario        Funcionario  @relation(fields: [id_funcionario], references: [id_funcionario], onDelete: Restrict)
  moduloDestino      Modulo?      @relation(fields: [id_modulo_destino], references: [id_modulo], onDelete: Cascade)
  alunoDestino       Aluno?       @relation(fields: [id_aluno_destino], references: [id_aluno], onDelete: Cascade)

  @@map("notificacao")
}
```

---

## 4. Endpoints e Contratos REST

### Autenticação
- `POST /api/auth/login`: Autentica com email e senha. Verifica credenciais tanto em `Funcionario` quanto em `Aluno`, retornando token JWT e dados do perfil.
- `GET /api/auth/me`: Retorna os dados do usuário autenticado no momento.

### Módulos e Alunos
- `GET /api/modulos`: Lista módulos/turmas para o formulário de envio.
- `GET /api/alunos?moduloId=X`: Lista alunos (opcionalmente filtrados por turma).

### Notificações
- `GET /api/notificacoes`: Retorna feed com ordenação decrescente por data. Alunos recebem somente avisos vinculados a si mesmos ou à sua turma.
- `POST /api/notificacoes`: Cria novo aviso. Apenas Funcionários possuem autorização. Valida estritamente a RN02 (obrigatório escolher Turma OU Aluno, nunca ambos). Dispara notificação no Socket.io para a sala de destino.
- `PATCH /api/notificacoes/:id/status`: Marca o aviso como lido (`status = true`).

---

## 5. Arquitetura de Salas no Socket.io

Ao conectar com o token JWT, o servidor associa o cliente a canais específicos:
1. `user:${id_aluno}`: Canal individual para avisos particulares direcionados.
2. `modulo:${id_modulo}`: Canal coletivo para avisos transmitidos para a turma inteira.
3. `staff`: Canal comum para professores e gestores.

Quando um professor envia um aviso para um módulo, o backend executa:
```javascript
io.to(`modulo:${id_modulo_destino}`).emit('nova_notificacao', notificacaoCriada);
```
O discente conectado no frontend recebe instantaneamente o evento sem precisar recarregar a tela (F5).
