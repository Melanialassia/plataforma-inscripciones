// src/controllers/inscripcion.controller.js
const supabase = require('../supabaseClient.js');

// Registrar inscripción
const registrarInscripcion = async (req, res) => {
  const inscripcion = req.body;

  try {
    const { data, error } = await supabase
      .from('inscripcion_alumnos')
      .insert([inscripcion]);

    if (error) throw error;
    res.status(200).json({ message: 'Inscripción registrada correctamente', data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar inscripciones (solo admin)
const listarInscripciones = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inscripcion_alumnos')
      .select('*');

    if (error) throw error;
    res.json({ success: true, inscripciones: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aprobar inscripción (solo admin)
const aprobarInscripcionController = async (req, res) => {
  const { id, aprobado } = req.body;

  try {
    const { error } = await supabase
      .from('inscripcion_alumnos')
      .update({ aprobado })
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Inscripción actualizada con éxito' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registrarInscripcion, listarInscripciones, aprobarInscripcionController };
