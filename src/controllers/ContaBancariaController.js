import Conta from "../models/ContaBancaria.js";

const ContaController = {

    getSaldo: async (req, res) => {
     try {
        const { id } = req.params;
        const resultado = await Conta.findOne({where: {id}})

     if(!resultado) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
     }

        res.status(200).json({
         success: true,
         message: `Seu saldo é ${resultado.balance}`,
        });
     } catch(error){
     res.status(500).json({ error: error.message });
     }
    },
    
    create: async (req, res) => {
  try {
    const { accountNumber, type } = req.body;

    if (!accountNumber || !accountNumber.trim() ||
        !type || !type.trim()) {
      return res.status(400).json({
        success: false,
        message: "Você precisa preencher todos os campos",
      });
    }

    const resultado = await Conta.create({
      accountNumber,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Conta criada com sucesso!",
      data: resultado,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

    update: async (req, res) => {
     try{
      const { id } = req.params;
      const {accountNumber, type} = req.body;

      const [atualizado] = await Conta.update(
     {accountNumber, type}, { where: { id }})

     if (!atualizado) {
        return res.status(404).json({ message: "Conta não encontrada" });
      }

        if  (!accountNumber.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
        
        if  (!type.trim('')) {
        return res.status(400).json({ success: false, message: "você precisa preencher todos os campos" });
      }
      res.status(200).json({
        success: true,
        message: "Conta atualizada com sucesso!",
        data: atualizado,
      });
     } catch(error){
      res.status(500).json({ error: error.message });
     }
    },

    delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deletado = await Conta.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      res.status(200).json({
        message: "Conta deletada com sucesso!",
        data: deletado,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default ContaController