// config/smtp.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "Devnet",
  port: 587, // 465 si es SSL
  secure: false, // true si usas puerto 465
  auth: {
    user: "", // usuario SMTP
    pass: "", // contraseña SMTP
  },
  tls: {
    rejectUnauthorized: false, // evita errores con certificados autofirmados
  },
});

module.exports = transporter;
