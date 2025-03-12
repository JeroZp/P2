const express = require('express');
const productionRoutes = require('./routes/productionRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

// Rutas
app.use('/prod', productionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Productions Service corriendo en http://0.0.0.0:${PORT}`);
});