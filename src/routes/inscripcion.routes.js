// src/routes/inscripcion.routes.js
const express = require('express');
const router = express.Router();
const {
  registrarInscripcion,
  listarInscripciones,
  aprobarInscripcionController
} = require('../controllers/inscripcion.controller.js');

const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware.js');

// Alumno registra inscripción
router.post('/', authMiddleware, registrarInscripcion);

// Admin lista todas las inscripciones
router.get('/', authMiddleware, adminMiddleware, listarInscripciones);

// Admin aprueba una inscripción
router.post('/aprobar', authMiddleware, adminMiddleware, aprobarInscripcionController);

module.exports = router;
