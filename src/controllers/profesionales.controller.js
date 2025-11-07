
const supabase = require("../supabaseClient.js");

const crearProfesional = async (req, res) => {
  const { dni, nombre, apellido, especialidad } = req.body;
  try {
    const { data, error } = await supabase
      .from("profesores")
      .insert([{ dni, nombre, apellido, especialidad }])
      .select();

    if (error) throw error;

    res.status(200).json({
      message: "Profesor creado con exito",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const obtenerProfesionales = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profesores")
      .select(`
        id_profesor,
        dni,
        nombre,
        apellido,
        especialidad
      `);

    if (error) throw error;

    res.status(200).json({ message: "Profesor creado con exito",
      data, });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProfesional,
  obtenerProfesionales,
};
