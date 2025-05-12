const IP_APIS = '192.168.1.5'; // Cambia esto por la IP de tu servidor o localhost si estás en el mismo dispositivo

const API_BASE_URL_AUTH = `http://${IP_APIS}:3000`; // URL del auth-service
const API_BASE_URL_CONS = `http://${IP_APIS}:3001`; // URL del consumptions-service
const API_BASE_URL_PROD = `http://${IP_APIS}:3002`; // URL del productions-service
const API_BASE_URL_MARKEPLACE = `http://${IP_APIS}:3003`; // URL del marketplace-service


export const API_URLS = {
    login: `${API_BASE_URL_AUTH}/auth/login`, // Ruta para el login
    signup: `${API_BASE_URL_AUTH}/auth/signup`, // Ruta para el registro
    consumptions: `${API_BASE_URL_CONS}/cons`, // Ruta para consumptions
    productions: `${API_BASE_URL_PROD}/prod`, // Ruta para productions
    marketplace: {
        offers: `${API_BASE_URL_MARKEPLACE}/api/marketplace`, // Ofertas disponibles
        myOffers: `${API_BASE_URL_MARKEPLACE}/api/marketplace/my-offers`, // Mis ofertas
        myPurchases: `${API_BASE_URL_MARKEPLACE}/api/marketplace/my-purchases`, // Mis compras
        mySales: `${API_BASE_URL_MARKEPLACE}/api/marketplace/my-sales`, // Mis ventas
        createOffer: `${API_BASE_URL_MARKEPLACE}/api/marketplace`, // Crear oferta
        updateOffer: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/${id}`, // Actualizar oferta
        deleteOffer: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/${id}`, // Eliminar oferta
        purchaseOffer: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/${id}/purchase`, // Comprar oferta
        downloadContract: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/contracts/${id}/download` // Descargar contrato
    }
};