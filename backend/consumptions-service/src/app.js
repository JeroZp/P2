const express = require('express');
const consumptionRoutes = require('./routes/consumptionRoutes');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());

// Rutas
app.use('/cons', consumptionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Consumptions Service corriendo en http://0.0.0.0:${PORT}`);
});