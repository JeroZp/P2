const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordhash);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user.id, user.usertype);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

module.exports = { login }; // Solo exportamos login