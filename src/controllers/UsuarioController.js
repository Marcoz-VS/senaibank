import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt'

const UsuarioController = {

    getAll: async (req, res) => {
        try {
      const resultado = await Usuario.findAll();

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Usuario não encontrado",
        });
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: "Usuarios puxados com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    },

    getById: async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await Usuario.findByPk(id);

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Usuario não encontrado",
        });
      }

      res.status(200).json({
        success: true,
        data: resultado,
        message: "Usuario puxado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
   create: async (req, res) => {
    try {
      const { nome, senha, email, cpf, endereco } = req.body;

      const hash = await bcrypt.hash(senha, 10)

      const resultado = await Usuario.create({
        nome,
        senha: hash,
        email,
        cpf,
        endereco
      });

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Não foi possivel criar o usuário",
        });
      }

        if  (!nome.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!senha.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!email.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!cpf.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!endereco.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }

      res.status(201).json({
        message: "Usuario criado com sucesso!",
        data: resultado,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, senha, email, endereco } = req.body;

      const hash = await bcrypt.hash(senha, 10)

      const [atualizado] = await Usuario.update(
        { senha: hash, email, endereco },
        { where: { id }},
      );

      if (!atualizado) {
        return res.status(404).json({ message: "Usuario não encontrado" });
      }

        if  (!nome.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        
        if  (!senha.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!email.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        if  (!endereco.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
      
      res.status(200).json({
        success: true,
        data: atualizado,
        message: "Usuario atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

   delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deletado = await Usuario.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({
          success: false,
          message: "Usuario não encontrado",
        });
      }

      res.status(200).json({
        message: "Usuario deletado com sucesso!",
        data: deletado,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
}

export default UsuarioController;