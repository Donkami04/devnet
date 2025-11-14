const express = require("express");
const router = express.Router();
// const { validateData } = require("../middlewares/validator.handler");
// const { createMeshSchema, editMeshSchema } = require("../schemas/mesh.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const {
  getDataActility,
  createACtility,
  editActility,
  deleteActility,
  getOneActility,
} = require("../controllers/actility");

router.get("/", async (req, res, next) => {
  try {
    const data = await getDataActility();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await getOneActility(id);
    res.json(data)
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "staff"),
  // validateData(createMeshSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newElem = await createACtility(data);
      res.status(newElem.status).json({
        status: newElem.status,
        message: newElem.message,
        error: newElem.error,
        data: newElem.data,
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
  // validateData(editMeshSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const dataEdit = await editActility(id, changes);
      res.status(dataEdit.status).json({
        status: dataEdit.status,
        message: dataEdit.message,
        error: dataEdit.error,
        data: dataEdit.data,
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
      const dataDeleted = await deleteActility(id);
      res.status(dataDeleted.status).json({
        status: dataDeleted.status,
        message: dataDeleted.message,
        error: dataDeleted.error,
        data: dataDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
