const express = require("express");
const router = express.Router();
const { VpnService } = require("../controllers/vpn");

const Vpn = new VpnService();

router.get("/", async (req, res, next) => {
  try {
    const response = await Vpn.getVpn();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
