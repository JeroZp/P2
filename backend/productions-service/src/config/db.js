const pgp = require('pg-promise')();

// Configuración de la conexión
const connectionString = process.env.DATABASE_URL || 'postgresql://p2_database:1U6FnwcIdL4WiqCglheHUA4SMvdDgymR@dpg-cv38jbbtq21c73bh1b5g-a.oregon-postgres.render.com/p2';
const db = pgp({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Necesario para Render
});

module.exports = db;