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


// const mysql = require('mysql2');
// Create a connection to the database
// const db = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root', 
//   password: '', 
//   database: 'blue',
// });
// Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });
// module.exports = db;