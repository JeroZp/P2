const express = require('express');
const productionController = require('../controllers/productionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta protegida: Solo usuarios autenticados pueden crear una producción
router.post('/', authMiddleware, productionController.addProduction);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus producciones
router.get('/', authMiddleware, productionController.getProductions);

// Ruta protegida: Solo usuarios autenticados pueden obtener sus producciones ordenadas
router.get('/ordered', authMiddleware, productionController.getProductionsOrdered);

module.exports = router;