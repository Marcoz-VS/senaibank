import 'dotenv/config'
import { connect } from './database/db.js'
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, async () => {
    await connect();
    console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}`)
});