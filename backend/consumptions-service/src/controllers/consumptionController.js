const { createConsumption, getConsumptionsByUser } = require('../models/consumptionModel');

// Registrar un nuevo consumo
const addConsumption = async (req, res) => {
    const { consumptionValue, consumptionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT
    try {
        const consumption = await createConsumption(userId, consumptionValue, consumptionDate);
        res.status(201).json({ message: 'Consumo registrado', consumption });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el consumo', error: error.message });
    }
};

// Obtener todos los consumos de un usuario
const getConsumptions = async (req, res) => {
    const userId = req.user.userId; // Extraído del JWT
    try {
        const consumptions = await getConsumptionsByUser(userId);
        res.status(200).json({ consumptions });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los consumos', error: error.message });
    }
};

module.exports = { addConsumption, getConsumptions };