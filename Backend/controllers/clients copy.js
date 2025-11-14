const { CSP, CSS, CNP, CNS, HSE, CNPB, CNSB } = require("../models/clients");
const { DataClient } = require("../models/data_clients");

async function getClients() {
  const clientCounts = await getNumberClients();

  const csp = await CSP.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCsp,
  });

  const css = await CSS.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCss,
  });

  const cnp = await CNP.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnp,
  });

  const cns = await CNS.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCns,
  });

  const hse = await HSE.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numHse,
  });

  const cnpb = await CNPB.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnpb,
  });

  const cnsb = await CNSB.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnsb,
  });

  const allClients = [];
  allClients.push(...csp);
  allClients.push(...css);
  allClients.push(...cnp);
  allClients.push(...cns);
  allClients.push(...hse);
  allClients.push(...cnpb);
  allClients.push(...cnsb);

  return allClients;
};

async function getNumberClients() {
  const clientCounts = {
    numCsp: 0,
    numCss: 0,
    numCnp: 0,
    numCns: 0,
    numHse: 0,
    numCnpb: 0,
    numCnsb: 0,
  };

  const listClients = await DataClient.findAll();

  listClients.forEach((client) => {
    if (client.group === "CSP") {
      clientCounts.numCsp++;
    } else if (client.group === "CSS") {
      clientCounts.numCss++;
    } else if (client.group === "CNP") {
      clientCounts.numCnp++;
    } else if (client.group === "CNS") {
      clientCounts.numCns++;
    } else if (client.group === "HSE") {
      clientCounts.numHse++;
    } else if (client.group === "CNPB") {
      clientCounts.numCnpb++;
    } else if (client.group === "CNSB") {
      clientCounts.numCnsb++;
    }
  });

  return clientCounts;
};

async function getOneClient(ip) {
  const client = await DataClient.findOne({ where: { ip: ip } });
  if (client !== null) {
    return {
      status: 200,
      data: client,
    };
  };
  return {
    status: 404,
    message: "El Cliente no existe en la base de datos.",
  };
}

async function createClient(data) {
  try {
    const clientDoesExist = await DataClient.findOne({
      where: { ip: data.ip },
    });
    if (clientDoesExist === null) {
      const newClient = await DataClient.create({
        ip: data.ip,
        group: data.group,
        name: data.name,
        importancia: data.importancia,
        clave: data.clave,
        description: data.description
      });
      return {
        status: 201,
        message: "El Cliente ha sido creado exitosamente, espere unos minutos para que el sistema actualice los datos.",
        data: newClient,
      };
    }
    return {
      status: 409,
      message: "El Cliente ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editOneClient(id, changes) {
  try {
    const client = await DataClient.findByPk(id);
    if (client !== null) {
      await DataClient.update(
        {
          ip: changes.ip,
          group: changes.group,
          name: changes.name,
          importancia: changes.importancia,
          clave: changes.clave,
          description: changes.description
        },
        { where: { id: id } }
      );
      const clientUpdated = await DataClient.findByPk(id);
      return {
        status: 200,
        message: "El Cliente ha sido modificado exitosamente.",
        data: clientUpdated,
      };
    }
    return {
      status: 404,
      message: "El Cliente no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteClient(ip) {
  try {
    const client = await DataClient.findOne({ where: { ip: ip } });
    if (client !== null) {
      await DataClient.destroy({ where: { id: client.id } });

      const checkClientIsDeleted = await DataClient.findByPk(client.id);
      if (checkClientIsDeleted === null) {
        return {
          status: 200,
          message: "Cliente eliminado exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "El Cliente no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getClients, createClient, editOneClient, deleteClient, getOneClient };
