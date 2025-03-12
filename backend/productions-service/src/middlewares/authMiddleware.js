const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
    console.log("middleware");
    // Extraer el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Eliminar "Bearer "
    console.log(token);
    if (!token) {
        console.log("acceso denegado");
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        console.log("try");
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("error");
        res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateToken;