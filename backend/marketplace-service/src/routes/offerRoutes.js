const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const {
    createOfferHandler,
    getAllOffersHandler,
    getOfferByIdHandler,
    updateOfferHandler,
    deleteOfferHandler,
} = require('../controllers/offerController');

// Crear una nueva oferta (protegida por autenticación)
router.post('/offers', authenticateToken, createOfferHandler);

// Obtener todas las ofertas
router.get('/offers', getAllOffersHandler);

// Obtener una oferta por su ID
router.get('/offers/:id', getOfferByIdHandler);

// Actualizar una oferta (protegida por autenticación)
router.put('/offers/:id', authenticateToken, updateOfferHandler);

// Eliminar una oferta (protegida por autenticación)
router.delete('/offers/:id', authenticateToken, deleteOfferHandler);

module.exports = router;