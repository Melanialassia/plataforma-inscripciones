const { crearInscripcion, aprobarInscripcion } = require('../services/inscripcion.service.js');
const db = require('../supabaseClient.js');

const registrarInscripcion = (req, res) => {
  const { dni, id_materia } = req.body;
  const result = crearInscripcion(dni, id_materia);
  if (!result.success) return res.status(400).json(result);
  return res.status(200).json(result);
};

const listarInscripciones = (req, res) => {
  try {
    const inscripciones = db.prepare(`
      SELECT i.*, u.email, u.dni, c.nombre as materia
      FROM inscripciones i
      JOIN usuarios u ON i.alumno_id = u.id
      JOIN cursos c ON i.curso_id = c.id
    `).all();
    res.json({ success: true, inscripciones });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const aprobarInscripcionController = (req, res) => {
  const { id_inscripcion, estado } = req.body;
  if (!id_inscripcion || !estado) return res.status(400).json({ error: "Faltan datos" });
  const result = aprobarInscripcion(id_inscripcion, estado);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
};

const eliminarInscripcion = (req, res) => {
  const id = Number(req.params.id_inscripcion);
  const result = db.prepare("DELETE FROM inscripciones WHERE id = ?").run(id);
  if (result.changes === 0) return res.status(404).json({ error: "Inscripción no encontrada" });
  res.json({ message: "Inscripción eliminada correctamente" });
};

const obtenerMateriasPorAlumno = (req, res) => {
  const { dni } = req.params;
  const alumno = db.prepare("SELECT * FROM usuarios WHERE dni = ?").get(dni);
  if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
  const inscripciones = db.prepare(`
    SELECT i.*, c.nombre as materia
    FROM inscripciones i
    JOIN cursos c ON i.curso_id = c.id
    WHERE i.alumno_id = ?
  `).all(alumno.id);
  res.json({ success: true, inscripciones });
};

module.exports = { registrarInscripcion, listarInscripciones, aprobarInscripcionController, eliminarInscripcion, obtenerMateriasPorAlumno };