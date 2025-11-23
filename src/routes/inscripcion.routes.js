const express = require("express");
const router = express.Router();
const {
  registrarInscripcion,
  listarInscripciones,
  aprobarInscripcionController,
  eliminarInscripcion,
  obtenerMateriasPorAlumno,
} = require("../controllers/inscripcion.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, registrarInscripcion);
router.get("/", listarInscripciones);
router.post("/aprobar", authMiddleware, aprobarInscripcionController);
router.delete("/:id_inscripcion", authMiddleware, eliminarInscripcion);
router.get("/alumno/:dni", authMiddleware, obtenerMateriasPorAlumno);

module.exports = router;
