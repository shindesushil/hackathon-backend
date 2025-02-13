const nodemailer = require("nodemailer");
const encryptDecrypt = require("./utils/encrypt-decrypt");
const {decrypt} = require("./utils/encrypt-decrypt");
const {OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED} = require("../constants/errorCode");



// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bluebusterofficial@gmail.com", // Replace with your email
        pass: "qazshilpcidtjagl", // Replace with your app password (if using Gmail, enable App Passwords)
    },
});

exports.sendEmail = async (req, res) => {

    try{

        const {email} = req.body;

        const OTP = Math.floor(100000 + Math.random() * 900000)

        const info = await transporter.sendMail({
            from: "bluebusterofficial@gmail.com",
            to: email,
            subject: "OTP for registration",
            text: `OTP is ${OTP}`
        })

        const response = encryptDecrypt.encrypt(OTP+"");

        return res.status(200).send({status:OK, message:"OTP sent successfully", token:response});
    }catch (error){
        console.log('Error (while sending otp)', error);
        return res.status(200).send({status:INTERNAL_SERVER_ERROR, message:"Something went wrong"});
    }

}

exports.verifyOTP = async (req, res) => {
    try{

        const {otp, encryptedData} = req.body;

        var decryptedOTP = encryptDecrypt.decrypt(encryptedData);

        if(parseInt(decryptedOTP) === parseInt(otp)){
            return res.status(200).send({status:OK, message:"OTP verified"});
        }else{
            return res.status(200).send({status:UNAUTHORIZED, message:"INVALID OTP"});
        }
    }catch (error){
        console.log('Error (while verifying otp)', error);
        return res.status(200).send({status:INTERNAL_SERVER_ERROR, message:"Something went wrong"});
    }
}