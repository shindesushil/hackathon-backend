const express = require('express');
const router = express.Router();
const assesmentController = require('../controllers/assesmentController');


router.post('/asses-test', assesmentController.assesTest);
// router.post('/verify-otp', authController.verifyOTP);

module.exports = router;