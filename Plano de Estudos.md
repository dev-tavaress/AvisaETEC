O melhor ponto de partida **não é React, Node.js ou WebSockets**. Comece entendendo e reduzindo o problema até conseguir construir uma primeira versão pequena, testável e explicável.

Li o artigo e os documentos do repositório. A ideia está bem definida: usuários autenticados, perfis diferentes, avisos direcionados, mural, calendário e comunicação em tempo real. Porém, antes de programar, vocês precisam resolver algumas decisões de domínio:

- **Quem pode enviar avisos?** O artigo menciona professor e coordenador; a documentação também inclui diretor/administrador. Definam exatamente as permissões de cada perfil.

- **O que significa “módulo”?** É turma, semestre, curso ou módulo do curso? Usem uma nomenclatura única.

- **Um aviso para uma turma é uma mensagem ou várias entregas?** Cada aluno precisa ter seu próprio estado de leitura. Um único campo `status` na notificação não representa corretamente a leitura de vários alunos.

- **O que acontece quando o aluno está offline?** WebSocket entrega eventos para quem está conectado, mas o aviso precisa continuar armazenado para ser exibido depois.

- **O calendário será editável por quem?** Professores poderão criar eventos? Apenas coordenação? Haverá aprovação?

- **O sistema substituirá canais oficiais ou apenas centralizará os avisos?** Isso afeta responsabilidade, auditoria e prioridade das mensagens.


## Ordem recomendada para estudar e desenvolver

### 1. Transformem a ideia em casos de uso

Antes das telas, escrevam histórias simples:

Como aluno, quero visualizar avisos destinados à minha turma.

Como professor, quero enviar um aviso para uma turma.

Como coordenador, quero enviar um aviso para um aluno específico.

Como administrador, quero controlar usuários e turmas.

Para cada história, definam:

- quem executa;

- pré-condições;

- passos;

- resultado esperado;

- o que deve ser impedido.

Exemplo de pergunta de estudo: **como o servidor sabe que um aluno pertence a determinada turma e se ele pode visualizar aquele aviso?** Essa pergunta leva vocês naturalmente a autenticação, autorização, relacionamentos e consultas no banco.


### 2. Construam primeiro um MVP

A primeira versão deveria conter somente:

1. cadastro ou carga inicial de usuários;

2. login;

3. três perfis: aluno, professor e coordenador;

4. criação de aviso para uma turma;

5. aluno visualizando seus avisos;

6. marcação de aviso como lido;

7. mural simples.


Deixem para depois:

- envio individual;

- WebSockets;

- notificações do navegador;

- calendário completo;

- modo escuro;

- aplicativo mobile nativo;

- painel administrativo avançado.

Se o fluxo “professor envia → aluno recebe e lê” não estiver correto sem tempo real, o WebSocket só vai esconder problemas de modelagem.


### 3. Estudem o banco pelo comportamento do sistema

O modelo atual é um bom primeiro rascunho, mas merece ser revisado. Uma notificação direcionada a uma turma normalmente envolve:

- usuário que enviou;

- conteúdo do aviso;

- destino;

- alunos que receberam;

- estado de leitura de cada aluno;

- data de criação;

- eventualmente prioridade, validade e tipo do aviso.


Em vez de tentar adivinhar a estrutura definitiva, façam exercícios:

1. desenhem o fluxo de um aviso individual;

2. desenhem o fluxo de um aviso para uma turma;

3. perguntem quais registros precisam existir;

4. simulem dois alunos lendo o mesmo aviso em momentos diferentes;

5. verifiquem se o banco consegue representar os dois estados sem ambiguidades.


Depois traduzam o desenho conceitual para o modelo lógico e só então criem as tabelas. Estudem especialmente:

- chave primária e estrangeira;

- cardinalidade;

- relacionamento muitos-para-muitos;

- normalização;

- `NULL` e restrições;

- índices;

- transações.


### 4. Aprendam o back-end por camadas

Estudem Node.js e Express nesta sequência:

1. servidor HTTP simples;

2. rotas;

3. separação entre rota, regra de negócio e acesso ao banco;

4. validação de entrada;

5. tratamento de erros;

