const bcrypt = require('bcrypt');
const { findUserByEmail, createUser, updateUserEmail } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
    const { names, surnames, email, password, userType, cedulaOrNit } = req.body;
    console.log("sign Up");
    try {
        // Validación de campos obligatorios
        if (!names || !surnames || !email || !password || !userType || !cedulaOrNit) {
            console.log("missing fields");
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("invalid email format");
            return res.status(400).json({ message: 'El formato del correo electrónico no es válido' });
        }

        // Validación de longitud de contraseña
        if (password.length < 6) {
            console.log("password length invalid");
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Validación de userType
        const validUserTypes = ['Residencial', 'Industrial', 'Administrador'];
        if (!validUserTypes.includes(userType)) {
            console.log("invalid user type");
            return res.status(400).json({ message: 'El tipo de usuario no es válido' });
        }

        // Verifica si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            console.log("user already exists");
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashea la contraseña y crea el usuario
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(names, surnames, email, passwordHash, userType, cedulaOrNit);

        // Genera un token JWT para el nuevo usuario
        const token = generateToken(newUser.id, newUser.userType);
        console.log("user created successfully");
        // Respuesta con el token y los datos del usuario
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: { id: newUser.id, email: newUser.email, userType: newUser.userType },
            token, // Token generado
        });
    } catch (error) {
        console.error('Error en signup:', error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("login");
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordhash);
        if (!isValidPassword) {
            console.log("password not valid");
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(user.id, user.usertype);
        console.log("user logged in successfully");
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

const updateEmail = async (req, res) => {
    const { newEmail } = req.body;
    const userId = req.userId; // Obtenido del middleware de autenticación

    try {
        // Validación: Campos obligatorios
        if (!newEmail) {
            console.log("new email not found");
            return res.status(400).json({ message: 'El nuevo email es requerido' });
        }

        // Validación: Formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            console.log("invalid email format");
            return res.status(400).json({ message: 'Formato de email inválido' });
        }

        // Validación: Evitar duplicados
        const existingUser = await findUserByEmail(newEmail);
        if (existingUser && existingUser.id !== userId) {
            console.log("email already in use");
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        // Actualizar en la base de datos
        const updatedUser = await updateUserEmail(userId, newEmail);
        console.log("email updated successfully");
        res.status(200).json({
            message: 'Email actualizado exitosamente',
            user: { id: updatedUser.id, email: updatedUser.email },
        });
    } catch (error) {
        console.error('Error updateEmail');
        res.status(500).json({ message: 'Error al actualizar el email', error: error.message });
    }
};

module.exports = { login, signup, updateEmail };