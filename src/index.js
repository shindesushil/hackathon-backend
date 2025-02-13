
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const loginRoutes = require("./routes/loginRoutes");
// const authRoutes = require("./routes/authRoutes");



require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/bluebuster-api/api", loginRoutes);


sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
 