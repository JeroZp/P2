const express = require('express');
const router = express.Router();
const {
    purchaseOffer,
    getMyPurchases,
    getMySales,
    updateContract,
} = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path'); //new
const fs = require('fs'); //new
const { getContractById } = require('../models/purchaseModel');
const { getOfferById } = require('../models/offerModel'); //new

// Rutas protegidas
router.post('/:id/purchase', authMiddleware, purchaseOffer);
router.get('/my-purchases', authMiddleware, getMyPurchases);
router.get('/my-sales', authMiddleware, getMySales);
router.put('/contracts/:id', authMiddleware, updateContract); // Opcional si necesitas actualizar contratos
router.get('/contracts/:id/download', authMiddleware, async (req, res) => {
    try {
        const contractId = req.params.id;
        const userId = req.user.userId;

        // Verificar que el usuario tiene acceso a este contrato
        const contract = await getContractById(contractId);
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        const offer = await getOfferById(contract.offer_id);
        if (contract.buyer_id !== userId && offer.userid !== userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        if (!contract.contract_pdf_path) {
            return res.status(404).json({ message: 'Documento de contrato no generado aún' });
        }

        const filePath = path.join(__dirname, '../../contracts', contract.contract_pdf_path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Documento de contrato no encontrado' });
        }

        res.download(filePath, `contrato_energia_${contractId}.pdf`);
    } catch (error) {
        res.status(500).json({ message: 'Error al descargar contrato', error: error.message });
    }
});

module.exports = router;