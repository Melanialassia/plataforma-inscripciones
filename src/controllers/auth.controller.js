
// src/controllers/auth.controller.js
const supabase = require('../supabaseClient.js');

const register = async (req, res) => {
  const { email, password, dni, rol } = req.body;

  try {
    // 1️⃣ Verificar si ya existe un usuario con ese correo
    const { data: existingUsers, error: fetchError } = await supabase
      .from('auth.users') // Tabla interna de Supabase Auth
      .select('email')
      .eq('email', email);

    if (fetchError) throw fetchError;

    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({
        message: '⚠️ El correo ya está registrado. Por favor, usa otro.'
      });
    }

    // 2️⃣ Crear nuevo usuario si el email no existe
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { dni, rol }
      }
    });

    if (error) throw error;

    res.status(200).json({
      message: '✅ Usuario registrado correctamente.',
      user: data.user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const token = data.session?.access_token ?? null;
    const user = data.user ?? null;

    const { data: userInfo, error: userError } = await supabase
      .from('usuarios')
      .select('email, dni, rol')
      .eq('email', email)
      .single();


    return res.status(200).json({
      message: 'Login exitoso',
      token,
      user,
      email: userInfo?.email ?? email,
      dni: userInfo?.dni ?? null,
      rol: userInfo?.rol ?? null,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };