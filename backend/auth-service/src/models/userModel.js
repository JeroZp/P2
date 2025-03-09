const db = require('../config/db');

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  try {
    return await db.oneOrNone(query, [email]);
  } catch (error) {
    console.error('Error en findUserByEmail:', error);
    throw new Error('Error al buscar el usuario en la base de datos');
  }
};

module.exports = { findUserByEmail }; 