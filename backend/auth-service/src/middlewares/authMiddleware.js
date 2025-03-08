const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    // Extraer el token del encabezado 'Authorization'
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Si no hay token, devolver un error
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = verifyToken(token);

        // Adjuntar la información del usuario al objeto 'req'
        req.userId = decoded.userId; // ID del usuario
        req.userType = decoded.userType; // Tipo de usuario (Residencial, Industrial, Administrador)

        // Continuar con la siguiente función (controlador)
        next();
    } catch (error) {
        // Manejar errores (token inválido o expirado)
        console.error('Error en authMiddleware:', error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;