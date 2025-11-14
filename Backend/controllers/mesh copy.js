const { Mesh } = require("../models/mesh");
const { DataMesh } = require("../models/data_mesh");

async function getMesh() {
  const numMesh = await getNumberMesh();

  const mesh = await Mesh.findAll({
    order: [["id", "DESC"]],
    limit: numMesh,
  });
  return mesh;
}

async function getNumberMesh() {
  const listMesh = await DataMesh.findAll();
  const numMesh = listMesh.length;
  return numMesh;
}

async function getOneMesh(ip) {
  const mesh = await DataMesh.findOne({ where: { ip: ip } });
  if (mesh !== null) {
    return {
      status: 200,
      data: mesh,
    };
  }
  return {
    status: 404,
    message: "El Dispositivo MESH no existe en la base de datos.",
  };
}

async function createMesh(data) {
  try {
    const meshDoesExist = await DataMesh.findOne({ where: { ip: data.ip } });
    if (meshDoesExist === null) {
      const newMesh = await DataMesh.create({
        ip: data.ip,
        device: data.device,
        eqmt: data.eqmt,
      });
      return {
        status: 201,
        message: "Elemento MESH creado exitosamente, espere unos minutos para que el sistema actualice los datos.",
        data: newMesh,
      };
    }
    return {
      status: 409,
      message: "El elemento MESH ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editOneMesh(id, changes) {
  try {
    const mesh = await DataMesh.findByPk(id);
    if (mesh !== null) {
      await DataMesh.update(
        {
          ip: changes.ip,
          device: changes.device,
          eqmt: changes.eqmt,
        },
        { where: { id: id } }
      );
      const meshUpdated = await DataMesh.findByPk(id);
      return {
        status: 200,
        message: "Elemento MESH modificado exitosamente.",
        data: meshUpdated,
      };
    }
    return {
      status: 404,
      message: "Elemento MESH no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteMesh(ip) {
  try {
    const mesh = await DataMesh.findOne({ where: { ip: ip } });
    if (mesh !== null) {
      await DataMesh.destroy({ where: { id: mesh.id } });

      const checkMeshIsDeleted = await DataMesh.findByPk(mesh.id);
      if (checkMeshIsDeleted === null) {
        return {
          status: 200,
          message: "Elemento MESH eliminado exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "Elemento MESH no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getMesh, createMesh, editOneMesh, deleteMesh, getOneMesh };
