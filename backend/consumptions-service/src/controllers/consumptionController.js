const { createConsumption, getConsumptionsByUser, getPreviousMonthConsumptions } = require('../models/consumptionModel');

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

// Obtener todos los consumos de un usuario y calcular los valores necesarios
const getConsumptions = async (req, res) => {
    const userId = req.user.userId; // Extraído del JWT

    try {
        const consumptions = await getConsumptionsByUser(userId);

        // Calcular los valores necesarios
        const totalActual = consumptions.reduce((sum, cons) => sum + parseFloat(cons.consumptionvalue), 0).toFixed(2);
        const totalAnterior = await getPreviousMonthConsumptions(userId); // Obtener el total del mes anterior
        const promedioDiario = (totalActual / 30).toFixed(2); // Suponiendo 30 días en el mes
        const promedioMensual = totalActual;
        const promedioHora = (totalActual / 720).toFixed(2); // Suponiendo 720 horas en el mes

        // Enviar los datos transformados al frontend
        res.status(200).json({
            totalActual: `${totalActual} Wh`,
            totalAnterior: `${totalAnterior} Wh`,
            promedioDiario: `${promedioDiario} Wh`,
            promedioMensual: `${promedioMensual} Wh`,
            promedioHora: `${promedioHora} Wh`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los consumos', error: error.message });
    }
};

module.exports = { addConsumption, getConsumptions };