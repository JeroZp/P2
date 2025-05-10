const {
    createPurchase,
    getPurchasesByBuyer,
    getSalesBySeller,
    getContractById,
    updateContractStatus
} = require('../models/purchaseModel');
const { getOfferById } = require('../models/offerModel');
const { generateAndSaveContract } = require('../services/contractService');

// Comprar una oferta
const purchaseOffer = async (req, res) => {
    console.log("Purchase offer");
    const { id: offerId } = req.params;
    const buyerId = req.user.userId;

    try {
        // Obtener la oferta
        const offer = await getOfferById(offerId);
        if (!offer) {
            console.log("Offer not found");
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }

        if (offer.userid === buyerId) {
            console.log("Cannot buy own offer");
            return res.status(400).json({ message: 'No puedes comprar tu propia oferta' });
        }

        if (offer.quantity <= 0) {
            console.log("Offer has no available quantity");
            return res.status(400).json({ message: 'La oferta no tiene cantidad disponible' });
        }

        // Crear el contrato/compra
        const purchase = await createPurchase(
            buyerId,
            offerId,
            offer.quantity,
            offer.value
        );

        // Generar el contrato PDF (asíncrono, no bloqueante)
        generateAndSaveContract(purchase.id)
            .then(() => console.log(`Contract PDF generated for purchase ${purchase.id}`))
            .catch(err => console.error('Error generating contract PDF:', err));
        console.log("Purchase created successfully");
        res.status(201).json({
            message: 'Compra realizada con éxito',
            purchase
        });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({
            message: 'Error al procesar la compra',
            error: error.message
        });
    }
};

// Obtener mis compras
const getMyPurchases = async (req, res) => {
    console.log("Get my purchases");
    try {
        const userId = req.user.userId;
        const purchases = await getPurchasesByBuyer(userId);
        console.log("Purchases retrieved successfully");
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener tus compras:', error);
        res.status(500).json({ message: 'Error al obtener tus compras', error: error.message });
    }
};

// Obtener mis ventas
const getMySales = async (req, res) => {
    console.log("Get my sales");
    try {
        const userId = req.user.userId;
        const sales = await getSalesBySeller(userId);
        console.log("Sales retrieved successfully");
        res.status(200).json(sales);
    } catch (error) {
        console.error('Error al obtener tus ventas:', error);
        res.status(500).json({ message: 'Error al obtener tus ventas', error: error.message });
    }
};

// Actualizar estado de contrato (para admin o partes involucradas)
const updateContract = async (req, res) => {
    console.log("Update contract status");
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;
    try {
        // Verificar que el usuario tenga permisos (comprador o vendedor)
        const contract = await getContractById(id);
        if (!contract) {
            console.log("Contract not found");
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        // Obtener la oferta relacionada para verificar el vendedor
        const offer = await getOfferById(contract.offer_id);

        // Verificar que el usuario sea el comprador o el vendedor
        if (contract.buyer_id !== userId && offer.userid !== userId) {
            console.log("Unauthorized to update this contract");
            return res.status(403).json({ message: 'No autorizado para actualizar este contrato' });
        }

        const updatedContract = await updateContractStatus(id, status);
        console.log("Contract status updated successfully");
        res.status(200).json({ message: 'Estado del contrato actualizado', contract: updatedContract });
    } catch (error) {
        console.error('Error al actualizar el contrato:', error);
        res.status(500).json({ message: 'Error al actualizar el contrato', error: error.message });
    }
};

module.exports = {
    purchaseOffer,
    getMyPurchases,
    getMySales,
    updateContract
};