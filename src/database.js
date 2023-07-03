const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_HOST || "admin",
  password: process.env.DB_PASSWORD || "administrador",
  database: process.env.DB_NAME || "ink-seek",
  port: process.env.DB_PORT || 3306,
});

console.log("Conexión con la base de datos creada");

module.exports = {connection};