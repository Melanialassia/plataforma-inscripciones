const db = require('../supabaseClient.js');

function crearInscripcion(dniAlumno, idMateria) {
  const alumno = db.prepare("SELECT * FROM usuarios WHERE dni = ? AND rol = 'alumno'").get(dniAlumno);
  if (!alumno) return { success: false, message: 'Alumno no encontrado' };

  const materia = db.prepare("SELECT * FROM cursos WHERE id = ?").get(idMateria);
  if (!materia) return { success: false, message: 'Materia no encontrada' };

  const existente = db.prepare(
    "SELECT * FROM inscripciones WHERE alumno_id = ? AND curso_id = ?"
  ).get(alumno.id, idMateria);
  if (existente) return { success: false, message: 'El alumno ya está inscripto en esta materia' };

  const result = db.prepare(
    "INSERT INTO inscripciones (alumno_id, curso_id, estado) VALUES (?, ?, 'pendiente')"
  ).run(alumno.id, idMateria);

  return { success: true, message: 'Inscripción creada correctamente', id: result.lastInsertRowid };
}

function aprobarInscripcion(id_inscripcion, estado) {
  const result = db.prepare("UPDATE inscripciones SET estado = ? WHERE id = ?").run(estado, id_inscripcion);
  if (result.changes === 0) return { success: false, message: 'Inscripción no encontrada' };
  return { success: true, message: 'Inscripción actualizada' };
}

module.exports = { crearInscripcion, aprobarInscripcion };