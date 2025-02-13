const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapistsController');


router.get('/getAllTherapists', therapistsController.getAllTherapists);
router.get('/getUserById/:id', therapistsController.getUserById );
router.post('/therapistsSpecialization', therapistsController.getTherapistsBySpecialization );


module.exports = router;