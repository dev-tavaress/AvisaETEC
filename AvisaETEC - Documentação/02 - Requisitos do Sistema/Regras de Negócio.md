# Regras de Negócio - AvisaETEC

## 1. Regras de Negocio (RN)
- **RN 01 - Hierarquia e Perfis de Envio:** O sistema deve possuir três níveis de perfis considerados funcionários: Administradores, Coordenadores e Professores. Apenas perfis autorizados (Funcionários) podem acionar a rota de envio de notificações. O perfil de Aluno deve ter o acesso de escrita bloqueado.

- **RN 02 - Segmentação de Destinatários (Escopo do Aviso):** Todo aviso enviado deve obrigatoriamente possuir um destino claro: ou é direcionado a um Módulo/Turma inteira (`id_modulo_destino`), ou a um Aluno específico (`id_aluno_destino`). Nunca ambos em simultâneo, nem nenhum dos dois vazio.

- **RN 03 - Validação de Credenciais e Segurança de Senha:** Nenhuma senha de usuário (aluno ou funcionário) pode ser armazenada em texto plano no banco de dados; deve obrigatoriamente passar por um algoritmo de hash seguro.

- **RN 04 - Gestão do Estado do Aviso (Lido/Não Lido):** Cada notificação entregue deve conter um indicador de status booleano para rastrear se o aluno visualizou ou não o aviso no mural.