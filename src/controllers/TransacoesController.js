import Transacao from "../models/Transacao.js";
import Conta from "../models/ContaBancaria.js";

const TransacaoController = {
  transferir: async (req, res) => {
    const t = await Sequelize.transaction();
    try {
      const { origemId, destinoId, valor } = req.body;
      const contaOrigem = await Conta.findByPk(origemId, { transaction: t });
      const contaDestino = await Conta.findByPk(destinoId, { transaction: t });

      if (!contaOrigem || !contaDestino) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
      }

      if (contaOrigem.balance < valor) throw new Error("Saldo Insuficiente");

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
      return {
        success: true,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
