const Joi = require("joi");

const createDevicesSchema = Joi.object({
  host: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  type: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El tipo de dispositivo es requerido",
  }),
  site: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El sitio es requerido",
  }),
  dpto: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El departamento es requerido",
  }),
  red: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(10)
    .valid("IT", "OT")
    .messages({
      "any.required": "La red es requerida",
      "any.only": "El valor de la RED debe ser uno de los siguientes: IT, OT",
    }),
});

const editDevicesSchema = Joi.object({
  host: Joi.string().required().ip().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  type: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El Tipo de dispositivo es requerido",
  }),
  site: Joi.string().required().max(100).allow("").empty("").messages({
    "any.required": "El Sitio es requerido",
  }),
  dpto: Joi.string().max(100).required().allow("").empty("").messages({
    "any.required": "El departamento es requerido",
  }),
  red: Joi.string().max(10).required().valid("IT", "OT").messages({
    "any.required": "La red es requerido",
    "any.only": "El valor de la RED debe ser uno de los siguientes: IT, OT",
  }),
});

module.exports = { createDevicesSchema, editDevicesSchema };
