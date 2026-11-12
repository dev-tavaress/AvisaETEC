import prisma from '../config/prisma.js';

export async function listarModulos(req, res, next) {
  try {
    const modulos = await prisma.modulo.findMany({
      orderBy: { nome: 'asc' },
      include: {
        _count: {
          select: { alunos: true }
        }
      }
    });

    res.json(modulos);
  } catch (error) {
    next(error);
  }
}
