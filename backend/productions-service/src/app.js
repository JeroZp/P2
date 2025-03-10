const express = require('express');
const productionRoutes = require('./src/routes/productionRoutes');
const { pool } = require('./src/config/db');

const app = express();
app.use(express.json());

// Rutas
app.use('/prod', productionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servicio corriendo en http://localhost:${PORT}`);
});