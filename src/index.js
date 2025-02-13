const express = require("express");
const authController = require("./controllers/authController");
const app = express();

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
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
