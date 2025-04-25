const {
    createPurchase,
    getPurchasesByBuyer,
    getSalesBySeller,
    getContractById,
    updateContractStatus
} = require('../models/purchaseModel');
const { getOfferById } = require('../models/offerModel');

// Comprar una oferta
const purchaseOffer = async (req, res) => {
    const { id: offerId } = req.params;
    const buyerId = req.user.userId;

    try {
        // Obtener la oferta
        const offer = await getOfferById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }

        // Verificar que no sea el propio usuario
        if (offer.userid === buyerId) {
            return res.status(400).json({ message: 'No puedes comprar tu propia oferta' });
        }

        // Verificar que la oferta esté disponible
        if (offer.quantity <= 0) {
            return res.status(400).json({ message: 'La oferta no tiene cantidad disponible' });
        }

        // Crear el contrato/compra con la cantidad total de la oferta
        const purchase = await createPurchase(
            buyerId,
            offerId,
            offer.quantity,
            offer.value
        );

        res.status(201).json({
            message: 'Compra realizada con éxito',
            purchase,
            remainingOffer: offer // Opcional: devolver la oferta actualizada
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al procesar la compra',
            error: error.message
        });
    }
};

// Obtener mis compras
const getMyPurchases = async (req, res) => {
    try {
        const userId = req.user.userId;
        const purchases = await getPurchasesByBuyer(userId);
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus compras', error: error.message });
    }
};

// Obtener mis ventas
const getMySales = async (req, res) => {
    try {
        const userId = req.user.userId;
        const sales = await getSalesBySeller(userId);
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus ventas', error: error.message });
    }
};

// Actualizar estado de contrato (para admin o partes involucradas)
const updateContract = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    try {
        // Verificar que el usuario tenga permisos (comprador o vendedor)
        const contract = await getContractById(id);
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        // Obtener la oferta relacionada para verificar el vendedor
        const offer = await getOfferById(contract.offer_id);

        // Verificar que el usuario sea el comprador o el vendedor
        if (contract.buyer_id !== userId && offer.userid !== userId) {
            return res.status(403).json({ message: 'No autorizado para actualizar este contrato' });
        }

        const updatedContract = await updateContractStatus(id, status);
        res.status(200).json({ message: 'Estado del contrato actualizado', contract: updatedContract });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el contrato', error: error.message });
    }
};

module.exports = {
    purchaseOffer,
    getMyPurchases,
    getMySales,
    updateContract
};