const express = require('express');
const cors = require('cors');
const offerRoutes = require('./routes/offerRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/marketplace', offerRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Marketplace Service running on http://0.0.0.0:${PORT}`);
});