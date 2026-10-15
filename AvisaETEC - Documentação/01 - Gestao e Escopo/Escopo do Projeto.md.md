# Escopo do Projeto - AvisaETEC

## 1. Objetivo Geral
O presente documento detalha o planejamento, a arquitetura e o desenvolvimento do sistema **AvisaETEC**. Trata-se de uma aplicação web desenvolvida como Trabalho de Conclusão de Curso (TCC) com o intuito de modernizar e otimizar a comunicação escolar em tempo real dentro da ETEC.

- **O Problema:**
 Atualmente, a comunicação de avisos importantes (como alterações de horário, feriados, manutenções e dias não letivos) entre a instituição de ensino e os discentes enfrenta barreiras de agilidade e centralização. A dependência de canais descentralizados ou avisos em papel gera falhas na transmissão da informação.

- **A Solução:**
 Desenvolver um sistema web responsivo/mobile centralizado e de alta performance que permita aos funcionários da ETEC (diretores, coordenadores e professores) o envio seguro de notificações instantâneas e segmentadas para os alunos, contando também com um mural de avisos e calendário acadêmico integrados.

=======================================================================

## 2. Stacks Tecnológicas
O projeto aplica conceitos ensinados pela grade curricular da instituição, sendo dividido em três etapas, englobando:

- **Front-end:** Desenvolvimento full-stack moderno utilizando React e Node.js, com frameworks como Express para integração do front-end e back-end.

- **Back-end:** Estrutura em JavaScript (Node.js) idealizada para comunicação bidirecional do servidor em tempo real utilizando WebSockets.

- **Banco de Dados:** Banco de dados projetado em MySQL/PostgreSQL. Segurança de dados através de autenticação por tokens, encriptação de palavras-passe e conformidade com as diretrizes da LGPD (Lei Geral de Proteção de Dados).