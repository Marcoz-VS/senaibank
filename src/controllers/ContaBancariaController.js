import Conta from "../models/contaBancaria.js";

const ContaController = {

    getSaldo: async (req, res) => {
     try {
        const { id } = req.params;
        const resultado = await Conta.FindOne({where: {id}})

     if(!resultado) {
        return res.status(404).json({
          success: false,
          message: "Conta não encontrada",
        });
     }

        res.status(200).json({
         success: true,
         message: `Seu saldo é ${resultado.saldo}`,
        });
     } catch(error){
     res.status(500).json({ error: error.message });
     }
    },

    
}