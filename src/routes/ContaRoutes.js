import express from 'express'
import ContaController from '../controllers/ContaBancariaController.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { RoleMiddleware } from '../middleware/RoleMiddleware.js';
import { VerifyMiddleware } from '../middleware/VerifyMiddleware.js';

const ContaRouter = express.Router();
ContaRouter.use(AuthMiddleware);

ContaRouter.get('/:id', VerifyMiddleware, ContaController.getSaldo)
ContaRouter.post('/', ContaController.create)
ContaRouter.post('/saque/:id', VerifyMiddleware, ContaController.saque);
ContaRouter.post('/deposito/:id', VerifyMiddleware, ContaController.deposito);
ContaRouter.put('/:id', RoleMiddleware("admin"), ContaController.update)
ContaRouter.delete('/:id', RoleMiddleware("admin"), ContaController.delete)

export default ContaRouter;