const express = require('express');
const { addConsumption, getConsumptions } = require('../controllers/consumptionController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para registrar un nuevo consumo (protegida por JWT)
router.post('/', authenticateToken, addConsumption);

// Ruta para obtener todos los consumos de un usuario (protegida por JWT)
router.get('/', authenticateToken, getConsumptions);

module.exports = router;