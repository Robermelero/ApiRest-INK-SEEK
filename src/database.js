const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_HOST || "ink-seek.c9xn6kahrfek.eu-west-3.rds.amazonaws.com",
  user: process.env.DB_HOST || "admin",
  password: process.env.DB_PASSWORD || "administrador",
  database: process.env.DB_NAME || "in-seek",
  port: process.env.DB_PORT || 3306,
});

console.log("Conexión con la base de datos creada");

module.exports = {connection};