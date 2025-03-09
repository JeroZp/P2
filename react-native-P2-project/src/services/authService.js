import { API_URLS } from '../config/api';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(API_URLS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error en el login');
        }

        return await response.json(); // { message: 'Login exitoso', token: '...' }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};