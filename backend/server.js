import http from 'http';
import app from './src/app.js';
import { ENV } from './src/config/env.js';
import { initSocket } from './src/sockets/socketManager.js';
import prisma from './src/config/prisma.js';

const server = http.createServer(app);

// Inicializar camada de WebSocket (Socket.io)
initSocket(server);

server.listen(ENV.PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 AvisaETEC Server rodando na porta: ${ENV.PORT}`);
  console.log(`📡 WebSocket / Socket.io pronto para conexões`);
  console.log(`🔗 API Base: http://localhost:${ENV.PORT}/api`);
  console.log(`🩺 Health Check: http://localhost:${ENV.PORT}/api/health`);
  console.log(`===============================================`);
});

// Tratamento para desligamento gracioso
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor AvisaETEC...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('✅ Servidor finalizado com sucesso.');
    process.exit(0);
  });
});
