const bcrypt = require("bcrypt");
const { Users } = require("../models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');


async function getUser(email, password) {
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return { status: 401, message: "Email o password incorrecto" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: "Email o password incorrecto" };
    }
    delete user.dataValues.password;
    return { status: 200, message: "Inicio de sesión exitoso", data: user };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function signToken(user) {
  const payload = {
    rol: user.rol
  };
  const token = jwt.sign(payload, SECRET);
  return {
    token,
  };
}

module.exports = { getUser, signToken };
