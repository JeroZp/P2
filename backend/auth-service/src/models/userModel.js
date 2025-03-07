const db = require('../config/db');

const createUser = async (names, surnames, email, passwordHash, userType, cedulaOrNit) => {
  const query = `
    INSERT INTO users (names, surnames, email, passwordHash, userType, cedulaOrNit)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, userType;
  `;
  const values = [names, surnames, email, passwordHash, userType, cedulaOrNit];
  return db.one(query, values);
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  return db.oneOrNone(query, [email]);
};

module.exports = { createUser, findUserByEmail };