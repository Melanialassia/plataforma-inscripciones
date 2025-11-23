const alumnoService = require("../services/alumno.service.js");
const supabase = require("../supabaseClient.js");

async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await alumnoService.obtenerTodos();
    res.json({ success: true, alumnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function actualizarAlumno(req, res) {
  try {
    const dni = Number(req.params.dni); 
    const nuevosDatos = req.body;

    const updated = await alumnoService.actualizar(dni, nuevosDatos);

    res.json({ success: true, alumno: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { obtenerAlumnos, actualizarAlumno };

