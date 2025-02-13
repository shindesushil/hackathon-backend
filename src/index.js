const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const loginRoutes = require("./routes/loginRoutes");
// const authRoutes = require("./routes/authRoutes");
const authController = require("./controllers/authController");



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

app.post('/send-otp', (req, res) => {

    const {email} = req.body;

    authController.sendEmail(email).then((result) => {
        console.log('email: ', email);
        res.status(200).send({token: result});
    })

})

app.post("/verify-otp", (req, res) => {

    const {otp, encryptedData} = req.body;

    authController.verifyOTP(otp, encryptedData).then((verified) => {
        if(verified) {
            res.status(200).send({message: 'Otp verified!'});
        }else{
            res.status(401).send({message: 'Otp verification failed!'});
        }
    })

})



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
