import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js'
import { RoleMiddleware } from '../middleware/RoleMiddleware.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { VerifyMiddleware } from '../middleware/VerifyMiddleware.js';

const UsuarioRouter = express.Router();

UsuarioRouter.get('/', RoleMiddleware("admin"), UsuarioController.getAll)
UsuarioRouter.get('/:id', RoleMiddleware("admin"), UsuarioController.getById)
UsuarioRouter.put('/:id', AuthMiddleware, VerifyMiddleware, UsuarioController.update)
UsuarioRouter.delete('/:id', RoleMiddleware("admin"), UsuarioController.delete)

export default UsuarioRouter