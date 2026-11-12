import prisma from '../config/prisma.js';

export async function listarAlunos(req, res, next) {
  try {
    const { moduloId, busca } = req.query;

    const where = {};

    if (moduloId) {
      where.id_modulo = parseInt(moduloId, 10);
    }

    if (busca) {
      where.OR = [
        { nome: { contains: busca } },
        { email: { contains: busca } }
      ];
    }

    const alunos = await prisma.aluno.findMany({
      where,
      select: {
        id_aluno: true,
        nome: true,
        email: true,
        id_modulo: true,
        modulo: {
          select: {
            id_modulo: true,
            nome: true
          }
        }
      },
      orderBy: { nome: 'asc' }
    });

    res.json(alunos);
  } catch (error) {
    next(error);
  }
}
