import { PrismaClient } from '@prisma/client';

// Instância singleton do PrismaClient para evitar múltiplas conexões em desenvolvimento
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

export default prisma;
