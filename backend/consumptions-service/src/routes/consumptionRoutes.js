const express = require('express');
const consumptionController = require('../controllers/consumptionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta protegida: Solo usuarios autenticados pueden crear un consumo
router.post('/', authMiddleware, consumptionController.addConsumption);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus consumos
router.get('/', authMiddleware, consumptionController.getConsumptions);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus consumos
router.get('/ordered', authMiddleware, consumptionController.getConsumptionsOrdered);

module.exports = router;