const nodemailer = require("nodemailer");
const encryptDecrypt = require("./utils/encrypt-decrypt");
const {decrypt} = require("./utils/encrypt-decrypt");



// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bluebusterofficial@gmail.com", // Replace with your email
        pass: "qazshilpcidtjagl", // Replace with your app password (if using Gmail, enable App Passwords)
    },
});

exports.sendEmail = async (email) => {

    try{

        const OTP = Math.floor(100000 + Math.random() * 900000)

        const info = await transporter.sendMail({
            from: "bluebusterofficial@gmail.com",
            to: email,
            subject: "OTP for registration",
            text: `OTP is ${OTP}`
        })



        return encryptDecrypt.encrypt(OTP+"");
    }catch (error){
        console.log('Error (while sending otp)', error);
        return false
    }

}

exports.verifyOTP = async (OTP, encryptedObject) => {
    try{
        var decryptedOTP = encryptDecrypt.decrypt(encryptedObject);

        return parseInt(decryptedOTP) === parseInt(OTP)
    }catch (error){
        console.log('Error (while verifying otp)', error);
        return false
    }
}