6. autenticação;

7. autorização por perfil;

8. testes de API;

9. WebSocket.


O objetivo não é apenas “fazer uma rota funcionar”, mas conseguir responder:

- onde a senha é validada?

- onde o perfil do usuário é verificado?

- quem decide quais alunos recebem o aviso?

- como erros são comunicados?

- como impedir que um aluno altere uma requisição e envie um aviso?

- como registrar quem enviou uma mensagem?


Para autenticação, estudem hash de senha, sessões ou JWT, expiração de tokens, armazenamento seguro e diferença entre **autenticar** (“quem é você?”) e **autorizar** (“o que você pode fazer?”). Não armazenem senhas reais durante os testes e não coloquem credenciais no repositório.


### 5. Desenvolvam a interface depois de validar os fluxos

No React, comecem por telas simples:

- login;

- mural do aluno;

- formulário de envio;

- lista de avisos;

- detalhe de um aviso.


Antes de escolher cores e componentes, desenhem as telas no papel ou em um protótipo. Testem com alguém que não conhece o sistema e observem se essa pessoa consegue:

- entrar;

- entender quais avisos são importantes;

- identificar o público e a data;

- marcar um aviso como lido;

- saber por que não possui permissão para enviar.


O calendário deve começar como uma visualização de eventos. A edição e as regras de aprovação podem ser adicionadas depois.


### 6. Só então adicionem tempo real

Primeiro façam o mural funcionar consultando a API. Depois adicionem Socket.io ou outra solução de WebSocket.

Pensem em dois caminhos diferentes:

- **persistência:** o aviso é salvo no banco e pode ser consultado posteriormente;

- **tempo real:** o servidor avisa os clientes conectados que existe uma atualização.

O WebSocket não deve ser a fonte principal dos dados. Se o aluno perder a conexão, ao voltar ele deve consultar os avisos pendentes. Estudem também reconexão, duplicação de eventos, atualização da tela e autorização da conexão.


## Plano prático para começar

Uma sequência adequada para o grupo seria:

1. revisar e fechar os requisitos com o orientador;

2. criar uma matriz “perfil × ação permitida”;

3. escrever os casos de uso;

4. revisar o modelo de dados com exemplos reais;

5. prototipar login, mural e envio;

6. criar um pequeno projeto de estudo separado para treinar API e banco;

7. implementar login;

8. implementar avisos sem tempo real;

9. testar as permissões;

10. implementar leitura individual;

11. adicionar WebSocket;

12. adicionar calendário e melhorias visuais.


Mantenham um **diário técnico** com três partes para cada funcionalidade: o que vocês precisaram aprender, qual hipótese fizeram e como comprovaram que funcionou. Isso ajuda tanto no aprendizado quanto na apresentação do TCC.

O primeiro marco concreto não precisa ser “o sistema completo”. Deve ser este:

Um professor autenticado envia um aviso para uma turma; o sistema salva o aviso; um aluno daquela turma consegue visualizá-lo e marcá-lo como lido; um aluno de outra turma não consegue acessá-lo.

Quando esse cenário estiver funcionando e testado, vocês terão resolvido a base mais importante do projeto: identidade, permissões, modelagem, persistência e fluxo principal.

========================================================================================================

A melhor estratégia é estudar **1h30 por dia, 5 dias por semana**, deixando um sexto dia opcional para revisão ou prática. Isso dá aproximadamente **7h30 por semana**. Para um estudante do segundo módulo, recomendo um plano de **10 semanas**, sempre alternando estudo teórico, exercício pequeno e reflexão sobre o AvisaETEC.

Não tente estudar React, Node, banco, autenticação e WebSocket ao mesmo tempo. A ordem deve acompanhar o problema que vocês precisam resolver.


## Método diário de estudo

Use esta estrutura em cada sessão de 1h30:

| Tempo | Atividade |
| --- | --- |
| 10 min | Revisar o que estudou anteriormente |
| 25 min | Ler ou assistir a uma explicação |
| 40 min | Fazer um exercício pequeno sem copiar um projeto pronto |
| 10 min | Anotar erros, dúvidas e descobertas |
| 5 min | Escrever o que você consegue explicar sem consultar material |


