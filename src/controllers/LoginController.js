import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginController = {
  login: async (req, res) => {
    try {
      const { password, email } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email e senha são obrigatórios",
        });
      }

      const resultado = await Usuario.findOne({ where: { email } });

      if (!resultado) {
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas",
        });
      }

      const hashCompare = await bcrypt.compare(password, resultado.password);

      if (!hashCompare) {
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas"
        });
      }

      const token = jwt.sign(
        { id: resultado.id, email: resultado.email, role: resultado.role },
        process.env.CHAVE_JWT,
        { expiresIn: "1h" },
      );

      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso!",
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default LoginController;