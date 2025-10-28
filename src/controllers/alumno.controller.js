const alumnoService = require('../services/alumno.service.js');

async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await alumnoService.obtenerTodos();
    res.json({ success: true, alumnos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function obtenerAlumnoPorDni(req, res) {
  try {
    const dni = Number(req.params.dni);
    const alumno = await alumnoService.obtenerPorDni(dni);
    if (!alumno) return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
    res.json({ success: true, alumno });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function crearAlumno(req, res) {
  try {
    const nuevoAlumno = req.body;
    const alumnoCreado = await alumnoService.crear(nuevoAlumno);
    res.status(201).json({ success: true, alumno: alumnoCreado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { obtenerAlumnos, obtenerAlumnoPorDni, crearAlumno };
