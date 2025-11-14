const express = require("express");
const router = express.Router();
const { FimService } = require("../controllers/base_fim");
const { getBaseBtwDate } = require("../schemas/basefim.schema");
const { validateData } = require("../middlewares/validator.handler");

const FimBase = new FimService();
router.get("/", async (req, res, next) => {

  try {
    const response = await FimBase.getFim();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/range",
  validateData(getBaseBtwDate),
  async (req, res, next) => {
  try {
    const { sdate, edate } = req.body;
    // const { sdate, edate, base_ip } = req.body;
    const response = await FimBase.getDatesDownBetween(sdate, edate);
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
