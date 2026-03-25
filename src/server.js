import 'dotenv/config'
import { connect } from './database/db.js'
import express from 'express';
import UsuarioRouter from './routes/UsuarioRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', UsuarioRouter);

app.listen(PORT, async () => {
    await connect();
    console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`)
});