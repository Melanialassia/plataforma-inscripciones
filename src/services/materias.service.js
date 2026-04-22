const db = require("../supabaseClient");

function obtenerTodos() {
  return db.prepare("SELECT * FROM cursos").all();
}

function crear(payload) {
  const { descripcion, id_profesor } = payload;
  const result = db.prepare(
    "INSERT INTO cursos (nombre, descripcion, profesor_id) VALUES (?, ?, ?)"
  ).run(descripcion, descripcion, id_profesor);
  return { id: result.lastInsertRowid, descripcion, id_profesor };
}

function actualizar(id, payload) {
  const { descripcion, id_profesor } = payload;
  const result = db.prepare(
    "UPDATE cursos SET nombre = ?, profesor_id = ? WHERE id = ?"
  ).run(descripcion, id_profesor, id);
  if (result.changes === 0) return null;
  return db.prepare("SELECT * FROM cursos WHERE id = ?").get(id);
}

function eliminar(id) {
  const result = db.prepare("DELETE FROM cursos WHERE id = ?").run(id);
  return result.changes > 0;
}

function obtenerInscriptosPorMateria(id_materia) {
  return db.prepare("SELECT * FROM inscripciones WHERE curso_id = ?").all(id_materia);
}

module.exports = { obtenerTodos, crear, actualizar, eliminar, obtenerInscriptosPorMateria };