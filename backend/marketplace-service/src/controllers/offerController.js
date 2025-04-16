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
        res.status(201).json({ message: 'Oferta creada', offer: newOffer });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear oferta', error: error.message });
    }
};

// Obtener todas las ofertas (excepto las del usuario)
const getAllOffers = async (req, res) => {
    try {
        const userId = req.user.userId;
        const offers = await getOffers(userId); // Excluye las del usuario
        console.log("Get All Offers");
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ofertas', error: error.message });
    }
};

// Obtener ofertas del usuario actual
const getMyOffers = async (req, res) => {
    try {
        const userId = req.user.userId;
        const offers = await getUserOffers(userId);
        console.log("Get My Offers");
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus ofertas', error: error.message });
    }
};

// Actualizar oferta
const updateMyOffer = async (req, res) => {
    const { id } = req.params;
    const { quantity, value } = req.body;
    const userId = req.user.userId;
    console.log("Update My Offer");
    try {
        // Verificar que la oferta pertenece al usuario
        const offer = await getOfferById(id);
        if (!offer || offer.userid !== userId) {
            return res.status(404).json({ message: 'Oferta no encontrada o no autorizada' });
        }

        const updatedOffer = await updateOffer(id, quantity, value);
        res.status(200).json({ message: 'Oferta actualizada', offer: updatedOffer });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar oferta', error: error.message });
    }
};

// Eliminar oferta
const deleteMyOffer = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    console.log("Delete My Offer");
    // Validaciones
    try {
        // Verificar que la oferta pertenece al usuario
        const offer = await getOfferById(id);
        if (!offer || offer.userid !== userId) {
            return res.status(404).json({ message: 'Oferta no encontrada o no autorizada' });
        }

        await deleteOffer(id);
        res.status(200).json({ message: 'Oferta eliminada' });
    } catch (error) {
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