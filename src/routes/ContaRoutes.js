import express from 'express'
import ContaController from '../controllers/ContaBancariaController.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { RoleMiddleware } from '../middleware/RoleMiddleware.js';

const ContaRouter = express.Router();
ContaRouter.use(AuthMiddleware);

ContaRouter.get('/:id', ContaController.getSaldo)
ContaRouter.post('/', ContaController.create)
ContaRouter.put('/:id', RoleMiddleware("admin"), ContaController.update)
ContaRouter.delete('/:id', RoleMiddleware("admin"), ContaController.delete)

export default ContaRouter;