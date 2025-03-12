import { API_URLS } from '../config/api';
import { getToken } from '../utils/storage';

// Obtener consumos del usuario
export const getConsumptions = async () => {
    try {
        const token = await getToken(); // Obtener el token
        console.log('Token obtenido:', token);
        const response = await fetch(API_URLS.consumptions, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Enviar el token
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los consumos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Registrar un nuevo consumo
export const addConsumption = async (consumptionValue, consumptionDate) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.consumptions, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ consumptionValue, consumptionDate }),
        });

        if (!response.ok) {
            throw new Error('Error al registrar el consumo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Obtener producciones del usuario
export const getProductions = async () => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.productions, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las producciones');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Registrar una nueva producción
export const addProduction = async (productionValue, productionDate) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.productions, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productionValue, productionDate }),
        });

        if (!response.ok) {
            throw new Error('Error al registrar la producción');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};