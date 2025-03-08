const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Cambia según el microservicio
const { pool } = require('./config/db');

const app = express();
app.use(express.json());

// Rutas
app.use('/auth', authRoutes); // Cambia según el microservicio

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servicio corriendo en http://localhost:${PORT}`);
});