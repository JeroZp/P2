const { createProduction, getProductionsByUser, getPreviousMonthProductions } = require('../models/productionModel');

// Registrar una nueva producción
const addProduction = async (req, res) => {
    const { productionValue, productionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT
    console.log("add production");
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
    console.log("get production");
    try {
        const productions = await getProductionsByUser(userId);

        // Calcular los valores necesarios
        const totalActual = productions.reduce((sum, prod) => sum + parseFloat(prod.productionvalue), 0).toFixed(2);
        const totalAnterior = await getPreviousMonthProductions(userId); // Obtener el total del mes anterior
        const daysInMonth = new Date().getDate();
        const horasEnMes = daysInMonth * 24;
        const promedioDiario = (totalActual / daysInMonth).toFixed(2);
        const promedioMensual = totalActual;
        const promedioHora = (totalActual / horasEnMes).toFixed(2);

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