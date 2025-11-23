const alumnoService = require("../services/alumno.service.js");
const supabase = require("../supabaseClient.js");

async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await alumnoService.obtenerTodos();
    res.json({ success: true, alumnos });
  } catch (error) {
    console.error(error); // log para depuración
    res.status(500).json({ success: false, message: error.message });
  }
}
//puede sque borrar
async function changeUserEmailAsAdmin(req, res) {
  const { uid, email } = req.body;

  if (!uid || !email) {
    return res.status(400).json({
      error: "Falta user_id o new_email",
    });
  }

  try {
    const { data, error } = await supabase.auth.admin.updateUserById(uid, {
      email: email,
    });

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Email actualizado correctamente",
      user: data,
    });
  } catch (err) {
    console.error("changeUserEmailAsAdmin error:", err);
    return res.status(500).json({
      error: err?.message || "Error interno",
    });
  }
}

async function actualizarAlumno(req, res) {
  try {
    const dni = Number(req.params.dni);
    const nuevosDatos = req.body;

    const alumnoActualizado = await alumnoService.actualizar(dni, nuevosDatos);

    if (!alumnoActualizado) {
      return res.status(404).json({ success: false, message: "Alumno no encontrado" });
    }

    res.json({ success: true, alumno: alumnoActualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { obtenerAlumnos, actualizarAlumno };

