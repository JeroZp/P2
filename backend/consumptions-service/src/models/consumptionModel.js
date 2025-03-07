const db = require('../config/db');

// Crear un nuevo consumo
const createConsumption = async (userId, consumptionValue, consumptionDate) => {
  const query = `
    INSERT INTO consumptions (userId, consumptionValue, consumptionDate)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userId, consumptionValue, consumptionDate];
  return db.one(query, values);
};

// Obtener todos los consumos de un usuario
const getConsumptionsByUser = async (userId) => {
  const query = 'SELECT * FROM consumptions WHERE userId = $1';
  return db.manyOrNone(query, [userId]);
};

module.exports = { createConsumption, getConsumptionsByUser };