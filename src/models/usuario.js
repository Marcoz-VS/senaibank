import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Conta from "./ContaBancaria.js";

const Usuario = sequelize.define("Usuario", {
  name:     { type: DataTypes.STRING, allowNull: false },
  email:    { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  cpf:      { type: DataTypes.STRING(11), unique: true, allowNull: false },
  endereco: { type: DataTypes.STRING(200), allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
});

Usuario.hasOne(Conta, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Conta.belongsTo(Usuario, { foreignKey: "usuarioId" });