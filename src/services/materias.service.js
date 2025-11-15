// src/services/materias.service.js
const supabase = require("../supabaseClient");

// Obtener todas las materias
async function obtenerTodos() {
  const { data, error } = await supabase
    .from("materias")
    .select("id, descripcion, id_profesor");

  if (error) throw new Error(error.message);
  return data;
}


async function crear(payload) {
  const { descripcion, id_profesor } = payload;
  const { data, error } = await supabase
    .from("materias")
    .insert([{ descripcion, id_profesor }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Actualizar materia por id
async function actualizar(id, payload) {
  const { data, error } = await supabase
    .from("materias")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    // Si no se encontró fila, retorna null
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data;
}

// Eliminar materia por id
async function eliminar(id) {
  const { data, error } = await supabase
    .from("materias")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return !!data;
}

module.exports = {
  obtenerTodos,
  crear,
  actualizar,
  eliminar,
};
