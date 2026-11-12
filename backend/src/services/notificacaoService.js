import prisma from '../config/prisma.js';

/**
 * Validação rigorosa da RN02 (Segmentação de Destinatários):
 * Todo aviso enviado deve obrigatoriamente possuir um destino claro:
 * ou é direcionado a um Módulo/Turma inteira (id_modulo_destino),
 * ou a um Aluno específico (id_aluno_destino).
 * Nunca ambos em simultâneo, nem nenhum dos dois vazio.
 */
export async function validarECriarNotificacao({
  titulo,
  mensagem,
  id_funcionario,
  id_modulo_destino,
  id_aluno_destino
}) {
  if (!titulo || !titulo.trim()) {
    const error = new Error('O título do aviso é obrigatório.');
    error.statusCode = 400;
    throw error;
  }

  if (!mensagem || !mensagem.trim()) {
    const error = new Error('A mensagem do aviso é obrigatória.');
    error.statusCode = 400;
    throw error;
  }

  const temModulo = id_modulo_destino !== undefined && id_modulo_destino !== null && id_modulo_destino !== '';
  const temAluno = id_aluno_destino !== undefined && id_aluno_destino !== null && id_aluno_destino !== '';

  if (temModulo && temAluno) {
    const error = new Error('RN02: Violação de regra de negócio. O aviso não pode ser direcionado para uma turma e para um aluno ao mesmo tempo.');
    error.statusCode = 400;
    throw error;
  }

  if (!temModulo && !temAluno) {
    const error = new Error('RN02: Destino não especificado. Selecione uma turma inteira ou um aluno específico para entregar a notificação.');
    error.statusCode = 400;
    throw error;
  }

  const moduloId = temModulo ? parseInt(id_modulo_destino, 10) : null;
  const alunoId = temAluno ? parseInt(id_aluno_destino, 10) : null;

  if ((temModulo && (!Number.isInteger(moduloId) || moduloId <= 0))
    || (temAluno && (!Number.isInteger(alunoId) || alunoId <= 0))) {
    const error = new Error('O destino informado é inválido.');
    error.statusCode = 400;
    throw error;
  }

  // Validar se o módulo existe
  if (moduloId) {
    const moduloExiste = await prisma.modulo.findUnique({ where: { id_modulo: moduloId } });
    if (!moduloExiste) {
      const error = new Error(`Módulo/Turma com ID ${moduloId} não encontrado.`);
      error.statusCode = 404;
      throw error;
    }
  }

  // Validar se o aluno existe
  if (alunoId) {
    const alunoExiste = await prisma.aluno.findUnique({ where: { id_aluno: alunoId } });
    if (!alunoExiste) {
      const error = new Error(`Aluno com ID ${alunoId} não encontrado.`);
      error.statusCode = 404;
      throw error;
    }
  }

  // Persistir a notificação
  const novaNotificacao = await prisma.notificacao.create({
    data: {
      titulo: titulo.trim(),
      mensagem: mensagem.trim(),
      id_funcionario,
      id_modulo_destino: moduloId,
      id_aluno_destino: alunoId,
      status: false
    },
    include: {
      funcionario: {
        select: {
          id_funcionario: true,
          nome: true,
          perfil: true
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
          nome: true
        }
      }
    }
  });

  return novaNotificacao;
}
