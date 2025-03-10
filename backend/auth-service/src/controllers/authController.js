const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
    const { names, surnames, email, password, userType, cedulaOrNit } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(names, surnames, email, passwordHash, userType, cedulaOrNit);
        res.status(201).json({ message: 'Usuario creado', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isValidPassword = await bcrypt.compare(password, user.passwordhash);
        if (!isValidPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = generateToken(user.id, user.usertype);
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

module.exports = { signup, login };