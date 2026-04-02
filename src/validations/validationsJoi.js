import Joi from 'joi'

export const usuarioUpdateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  endereco: Joi.string().required(),
  password: Joi.string().min(6).optional()
})

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .required()
    .messages({
      "string.empty": "O nome é obrigatório",
      "string.min": "O nome deve ter no mínimo 3 caracteres",
    }),

  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({
      "string.email": "Email inválido",
      "string.empty": "O email é obrigatório",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "A senha deve ter no mínimo 6 caracteres",
      "string.empty": "A senha é obrigatória",
    }),

  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "CPF deve ter 11 dígitos",
      "string.pattern.base": "CPF deve conter apenas números",
      "string.empty": "O CPF é obrigatório",
    }),

  endereco: Joi.string()
    .min(5)
    .trim()
    .required()
    .messages({
      "string.empty": "O endereço é obrigatório",
      "string.min": "Endereço muito curto",
    }),

  role: Joi.string()
    .valid("user", "admin")
    .optional()
    .messages({
      "any.only": "Role deve ser 'user' ou 'admin'",
    }),
});