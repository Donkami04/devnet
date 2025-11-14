const Joi = require("joi");

const createMeshSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  device: Joi.string().required().allow("").empty("").max(100).messages({
    "string.max": "El Dispositivo no puede exceder 100 caracteres",
    "any.required": "El Dispositivo es requerido",
  }),
  eqmt: Joi.string().required().allow("").empty("").max(32).messages({
    "string.max": "El EQMT no puede exceder 32 caracteres",
    "any.required": "El EQMT es requerido",
  }),
});

const editMeshSchema = Joi.object({
  ip: Joi.string().required().ip().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  device: Joi.string().required().max(100).allow("").empty("").messages({
    "string.max": "El Dispositivo no puede exceder 100 caracteres",
    "any.required": "El Dispositivo eses requerido",
  }),
  eqmt: Joi.string().required().max(32).allow("").empty("").messages({
    "string.max": "El EQMT no puede exceder 32 caracteres",
    "any.required": "El EQMT es requerido",
  }),
});

module.exports = { createMeshSchema, editMeshSchema };
