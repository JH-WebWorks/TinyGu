require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATA,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mariadb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: { connectTimeout: 1000, timezone: 'Etc/GMT0' }, // mariadb connector option
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
