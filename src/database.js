const mysql = require("mysql2/promise");

<<<<<<< HEAD
const Pool = mysql.createPool({
  host: "ink-seek.c9xn6kahrfek.eu-west-3.rds.amazonaws.com",
  user: "admin",
  password: "administrador",
  database: "in-seek",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0
=======
const connection = mysql.createPool({
  host: process.env.DB_HOST || "ink-seek.c9xn6kahrfek.eu-west-3.rds.amazonaws.com",
  user: process.env.DB_HOST || "admin",
  password: process.env.DB_PASSWORD || "administrador",
  database: process.env.DB_NAME || "in-seek",
  port: process.env.DB_PORT || 3306,
>>>>>>> tienda
});

console.log("Conexión con la base de datos creada");

module.exports = {Pool};