import { API_URLS } from '../config/api';
import { getToken } from "../utils/storage";

export const getConsumptions = async () => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(API_URLS.consumptions, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los consumos');
        }

        return await response.json(); // { message: 'Consumos obtenidos', data: [...] }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addConsumption = async (consumptionValue, consumptionDate) => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(API_URLS.consumptions, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ consumptionValue, consumptionDate }),
        });

        if (!response.ok) {
            throw new Error('Error al registrar el consumo');
        }

        return await response.json(); // { message: 'Consumo registrado', data: {...} }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};