const db = require('../config/db');

//definir el modelo de ofertas
const createOffer = async (offerData) => {
    const { userId, quantity, value } = offerData;
    const query = `
        INSERT INTO offer (userId, quantity, value, offerDate)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [userId, quantity, value, new Date()]; // offerDate se establece como la fecha actual
    return db.one(query, values);
};

// Obtener una oferta por su ID
const getOfferById = async (offerId) => {
    const query = 'SELECT * FROM offer WHERE id = $1;';
    return db.oneOrNone(query, [offerId]);
};

// Obtener todas las ofertas disponibles
const getAllOffers = async () => {
    const query = 'SELECT * FROM offer;'; // No hay un campo "status" en la tabla, así que se listan todas
    return db.manyOrNone(query);
};

// Actualizar una oferta (por ejemplo, marcar como vendida)
const updateOffer = async (offerId, updateData) => {
    const { quantity, value } = updateData;
    const query = `
        UPDATE offer
        SET quantity = $1, value = $2
        WHERE id = $3
        RETURNING *;
    `;
    const values = [quantity, value, offerId];
    return db.one(query, values);
};

// Eliminar una oferta
const deleteOffer = async (offerId) => {
    const query = 'DELETE FROM offer WHERE id = $1 RETURNING *;';
    return db.one(query, [offerId]);
};

module.exports = {
    createOffer,
    getOfferById,
    getAllOffers,
    updateOffer,
    deleteOffer,
};