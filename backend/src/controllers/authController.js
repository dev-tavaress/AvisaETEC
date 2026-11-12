import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { ENV } from '../config/env.js';

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const emailNormalizado = email.trim().toLowerCase();

    // 1. Tentar localizar em Funcionario (Professor, Coordenador, Diretor)
    const funcionario = await prisma.funcionario.findUnique({
      where: { email: emailNormalizado }
    });

    if (funcionario) {
      const senhaValida = await bcrypt.compare(senha, funcionario.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
      }

      const payload = {
        id: funcionario.id_funcionario,
        nome: funcionario.nome,
        email: funcionario.email,
        tipo: 'FUNCIONARIO',
        perfil: funcionario.perfil
      };

      const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '24h' });

      return res.json({
        message: 'Login realizado com sucesso.',
        token,
        user: payload
      });
    }

    // 2. Se não for funcionário, tentar localizar em Aluno
    const aluno = await prisma.aluno.findUnique({
      where: { email: emailNormalizado },
      include: { modulo: true }
    });

    if (aluno) {
      const senhaValida = await bcrypt.compare(senha, aluno.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
      }

      const payload = {
        id: aluno.id_aluno,
        nome: aluno.nome,
        email: aluno.email,
        tipo: 'ALUNO',
        perfil: 'aluno',
        id_modulo: aluno.id_modulo,
        moduloNome: aluno.modulo?.nome || 'Turma Geral'
      };

      const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '24h' });

      return res.json({
        message: 'Login de aluno realizado com sucesso.',
        token,
        user: payload
      });
    }

    // 3. Usuário não encontrado em nenhuma das tabelas
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    // req.user já vem populado pelo authMiddleware
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
}
