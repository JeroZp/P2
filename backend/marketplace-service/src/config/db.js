const pgp = require('pg-promise')();

// Configuración de la conexión
const connectionString = process.env.DATABASE_URL || 'postgresql://p2_user:60OjO7dSZTjPI5Ms1NRMQpOlXHOBIWbk@dpg-cvob00juibrs73bn7f00-a.oregon-postgres.render.com/p2_database';

const db = pgp({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Necesario para Render
});

module.exports = db;