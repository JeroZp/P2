const express = require('express');
const { addProduction, getProductions } = require('../controllers/productionController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para registrar una nueva producción (protegida por JWT)
router.post('/', authenticateToken, addProduction);

// Ruta para obtener todas las producciones de un usuario (protegida por JWT)
router.get('/', authenticateToken, getProductions);

module.exports = router;