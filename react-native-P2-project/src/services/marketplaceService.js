import { API_URLS } from '../config/api';
import { getToken } from '../utils/storage';

// Obtener todas las ofertas del mercado (excepto las del usuario)
export const getMarketOffers = async () => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.offers, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al obtener ofertas');
        return await response.json();
    } catch (error) {
        console.error('Error en getMarketOffers:', error);
        throw error;
    }
};

// Obtener las ofertas del usuario actual
export const getMyOffers = async () => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.myOffers, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al obtener tus ofertas');
        return await response.json();
    } catch (error) {
        console.error('Error en getMyOffers:', error);
        throw error;
    }
};

// Crear nueva oferta
export const createOffer = async (offerData) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.createOffer, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear oferta');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en createOffer:', error);
        throw error;
    }
};

// Eliminar oferta
export const deleteOffer = async (offerId) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.deleteOffer(offerId), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al eliminar oferta');
        return await response.json();
    } catch (error) {
        console.error('Error en deleteOffer:', error);
        throw error;
    }
};

// Actualizar oferta
export const updateOffer = async (offerId, offerData) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.updateOffer(offerId), {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        });

        if (!response.ok) throw new Error('Error al actualizar oferta');
        return await response.json();
    } catch (error) {
        console.error('Error en updateOffer:', error);
        throw error;
    }
};
