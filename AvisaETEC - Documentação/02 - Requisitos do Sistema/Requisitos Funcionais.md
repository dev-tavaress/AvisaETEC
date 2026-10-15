# Requisitos Funcionais - AvisaETEC

## 1. Requisitos Funcionais (RF)
- **RF01 - Autenticação e Perfis:** O sistema deve autenticar utilizadores via login e redirecionar permissões de acordo com o cargo (Professor, Coordenador, Diretor ou Aluno).

- **RF02 - Envio de Avisos em Tempo Real:** Funcionários autenticados devem conseguir enviar notificações instantâneas (sobre horários, feriados, manutenções, dias não letivos) utilizando WebSockets. Alunos podem somente visualizar os avisos, não enviar.

- **RF03 - Segmentação de Destinatários:** O remetente deve poder escolher se o aviso será enviado para um único aluno ou para uma turma inteira.

- **RF04 - Mural de Notificações:** A página principal deve exibir um feed/mural com todas as mensagens recebidas de forma organizada.

- **RF05 - Calendário Acadêmico:** A página principal deve integrar um calendário interativo com os dias letivos, feriados e eventos da ETEC.