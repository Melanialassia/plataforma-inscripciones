const express = require("express");
const router = express.Router();
const alumnoController = require("../controllers/alumno.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

router.get("/", alumnoController.obtenerAlumnos);
// router.get("/:dni", alumnoController.obtenerAlumnoPorDni);
// router.post("/", alumnoController.crearAlumno);
router.put("/:dni", alumnoController.actualizarAlumno);

module.exports = router;
