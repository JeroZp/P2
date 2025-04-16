const express = require('express');
const router = express.Router();
const {
    createNewOffer,
    getAllOffers,
    getMyOffers,
    updateMyOffer,
    deleteMyOffer
} = require('../controllers/offerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/', authMiddleware, createNewOffer);
router.get('/', authMiddleware, getAllOffers);
router.get('/my-offers', authMiddleware, getMyOffers);
router.put('/:id', authMiddleware, updateMyOffer);
router.delete('/:id', authMiddleware, deleteMyOffer);

module.exports = router;