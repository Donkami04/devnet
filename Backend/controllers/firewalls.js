const { Firewalls, HistoricFirewalls } = require("../models/firewalls");
const { Op } = require("sequelize");

class FirewallsService {
  async getFirewalls() {
    try {
      const data = await Firewalls.findAll();
      return {
        statusCode: 200,
        message:
          "Información de los Canales de Internet (Firewalls) obtenido exitosamente",
        data: data,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al obtener la información de los Canales de Internet (Firewalls)"
      );
    }
  }

  async getHistoryFail(name, channel) {
    try {
      const now = new Date(); // Obtén la hora actual en la zona horaria local
      let twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Resta 24 horas a la hora actual
      // Obtenemos los componentes de la fecha y hora
      let year = twentyFourHoursAgo.getFullYear();
      let month = String(twentyFourHoursAgo.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque los meses van de 0 a 11
      let day = String(twentyFourHoursAgo.getDate()).padStart(2, "0");
      let hours = String(twentyFourHoursAgo.getHours()).padStart(2, "0");
      let minutes = String(twentyFourHoursAgo.getMinutes()).padStart(2, "0");
      let seconds = String(twentyFourHoursAgo.getSeconds()).padStart(2, "0");

      // Concatenamos los componentes en el formato deseado
      let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const historyFail = await HistoricFirewalls.findAll({
        where: {
          name: name,
          channel: channel,
          state: "dead",
          datetime: {
            [Op.gte]: formattedDate, // Obtener registros en los últimos 24 horas
          },
        },
        order: [["id", "DESC"]],
      });

      return {
        statusCode: 200,
        message: "Historial de fallas recuperado exitosamente",
        data: historyFail,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al obtener la información del HISTORICO DE FALLAS los Canales de Internet (Firewalls)"
      );
    }
  }
}

// async function getOneFirewall(ip, ubication) {
//   const firewall = await DataFirewalls.findOne({
//     where: { ip: ip, ubication: ubication },
//   });
//   if (firewall !== null) {
//     return {
//       status: 200,
//       data: firewall,
//     };
//   }
//   return {
//     status: 404,
//     message: "El Firewall - Canal de Internet no existe en la base de datos.",
//   };
// }

// async function createFirewall(data) {
//   try {
//     const newFirewall = await DataFirewalls.create({
//       name: data.name,
//       channel: data.channel,
//       ip: data.ip,
//       link: data.link,
//       vdom: data.vdom,
//       gateway: data.gateway,
//       ubication: data.ubication,
//     });
//     return {
//       status: 201,
//       message:
//         "El Firewall - Canal de Internet ha sido creado exitosamente, espere unos minutos para que el sistema actualice los datos.",
//       data: newFirewall,
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function editOneFirewall(id, changes) {
//   try {
//     const firewall = await DataFirewalls.findByPk(id);
//     if (firewall !== null) {
//       await DataFirewalls.update(
//         {
//           name: changes.name,
//           channel: changes.channel,
//           ip: changes.ip,
//           link: changes.link,
//           vdom: changes.vdom,
//           gateway: changes.gateway,
//           ubication: changes.ubication,
//         },
//         { where: { id: id } }
//       );
//       const firewallUpdated = await DataFirewalls.findByPk(id);
//       return {
//         status: 200,
//         message:
//           "El Firewall - Canal de Internet ha sido modificado exitosamente.",
//         data: firewallUpdated,
//       };
//     }
//     return {
//       status: 404,
//       message: "El Firewall - Canal de Internet no existe en la base de datos.",
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function deleteFirewall(ip, ubication) {
//   try {
//     const firewall = await DataFirewalls.findOne({
//       where: { ip: ip, ubication: ubication },
//     });
//     if (firewall !== null) {
//       await DataFirewalls.destroy({ where: { id: firewall.id } });
//       const checkFirewallIsDeleted = await DataFirewalls.findByPk(firewall.id);
//       if (checkFirewallIsDeleted === null) {
//         return {
//           status: 200,
//           message:
//             "El Firewalll - Canal de Internet ha sido eliminado exitosamente",
//         };
//       } else {
//         throw error;
//       }
//     }
//     return {
//       status: 404,
//       message: "El Firewalll - Canal de Internet no existe en la base de datos",
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

module.exports = { FirewallsService };
