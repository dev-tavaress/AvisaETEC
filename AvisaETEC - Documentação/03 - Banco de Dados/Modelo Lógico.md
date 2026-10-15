# Modelo Lógico do Banco de Dados - AvisaETEC

## 1. Tabelas e Estrutura Relacional

**Tabela Funcionario**
- id_funcionario (INT, PK, Auto-incremento)
- nome (VARCHAR, Not Null)
- email (VARCHAR, Unique, Not Null)
- senha_hash (VARCHAR, Not Null)
- perfil (VARCHAR, Not Null — ex: 'professor', 'coordenador', 'diretor')

**Tabela Modulo**
- id_modulo (INT, PK, Auto-incremento)
- nome (VARCHAR, Not Null)

**Tabela Aluno**
- id_aluno (INT, PK, Auto-incremento)
- nome (VARCHAR, Not Null)
- email (VARCHAR, Unique, Not Null)
- senha_hash (VARCHAR, Not Null)
- id_modulo (INT, FK referenciando Modulo(id_modulo), Not Null)

**Tabela Notificacao**
- id_notificacao (INT, PK, Auto-incremento)
- titulo (VARCHAR, Not Null)
- mensagem (TEXT, Not Null)
- status (BOOLEAN, Default: false — indica se foi lido)
- data (TIMESTAMP, Default: current_timestamp)
- id_funcionario (INT, FK referenciando Funcionario(id_funcionario), Not Null)
- id_modulo_destino (INT, FK referenciando Modulo(id_modulo), Nullable — preenchido se o aviso for para a turma)
- id_aluno_destino (INT, FK referenciando Aluno(id_aluno), Nullable — preenchido se o aviso for individual)