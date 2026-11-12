import { Router } from 'express';
import { listarAlunos } from '../controllers/alunoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { funcionarioOnly } from '../middlewares/roleMiddleware.js';

const router = Router();

// Apenas funcionários podem listar alunos para direcionamento de avisos individuais
router.get('/', authMiddleware, funcionarioOnly, listarAlunos);

export default router;
