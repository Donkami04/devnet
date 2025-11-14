const express = require("express");
const router = express.Router();
const { DateTimeSystems } = require("../models/datetime");
// const { getDataAnillo } = require("../controllers/anillo");

router.get("/", async (req, res, next) => {
  try {
    const data = await DateTimeSystems.findAll();
    res.json(data);
    
  } catch (error) {
    console.error(error)
    next(error);
  }
});


module.exports = router;
