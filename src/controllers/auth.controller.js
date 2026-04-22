const db = require("../supabaseClient.js");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  const { email, password, dni, rol } = req.body;

  if (!email || !password || !dni || !rol) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (!["alumno", "profesor", "administrador"].includes(rol)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  try {
    const emailExiste = db.prepare("SELECT email FROM usuarios WHERE email = ?").get(email);
    if (emailExiste) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    const dniExiste = db.prepare("SELECT dni FROM usuarios WHERE dni = ?").get(dni);
    if (dniExiste) {
      return res.status(400).json({ error: "El DNI ya está registrado." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = db.prepare(
      "INSERT INTO usuarios (email, password, dni, rol) VALUES (?, ?, ?, ?)"
    ).run(email, hashedPassword, dni, rol);

    return res.status(200).json({
      message: "Usuario registrado correctamente",
      user: { id: result.lastInsertRowid, email, dni, rol }
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ error: err?.message || "Error interno" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = bcrypt.compareSync(password, user.password);
    if (!passwordValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    return res.status(200).json({
      message: "Login exitoso",
      user: { id: user.id, email: user.email, dni: user.dni, rol: user.rol }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };