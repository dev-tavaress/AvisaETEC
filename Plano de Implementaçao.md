# Plano de aprendizagem e implementação — AvisaETEC

## Problema e abordagem

Construir primeiro um MVP acadêmico funcional do AvisaETEC: autenticação, perfis, envio segmentado, mural, calendário e atualização em tempo real. A estratégia será aprender e validar uma fatia vertical de ponta a ponta antes de ampliar o sistema: uma pessoa autenticada cria um aviso, o backend valida a permissão e o destino, persiste o dado, e um aluno autorizado visualiza o aviso no mural.

O plano privilegia estudo orientado por problemas, pequenas entregas demonstráveis, testes manuais e automatizados progressivos e decisões documentadas. Não pressupõe código pronto: cada etapa deve resultar em perguntas respondidas, um pequeno experimento e uma evidência de funcionamento.

## Leitura dos materiais existentes

- O escopo define React, Node.js/Express, WebSockets e MySQL/PostgreSQL, mas ainda não escolhe uma combinação concreta de banco, ORM, estratégia de implantação ou estrutura de pastas.
- Os requisitos funcionais cobrem autenticação, perfis, avisos, segmentação, mural e calendário.
- As regras já identificam três riscos centrais: autorização por perfil, senha nunca armazenada em texto puro e destino exatamente individual ou por módulo.
- O modelo atual é um bom começo conceitual, mas o campo `status` em `Notificacao` não representa corretamente a leitura por vários alunos de uma turma. Será necessário estudar a separação entre aviso e destinatários/entregas antes de codificar essa parte.
- A distinção entre “módulo”, “turma” e “curso” ainda precisa ser definida no vocabulário do domínio.
- O documento de componentes/interface está vazio e o README contém apenas o título; ambos devem ser preenchidos depois que o fluxo mínimo for decidido.
- O PDF de apresentação não pôde ser extraído com as ferramentas locais disponíveis nem aberto pelo navegador local; portanto, o plano usa os documentos Markdown acessíveis como fonte de requisitos e trata o artigo como material a revisar manualmente.

## Ordem de implementação

### 0. Preparação e decisões de domínio

1. Escrever um glossário curto: aluno, funcionário, professor, coordenador, diretor/administrador, curso, módulo/turma, aviso, evento e entrega.
2. Montar uma matriz de permissões para os três perfis escolhidos:
   - professor: alunos/turmas autorizadas;
   - coordenador: turmas do curso;
   - diretor/administrador: usuários, módulos e avisos.
3. Definir o MVP fora de escopo: push nativo, anexos, recuperação de senha, integrações externas, múltiplas escolas e escalabilidade de produção.
4. Escolher uma única stack inicial e justificá-la; não começar com MySQL e PostgreSQL simultaneamente.

**Como estudar:** transformar cada decisão em uma regra de negócio testável e desenhar o fluxo em papel antes de abrir o editor.

### 1. Fundamentos e ambiente mínimo

1. Revisar JavaScript moderno, HTTP, JSON, módulos, promises, Git e comandos do gerenciador de pacotes.
2. Criar uma aplicação mínima de frontend e backend separados, com uma rota de saúde e uma tela simples.
3. Aprender variáveis de ambiente, configuração local e como ler mensagens de erro.
4. Registrar no README como instalar e executar o projeto.

**Evidência:** outra pessoa consegue iniciar o projeto seguindo somente o README e acessar a rota de saúde.

### 2. Modelagem e persistência

1. Corrigir o vocabulário e revisar o modelo conceitual/lógico com casos concretos: aviso individual, aviso para módulo com dois alunos e aviso lido por apenas um deles.
2. Escolher o desenho de entrega. Uma alternativa didática é separar `Aviso` de `DestinatarioAviso`/`LeituraAviso`; outra é materializar entregas individuais no envio. Comparar as duas antes de decidir.
3. Definir chaves, unicidade, nulidade, integridade referencial, datas e migrações.
4. Criar dados de desenvolvimento pequenos e não usar dados reais da ETEC.

**Evidência:** consultas conseguem responder “quais avisos este aluno pode ver?” e “quais ainda não foram lidos?” sem lógica escondida na interface.

### 3. Autenticação

1. Estudar hash de senha, sessão/token, expiração, armazenamento seguro no cliente e diferença entre autenticação e autorização.
2. Implementar cadastro/semeadura controlada de usuários de teste e login.
3. Fazer o backend identificar o usuário autenticado em cada requisição.
4. Nunca colocar senhas, tokens reais ou dados pessoais reais no repositório.

**Evidência:** login válido funciona, senha inválida falha sem revelar detalhes e uma rota protegida rejeita acesso anônimo.

### 4. Autorização e primeiro fluxo vertical

