const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materias.controller.js');

router.get('/', materiasController.listarMaterias);

module.exports = router;
