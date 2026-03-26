import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const RegisterController = {
  register: async (req, res) => {
    try {
      const { name, password, email, cpf, endereco, role } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "você precisa preencher o nome" });
      }
      if (!password) {
        return res
          .status(400)
          .json({ success: false, message: "você precisa preencher a senha" });
      }
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "você precisa preencher o email" });
      }
      if (!cpf) {
        return res
          .status(400)
          .json({ success: false, message: "você precisa preencher o cpf" });
      }
      if (!endereco) {
        return res.status(400).json({
          success: false,
          message: "você precisa preencher o endereço",
        });
      }
      if (!role) {
        return res
          .status(400)
          .json({ success: false, message: "você precisa preencher o role" });
      }

      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        return res.status(400).json({
          message: "O role fornecido não é correta",
          data: null,
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const resultado = await Usuario.create({
        name,
        password: hash,
        email,
        cpf,
        endereco,
        role: role || "user",
      });

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Não foi possivel criar o usuário",
        });
      }

      res.status(201).json({
        message: "Usuario criado com sucesso!",
        data: resultado,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default RegisterController;
