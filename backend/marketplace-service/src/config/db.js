const pgp = require('pg-promise')();

// Configuración de la conexión
const connectionString = process.env.DATABASE_URL || 'postgresql://p2_user:WSOxsdEldKqCP94BlMMQ8Xclae0URupD@dpg-d0d4cjruibrs73dte8n0-a.oregon-postgres.render.com/p2_database_rptx';

const db = pgp({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Necesario para Render
});

module.exports = db;