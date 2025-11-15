const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materias.controller.js");

// Listar todas las materias
router.get("/", materiasController.listarMaterias);

// Crear una nueva materia
router.post("/", materiasController.crearMateria);

// Actualizar una materia por id
router.put("/:id", materiasController.actualizarMateria);

// Eliminar una materia por id
router.delete("/:id", materiasController.eliminarMateria);

module.exports = router;
