const express = require('express');
const router = express.Router();
const {
  registrarInscripcion,
  listarInscripciones,
  aprobarInscripcionController,
  eliminarInscripcion,
  obtenerMateriasPorAlumno
} = require('../controllers/inscripcion.controller.js');

router.post('/', registrarInscripcion);
router.get('/', listarInscripciones);
router.post('/aprobar', aprobarInscripcionController);
router.delete('/:id_inscripcion', eliminarInscripcion);
router.get('/alumno/:dni', obtenerMateriasPorAlumno);

module.exports = router;
