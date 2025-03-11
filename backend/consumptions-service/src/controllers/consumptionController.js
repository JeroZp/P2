const { createConsumption, getConsumptionsByUser } = require('../models/consumptionModel');

// Registrar un nuevo consumo
const addConsumption = async (req, res) => {
    const { consumptionValue, consumptionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT

    if (!consumptionValue || !consumptionDate) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

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
        if (consumptions.length === 0) {
            return res.status(404).json({ message: 'No se encontraron consumos para este usuario' });
        }
        res.status(200).json({ consumptions });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los consumos', error: error.message });
    }
};

module.exports = { addConsumption, getConsumptions };