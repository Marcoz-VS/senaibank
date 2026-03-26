import Transacao from "../models/Transacao.js";
import Conta from "../models/ContaBancaria.js";
import { sequelize } from "../database/db.js";

const TransacaoController = {
  transferir: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { origemId, destinoId, valor } = req.body;

      if (!origemId || !destinoId || !valor || valor <= 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Dados inválidos para transferência",
        });
      }

      const contaOrigem = await Conta.findByPk(origemId, { transaction: t });
      const contaDestino = await Conta.findByPk(destinoId, { transaction: t });

      if (!contaOrigem || !contaDestino) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      if (contaOrigem.balance < valor) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: "Saldo insuficiente",
        });
      }

      await contaOrigem.decrement("balance", { by: valor, transaction: t });
      await Transacao.create(
        {
          tipo: "transferencia_enviada",
          valor,
          contaId: origemId,
          descricao: `para conta ${contaDestino.accountNumber}`,
        },
        { transaction: t },
      );

      await contaDestino.increment("balance", { by: valor, transaction: t });
      await Transacao.create(
        {
          tipo: "transferencia_recebida",
          valor,
          contaId: destinoId,
          descricao: `de conta ${contaOrigem.accountNumber}`,
        },
        { transaction: t },
      );

      await t.commit();
      return res.status(200).json({
        success: true,
        message: `Transferência de R$ ${valor} realizada com sucesso!`,
      });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ error: error.message });
    }
  },
};

export default TransacaoController;