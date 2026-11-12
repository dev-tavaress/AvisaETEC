import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import moduloRoutes from './routes/moduloRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// Middlewares essenciais
app.use(cors({
  origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Rota de Health Check para verificação do servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AvisaETEC Backend API'
  });
});

// Rotas da Aplicação
app.use('/api/auth', authRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/notificacoes', notificacaoRoutes);

// Middleware centralizado de tratamento de erros
app.use(errorMiddleware);

export default app;
