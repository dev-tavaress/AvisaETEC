import { Router } from 'express';
import { 
  listarNotificacoes, 
  criarNotificacao, 
  atualizarStatusLeitura, 
  excluirNotificacao 
} from '../controllers/notificacaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { funcionarioOnly } from '../middlewares/roleMiddleware.js';

const router = Router();

// Todas as rotas de notificações exigem autenticação prévia
router.use(authMiddleware);

// Feed do mural (disponível para Alunos e Funcionários)
router.get('/', listarNotificacoes);

// Criação de aviso em tempo real (exclusivo para Funcionários — RN01)
router.post('/', funcionarioOnly, criarNotificacao);

// Atualização de status de leitura (RN04)
router.patch('/:id/status', atualizarStatusLeitura);

// Exclusão de aviso (exclusivo para Funcionários)
router.delete('/:id', funcionarioOnly, excluirNotificacao);

export default router;
