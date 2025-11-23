const express = require("express");
const router = express.Router();
const alumnoController = require("../controllers/alumno.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, alumnoController.obtenerAlumnos);
router.put("/:dni", authMiddleware, alumnoController.actualizarAlumno);

module.exports = router;
