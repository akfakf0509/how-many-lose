const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "whyyoulose",
  password: "whyyoulose",
  database: "whyyoulose",
});

module.exports = db;
