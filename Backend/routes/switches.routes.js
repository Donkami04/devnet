const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const {
  createSwitchesSchema,
  editSwitchesSchema,
} = require("../schemas/switches.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { SwitchesService } = require("../controllers/switches");

const Switches = new SwitchesService();

// Obtener todos las Switches
router.get("/", async (req, res, next) => {
  try {
    const response = await Switches.getSwitches();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// router.get("/:ip", async (req, res, next) => {
//   try {
//     const ip = req.params.ip;
//     const switch_ = await getOneSwitch(ip);
//     res.status(switch_.status).json({
//       status: switch_.status,
//       message: switch_.message,
//       error: switch_.error,
//       data: switch_.data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   validateData(createSwitchesSchema),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const newSwitch = await createSwitch(data);
//       res.status(newSwitch.status).json({
//         status: newSwitch.status,
//         message: newSwitch.message,
//         error: newSwitch.error,
//         data: newSwitch.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// router.put(
//   "/edit/:id",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   validateData(editSwitchesSchema),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const changes = req.body;
//       const switchEdit = await editOneSwitch(id, changes);
//       res.status(switchEdit.status).json({
//         status: switchEdit.status,
//         message: switchEdit.message,
//         error: switchEdit.error,
//         data: switchEdit.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

// router.delete(
//   "/remove/:ip",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   async (req, res, next) => {
//     try {
//       const ip = req.params.ip;
//       const switchDeleted = await deleteSwitch(ip);
//       res.status(switchDeleted.status).json({
//         status: switchDeleted.status,
//         message: switchDeleted.message,
//         error: switchDeleted.error,
//         data: switchDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
