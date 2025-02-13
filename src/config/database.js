const { Sequelize } = require("sequelize");

require('dotenv').config();

const sequelize = new Sequelize(
  'blue',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully!");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  })();

module.exports = sequelize;
