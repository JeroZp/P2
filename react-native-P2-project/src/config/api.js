const API_BASE_URL_AUTH = 'http://192.168.1.5:3000'; // URL del auth-service
const API_BASE_URL_CONS = 'http://192.168.1.5:3001'; // URL del consumptions-service
const API_BASE_URL_PROD = 'http://192.168.1.5:3002'; // URL del productions-service

export const API_URLS = {
    login: `${API_BASE_URL_AUTH}/auth/login`, // Ruta para el login
    signup: `${API_BASE_URL_AUTH}/auth/signup`, // Ruta para el registro
    consumptions: `${API_BASE_URL_CONS}/cons`, // Ruta para consumptions
    productions: `${API_BASE_URL_PROD}/prod`, // Ruta para productions
};