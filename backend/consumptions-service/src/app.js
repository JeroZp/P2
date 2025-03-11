const express = require('express');
const consumptionRoutes = require('./src/routes/consumptionRoutes');
const { pool } = require('./src/config/db');

const app = express();
app.use(express.json());

// Rutas
app.use('/cons', consumptionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});