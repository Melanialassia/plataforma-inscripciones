const db = require('../supabaseClient.js');

function obtenerTodos() {
  return db.prepare("SELECT * FROM usuarios WHERE rol = 'alumno'").all();
}

function actualizar(dni, nuevosDatos) {
  const alumno = db.prepare("SELECT * FROM usuarios WHERE dni = ?").get(dni);
  if (!alumno) throw new Error("Alumno no encontrado");

  db.prepare("UPDATE usuarios SET email = ? WHERE dni = ?").run(nuevosDatos.email, dni);

  return { ...alumno, email: nuevosDatos.email };
}

module.exports = { obtenerTodos, actualizar };