const supabase = require("../supabaseClient.js");

// 🟢 Crear profesor
const crearProfesional = async (req, res) => {
  const { dni, nombre, apellido } = req.body;
  try {
    const { data, error } = await supabase
      .from("profesores")
      .insert([{ dni, nombre, apellido }])
      .select();

    if (error) throw error;

    res.status(200).json({
      message: "Profesor creado con éxito",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟣 Obtener todos los profesores
const obtenerProfesionales = async (req, res) => {
  try {
    const { data, error } = await supabase.from("profesores").select(`
      id_profesor,
      dni,
      nombre,
      apellido
    `);

    if (error) throw error;

    res.status(200).json({ message: "Profesores obtenidos con éxito", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟡 Actualizar profesor por ID
const actualizarProfesional = async (req, res) => {
  const { id } = req.params;
  const { dni, nombre, apellido } = req.body;

  try {
    const { data, error } = await supabase
      .from("profesores")
      .update({ dni, nombre, apellido })
      .eq("id_profesor", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0)
      return res.status(404).json({ error: "Profesor no encontrado" });

    res.status(200).json({ message: "Profesor actualizado con éxito", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 Eliminar profesor por ID
const eliminarProfesional = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    console.log("🟡 ID recibido para eliminar:", idNum);

    // 1️⃣ Verificamos si el profesor existe
    const { data: check, error: checkError } = await supabase
      .from("profesores")
      .select("*")
      .eq("id_profesor", idNum);

    console.log("📋 Resultado de búsqueda antes de borrar:", check);

    if (checkError) throw checkError;
    if (!check || check.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado en la base" });
    }

    // 2️⃣ Intentamos eliminar
    const { data, error } = await supabase
      .from("profesores")
      .delete()
      .eq("id_profesor", idNum)
      .select();

    console.log("🗑️ Resultado del delete:", data, "Error:", error);

    if (error) throw error;
    if (!data || data.length === 0)
      return res.status(404).json({ error: "Profesor no encontrado o no se eliminó" });

    res.status(200).json({ message: "Profesor eliminado con éxito", data });
  } catch (error) {
    console.error("❌ Error en eliminarProfesional:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProfesional,
  obtenerProfesionales,
  actualizarProfesional,
  eliminarProfesional,
};
