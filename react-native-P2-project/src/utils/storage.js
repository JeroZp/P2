import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
        console.log('Token guardado:', token);
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token obtenido:', token);
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        console.log('Token eliminado');
    } catch (error) {
        console.error('Error al eliminar el token:', error);
    }
};

// Operaciones con datos de usuario
export const storeUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('Datos de usuario guardados');
    } catch (error) {
        console.error('Error al guardar datos de usuario:', error);
        throw error;
    }
};

export const getUserData = async () => {
    try {
        const data = await AsyncStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
        throw error;
    }
};

export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem('userData');
        console.log('Datos de usuario eliminados');
    } catch (error) {
        console.error('Error al eliminar datos de usuario:', error);
        throw error;
    }
};

// Limpiar toda la autenticación
export const clearAuthData = async () => {
    try {
        await removeToken();
        await removeUserData();
        console.log('Datos de autenticación limpiados');
    } catch (error) {
        console.error('Error al limpiar datos de autenticación:', error);
        throw error;
    }
};