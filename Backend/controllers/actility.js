const { DataMeshActility } = require("../models/data_mesh_actility");

async function getDataActility() {
  const data = await DataMeshActility.findAll();
  return data;
}

async function getOneActility(id) {
  const data = await DataMeshActility.findByPk(id);
  return data;
}

async function createACtility(data) {
  try {
    const dataDoesExist = await DataMeshActility.findOne({ where: { eui: data.eui } });
    if (dataDoesExist === null) {
      const newActility = await DataMeshActility.create({
        eui: data.eui,
        name: data.name,
        device: data.device,
        longitude: data.longitude || 0.0,
        latitude: data.latitude || 0.0,
      });
      return {
        status: 201,
        message: "Elemento ACTILITY creado exitosamente en Devnet, espere unos minutos para que el sistema actualice los datos.",
        data: newActility,
      };
    }
    return {
      status: 409,
      message: "El elemento ACTILITY ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editActility(id, changes) {
  try {
    const dataDoesExist = await DataMeshActility.findByPk(id);
    if (dataDoesExist !== null) {
      await DataMeshActility.update(
        {
          eui: changes.eui,
          name: changes.name,
          device: changes.device,
          longitude: changes.longitude,
          latitude: changes.latitude,
        },
        { where: { id: id } }
      );
      const actilityUpdated = await DataMeshActility.findByPk(id);
      return {
        status: 200,
        message: "Elemento ACTILITY modificado exitosamente.",
        data: actilityUpdated,
      };
    }
    return {
      status: 404,
      message: "Elemento ACTILITY no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteActility(id) {
  try {
    const data = await DataMeshActility.findOne({ where: { id: id } });
    if (data !== null) {
      await DataMeshActility.destroy({ where: { id: data.id } });

      const checkMeshIsDeleted = await DataMeshActility.findByPk(data.id);
      if (checkMeshIsDeleted === null) {
        return {
          status: 200,
          message: "Elemento ACTILITY eliminado exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "Elemento ACTILITY no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getDataActility, getOneActility, createACtility, editActility, deleteActility };
