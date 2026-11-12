import prisma from '../config/prisma.js';
import { validarECriarNotificacao } from '../services/notificacaoService.js';
import { emitirNotificacao } from '../sockets/socketManager.js';

export async function listarNotificacoes(req, res, next) {
  try {
    const user = req.user;
    let where = {};

    if (user.tipo === 'ALUNO') {
      // O Aluno visualiza apenas avisos direcionados a ele ou à sua turma (módulo)
      where = {
        OR: [
          { id_aluno_destino: user.id },
          { id_modulo_destino: user.id_modulo }
        ]
      };
    } else {
      // Funcionários têm visão institucional dos avisos enviados
      where = {};
    }

    const notificacoes = await prisma.notificacao.findMany({
      where,
      orderBy: { data: 'desc' },
      include: {
        funcionario: {
          select: {
            id_funcionario: true,
            nome: true,
            perfil: true,
            email: true
          }
        },
        moduloDestino: {
          select: {
            id_modulo: true,
            nome: true
          }
        },
        alunoDestino: {
          select: {
            id_aluno: true,
            nome: true,
            email: true
          }
        }
      }
    });

    res.json(notificacoes);
  } catch (error) {
    next(error);
  }
}

export async function criarNotificacao(req, res, next) {
  try {
    const { titulo, mensagem, id_modulo_destino, id_aluno_destino } = req.body;
    const id_funcionario = req.user.id;

    // 1. Validação de Regras de Negócio (RN02) e Persistência no Banco
    const novaNotificacao = await validarECriarNotificacao({
      titulo,
      mensagem,
      id_funcionario,
      id_modulo_destino,
      id_aluno_destino
    });

    // 2. Emissão em Tempo Real com Socket.io para as salas segmentadas (RNF01)
    emitirNotificacao(novaNotificacao);

    res.status(201).json({
      message: 'Notificação criada e enviada em tempo real com sucesso.',
      notificacao: novaNotificacao
    });
  } catch (error) {
    next(error);
  }
}

export async function atualizarStatusLeitura(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Identificador de notificação inválido.' });
    }

    const destinatario =
      req.user.tipo === 'ALUNO'
        ? {
            OR: [
              { id_aluno_destino: req.user.id },
              { id_modulo_destino: req.user.id_modulo }
            ]
          }
        : { id_funcionario: req.user.id };

    const existente = await prisma.notificacao.findFirst({
      where: { id_notificacao: id, ...destinatario }
    });

    if (!existente) {
      return res.status(404).json({ error: 'Notificação não encontrada.' });
    }

    const notificacao = await prisma.notificacao.update({
      where: { id_notificacao: existente.id_notificacao },
      data: { status: true },
      include: {
        funcionario: {
          select: { nome: true, perfil: true }
        },
        moduloDestino: true,
        alunoDestino: true
      }
    });

    res.json({
      message: 'Status de leitura atualizado (RN04).',
      notificacao
    });
  } catch (error) {
    next(error);
  }
}

export async function excluirNotificacao(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Identificador de notificação inválido.' });
    }

    const podeGerenciar = ['coordenador', 'diretor'].includes(
      req.user.perfil?.toLowerCase()
    );
    const permissao = podeGerenciar
      ? {}
      : { id_funcionario: req.user.id };

    const existente = await prisma.notificacao.findFirst({
      where: { id_notificacao: id, ...permissao }
    });

    if (!existente) {
      return res.status(404).json({ error: 'Notificação não encontrada.' });
    }

    await prisma.notificacao.delete({
      where: { id_notificacao: existente.id_notificacao }
    });

    res.json({ message: 'Aviso removido com sucesso.' });
  } catch (error) {
    next(error);
  }
}
