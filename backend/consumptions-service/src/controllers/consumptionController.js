const { createConsumption, getConsumptionsByUser, getPreviousMonthConsumptions, getConsumptionsByUserOrdered } = require('../models/consumptionModel');

// Registrar un nuevo consumo
const addConsumption = async (req, res) => {
    console.log("add consumption");
    const { consumptionValue, consumptionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT

    try {
        const consumption = await createConsumption(userId, consumptionValue, consumptionDate);
        console.log("consumption created successfully");
        res.status(201).json({ message: 'Consumo registrado', consumption });
    } catch (error) {
        console.error('Error al registrar el consumo:', error);
        res.status(500).json({ message: 'Error al registrar el consumo', error: error.message });
    }
};

// Obtener todos los consumos de un usuario y calcular los valores necesarios
const getConsumptions = async (req, res) => {
    const userId = req.user.userId; // Extraído del JWT
    console.log("get consumptions");
    try {
        const consumptions = await getConsumptionsByUser(userId);

        // Calcular los valores necesarios
        const totalActual = consumptions.reduce((sum, cons) => sum + parseFloat(cons.consumptionvalue), 0).toFixed(2);
        const totalAnterior = await getPreviousMonthConsumptions(userId); // Obtener el total del mes anterior
        const daysInMonth = new Date().getDate();
        const horasEnMes = daysInMonth * 24;
        const promedioDiario = (totalActual / daysInMonth).toFixed(2);
        const promedioMensual = totalActual;
        const promedioHora = (totalActual / horasEnMes).toFixed(2);

        console.log("get consumptions successfully");
        // Enviar los datos transformados al frontend
        res.status(200).json({
            totalActual: `${totalActual} Wh`,
            totalAnterior: `${totalAnterior} Wh`,
            promedioDiario: `${promedioDiario} Wh`,
            promedioMensual: `${promedioMensual} Wh`,
            promedioHora: `${promedioHora} Wh`,
        });
    } catch (error) {
        console.error('Error al obtener los consumos:', error);
        res.status(500).json({ message: 'Error al obtener los consumos', error: error.message });
    }
};

const getConsumptionsOrdered = async (req, res) => {
    const userId = req.user.userId;
    console.log("get consumptions ordered");
    try {
        const consumptions = await getConsumptionsByUserOrdered(userId);
        console.log("get consumptions ordered successfully");
        res.status(200).json(consumptions);
    } catch (error) {
        console.error('Error al obtener los consumos ordenados:', error);
        res.status(500).json({
            message: 'Error al obtener los consumos ordenados',
            error: error.message
        });
    }
};

module.exports = { addConsumption, getConsumptions, getConsumptionsOrdered };