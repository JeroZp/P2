const express = require('express');
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup, authMiddleware);
router.post('/login', login);

module.exports = router;