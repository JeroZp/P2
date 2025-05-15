import { API_URLS } from '../config/api';
import { getToken } from '../utils/storage';

export const signupUser = async (userData) => {
    try {
        const response = await fetch(API_URLS.signup, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error en el registro');

        return data;
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(API_URLS.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Credenciales incorrectas');

        return data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

export const updateUserEmail = async (newEmail) => {
    try {
        const token = await getToken();
        const response = await fetch(API_URLS.updateEmail, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newEmail }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al actualizar email');

        return data;
    } catch (error) {
        console.error('Update Email Error:', error);
        throw error;
    }
};