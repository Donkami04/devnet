const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const { createMeshSchema, editMeshSchema } = require("../schemas/mesh.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { MeshService } = require("../controllers/mesh");

const Mesh = new MeshService();

router.get("/", async (req, res, next) => {
  try {
    const response = await Mesh.getMesh();
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
//     const mesh = await getOneMesh(ip);
//     res.status(mesh.status).json({
//       status: mesh.status,
//       message: mesh.message,
//       error: mesh.error,
//       data: mesh.data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff"),
//   validateData(createMeshSchema),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const newMesh = await createMesh(data);
//       res.status(newMesh.status).json({
//         status: newMesh.status,
//         message: newMesh.message,
//         error: newMesh.error,
//         data: newMesh.data,
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
//   validateData(editMeshSchema),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const changes = req.body;
//       const meshEdit = await editOneMesh(id, changes);
//       res.status(meshEdit.status).json({
//         status: meshEdit.status,
//         message: meshEdit.message,
//         error: meshEdit.error,
//         data: meshEdit.data,
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
//       const meshDeleted = await deleteMesh(ip);
//       res.status(meshDeleted.status).json({
//         status: meshDeleted.status,
//         message: meshDeleted.message,
//         error: meshDeleted.error,
//         data: meshDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
