const { createProduction, getProductionsByUser, getPreviousMonthProductions, getProductionsByUserOrdered } = require('../models/productionModel');

// Registrar una nueva producción
const addProduction = async (req, res) => {
    const { productionValue, productionDate } = req.body;
    const userId = req.user.userId; // Extraído del JWT
    console.log("add production");
    try {
        const production = await createProduction(userId, productionValue, productionDate);
        console.log("production created successfully");
        res.status(201).json({ message: 'Producción registrada', production });
    } catch (error) {
        console.error('Error al registrar la producción:', error);
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

        console.log("get productions successfully");
        // Enviar los datos transformados al frontend
        res.status(200).json({
            totalActual: `${totalActual} Wh`,
            totalAnterior: `${totalAnterior} Wh`,
            promedioDiario: `${promedioDiario} Wh`,
            promedioMensual: `${promedioMensual} Wh`,
            promedioHora: `${promedioHora} Wh`,
        });
    } catch (error) {
        console.error('Error al obtener las producciones:', error);
        res.status(500).json({ message: 'Error al obtener las producciones', error: error.message });
    }
};

const getProductionsOrdered = async (req, res) => {
    console.log("get productions ordered");
    const userId = req.user.userId;

    try {
        const productions = await getProductionsByUserOrdered(userId);
        console.log("get productions ordered successfully");
        res.status(200).json(productions);
    } catch (error) {
        console.error('Error al obtener las producciones ordenadas:', error);
        res.status(500).json({
            message: 'Error al obtener las producciones ordenadas',
            error: error.message
        });
    }
};

module.exports = { addProduction, getProductions, getProductionsOrdered };