const Joi = require("joi");

const createApSchema = Joi.object({
  ip: Joi.string().ip().allow('').empty('').required().messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  name: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El Nombre del AP es requerido",
  }),
  model: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El Modelo del AP es requerido",
  }),
  state: Joi.string().required().allow("").empty("").max(50).messages({
    "any.required": "El Estado del AP es requerido, e.g (Registered)",
  }),
  location: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "La Ubicación del AP es requerido",
  }),
});

const editApSchema = Joi.object({
  ip: Joi.string().ip().allow('').empty('').required().messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  name: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El Nombre del AP es requerido",
  }),
  model: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El Modelo del AP es requerido",
  }),
  state: Joi.string().required().allow("").empty("").max(50).messages({
    "any.required": "El Estado del AP es requerido, e.g (Registered)",
  }),
  location: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "La Ubicación del AP es requerido",
  }),
});

module.exports = { createApSchema, editApSchema };
