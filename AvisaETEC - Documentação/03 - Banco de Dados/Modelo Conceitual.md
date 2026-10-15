# Modelo Conceitual do Banco de Dados - AvisaETEC

## 1. Entidades e Atributos

1. Funcionario
Atributos: Identificador (ID), Nome, E-mail, Senha, Perfil (Diretor, Coordenador, Professor).

2. Modulo (Representa as Turmas/Módulos)
Atributos: Identificador (ID), Nome do Módulo.

3. Aluno
Atributos: Identificador (ID), Nome, E-mail, Senha.

4. Notificacao (Avisos emitidos)
Atributos: Identificador (ID), Título, Mensagem, Status de Leitura, Data/Hora de Envio.

=======================================================================

## 2. Relacionamentos (Cardinalidade)

1. Funcionario x Notificacao (1 para N): Um funcionário pode enviar várias notificações, mas cada notificação é criada por um único funcionário remetente.

2. Modulo x Aluno (1 para N): Um módulo/turma possui muitos alunos matriculados, mas cada aluno pertence a um único módulo.

3. Modulo x Notificacao (1 para N - Opcional): Um módulo pode ser o destino de várias notificações (envio para turma inteira).

4. Aluno x Notificacao (1 para N - Opcional): Um aluno pode ser o destinatário direto de várias notificações (envio individualizado).