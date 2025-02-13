const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/send-otp', authController.sendEmail);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;