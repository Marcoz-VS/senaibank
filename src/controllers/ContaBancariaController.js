import Conta from "../models/ContaBancaria.js";
import Transacao from "../models/Transacao.js"

const ContaController = {
  getSaldo: async (req, res) => {
    try {
      const { id } = req.params;
      const resultado = await Conta.findOne({ where: { id } });

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      res.status(200).json({
        success: true,
        message: `Seu saldo é ${resultado.balance}`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getTransactions: async (req, res) => {
   try{
    const { contaId } = req.params;
    const resultado = await Transacao.findAll({ where: { contaId } });

        if (!resultado.length) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma transação foi feita",
        });
      }
        res.status(200).json({
        success: true,
        data: resultado
      });

   }catch(error){
    res.status(500).json({ error: error.message });
   }
  },

  saque: async (req, res) => {
    try {
      const { id } = req.params;
      const { valor } = req.body;

      if (!valor || valor <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valor inválido para saque",
        });
      }

      const conta = await Conta.findOne({ where: { id } });

      if (!conta) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      if (conta.balance < valor) {
        return res.status(400).json({
          success: false,
          message: "Saldo insuficiente",
        });
      }

      const novoSaldo = parseFloat(conta.balance) - parseFloat(valor);

      await Conta.update({ balance: novoSaldo }, { where: { id } });

      res.status(200).json({
        success: true,
        message: `Saque de R$ ${valor} realizado com sucesso!`,
        novoSaldo: novoSaldo,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deposito: async (req, res) => {
    try {
      const { id } = req.params;
      const { valor } = req.body;

      if (!valor || valor <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valor inválido para deposito",
        });
      }

      const conta = await Conta.findOne({ where: { id } });

      if (!conta) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }
      console.log(conta.balance);
      const novoSaldo = parseFloat(conta.balance) + parseFloat(valor);

      await Conta.update({ balance: novoSaldo }, { where: { id } });

      res.status(200).json({
        success: true,
        message: `Deposito de R$ ${valor} realizado com sucesso!`,
        novoSaldo: novoSaldo,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { accountNumber, type } = req.body;

      if (!accountNumber) {
        return res.status(400).json({
          success: false,
          message: "Você precisa colocar o numero da conta",
        });
      }

      const resultado = await Conta.create({
        accountNumber,
        type: type || "corrente",
        usuarioId: req.userId,
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
    try {
      const { id } = req.params;
      const { accountNumber, type } = req.body;

      if (!accountNumber?.trim() || !type?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Você precisa preencher todos os campos",
        });
      }

      const [atualizado] = await Conta.update(
        { accountNumber, type },
        { where: { id } },
      );

      if (!atualizado) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      res.status(200).json({
        success: true,
        message: "Conta atualizada com sucesso!",
      });
    } catch (error) {
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

export default ContaController;
