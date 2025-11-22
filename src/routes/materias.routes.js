const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materias.controller.js");
const { authMiddleware} = require("../middlewares/auth.middleware");

router.get("/", materiasController.listarMaterias);

router.post("/", authMiddleware, materiasController.crearMateria);

router.put("/:id", authMiddleware, materiasController.actualizarMateria);

router.delete("/:id", authMiddleware, materiasController.eliminarMateria);


module.exports = router;

