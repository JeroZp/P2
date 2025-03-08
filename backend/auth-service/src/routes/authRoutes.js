const express = require('express');
const { login } = require('../controllers/authController'); //importación del login

const router = express.Router();

router.post('/login', login); // definimos la ruta de login

module.exports = router;