O exercício deve ser pequeno o suficiente para terminar no mesmo dia. Evite começar diretamente pelo sistema completo.


Crie um caderno ou arquivo pessoal com quatro perguntas para cada assunto:

1. Qual problema esta tecnologia resolve?

2. Como eu explicaria isso para um colega?

3. Que erro eu cometi ao praticar?

4. Onde isso aparecerá no AvisaETEC?


# Plano de estudos de 10 semanas

## Semana 1 — Entender o problema e os requisitos

**Objetivo:** transformar a ideia do AvisaETEC em comportamentos claros.

### Estude

- O que são requisitos funcionais e não funcionais.

- Atores e permissões.

- Casos de uso.

- Histórias de usuário.

- Critérios de aceite.

- Regras de negócio.

- Diferença entre escopo e funcionalidades futuras.


### Use como fonte

- **Sommerville — Engenharia de Software**, especialmente requisitos.

- **Pressman e Maxim — Engenharia de Software**, especialmente levantamento e especificação.

- Documentos do projeto:


### Exercício

Escreva, com suas próprias palavras, os casos:

- aluno visualiza um aviso;

- professor envia aviso para uma turma;

- coordenador envia aviso para um aluno;

- usuário tenta acessar algo que seu perfil não permite.


Para cada caso, escreva:

- ator;

- pré-condição;

- passos;

- resultado esperado;

- possíveis erros.


### Perguntas para responder

- Professor e coordenador terão exatamente as mesmas permissões?

- Diretor poderá apagar avisos?

- Um professor poderá enviar aviso para qualquer turma?

- O aluno verá avisos antigos?

- Um aviso pode expirar?


**Resultado esperado:** uma matriz de permissões e um conjunto de casos de uso que o grupo consiga discutir com o orientador.


## Semana 2 — Modelagem do domínio e banco de dados

**Objetivo:** aprender a representar usuários, turmas, avisos e leituras.

### Estude

- Entidade, atributo e relacionamento.

- Chave primária e chave estrangeira.

- Cardinalidade: 1:1, 1:N e N:N.

- Normalização.

- Integridade referencial.

- Diferença entre modelo conceitual, lógico e físico.


### Use como fonte

- **Elmasri e Navathe — Sistemas de Banco de Dados**.

- **Silberschatz, Korth e Sudarshan — Sistema de Banco de Dados**.

- O modelo conceitual, lógico e DER já presentes na documentação.


### Exercício

Faça três desenhos separados:

1. Um funcionário envia um aviso para um aluno.

2. Um funcionário envia um aviso para uma turma com 30 alunos.

3. Dois alunos recebem o mesmo aviso, mas apenas um o lê.


Depois pergunte:

- Onde fica registrado o remetente?

- Onde fica registrado o destinatário?

- Como representar vários destinatários?

- Como registrar a leitura individual?

- O aviso deve existir mesmo que o aluno esteja offline?


Não procure imediatamente uma tabela pronta na internet. Tente primeiro desenhar e só depois compare com exemplos de modelagem.


### Ponto importante

O modelo atual possui um único campo de status de leitura na notificação. Reflitam se isso funciona quando uma mensagem é enviada para vários alunos. O exercício é descobrir a limitação e propor uma representação melhor, não simplesmente copiar uma solução.

**Resultado esperado:** modelo revisado, com exemplos preenchidos e explicação da cardinalidade de cada relacionamento.


## Semana 3 — SQL e operações no banco

**Objetivo:** conseguir consultar e alterar os dados manualmente antes de usar uma aplicação.

### Estude

- `CREATE TABLE`.

- `INSERT`.

- `SELECT`.

- `WHERE`.

- `JOIN`.

- `UPDATE`.

- `DELETE`.

- Ordenação e paginação.

- Restrições `NOT NULL`, `UNIQUE` e `FOREIGN KEY`.

- Transações.

- Índices básicos.


### Fontes

- Elmasri e Navathe.

- Silberschatz, Korth e Sudarshan.

- Documentação oficial do PostgreSQL ou MySQL; escolham apenas um inicialmente.

- Tutoriais oficiais ou exercícios do **SQLBolt** e **W3Schools SQL** como apoio prático.


