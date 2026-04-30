import { DataTypes } from "sequelize";
import { sequelize } from '../database/db.js'

const Conta = sequelize.define('Conta', {
  accountNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00
  },
  type: {
    type: DataTypes.ENUM('corrente', 'poupanca'),
    defaultValue: 'corrente'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
});

export default Conta;
