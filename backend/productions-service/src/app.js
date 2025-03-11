const express = require('express');
const productionRoutes = require('./src/routes/productionRoutes');
const { pool } = require('./src/config/db');

const app = express();
app.use(express.json());

// Rutas
app.use('/prod', productionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});