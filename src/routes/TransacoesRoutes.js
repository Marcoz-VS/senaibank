import express from 'express';
import TransacoesController from '../controllers/TransacoesController.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';

const TransacoesRouter = express.Router();
TransacoesRouter.use(AuthMiddleware)

TransacoesRouter.post('/', TransacoesController.transferir)

export default TransacoesRouter