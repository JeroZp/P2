const { createProduction, getProductionsByUser } = require('../models/productionModel');

// Registrar una nueva producción
const addProduction = async (req, res) => {
    const { productionValue, productionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT

    if (!productionValue || !productionDate) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const production = await createProduction(userId, productionValue, productionDate);
        res.status(201).json({ message: 'Producción registrada', production });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la producción', error: error.message });
    }
};

// Obtener todas las producciones de un usuario
const getProductions = async (req, res) => {
    const userId = req.user.userId; // Extraído del JWT

    try {
        const productions = await getProductionsByUser(userId);
        if (productions.length === 0) {
            return res.status(404).json({ message: 'No se encontraron producciones para este usuario' });
        }
        res.status(200).json({ productions });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las producciones', error: error.message });
    }
};

module.exports = { addProduction, getProductions };