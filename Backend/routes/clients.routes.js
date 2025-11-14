const express = require("express");
const router = express.Router();
const { validateData } = require("../middlewares/validator.handler");
const {
  createClientSchema,
  editClientSchema,
} = require("../schemas/clients.schema");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");
const { ClientService } = require("../controllers/clients");

const Clients = new ClientService();

// Obtener todos los clientes
router.get("/", async (req, res, next) => {
  try {
    const response = await Clients.getClients();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Obtener todos los clientes de la desaladora
router.get("/desaladora", async (req, res, next) => {
  try {
    const response = await Clients.getDesaladoraClients();
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
//     const client = await getOneClient(ip);
//     res.status(client.status).json({
//       status: client.status,
//       message: client.message,
//       error: client.error,
//       data: client.data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "staff", ),
//   validateData(createClientSchema),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const newClient = await createClient(data);
//       res.status(newClient.status).json({
//         status: newClient.status,
//         message: newClient.message,
//         error: newClient.error,
//         data: newClient.data,
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
//   validateData(editClientSchema),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const changes = req.body;
//       const clientEdit = await editOneClient(id, changes);
//       res.status(clientEdit.status).json({
//         status: clientEdit.status,
//         message: clientEdit.message,
//         error: clientEdit.error,
//         data: clientEdit.data,
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
//       const clientDeleted = await deleteClient(ip);
//       res.status(clientDeleted.status).json({
//         status: clientDeleted.status,
//         message: clientDeleted.message,
//         error: clientDeleted.error,
//         data: clientDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
