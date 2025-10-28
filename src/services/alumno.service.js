const supabase = require('../config/supabaseClient.js');

async function obtenerTodos() {
  const { data, error } = await supabase.from('alumnos').select('*');
  if (error) throw new Error(error.message);
  return data;
}

async function obtenerPorDni(dni) {
  const { data, error } = await supabase
    .from('alumnos')
    .select('*')
    .eq('legajo', dni)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

async function crear(alumno) {
  const { data, error } = await supabase.from('alumnos').insert([alumno]).select();
  if (error) throw new Error(error.message);
  return data[0];
}

module.exports = { obtenerTodos, obtenerPorDni, crear };
