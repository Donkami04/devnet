const Joi = require("joi");

const createClientSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  group: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(4)
    .valid("CSP", "CSS", "CNP", "CNS", "HSE", "CNPB", "CNSB")
    .messages({
      "string.max": "El grupo no puede exceder 4 caracteres",
      "any.required": "El grupo es requerido",
      "any.only":
        "El valor del grupo debe ser uno de los siguientes: CSP, CSS, CNP, CNS, HSE, CNPB, CNSB",
    }),
  name: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El nombre es requerido",
  }),
  importancia: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(100)
    .valid("ALTA", "MEDIA", "BAJA")
    .messages({
      "any.required": "La importancia es requerida",
      "any.only": "El valor de la importancia debe ser ALTA, MEDIA o BAJA",
    }),
  clave: Joi.number()
    .integer()
    .required()
    .allow("")
    .empty("")
    .min(0)
    .max(999)
    .messages({
      "any.required": "La clave es requerida",
      "number.base": "La clave debe ser un número",
      "number.integer": "La clave debe ser un número entero",
      "number.max": "La clave no puede exceder 999",
      "number.min": "La clave no puede ser menor a 0",
    }),
  description: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "La descripción es requerida",
  }),
});

const editClientSchema = Joi.object({
  ip: Joi.string().required().ip().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  group: Joi.string()
    .required()
    .max(4)
    .allow("")
    .empty("")
    .valid("CSP", "CSS", "CNP", "CNS", "HSE", "CNPB", "CNSB")
    .messages({
      "string.max": "El grupo no puede exceder 4 caracteres",
      "any.only":
        "El valor del grupo debe ser uno de los siguientes: CSP, CSS, CNP, CNS, HSE, CNPB, CNSB",
      "any.required": "El Grupo es requerido",
    }),
  name: Joi.string().required().max(100).allow("").empty("").messages({
    "any.required": "El Nombre es requerido",
  }),
  importancia: Joi.string()
    .required()
    .max(100)
    .valid("ALTA", "MEDIA", "BAJA")
    .messages({
      "any.required": "La Importancia es requerida",
      "any.only": "El valor de la importancia debe ser ALTA, MEDIA o BAJA",
    }),
  clave: Joi.number()
    .required()
    .integer()
    .max(999)
    .allow("")
    .empty("")
    .messages({
      "number.base": "La clave debe ser un número",
      "number.integer": "La clave debe ser un número entero",
      "number.max": "La clave no puede exceder 999",
      "any.required": "La Clave es requerida",
    }),
  description: Joi.string().required().max(100).messages({
    "any.required": "La descripción es requerida",
  }),
});

module.exports = { createClientSchema, editClientSchema };
