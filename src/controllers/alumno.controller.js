const alumnoService = require("../services/alumno.service.js");

function obtenerAlumnos(req, res) {
  try {
    const alumnos = alumnoService.obtenerTodos();
    res.json({ success: true, alumnos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

function actualizarAlumno(req, res) {
  try {
    const dni = req.params.dni;
    const nuevosDatos = req.body;
    const updated = alumnoService.actualizar(dni, nuevosDatos);
    res.json({ success: true, alumno: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { obtenerAlumnos, actualizarAlumno };