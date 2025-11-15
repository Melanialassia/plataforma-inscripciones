const express = require("express");
const router = express.Router();
const {
  crearProfesional,
  obtenerProfesionales,
  actualizarProfesional,
  eliminarProfesional
} = require("../controllers/profesionales.controller.js");

router.post("/", crearProfesional);
router.get("/", obtenerProfesionales);
router.put("/:id", actualizarProfesional); 
router.delete("/:id", eliminarProfesional); 

module.exports = router;