### Exercício

Crie uma base de estudo independente com dados fictícios:

- alguns funcionários;

- algumas turmas;

- alguns alunos;

- alguns avisos.


Pratique consultas como:

- avisos de um aluno;

- avisos de uma turma;

- avisos não lidos;

- avisos enviados por determinado funcionário;

- alunos pertencentes a uma turma.


### Perguntas


- O que deve acontecer ao tentar criar um aluno com e-mail repetido?

- O que deve acontecer ao tentar associar um aluno a uma turma inexistente?

- Como ordenar os avisos do mais recente para o mais antigo?

- Como evitar retornar avisos de outra turma?


**Resultado esperado:** você deve conseguir explicar cada `JOIN` usado, em vez de apenas reutilizar uma consulta encontrada na internet.


## Semana 4 — JavaScript e fundamentos de servidor

**Objetivo:** fortalecer a linguagem antes de aprender Express.

### Estude

- variáveis, funções e escopo;

- objetos e arrays;

- métodos como `map`, `filter` e `find`;

- módulos;

- JSON;

- `async/await`;

- Promises;

- tratamento de erros;

- requisições HTTP;

- métodos `GET`, `POST`, `PUT`, `PATCH` e `DELETE`;

- códigos HTTP.


### Fontes

- **MDN Web Docs — JavaScript**.

- **javascript.info**.

- **Node.js Documentation**.

- **Maurício Samy Silva — Node.js: o motor das aplicações web JavaScript**.


### Exercícios

Faça pequenos programas para:

- filtrar alunos por turma;

- localizar um usuário por e-mail;

- validar campos obrigatórios;

- ordenar avisos por data;

- simular uma função assíncrona que busca avisos;

- tratar uma situação de erro sem ocultá-la.


### Perguntas

- Por que uma função assíncrona pode falhar?

- O que deve ser feito quando o banco não responde?

- Qual a diferença entre devolver erro `400`, `401`, `403` e `404`?

- Por que o servidor não deve confiar nos dados enviados pelo navegador?

**Resultado esperado:** conseguir ler e escrever JavaScript sem depender de copiar estruturas inteiras.


## Semana 5 — API REST com Node.js e Express

**Objetivo:** construir uma API pequena e organizada.

### Estude

- criação de servidor;

- rotas;

- controladores;

- serviços;

- acesso ao banco;

- middlewares;

- validação;

- tratamento centralizado de erros;

- organização de pastas;

- variáveis de ambiente.


### Fontes

- **Caio Ribeiro Pereira — Construindo APIs REST com Node.js**.

- **Maurício Samy Silva — Node.js**.

- Documentação oficial do **Express**.

- Documentação do driver ou ORM que vocês decidirem estudar.


### Exercício

Antes de conectar ao banco, faça uma API de estudo que mantenha dados temporários em memória. Ela deve permitir:

- consultar avisos;

- criar um aviso;

- consultar um aviso específico;

- rejeitar campos obrigatórios ausentes;

- retornar códigos HTTP coerentes.

Depois substitua os dados em memória pelo banco.


### Perguntas

- O que pertence à rota?

- O que pertence à regra de negócio?

- O que pertence ao acesso ao banco?

- Onde deve ocorrer a validação?

- Como impedir que uma rota aceite qualquer campo enviado pelo cliente?

**Resultado esperado:** uma API pequena funcionando, mesmo sem autenticação.


## Semana 6 — Autenticação, autorização e segurança

**Objetivo:** entender como proteger o sistema.

### Estude

- autenticação versus autorização;

- hash de senha;

- salting;

- tokens e sessões;

- JWT, se essa for a escolha do grupo;

- expiração;

- middleware de autenticação;

- autorização por perfil;

- validação de entrada;

- proteção contra exposição de dados;

- princípios básicos da LGPD.


### Fontes

- **Sommerville** e **Pressman**, para requisitos de segurança.

- Documentação oficial da biblioteca de hash escolhida.

- Documentação oficial do Express.

- **OWASP Cheat Sheet Series**, especialmente:

- Password Storage;

- Authentication;

- Authorization;

