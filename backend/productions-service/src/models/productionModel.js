const db = require('../config/db');

// Crear una nueva producción
const createProduction = async (userId, productionValue, productionDate) => {
  const query = `
    INSERT INTO productions (userId, productionValue, productionDate)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userId, productionValue, productionDate];
  return db.one(query, values);
};

// Obtener todas las producciones de un usuario
const getProductionsByUser = async (userId) => {
  const query = 'SELECT * FROM productions WHERE userId = $1';
  return db.manyOrNone(query, [userId]);
};

module.exports = { createProduction, getProductionsByUser };