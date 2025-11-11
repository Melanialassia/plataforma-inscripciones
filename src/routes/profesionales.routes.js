const express = require("express");
const router = express.Router();
const {
  crearProfesional,
  obtenerProfesionales,
} = require("../controllers/profesionales.controller.js");

router.post("/", crearProfesional);
router.get("/", obtenerProfesionales);

module.exports = router;
