const { createOffer, getOfferById, getAllOffers, updateOffer, deleteOffer } = require('../models/offerModel');

// Crear una nueva oferta
const createOfferHandler = async (req, res) => {
    const { quantity, value } = req.body;
    const userId = req.user.userId; // Obtener el ID del usuario desde el token

    try {
        const newOffer = await createOffer({ userId, quantity, value });
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la oferta', error: error.message });
    }
};

// Obtener todas las ofertas
const getAllOffersHandler = async (req, res) => {
    try {
        const offers = await getAllOffers();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ofertas', error: error.message });
    }
};

// Obtener una oferta por su ID
const getOfferByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const offer = await getOfferById(id);
        if (!offer) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la oferta', error: error.message });
    }
};

// Actualizar una oferta
const updateOfferHandler = async (req, res) => {
    const { id } = req.params;
    const { quantity, value } = req.body;

    try {
        const updatedOffer = await updateOffer(id, { quantity, value });
        res.status(200).json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la oferta', error: error.message });
    }
};

// Eliminar una oferta
const deleteOfferHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOffer = await deleteOffer(id);
        res.status(200).json(deletedOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la oferta', error: error.message });
    }
};

module.exports = {
    createOfferHandler,
    getAllOffersHandler,
    getOfferByIdHandler,
    updateOfferHandler,
    deleteOfferHandler,
};