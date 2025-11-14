const Joi = require("joi");

const createWanSchema = Joi.object({
  ip: Joi.string().ip().allow('').empty('').required().messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
});

const editWanSchema = Joi.object({
  ip: Joi.string().ip().allow('').required().empty('').messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
});

module.exports = { createWanSchema, editWanSchema };