- Input Validation.

- Lei Geral de Proteção de Dados e materiais institucionais sobre princípios da LGPD.


### Exercício

Desenhe o caminho de uma requisição:

1. usuário envia e-mail e senha;

2. servidor procura o usuário;

3. servidor compara a senha;

4. servidor cria a identidade autenticada;

5. usuário acessa uma rota protegida;

6. servidor verifica o perfil;

7. servidor permite ou recusa a ação.

Depois faça uma tabela:

| Ação | Aluno | Professor | Coordenador | Diretor |
| --- | --- | --- | --- | --- |
| Ver próprios avisos | ? | ? | ? | ? |
| Enviar aviso | ? | ? | ? | ? |
| Enviar para turma | ? | ? | ? | ? |
| Enviar para aluno | ? | ? | ? | ? |
| Gerenciar usuários | ? | ? | ? | ? |

Preencham os pontos de interrogação com o grupo e validem com o orientador.


### Perguntas de segurança

- Onde a senha ficará armazenada?

- O que acontece se alguém alterar o perfil no navegador?

- Como impedir que um aluno chame diretamente uma rota de envio?

- O token terá validade?

- Quais dados pessoais realmente são necessários?

**Resultado esperado:** login funcionando e rotas protegidas por regras verificadas no servidor.


## Semana 7 — React e interface

**Objetivo:** criar as telas necessárias sem tentar resolver tudo visualmente de uma vez.

### Estude

- componentes;

- propriedades;

- estado;

- eventos;

- formulários;

- efeitos;

- requisições para API;

- carregamento;

- mensagens de erro;

- rotas;

- renderização condicional;

- responsividade.


### Fontes

- **Maurício Samy Silva — React: aprenda praticando**.

- Documentação oficial do **React**.

- **Preece, Rogers e Sharp — Design de interação**.

- Documentação do React Router, se o grupo utilizá-lo.


### Exercício

Crie protótipos simples, começando sem preocupação visual:

1. tela de login;

2. mural com avisos fictícios;

3. formulário de envio;

4. aviso marcado como lido;

5. tela sem permissão para aluno.

Depois conecte essas telas à API.


### Perguntas

- O que acontece enquanto os dados carregam?

- Como a tela mostra um erro do servidor?

- O que o aluno vê quando não possui avisos?

- Como diferenciar aviso novo, lido e expirado?

- A interface continua compreensível em uma tela pequena?

**Resultado esperado:** fluxo completo usando dados persistidos, ainda sem tempo real.


## Semana 8 — Fluxo principal do MVP

**Objetivo:** unir banco, API, autenticação e interface.

Implementem apenas este cenário:

Professor autenticado envia um aviso para uma turma. O aviso é salvo. Um aluno daquela turma consegue vê-lo e marcá-lo como lido. Um aluno de outra turma não consegue acessá-lo.

### Estude e pratique

- integração entre front-end e back-end;

- validação nos dois lados;

- consultas protegidas;

- teste de permissões;

- tratamento de estados vazios;

- logs úteis.


### Testes manuais obrigatórios

Tentem:

- acessar o mural sem login;

- enviar aviso como aluno;

- enviar aviso sem título;

- enviar aviso sem destino;

- acessar aviso de outra turma;

- marcar o mesmo aviso como lido duas vezes;

- fechar a aplicação e voltar depois.

Anotem o comportamento esperado e o comportamento real.

**Resultado esperado:** o núcleo do AvisaETEC funcionando sem WebSocket.


## Semana 9 — Comunicação em tempo real

**Objetivo:** entender WebSocket como complemento à persistência.

### Estude

- diferença entre HTTP e WebSocket;

- conexão persistente;

- eventos;

- salas ou grupos;

- reconexão;

- desconexão;

- duplicação de eventos;

- autorização da conexão;

- Socket.io.


### Fontes

- **Caio Ribeiro Pereira — Aplicações web real-time com Node.js**.

- Documentação oficial do **Socket.IO**.

- Documentação do Node.js sobre comunicação de rede.


### Exercício de raciocínio

Descreva dois alunos:

- um está conectado quando o aviso é enviado;

- outro está offline.

Pergunte:

