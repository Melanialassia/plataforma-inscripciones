const supabase = require("../supabaseClient.js");

const registrarInscripcion = async (req, res) => {
  const { dni, id_materia, fecha_inscripcion, estado } = req.body;

  try {
    const { data: inscripcionExistente, error: errorExistencia } =
      await supabase
        .from("inscripciones")
        .select("id_inscripcion")
        .eq("dni", dni)
        .eq("id_materia", id_materia)
        .limit(1);

    if (errorExistencia) throw errorExistencia;

    if (inscripcionExistente && inscripcionExistente.length > 0) {
      return res.status(400).json({
        message: "El alumno ya está inscripto en esta materia.",
      });
    }

    const { data, error } = await supabase
      .from("inscripciones")
      .insert([{ dni, id_materia, fecha_inscripcion, estado }])
      .select();

    if (error) throw error;

    return res.status(200).json({
      message: "Inscripción registrada correctamente",
      data,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const listarInscripciones = async (req, res) => {
  try {
    const { data, error } = await supabase.from("inscripciones").select(`
        id_inscripcion,
        fecha_inscripcion,
        estado,
        dni,
        materias (
          id,
          descripcion,
          id_profesor
        )
      `);

    if (error) throw error;

    res.json({ success: true, inscripciones: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const aprobarInscripcionController = async (req, res) => {
  const { id_inscripcion, estado } = req.body;

  if (!id_inscripcion || !estado) {
    return res.status(400).json({
      error: "Faltan datos: id_inscripcion o estado",
    });
  }

  try {
    const { error } = await supabase
      .from("inscripciones")
      .update({ estado })
      .eq("id_inscripcion", id_inscripcion);

    if (error) throw error;
    res.json({ message: "Estado de inscripción actualizado con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const eliminarInscripcion = async (req, res) => {
  const { id_inscripcion } = req.params;
  const id = Number(id_inscripcion);
  try {
    const { error } = await supabase
      .from("inscripciones")
      .delete()
      .eq("id_inscripcion", id);

    if (error) throw error;
    res.json({ message: "Inscripción eliminada correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerMateriasPorAlumno = async (req, res) => {
  const { dni } = req.params;

  try {
    if (!dni) return res.status(400).json({ error: "Falta el parámetro DNI" });

    const { data, error } = await supabase
      .from("inscripciones")
      .select(
        `
        id_inscripcion,
        fecha_inscripcion,
        estado,
        materias (
          id,
          descripcion,
          id_profesor
        )
      `
      )
      .eq("dni", dni);

    if (error) throw error;

    if (!data || data.length === 0)
      return res
        .status(404)
        .json({ message: "El alumno no tiene inscripciones" });

    res.json({
      message: "📘 Materias del alumno encontradas",
      inscripciones: data,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registrarInscripcion,
  listarInscripciones,
  aprobarInscripcionController,
  eliminarInscripcion,
  obtenerMateriasPorAlumno,
};
