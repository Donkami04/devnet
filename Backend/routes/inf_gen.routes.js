const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { createApSchema, editApSchema } = require("../schemas/ap.schema");
const { validateData } = require("../middlewares/validator.handler");
const { DataInfGenService } = require("../controllers/inf_gen");


const InfraGeneral = new DataInfGenService();

// Obtener todos los SW de InfraGeneral
router.get("/", async (req, res, next) => {
  try {
    const response = await InfraGeneral.getInfGenData();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/kpi", async (req, res, next) => {
  try {
    const response = await InfraGeneral.getPercentUpGeneral();
    res.status(response.statusCode).json({
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/kpi/devices", async (req, res, next) => {
  try {

    const response = await InfraGeneral.getPercentUpDevices();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/kpi/categories", async (req, res, next) => {
  try {
    const response = await InfraGeneral.getPercentUpByCategory();
    res.status(response.statusCode).json({
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
