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

// Obtener el total de producciones del mes anterior
const getPreviousMonthProductions = async (userId) => {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  const query = `
        SELECT SUM(productionValue) as total
        FROM productions
        WHERE userId = $1 AND DATE_TRUNC('month', productionDate) = DATE_TRUNC('month', $2::timestamp)
    `;
  const values = [userId, previousMonth];

  const result = await db.oneOrNone(query, values);
  return result ? parseFloat(result.total) : 0;
};

module.exports = { createProduction, getProductionsByUser, getPreviousMonthProductions };