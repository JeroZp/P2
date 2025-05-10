import { API_URLS } from '../config/api';

export const signupUser = async (names, surnames, email, password, userType, cedulaOrNit) => {
    try {
        const response = await fetch(API_URLS.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ names, surnames, email, password, userType, cedulaOrNit }),
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        return await response.json(); // { message: 'Usuario creado exitosamente', user: {...}, token: '...' }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(API_URLS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        // todo ok: devolvemos el JSON completo
        return data; // { message: 'Login exitoso', token: '...' }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};