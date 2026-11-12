import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

/**
 * Middleware para validar o token JWT nas requisições HTTP protegidas.
 * Se o token for válido, anexa as informações do usuário em req.user.
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ 
      error: 'Acesso não autorizado. Cabeçalho de autorização ausente.' 
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      error: 'Formato de token inválido. Esperado: Bearer <token>' 
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token inválido ou expirado. Faça login novamente.' 
    });
  }
}