1. Implementar autorização no backend, não apenas esconder botões no frontend.
2. Validar o perfil e o escopo do professor/coordenador/diretor conforme a matriz.
3. Criar o primeiro caso completo: funcionário autorizado envia aviso individual; aluno destinatário consulta o mural.
4. Rejeitar explicitamente destino ausente, destino duplo, usuário inexistente e tentativa fora do escopo.

**Evidência:** testes ou roteiro manual demonstram sucesso e falhas esperadas para cada perfil.

### 5. Segmentação, mural e leitura

1. Implementar envio para módulo/turma e consultar apenas os alunos destinatários.
2. Modelar leitura por usuário, incluindo marcar como lido e contagem de não lidos.
3. Ordenar o mural, definir paginação ou limite inicial e estados de carregamento/erro.
4. Tratar duplicidade e consistência quando um aluno recebe avisos individuais e de módulo.

**Evidência:** dois alunos do mesmo módulo recebem o aviso, cada um possui seu próprio estado de leitura e um aluno de outro módulo não recebe o aviso.

### 6. Tempo real

1. Primeiro garantir que o mural funciona por HTTP; WebSocket não deve ser a única forma de recuperar dados.
2. Estudar eventos, salas/canais, reconexão, autenticação do socket e diferença entre “evento recebido” e “aviso persistido”.
3. Emitir um evento somente depois da persistência confirmada e filtrar por destinatário/sala.
4. Manter uma consulta de sincronização ao reconectar para não perder eventos.

**Evidência:** com duas sessões de teste, o destinatário recebe novo aviso sem atualizar a página; após desconectar/reconectar, o mural continua consistente.

### 7. Calendário e experiência de uso

1. Separar eventos acadêmicos de notificações: eles podem compartilhar a interface, mas têm regras e ciclo de vida diferentes.
2. Definir quem cria/edita eventos e quais eventos são públicos, por módulo ou por curso.
3. Implementar visualização mensal/semanal acessível e responsiva antes de recursos avançados.
4. Documentar os componentes e estados da interface no arquivo de design.

**Evidência:** o usuário consegue localizar um evento, distinguir aviso de evento e usar a tela em viewport móvel e desktop.

### 8. Segurança, privacidade e qualidade

1. Estudar os princípios aplicáveis da LGPD com o orientador, sem declarar conformidade jurídica completa.
2. Minimizar dados coletados, definir retenção e criar usuários fictícios.
3. Validar entrada, limitar tamanho de mensagens, proteger CORS/cookies/tokens conforme a estratégia escolhida e evitar vazamento de dados.
4. Adicionar testes de unidade para regras, integração para API/autorização e um teste de fluxo principal.
5. Fazer revisão de acessibilidade, logs sem dados sensíveis e tratamento explícito de erros.

**Evidência:** checklist de segurança, matriz de testes e roteiro de demonstração versionados.

### 9. Entrega acadêmica

1. Atualizar requisitos com decisões e casos de uso reais.
2. Atualizar modelo conceitual/lógico/DER após validar a leitura por aluno.
3. Documentar arquitetura, limitações, riscos residuais e decisões de tecnologia.
4. Preparar uma demonstração reproduzível com dados fictícios e cenários de sucesso/falha.
5. Somente depois avaliar publicação, hospedagem e notificações push.

## Riscos principais e mitigação

- **Escopo excessivo:** congelar o MVP e manter backlog separado.
- **Modelo de destinatários incorreto:** validar consultas e leitura por aluno antes de implementar WebSockets.
- **Autorização somente no frontend:** centralizar as regras no backend e testá-las por perfil.
- **Complexidade prematura de tempo real:** manter HTTP como fonte de sincronização e adicionar socket depois.
- **Confusão entre módulo, turma e curso:** glossário e exemplos obrigatórios antes do banco.
- **Dados pessoais e LGPD:** usar dados fictícios, coletar o mínimo e validar decisões com o orientador.
- **Dependências e stack instável:** escolher uma stack, fixar versões e registrar comandos no README.
- **Pouco aprendizado por copiar soluções:** trabalhar em ciclos de hipótese, experimento, erro, explicação escrita e revisão.

## Por onde começar agora

Começar pela etapa 0, não pelo WebSocket: desenhar a matriz de permissões e três casos de uso completos; em seguida, revisar o modelo de dados usando os cenários de leitura por dois alunos. Depois, construir apenas a rota de saúde e o primeiro fluxo vertical de login → autorização → aviso individual → mural. A cada etapa, escrever o que foi entendido e o que ainda não foi, em vez de copiar uma implementação que não consiga explicar.

## Perguntas para revisão com o orientador

- “Módulo” significa turma, semestre ou módulo de um curso?
- Professor pode enviar para quais alunos/turmas?
- Coordenador administra apenas seu curso?
- Diretor e administrador são o mesmo perfil?
- Um aviso pode ser editado ou excluído depois de enviado?
- O calendário tem eventos por escola, curso, turma ou aluno?
- O TCC precisa demonstrar tempo real real ou apenas o fluxo funcional?
