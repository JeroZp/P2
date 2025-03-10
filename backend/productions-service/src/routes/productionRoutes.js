const express = require('express');
const productionController = require('../controllers/productionController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware

const router = express.Router();

// Ruta protegida: Solo usuarios autenticados pueden crear una producción
router.post('/', authMiddleware, productionController.createProduction);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus producciones
router.get('/:userId', authMiddleware, productionController.getProductionsByUser);

module.exports = router;