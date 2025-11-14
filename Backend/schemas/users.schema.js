const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El nombre del usuario es requerido",
  }),
  email: Joi.string().email().allow("").empty("").required().messages({
    "string.email": "El email debe tener un formato valido",
    "any.required": "El email es requerido",
  }),
  rol: Joi.string()
    .required()
    .valid("admin", "staff")
    .allow("")
    .empty("")
    .max(50)
    .messages({
      "any.required": "El rol del usuario es requerido",
      "any.only": "El valor del rol debe ser admin o staff",
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
        "El password debe contener al menos un número y un carácter especial",
      "string.min": "El password debe tener al menos 8 caracteres",
    })
});

const editUserSchema = Joi.object({
  name: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El nombre del usuario es requerido",
  }),
  email: Joi.string().email().allow("").empty("").required().messages({
    "string.email": "El email debe tener un formato valido",
    "any.required": "El email es requerido",
  }),
  rol: Joi.string()
    .required()
    .valid("admin", "staff")
    .allow("")
    .empty("")
    .max(50)
    .messages({
      "any.required": "El rol del usuario es requerido",
      "any.only": "El valor del rol debe ser admin o staff",
    })
});

module.exports = { createUserSchema, editUserSchema };
