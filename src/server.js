import 'dotenv/config'
import { connect } from './database/db.js'
import express from 'express';
import UsuarioRouter from './routes/UsuarioRoutes.js'
import ContaRouter from './routes/ContaRoutes.js'
import TransacoesRouter from './routes/TransacoesRoutes.js';
import LoginRouter from './routes/LoginRoutes.js'
import RegisterRouter from './routes/RegisterRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const database = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS

app.use(express.json());
app.use('/usuarios', UsuarioRouter);
app.use('/login', LoginRouter);
app.use('/contas', ContaRouter);
app.use('/transferir', TransacoesRouter)
app.use('/register', RegisterRouter)

app.listen(PORT, async () => {
    await connect();
    console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`)
});