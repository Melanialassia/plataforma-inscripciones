
// src/controllers/auth.controller.js
const supabase = require('../supabaseClient.js');

// ✅ REGISTRO
const register = async (req, res) => {
  const { email, password, dni, rol } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { dni, rol }
      }
    });

    if (error) throw error;
    res.status(200).json({ message: 'Usuario registrado.', user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({
      message: 'Login exitoso',
      token: data.session.access_token,
      user: data.user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };