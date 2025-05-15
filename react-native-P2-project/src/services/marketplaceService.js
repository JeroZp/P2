import { API_URLS } from '../config/api';
import { getToken } from '../utils/storage';
import { CONTRACT_STATES } from '../constants/contractStates';

// Offers
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

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener ofertas');

        return data;
    } catch (error) {
        console.error('Get Market Offers Error:', error);
        throw error;
    }
};

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

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener tus ofertas');

        return data;
    } catch (error) {
        console.error('Get My Offers Error:', error);
        throw error;
    }
};

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

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al crear oferta');

        return data;
    } catch (error) {
        console.error('Create Offer Error:', error);
        throw error;
    }
};

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

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al actualizar oferta');

        return data;
    } catch (error) {
        console.error('Update Offer Error:', error);
        throw error;
    }
};

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

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al eliminar oferta');
        }

        return true; // Success
    } catch (error) {
        console.error('Delete Offer Error:', error);
        throw error;
    }
};

// Purchases & Sales
export const purchaseOffer = async (offerId) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.purchaseOffer(offerId), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al procesar compra');

        return data;
    } catch (error) {
        console.error('Purchase Offer Error:', error);
        throw error;
    }
};

export const getMyPurchases = async () => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.myPurchases, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener compras');

        return data;
    } catch (error) {
        console.error('Get Purchases Error:', error);
        throw error;
    }
};

export const getMySales = async () => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.mySales, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener ventas');

        return data;
    } catch (error) {
        console.error('Get Sales Error:', error);
        throw error;
    }
};

// Contracts
export const downloadContract = async (contractId) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.downloadContract(contractId), {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al descargar contrato');
        }

        return response.blob(); // For file download
    } catch (error) {
        console.error('Download Contract Error:', error);
        throw error;
    }
};

export const acceptContract = async (contractId) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.updateContract(contractId), {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: CONTRACT_STATES.COMPLETED })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al aceptar contrato');

        return data;
    } catch (error) {
        console.error('Accept Contract Error:', error);
        throw error;
    }
};

export const rejectContract = async (contractId) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.marketplace.updateContract(contractId), {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: CONTRACT_STATES.CANCELLED })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al rechazar contrato');

        return data;
    } catch (error) {
        console.error('Reject Contract Error:', error);
        throw error;
    }
};