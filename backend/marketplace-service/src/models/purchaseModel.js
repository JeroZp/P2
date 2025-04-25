const db = require('../config/db');

// Crear nueva compra/contrato
const createPurchase = async (buyerId, offerId, quantity, agreedPrice) => {
  const query = `
        INSERT INTO energy_contracts (buyer_id, offer_id, quantity, agreed_price, status)
        VALUES ($1, $2, $3, $4, 'Pending')
        RETURNING *;
    `;
  return db.one(query, [buyerId, offerId, quantity, agreedPrice]);
};

// Obtener compras del usuario (como comprador)
const getPurchasesByBuyer = async (buyerId) => {
  const query = `
        SELECT ec.*, o.userId as seller_id, u.names as seller_names, u.surnames as seller_surnames
        FROM energy_contracts ec
        JOIN offer o ON ec.offer_id = o.id
        JOIN users u ON o.userId = u.id
        WHERE ec.buyer_id = $1
        ORDER BY ec.created_at DESC;
    `;
  return db.manyOrNone(query, [buyerId]);
};

// Obtener ventas del usuario (como vendedor)
const getSalesBySeller = async (sellerId) => {
  const query = `
        SELECT ec.*, u.names as buyer_names, u.surnames as buyer_surnames
        FROM energy_contracts ec
        JOIN offer o ON ec.offer_id = o.id
        JOIN users u ON ec.buyer_id = u.id
        WHERE o.userId = $1
        ORDER BY ec.created_at DESC;
    `;
  return db.manyOrNone(query, [sellerId]);
};

// Obtener contrato por ID
const getContractById = async (id) => {
  return db.oneOrNone('SELECT * FROM energy_contracts WHERE id = $1', [id]);
};

// Actualizar estado del contrato
const updateContractStatus = async (id, status) => {
  const query = `
        UPDATE energy_contracts
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
  return db.one(query, [status, id]);
};

module.exports = {
  createPurchase,
  getPurchasesByBuyer,
  getSalesBySeller,
  getContractById,
  updateContractStatus
};