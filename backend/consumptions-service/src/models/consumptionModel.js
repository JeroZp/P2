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

// Obtener el total de consumos del mes anterior
const getPreviousMonthConsumptions = async (userId) => {
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  const query = `
        SELECT SUM(consumptionValue) as total
        FROM consumptions
        WHERE userId = $1 AND DATE_TRUNC('month', consumptionDate) = DATE_TRUNC('month', $2::timestamp)
    `;
  const values = [userId, previousMonth];

  const result = await db.oneOrNone(query, values);
  return result ? parseFloat(result.total) : 0;
};

module.exports = { createConsumption, getConsumptionsByUser, getPreviousMonthConsumptions };