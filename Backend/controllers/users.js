const { Users } = require("../models/users");
const { v4: uuidGenerator } = require('uuid');
const bcrypt = require('bcrypt');


async function getUsers() {
  const users = await Users.findAll();
  return users;
}

async function createUser(data) {
  try {
    const userDoesExist = await Users.findOne({
      where: { email: data.email },
    });
    if (!userDoesExist) {
      const idUser = uuidGenerator();
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await Users.create({
        id: idUser,
        email: data.email,
        name: data.name,
        password: hashedPassword,
        rol: data.rol,
      });

      const dataNewUser = { ...newUser.get({ plain: true }) };
      delete dataNewUser.id;
      delete dataNewUser.password;

      return {
        status: 201,
        message: "El Usuario ha sido creado.",
        data: dataNewUser,
      };
    }
    return {
      status: 409,
      message: "El Usuario ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}



async function editOneUser(id, changes) {
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await Users.update(
        {
          email: changes.email,
          name: changes.name,
          rol: changes.rol,
        },
        { where: { id: id } }
      );
      let userUpdated = await Users.findByPk(id);
      userUpdated = { ...userUpdated.get({ plain: true }) };
      delete userUpdated.id;
      delete userUpdated.password;
      return {
        status: 200,
        message: "El Usuario ha sido modificado exitosamente.",
        data: userUpdated,
      };
    }
    return {
      status: 404,
      message: "El Usuario no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await Users.findOne({ where: { id: id } });
    if (user) {
      await Users.destroy({ where: { id: user.id } });
      const checkUserIsDeleted = await Users.findByPk(user.id);
      if (checkUserIsDeleted === null) {
        return {
          status: 200,
          message: "El Usuario ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "El Usuario no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getUsers, createUser, editOneUser, deleteUser };
