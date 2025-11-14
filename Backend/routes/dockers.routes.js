const express = require("express");
const router = express.Router();
const { getDockersData } = require("../controllers/dockers");
const axios = require('axios');
const https = require('https');
const { PrtgDownHistoric } = require("../models/dockers");

router.get("/", async (req, res, next) => {
  try {
    const data = await getDockersData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/historic/prtg-down", async (req, res, next) => {
  try {
    const records = await PrtgDownHistoric.findAll({
      order: [["id", "DESC"]],
    });

    records.forEach(record => {
      if (record.duration !== null && record.duration !== undefined) {
        const durationSeconds = Number(record.duration);
        record.duration = Number((durationSeconds / 60).toFixed(0));
      } else {
        record.duration = null;
      }
    });

    res.json({ statusCode: 200, data: records });

  } catch (error) {
    console.error("Error fetching PRTG down historic:", error);
    next(error);
  }
});



module.exports = router;
