import { API_URLS } from '../config/api';
import { getToken } from "../utils/storage";

export const getProductions = async () => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(API_URLS.productions, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las producciones');
        }

        return await response.json(); // { message: 'Producciones obtenidas', data: [...] }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addProduction = async (productionValue, productionDate) => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await fetch(API_URLS.productions, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productionValue, productionDate }),
        });

        if (!response.ok) {
            throw new Error('Error al registrar la producción');
        }

        return await response.json(); // { message: 'Producción registrada', data: {...} }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};