import { getClients, getClientsDesaladora } from "../utils/Api-candelaria/api";

export const useCountDcsClients = async () => {
  try {
    let candelariaUpClients = 0;
    let candelariaDownClients = 0;

    let desaladoraUpClients = 0;
    let desaladoraDownClients = 0;

    const dataCandelaria = await getClients();
    const dataDesaladora = await getClientsDesaladora();

    {
      dataCandelaria.data.forEach((client) => {
        if (client.status_prtg.toLowerCase().includes("up")) {
          candelariaUpClients++;
        }
        if (client.status_prtg.toLowerCase().includes("down")) {
          candelariaDownClients++;
        }
      });

      dataDesaladora.data.forEach((client) => {
        if (client.status_prtg.toLowerCase().includes("up")) {
          desaladoraUpClients++;
        }
        if (client.status_prtg.toLowerCase().includes("down")) {
          desaladoraDownClients++;
        }
      });

      const response = {
        candelariaUpClients,
        candelariaDownClients,
        candelariaTotalClients: candelariaUpClients + candelariaDownClients,
        desaladoraUpClients,
        desaladoraDownClients,
        desaladoraTotalClients: desaladoraUpClients + desaladoraDownClients,
      };
      return response;
    }
  } catch (error) {
    const errorResponse = {
      candelariaUpClients: 0,
      candelariaDownClients: 0,
      candelariaTotalClients: 0,
      desaladoraUpClients: 0,
      desaladoraDownClients: 0,
      desaladoraTotalClients: 0,
    };
    return errorResponse;
  }
};
// const useCountDcsClients = async (ubication) => {
//   try {
//     let upClients = 0;
//     let downClients = 0;

//     ubication === "candelaria"

//     const request = await getClientsDesaladora();

//     if (request.statusCode === 200) {
//       request.data.forEach((client) => {
//         if (client.status.toLowerCase().includes("up")) {
//           upClients++;
//         }
//         if (client.status.toLowerCase().includes("down")) {
//           downClients++;
//         }
//       });
//     }

//     const response = {
//         upClients,
//         downClients,
//         totalClients: upClients + downClients,
//     }

//   } catch (error) {}
// };
