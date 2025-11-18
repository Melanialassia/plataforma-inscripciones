
const supabase = require('../supabaseClient.js');

const register = async (req, res) => {
  const { email, password, dni, rol } = req.body;

  try {
    if (rol !== "admin") {
      return res.status(400).json({
        error: "El rol debe ser exactamente 'admin'."
      });
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { dni, rol }
      }
    });

    if (error) {
    
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: 'Usuario registrado correctamente',
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