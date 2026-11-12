/**
 * Middleware global de tratamento de erros para captura e respostas padronizadas
 */
export function errorMiddleware(err, req, res, next) {
  console.error('❌ [API Error]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
