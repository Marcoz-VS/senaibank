import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql"
})

async function connect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Conexão com MySQL estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

export { sequelize, connect };