const express = require("express");
const router = express.Router();
const { GroupPrtgService } = require("../controllers/group_prtg");

const GroupPrtg = new GroupPrtgService();

// Obtener todos las GroupPrtgService
router.get("/", async (req, res, next) => {
  try {
    const response = await GroupPrtg.getGroupPrtg();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Obtener todos los certificados candelaria
router.get("/certificados", async (req, res, next) => {
  try {
    const response = await GroupPrtg.getCertificadosGroupPrtg();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});


// Obtener todos las GroupPrtgService Up y Down
router.get("/updown", async (req, res, next) => {
  try {
    const response = await GroupPrtg.getPrtgGroupUpDown();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// Obtener registros DOnw las GroupPrtgService Up y Down
router.get("/down-registers", async (req, res, next) => {
  try {
    const response = await GroupPrtg.getDownRegister();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

// router.get("/updown", async (req, res, next) => {
//   try {
//     const data = await getPrtgGroupUpDown();
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const data = await getPrtgGroupData();
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/updown", async (req, res, next) => {
//   try {
//     const data = await getPrtgGroupUpDown();
//     res.json(data);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
