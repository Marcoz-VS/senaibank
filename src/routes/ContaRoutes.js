import express from 'express'
import ContaController from '../controllers/ContaBancariaController'

const ContaRouter = express.Router();

ContaRouter.get('/:id', ContaController.getSaldo)
ContaRouter.post('/', ContaController.create)
ContaRouter.put('/:id', ContaController.update)
ContaRouter.delete('/:id', ContaController.delete)

export default ContaRouter;