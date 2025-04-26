const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
    // Extraer el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Eliminar "Bearer " del token
    if (!token) {
        console.log("acceso denegado");
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error");
        res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateToken;