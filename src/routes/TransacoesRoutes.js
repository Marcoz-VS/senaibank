import express from 'express';
import TransacaoController from '../controllers/TransacoesController';

const TransacoesRouter = express.Router();

TransacoesRouter.post('/', TransacaoController.transferir)

export default TransacoesRouter