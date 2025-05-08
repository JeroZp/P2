const db = require('../config/db');

const findUserByEmail = async (email) => {
  const query = 'SELECT id, email, userType, passwordHash FROM users WHERE email = $1';
  try {
    return await db.oneOrNone(query, [email]);
  } catch (error) {
    console.error('Error en findUserByEmail:', error);
    throw new Error('Error al buscar el usuario en la base de datos');
  }
};

const createUser = async (names, surnames, email, passwordHash, userType, cedulaOrNit) => {
  const query = `
    INSERT INTO users (names, surnames, email, passwordHash, userType, cedulaOrNit)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, userType;
  `;
  const values = [names, surnames, email, passwordHash, userType, cedulaOrNit];
  return db.one(query, values);
};

const updateUserEmail = async (userId, newEmail) => {
  const query = `
    UPDATE users 
    SET email = $1, updatedAt = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id, email, userType;
  `;
  try {
    return await db.one(query, [newEmail, userId]);
  } catch (error) {
    console.error('Error en updateUserEmail:', error);
    throw new Error('Error al actualizar el email en la base de datos');
  }
};

module.exports = { findUserByEmail, createUser, updateUserEmail };