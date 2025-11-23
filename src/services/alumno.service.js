const supabase = require('../supabaseClient.js');

async function obtenerTodos() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("rol", "alumno");

  if (error) throw new Error(error.message);

  return data;
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


module.exports = { obtenerTodos, actualizar };
