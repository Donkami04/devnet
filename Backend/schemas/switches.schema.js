const Joi = require("joi");

const createSwitchesSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  dispositivo: Joi.string().required().allow("").empty("").max(50).messages({
    "string.max": "El Nombre no puede exceder 50 caracteres",
    "any.required": "El Nombre es requerido",
  }),
  group: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(4)
    .valid("CSP", "CSS", "CNP", "CNS", "HSE", "CNPB", "CNSB")
    .messages({
      "string.max": "El grupo no puede exceder 4 caracteres",
      "any.required": "El grupo es requerida",
      "any.only":
        "El valor del grupo debe ser uno de los siguientes: CSP, CSS, CNP, CNS, HSE, CNPB, CNSB",
    }),
});

const editSwitchesSchema = Joi.object({
  ip: Joi.string().required().required().ip().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  dispositivo: Joi.string().required().required().max(50).allow("").empty("").messages({
    "string.max": "El Nombre no puede exceder 50 caracteres",
    "any.required": "El Nombre es requerido",
  }),
  group: Joi.string().required().required()
    .max(4)
    .allow("")
    .empty("")
    .valid("CSP", "CSS", "CNP", "CNS", "HSE", "CNPB", "CNSB")
    .messages({
      "string.max": "El grupo no puede exceder 40 caracteres",
      "any.required": "El Grupo es requerido",
      "any.only":
        "El valor del grupo debe ser uno de los siguientes: CSP, CSS, CNP, CNS, HSE, CNPB, CNSB",
    }),
});

module.exports = { createSwitchesSchema, editSwitchesSchema };
