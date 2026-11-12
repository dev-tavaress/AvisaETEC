import { Router } from 'express';
import { listarModulos } from '../controllers/moduloController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Endpoint autenticado para listar módulos/turmas
router.get('/', authMiddleware, listarModulos);

export default router;
