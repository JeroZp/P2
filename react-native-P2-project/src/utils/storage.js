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
