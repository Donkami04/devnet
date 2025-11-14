const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");

const { LicenciamientosService } = require("../controllers/licenciamientos");

const Licenciamiento = new LicenciamientosService();

router.get("/",  async (req, res, next) => {
  try {
    const response = await Licenciamiento.getLicenciamientos();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  // validateData(createLicenciamientosSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await Licenciamiento.createLicenciamiento(data);
      res.status(response.statusCode).json({
        status: response.statusCode,
        message: response.message,
        error: response.error,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  // validateData(editLicenciamientosSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const response = await Licenciamiento.editOneLicenciamiento(id, changes);
      res.status(response.statusCode).json({
        status: response.status,
        message: response.message,
        error: response.error,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const resp = await Licenciamiento.deleteLicenciamiento(id);
      res.status(resp.status).json({
        status: resp.status,
        message: resp.message,
        error: resp.error,
        data: resp.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