- quem recebe o evento imediatamente?

- onde o aviso fica salvo?

- como o aluno offline o encontra depois?

- o que ocorre se a conexão cair no meio do envio?

- como evitar mostrar duas vezes o mesmo aviso?

Só depois implementem a atualização automática do mural.

**Resultado esperado:** o mural atualizar em tempo real sem depender exclusivamente do WebSocket para recuperar dados.


## Semana 10 — Calendário, testes e apresentação

**Objetivo:** adicionar o calendário com escopo controlado e preparar a validação.

### Estude

- entidade de evento;

- datas e fusos horários;

- eventos recorrentes;

- filtros;

- testes de aceitação;

- usabilidade;

- documentação técnica.


### Fontes

- **Preece, Rogers e Sharp — Design de interação**.

- Documentação oficial da biblioteca de calendário escolhida.

- **Sommerville** ou **Pressman** para testes e validação.

- Artigo sobre o Defesa Civil Alerta para discutir urgência, clareza e alcance da comunicação.


### Exercício

Definam primeiro os tipos de evento:

- feriado;

- dia não letivo;

- manutenção;

- reunião;

- alteração excepcional.

Para cada evento, decidam:

- quem pode criar;

- quem pode editar;

- quem pode excluir;

- se todos os alunos veem;

- se ele também gera aviso;

- se possui data de início e fim.

Depois façam um teste com colegas que não participaram do desenvolvimento.

**Resultado esperado:** calendário básico, lista de problemas encontrados e documentação do que foi implementado e do que ficou para uma versão futura.


# Como usar as fontes do artigo

O artigo possui referências para áreas diferentes. Não leia todos os livros do início ao fim. Use-os conforme a pergunta que surgir:

| Pergunta | Fonte principal |
| --- | --- |
| Como levantar requisitos? | Sommerville; Pressman e Maxim |
| Como modelar o banco? | Elmasri e Navathe; Silberschatz |
| Como criar API REST? | Caio Ribeiro Pereira |
| Como fazer comunicação em tempo real? | Caio Ribeiro Pereira |
| Como aprender Node.js? | Maurício Samy Silva |
| Como aprender React? | Maurício Samy Silva |
| Como projetar uma interface compreensível? | Preece, Rogers e Sharp |
| Como analisar sistemas de aviso? | Trabalho sobre Defesa Civil Alerta |
| Como estudar aplicações escolares semelhantes? | Trabalhos do Connetec e RENOTE |


Os trabalhos acadêmicos do artigo devem ser usados principalmente para entender:

- quais problemas sistemas parecidos tentaram resolver;

- que funcionalidades foram escolhidas;

- como os autores avaliaram a solução;

- quais limitações eles encontraram.

Não use esses trabalhos apenas para copiar funcionalidades. Compare as decisões com a realidade da ETEC de vocês.


# Regra para estudar sozinho

Quando encontrar um tutorial, não copie o projeto inteiro. Faça este ciclo:

1. leia uma parte pequena;

2. feche o tutorial;

3. tente reproduzir a ideia com nomes e dados diferentes;

4. introduza uma pequena mudança;

5. provoque um erro;

6. explique por que o erro aconteceu;

7. registre o que aprendeu.


Por exemplo, depois de aprender uma rota de criação, tente alterar:

- um campo obrigatório;

- o tipo de usuário;

- o destino;

- a resposta de erro;

- a consulta feita ao banco.

Se você só consegue fazer o código funcionar enquanto acompanha o vídeo, ainda está na etapa de reprodução, não de aprendizagem.


# Critério para avançar de assunto

Avance somente quando conseguir:

- explicar o conceito sem ler;

- construir um exemplo pequeno;

- identificar pelo menos um erro comum;

- relacionar o assunto a uma parte do AvisaETEC;

- modificar o exemplo sem quebrá-lo completamente.


O primeiro objetivo de vocês não é terminar o sistema. É conseguir explicar e demonstrar com segurança o fluxo principal:

**autenticar → verificar permissão → criar aviso → selecionar destinatários → salvar → consultar → marcar como lido.**

Esse fluxo será a base para depois adicionar tempo real, calendário e melhorias de interface.