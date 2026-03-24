import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Conta from './contaBancaria.js';

const Transacao = sequelize.define('Transacao', {
  tipo: {
    type: DataTypes.ENUM('deposito', 'saque', 'transferencia_enviada', 'transferencia_recebida'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING
  }
});

Conta.hasMany(Transacao, { foreignKey: 'contaId' });
Transacao.belongsTo(Conta, { foreignKey: 'contaId' });

export default Transacao;