const express = require('express');
const router = express.Router();
const {
    purchaseOffer,
    getMyPurchases,
    getMySales,
    updateContract
} = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/:id/purchase', authMiddleware, purchaseOffer);
router.get('/my-purchases', authMiddleware, getMyPurchases);
router.get('/my-sales', authMiddleware, getMySales);
router.put('/contracts/:id', authMiddleware, updateContract); // Opcional si necesitas actualizar contratos

module.exports = router;