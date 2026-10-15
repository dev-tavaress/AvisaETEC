# DER - AvisaETEC

## 1. Modelo DER
O banco de dados relacional foi estruturado para suportar autenticação segura, controle de perfis e o envio flexível de avisos. 

Segue abaixo o Diagrama de Entidade-Relacionamento prototipado através da plataforma `dbdiagram.io`, utilizando a sintaxe própria DBML.

**Estrutura das Tabelas (DBML)**
Table Funcionario {
  id_funcionario integer [primary key, increment]
  nome varchar
  email varchar [unique, not null]
  senha_hash varchar [not null]
  perfil varchar 
}

Table Aluno {
  id_aluno integer [primary key, increment]
  nome varchar
  email varchar [unique, not null]
  senha_hash varchar [not null]
  id_modulo integer [not null]
}

Table Modulo {
  id_modulo integer [primary key, increment]
  nome varchar 
}

Table Notificacao {
  id_notificacao integer [primary key, increment]
  id_modulo_destino integer
  id_aluno_destino integer
  titulo varchar
  mensagem text
  id_funcionario integer [not null]
  status boolean
  data timestamp
}

Ref: Notificacao.id_modulo_destino > Modulo.id_modulo
Ref: Notificacao.id_aluno_destino > Aluno.id_aluno
Ref: Aluno.id_modulo > Modulo.id_modulo
Ref: Notificacao.id_funcionario > Funcionario.id_funcionario

=======================================================================

## 2. Decisões de modelagem
- "Notificacao" tem duas colunas de destino (`id_modulo_destino` e `id_aluno_destino`), cada notificação preenche só uma, dependendo se o envio é para uma turma inteira ou para um aluno específico.

- "Funcionario" usa um único campo "perfil" para diferenciar professor de coordenador, em vez de duas tabelas separadas.

- "Modulo" foi modelado separado de "turma" (que existe na escola, mas foi deixada fora do escopo deste projeto para simplificar).