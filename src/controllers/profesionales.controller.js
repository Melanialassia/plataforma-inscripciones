const db = require("../supabaseClient.js");

const crearProfesional = (req, res) => {
  const { dni, nombre, apellido } = req.body;
  try {
    const result = db.prepare(
      "INSERT INTO usuarios (dni, email, password, rol) VALUES (?, ?, ?, 'profesor')"
    ).run(dni, `${dni}@plataforma.com`, "temporal");
    res.status(200).json({ message: "Profesor creado con éxito", id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerProfesionales = (req, res) => {
  try {
    const data = db.prepare("SELECT * FROM usuarios WHERE rol = 'profesor'").all();
    res.status(200).json({ message: "Profesores obtenidos con éxito", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarProfesional = (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const result = db.prepare("UPDATE usuarios SET email = ? WHERE id = ? AND rol = 'profesor'").run(email, id);
    if (result.changes === 0) return res.status(404).json({ error: "Profesor no encontrado" });
    res.status(200).json({ message: "Profesor actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarProfesional = (req, res) => {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum)) return res.status(400).json({ error: "ID inválido" });
  try {
    const result = db.prepare("DELETE FROM usuarios WHERE id = ? AND rol = 'profesor'").run(idNum);
    if (result.changes === 0) return res.status(404).json({ error: "Profesor no encontrado" });
    res.status(200).json({ message: "Profesor eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearProfesional, obtenerProfesionales, actualizarProfesional, eliminarProfesional };
