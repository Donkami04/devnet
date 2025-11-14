const { Switches } = require("../models/switches");

class SwitchesService {
  async getSwitches() {
    try {
      const data = await Switches.findAll();
      return {
        statusCode: 200,
        message: "Información de los Switches del DCS Candelaria obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la información de los Switches del DCS Candelaria");
    }
  }
}

// async function getSwitches() {
//   const numSwitches = await getNumberSwitches();
//   const switches = await Switches.findAll({
//     order: [["id", "DESC"]],
//     limit: numSwitches,
//   });
//   return switches;
// }

// async function getNumberSwitches() {
//   const listSwitches = await DataSwitches.findAll();
//   const numSwitches = listSwitches.length;
//   return numSwitches;
// }

// async function getOneSwitch(ip) {
//   const switch_ = await DataSwitches.findOne({ where: { ip: ip } });
//   if (switch_ !== null) {
//     return {
//       status: 200,
//       data: switch_,
//     };
//   };
//   return {
//     status: 404,
//     message: "El Switch no existe en la base de datos.",
//   };
// }

// async function createSwitch(data) {
//   try {
//     const switchDoesExist = await DataSwitches.findOne({
//       where: { ip: data.ip },
//     });
//     if (switchDoesExist === null) {
//       const newSwitch = await DataSwitches.create({
//         ip: data.ip,
//         dispositivo: data.dispositivo,
//         group: data.group
//       });
//       return {
//         status: 201,
//         message: "El Switch ha sido creado exitosamente, espere unos minutos para que el sistema actualice los datos.",
//         data: newSwitch,
//       };
//     }
//     return {
//       status: 409,
//       message: "El Switch ya existe en la base de datos.",
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function editOneSwitch(id, changes) {
//   try {
//     const switche = await DataSwitches.findByPk(id);
//     if (switche !== null) {
//       await DataSwitches.update(
//         {
//           ip: changes.ip,
//           dispositivo: changes.dispositivo,
//           group: changes.group
//         },
//         { where: { id: id } }
//       );
//       const switchUpdated = await DataSwitches.findByPk(id);
//       return {
//         status: 200,
//         message: "El Switch ha sido modificado exitosamente.",
//         data: switchUpdated,
//       };
//     }
//     return {
//       status: 404,
//       message: "El Switch no existe en la base de datos.",
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function deleteSwitch(ip) {
//   try {
//     const switch_ = await DataSwitches.findOne({ where: { ip: ip } });
//     if (switch_ !== null) {
//       await DataSwitches.destroy({ where: { id: switch_.id } });

//       const checkSwitchIsDeleted = await DataSwitches.findByPk(switch_.id);
//       if (checkSwitchIsDeleted === null) {
//         return {
//           status: 200,
//           message: "El Switch ha sido eliminado exitosamente",
//         };
//       } else {
//         throw error;
//       }
//     }
//     return {
//       status: 404,
//       message: "El Switch no existe en la base de datos",
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

module.exports = { SwitchesService };
