const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('API del Proyecto P2');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

module.exports = app;