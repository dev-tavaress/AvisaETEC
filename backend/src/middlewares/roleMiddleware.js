/**
 * Middleware RBAC (Role-Based Access Control)
 * RN01: Garante que apenas usuários com tipo 'FUNCIONARIO' (Professor, Coordenador, Diretor)
 * tenham permissão para criar notificações ou cadastros. Alunos recebem 403 Forbidden.
 */
export function funcionarioOnly(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (req.user.tipo !== 'FUNCIONARIO') {
    return res.status(403).json({ 
      error: 'Acesso negado. Apenas funcionários têm permissão para realizar esta operação (RN01).' 
    });
  }

  next();
}

/**
 * Middleware para operações exclusivas de Coordenação e Direção
 */
export function gestaoOnly(req, res, next) {
  if (!req.user || req.user.tipo !== 'FUNCIONARIO') {
    return res.status(403).json({ error: 'Acesso negado.' });
  }

  const perfisAutorizados = ['coordenador', 'diretor'];
  if (!perfisAutorizados.includes(req.user.perfil?.toLowerCase())) {
    return res.status(403).json({ 
      error: 'Acesso negado. Requer perfil de Coordenador ou Diretor.' 
    });
  }

  next();
}
