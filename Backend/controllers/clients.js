const { Candelaria_Clients, Desaladora_Clients } = require("../models/clients");

class ClientService {
  async getClients() {
    try {
      const data = await Candelaria_Clients.findAll();
      return {
        statusCode: 200,
        message: "Información de los clientes obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de los Clientes");
    }
  }

  async getDesaladoraClients() {
    try {
      const data = await Desaladora_Clients.findAll();
      return {
        statusCode: 200,
        message: "Información de los clientes de la desaladora obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de los Clientes de la desaladora");
    }
  }
}

module.exports = { ClientService };
