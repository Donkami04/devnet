const Joi = require("joi");

const createFirewallSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  name: Joi.string().required().allow("").empty("").max(32).messages({
    "any.required": "El nombre es requerido",
  }),
  channel: Joi.string().required().allow("").empty("").max(32).messages({
    "any.required": "El Canal es requerido",
  }),
  link: Joi.string().required().allow("").empty("").max(32).messages({
    "any.required": "El Enlace es requerido",
  }),
  vdom: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(10)
    .valid("N/A", "root", "Villa", "Comunitario")
    .messages({
      "any.required": "El valor del VDOM es requerido",
      "any.only": "El valor del VDOM debe ser: N/A, root, Villa, Comunitario",
    }),
  gateway: Joi.string().required().allow("").empty("").max(32).messages({
    "any.required": "El Gateway es requerido",
  }),
  ubication: Joi.string()
    .required()
    .allow("")
    .empty("")
    .valid("corporate", "community")
    .max(32)
    .messages({
      "any.required": "La Ubicación es requerida",
      "any.only": "La Ubicación debe ser: corporate, community",
    }),
});

const editFirewallSchema = Joi.object({
  ip: Joi.string().required().ip().allow("").empty("").messages({
    "any.required": "La IP es requerida",
    "string.ip": "La IP debe tener un formato valido",
  }),
  name: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(32)
    .messages({ "any.required": "El nombre es requerido" }),
  channel: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(32)
    .messages({ "any.required": "El Canal es requerido" }),
  link: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(32)
    .messages({ "any.required": "El Enlace es requerido" }),
  vdom: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(10)
    .valid("N/A", "root", "Villa", "Comunitario")
    .messages({
      "any.only": "El valor del VDOM debe ser: N/A, root, Villa, Comunitario",
      "any.required": "El Vdom es requerido",
    }),
  gateway: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(32)
    .messages({ "any.required": "El Gateway es requerido" }),
  ubication: Joi.string()
    .required()
    .allow("")
    .empty("")
    .valid("corporate", "community")
    .max(32)
    .messages({
      "any.required": "La Ubicación es requerida",
      "any.only": "La Ubicación debe ser: corporate, community",
    }),
});

module.exports = { createFirewallSchema, editFirewallSchema };
