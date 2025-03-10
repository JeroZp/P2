const bcrypt = require('bcrypt');
const { findUserByEmail, createUser } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
    const { names, surnames, email, password, userType, cedulaOrNit } = req.body;

    try {
        // Validación de campos obligatorios
        if (!names || !surnames || !email || !password || !userType || !cedulaOrNit) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'El formato del correo electrónico no es válido' });
        }

        // Validación de longitud de contraseña
        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Validación de userType
        const validUserTypes = ['Residencial', 'Industrial', 'Administrador'];
        if (!validUserTypes.includes(userType)) {
            return res.status(400).json({ message: 'El tipo de usuario no es válido' });
        }

        // Verifica si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashea la contraseña y crea el usuario
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(names, surnames, email, passwordHash, userType, cedulaOrNit);

        // Genera un token JWT para el nuevo usuario
        const token = generateToken(newUser.id, newUser.userType);

        // Respuesta con el token y los datos del usuario
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: { id: newUser.id, email: newUser.email, userType: newUser.userType },
            token, // Token generado
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

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

module.exports = { login, signup };