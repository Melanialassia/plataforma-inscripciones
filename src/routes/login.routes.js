// src/routes/login.routes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login.controller.js');

// POST para iniciar sesión
router.post('/', login);

module.exports = router;
