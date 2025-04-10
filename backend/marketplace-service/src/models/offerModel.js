const db = require('../config/db');

// Crear nueva oferta
const createOffer = async (userId, quantity, value, offerDate) => {
    const query = `
    INSERT INTO offer (userId, quantity, value, offerDate)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    return db.one(query, [userId, quantity, value, offerDate]);
};

// Obtener todas las ofertas (excepto las del usuario)
const getOffers = async (excludeUserId) => {
    const query = `
    SELECT o.*, u.names, u.surnames, u.userType 
    FROM offer o
    JOIN users u ON o.userId = u.id
    WHERE o.userId != $1
    ORDER BY o.offerDate DESC;
  `;
    return db.manyOrNone(query, [excludeUserId]);
};

// Obtener ofertas de un usuario
const getUserOffers = async (userId) => {
    const query = 'SELECT * FROM offer WHERE userId = $1 ORDER BY offerDate DESC';
    return db.manyOrNone(query, [userId]);
};

// Obtener oferta por ID
const getOfferById = async (id) => {
    return db.oneOrNone('SELECT * FROM offer WHERE id = $1', [id]);
};

// Actualizar oferta
const updateOffer = async (id, quantity, value) => {
    const query = `
    UPDATE offer
    SET quantity = $1, value = $2
    WHERE id = $3
    RETURNING *;
  `;
    return db.one(query, [quantity, value, id]);
};

// Eliminar oferta
const deleteOffer = async (id) => {
    return db.none('DELETE FROM offer WHERE id = $1', [id]);
};

module.exports = {
    createOffer,
    getOffers,
    getUserOffers,
    getOfferById,
    updateOffer,
    deleteOffer
};