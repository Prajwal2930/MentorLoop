const express = require('express');

const { login, register } = require('../controllers/authController');
const { validateLoginInput, validateRegisterInput } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

module.exports = router;
