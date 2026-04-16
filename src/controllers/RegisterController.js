import Usuario from "../models/usuario.js"
import bcrypt from "bcrypt";
import Joi from "joi";
import validarCPF  from '../validations/validarCpf.js'

const schema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Informe um e-mail válido.",
    "any.required": "O e-mail é obrigatório.",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "A senha deve conter entre 3 e 30 caracteres alfanuméricos.",
    }),
  cpf: Joi.string()
    .pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "CPF em formato inválido.",
    }),
  endereco: Joi.string()
      .required()
      .min(20).max(255)
      .messages({
       "any.required": "O endereço é obrigatório.",
      }),
  role: Joi.string().valid("user", "admin").default("user"),
});

const RegisterController = {
  register: async (req, res) => {
    try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.details.map((detail) => detail.message),
        });
      }

      const { name, password, email, cpf, endereco, role } = value;

      if (!validarCPF(cpf)) {
        return res.status(400).json({
          success: false,
          message: "CPF inválido",
        });
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
