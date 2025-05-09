const IP_APIS = '192.168.1.14';
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
        offers: `${API_BASE_URL_MARKEPLACE}/api/marketplace`, // Ruta para las ofertas
        myOffers: `${API_BASE_URL_MARKEPLACE}/api/marketplace/my-offers`, // Ruta para mis ofertas
        createOffer: `${API_BASE_URL_MARKEPLACE}/api/marketplace`, // Ruta para crear oferta
        updateOffer: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/${id}`, // Ruta para actualizar oferta
        deleteOffer: (id) => `${API_BASE_URL_MARKEPLACE}/api/marketplace/${id}`, // Ruta para eliminar oferta   }
    }
};