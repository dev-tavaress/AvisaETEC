# Requisitos Não Funcionais - AvisaETEC

## 1. Requisitos Não Funcionais (RNF)
- **RNF01 - Comunicação:** A entrega de novas notificações no aplicativo do aluno deve ocorrer em tempo real com latência mínima, utilizando WebSockets (Socket.io no Node.js).

- **RNF02 - Usabilidade:** Interface web limpa, responsiva e desenvolvida no modelo SPA (em React), com suporte a modo escuro.

- **RNF04 - Segurança:** As rotas da API do Node.js devem ser protegidas por tokens de autenticação (como JWT) para impedir que alunos acessem a endpoints de envio de avisos.

- **RNF05 - Privacidade:** O sistema deve assegurar a privacidade e a proteção dos dados pessoais armazenados, garantindo o uso restrito para fins estritamente educacionais e de comunicação escolar, conforme LGDP (Lei Geral de Proteção de Dados).