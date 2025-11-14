const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().allow("").empty("").required().messages({
    "string.email": "El email debe tener un formato válido",
    "any.required": "El email es requerido",
  }),
  password: Joi.string()
  .required()
  .allow("")
  .empty("")
  .min(8)
  .max(100)
  .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
  .messages({
    "any.required": "El password es requerido",
    "string.pattern.base":
      "Email o password incorrecto",
    "string.min": "El password debe tener al menos 8 caracteres",
  })
});

module.exports = { loginSchema };
