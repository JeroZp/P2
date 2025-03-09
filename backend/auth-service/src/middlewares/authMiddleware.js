const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        next();
    } catch (error) {
        console.error('Error en authMiddleware:', error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;