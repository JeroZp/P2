const {
    createOffer,
    getOffers,
    getUserOffers,
    updateOffer,
    deleteOffer,
    getOfferById
} = require('../models/offerModel');

// Crear nueva oferta
const createNewOffer = async (req, res) => {
    const { quantity, value } = req.body;
    const userId = req.user.userId;
    console.log("Create New Offer");
    try {
        // Validaciones básicas
        if (!quantity || !value) {
            return res.status(400).json({ message: 'Cantidad y valor son requeridos' });
        }

        const newOffer = await createOffer(userId, quantity, value, new Date());
        console.log("Offer created successfully");
        res.status(201).json({ message: 'Oferta creada', offer: newOffer });
    } catch (error) {
        console.error('Error al crear oferta:', error);
        res.status(500).json({ message: 'Error al crear oferta', error: error.message });
    }
};

// Obtener todas las ofertas (excepto las del usuario)
const getAllOffers = async (req, res) => {
    console.log("Get All Offers");
    try {
        const userId = req.user.userId;
        const offers = await getOffers(userId); // Excluye las del usuario
        console.log("Offers retrieved successfully");
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error al obtener ofertas:', error);
        res.status(500).json({ message: 'Error al obtener ofertas', error: error.message });
    }
};

// Obtener ofertas del usuario actual
const getMyOffers = async (req, res) => {
    console.log("Get My Offers");
    try {
        const userId = req.user.userId;
        const offers = await getUserOffers(userId);
        console.log("User offers retrieved successfully");
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error al obtener tus ofertas:', error);
        res.status(500).json({ message: 'Error al obtener tus ofertas', error: error.message });
    }
};

// Actualizar oferta
const updateMyOffer = async (req, res) => {
    console.log("Update My Offer");
    const { id } = req.params;
    const { quantity, value } = req.body;
    const userId = req.user.userId;
    try {
        // Verificar que la oferta pertenece al usuario
        const offer = await getOfferById(id);
        if (!offer || offer.userid !== userId) {
            console.log("Offer not found or unauthorized");
            return res.status(404).json({ message: 'Oferta no encontrada o no autorizada' });
        }

        const updatedOffer = await updateOffer(id, quantity, value);
        console.log("Offer updated successfully");
        res.status(200).json({ message: 'Oferta actualizada', offer: updatedOffer });
    } catch (error) {
        console.error('Error al actualizar oferta:', error);
        res.status(500).json({ message: 'Error al actualizar oferta', error: error.message });
    }
};

// Eliminar oferta
const deleteMyOffer = async (req, res) => {
    console.log("Delete My Offer");
    const { id } = req.params;
    const userId = req.user.userId;
    // Validaciones
    try {
        // Verificar que la oferta pertenece al usuario
        const offer = await getOfferById(id);
        if (!offer || offer.userid !== userId) {
            console.log("Offer not found or unauthorized");
            return res.status(404).json({ message: 'Oferta no encontrada o no autorizada' });
        }

        await deleteOffer(id);
        console.log("Offer deleted successfully");
        res.status(200).json({ message: 'Oferta eliminada' });
    } catch (error) {
        console.error('Error al eliminar oferta:', error);
        res.status(500).json({ message: 'Error al eliminar oferta', error: error.message });
    }
};

module.exports = {
    createNewOffer,
    getAllOffers,
    getMyOffers,
    updateMyOffer,
    deleteMyOffer
};