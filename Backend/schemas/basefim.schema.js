const Joi = require("joi");

const getBaseBtwDate = Joi.object({
  // base_ip: Joi.string().ip().allow("").empty("").required().messages({
  //   "string.ip": "La IP debe tener un formato válido",
  //   "any.required": "La IP es requerida",
  // }),
  sdate: Joi.date().iso().required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida",
    "any.required": "La fecha de inicio es requerida",
  }),
  edate: Joi.date().iso().required().messages({
    "date.base": "La fecha de fin debe ser una fecha válida",
    "any.required": "La fecha de fin es requerida",
  }),
});

module.exports = {getBaseBtwDate};
