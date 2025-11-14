const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const {
  createDevicesSchema,
  editDevicesSchema,
} = require("../schemas/devices.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { DevicesService } = require("../controllers/devices");

const Devices = new DevicesService();

// Obtener todos las Devices
router.get("/", async (req, res, next) => {
  try {
    const response = await Devices.getDevices();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});


router.get("/:host", async (req, res, next) => {
  try {
    const host = req.params.host;
    const device = await Devices.getOneDevice(host);
    res.status(device.statusCode).json({
      status: device.statusCode,
      message: device.message,
      error: device.error,
      data: device.data,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  validateData(createDevicesSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newDevice = await Devices.createDevice(data);
      res.status(newDevice.statusCode).json({
        status: newDevice.statusCode,
        message: newDevice.message,
        error: newDevice.error,
        data: newDevice.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  validateData(editDevicesSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const deviceEdit = await Devices.editOneDevice(id, changes);
      res.status(deviceEdit.statusCode).json({
        status: deviceEdit.status,
        message: deviceEdit.message,
        error: deviceEdit.error,
        data: deviceEdit.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const deviceDeleted = await Devices.deleteDevice(id);
      res.status(deviceDeleted.status).json({
        status: deviceDeleted.status,
        message: deviceDeleted.message,
        error: deviceDeleted.error,
        data: deviceDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get("/camaras/csv", async (req, res, next) => {
  try {
    const response = await Devices.getCamarasCsv();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="camaras.csv"');
    res.status(response.statusCode).send(response.data);
    // res.status(response.statusCode).send({data: response.data, message: response.message});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
