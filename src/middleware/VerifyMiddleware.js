import Conta from "../models/ContaBancaria.js";

export const VerifyMiddleware = async (req, res, next) => {
  try {
    const { id, contaId} = req.params;
    const logadoId = req.userId;

    const conta = await Conta.findByPk(id || contaId);

    if (!conta) {
      return res.status(404).json({ success: false, message: "Conta não encontrada" });
    }

    if (conta.usuarioId !== logadoId) {
      return res.status(403).json({ 
        success: false, 
        message: "Acesso negado: Você não é o dono desta conta." 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
