const supabase = require('../supabaseClient.js');

async function obtenerTodos() {
  const { data, error } = await supabase.from('alumnos').select('*');
  if (error) throw new Error(error.message);
  return data;
}

async function obtenerPorDni(dni) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('dni', dni)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

async function crear(alumno) {
  const { data, error } = await supabase.from('alumnos').insert([alumno]).select();
  if (error) throw new Error(error.message);
  return data[0];
}

async function actualizar(dni, nuevosDatos) {
  const { email } = nuevosDatos;

  const { data, error } = await supabase
    .from("usuarios")
    .update({ email })
    .eq("dni", dni)
    .select();

   if (error) throw new Error(error.message);
  return data;
}


module.exports = { obtenerTodos, obtenerPorDni, crear, actualizar };
