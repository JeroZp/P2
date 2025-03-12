const { createProduction, getProductionsByUser, getPreviousMonthProductions } = require('../models/productionModel');

// Registrar una nueva producción
const addProduction = async (req, res) => {
    const { productionValue, productionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT

    try {
        const production = await createProduction(userId, productionValue, productionDate);
        res.status(201).json({ message: 'Producción registrada', production });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la producción', error: error.message });
    }
};

// Obtener todas las producciones de un usuario y calcular los valores necesarios
const getProductions = async (req, res) => {
    const userId = req.user.userId; // Extraído del JWT

    try {
        const productions = await getProductionsByUser(userId);

        // Calcular los valores necesarios
        const totalActual = productions.reduce((sum, prod) => sum + parseFloat(prod.productionvalue), 0).toFixed(2);
        const totalAnterior = await getPreviousMonthProductions(userId); // Obtener el total del mes anterior
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
        res.status(500).json({ message: 'Error al obtener las producciones', error: error.message });
    }
};

module.exports = { addProduction, getProductions };