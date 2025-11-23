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
  try {
    const { data: usuario, error: userFetchError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("dni", dni)
      .single();

    if (userFetchError || !usuario) {
      throw new Error("Alumno no encontrado");
    }

    const uid = usuario.uid;

    // 2️⃣ Actualizar email en Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(uid, {
      email: nuevosDatos.email,
    });

    if (authError) {
      throw new Error(`Error actualizando Auth: ${authError.message}`);
    }

    const { data: userData, error: userError } = await supabase
      .from("usuarios")
      .update({ email: nuevosDatos.email })
      .eq("dni", dni);

    if (userError) {
      throw new Error(`Error actualizando tabla usuarios: ${userError.message}`);
    }

    return { ...usuario, email: nuevosDatos.email };
  } catch (err) {
    throw new Error(err.message || "No se pudo actualizar");
  }
}



module.exports = { obtenerTodos, actualizar };
