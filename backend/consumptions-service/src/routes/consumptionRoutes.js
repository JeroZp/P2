const express = require('express');
const consumptionController = require('../controllers/consumptionController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware

const router = express.Router();

// Ruta protegida: Solo usuarios autenticados pueden crear un consumo
router.post('/', authMiddleware, consumptionController.createConsumption);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus consumos
router.get('/:userId', authMiddleware, consumptionController.getConsumptionsByUser);

module.exports = router;