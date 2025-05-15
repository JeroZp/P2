const IP_APIS = '13.217.188.1'; // Cambia esto por la IP de tu servidor o localhost si estás en el mismo dispositivo

const API_BASE_URL_AUTH = `http://${IP_APIS}/api/auth`; // URL del auth-service
const API_BASE_URL_CONS = `http://${IP_APIS}/api/consumptions`; // URL del consumptions-service
const API_BASE_URL_PROD = `http://${IP_APIS}/api/productions`; // URL del productions-service
const API_BASE_URL_MARKETPLACE = `http://${IP_APIS}/api/marketplace`; // URL del marketplace-service


export const API_URLS = {
    login: `${API_BASE_URL_AUTH}/auth/login`,
    signup: `${API_BASE_URL_AUTH}/auth/signup`,
    updateEmail: `${API_BASE_URL_AUTH}/auth/update-email`,
    consumptions: `${API_BASE_URL_CONS}/cons`, // Ruta para consumptions
    consumptionsOrdered: `${API_BASE_URL_CONS}/cons/ordered`,
    productions: `${API_BASE_URL_PROD}/prod`,
    productionsOrdered: `${API_BASE_URL_PROD}/prod/ordered`,
    marketplace: {
        offers: `${API_BASE_URL_MARKETPLACE}/api/marketplace`,
        myOffers: `${API_BASE_URL_MARKETPLACE}/api/marketplace/my-offers`,
        myPurchases: `${API_BASE_URL_MARKETPLACE}/api/marketplace/my-purchases`,
        mySales: `${API_BASE_URL_MARKETPLACE}/api/marketplace/my-sales`,
        createOffer: `${API_BASE_URL_MARKETPLACE}/api/marketplace`,
        updateOffer: (id) => `${API_BASE_URL_MARKETPLACE}/api/marketplace/${id}`,
        deleteOffer: (id) => `${API_BASE_URL_MARKETPLACE}/api/marketplace/${id}`,
        purchaseOffer: (id) => `${API_BASE_URL_MARKETPLACE}/api/marketplace/${id}/purchase`,
        downloadContract: (id) => `${API_BASE_URL_MARKETPLACE}/api/marketplace/contracts/${id}/download`,
        updateContract: (id) => `${API_BASE_URL_MARKETPLACE}/api/marketplace/contracts/${id}`
    }
};