import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js'

const UsuarioRouter = express.Router();

UsuarioRouter.get('/', UsuarioController.getAll)
UsuarioRouter.get('/:id', UsuarioController.getById)
UsuarioRouter.post('/', UsuarioController.create)
UsuarioRouter.put('/:id', UsuarioController.update)
UsuarioRouter.delete('/:id', UsuarioController.delete)

export default UsuarioRouter