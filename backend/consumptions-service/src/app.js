const express = require('express');
const consumptionRoutes = require('./src/routes/consumptionRoutes');
const { pool } = require('./src/config/db');

const app = express();
app.use(express.json());

// Rutas
app.use('/cons', consumptionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servicio corriendo en http://localhost:${PORT}`);
});