import express from 'express';
import TransacoesController from '../controllers/TransacoesController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { VerifyMiddleware } from '../middleware/VerifyMiddleware.js';

const TransacoesRouter = express.Router();
TransacoesRouter.use(AuthMiddleware)

TransacoesRouter.post('/:id', VerifyMiddleware, TransacoesController.transferir)

export default TransacoesRouter