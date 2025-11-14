const express = require("express");
const router = express.Router();
const { createUserSchema, editUserSchema } = require("../schemas/users.schema");
const { validateData } = require("../middlewares/validator.handler");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { getUsers, createUser, editOneUser, deleteUser } = require("../controllers/users");

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      let users = await getUsers();
      users.map((user) => {
        delete user.dataValues.token
        delete user.dataValues.password
      })
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(createUserSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await createUser(data);
      res.status(newUser.status).json({
        status: newUser.status,
        message: newUser.message,
        error: newUser.error,
        data: newUser.data,
      });
    } catch (error) {
      console.error(error);
      console.error("error");
      next(error);
    }
  }
);

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validateData(editUserSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const userEdit = await editOneUser(id, changes);
      res.status(userEdit.status).json({
        status: userEdit.status,
        message: userEdit.message,
        error: userEdit.error,
        data: userEdit.data,
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
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const userDeleted = await deleteUser(id);
      res.status(userDeleted.status).json({
        status: userDeleted.status,
        message: userDeleted.message,
        error: userDeleted.error,
        data: userDeleted.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
