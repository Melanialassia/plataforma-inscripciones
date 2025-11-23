// src/controllers/auth.controller.js
const supabase = require("../supabaseClient.js");

const register = async (req, res) => {
  const { email, password, dni, rol } = req.body;

  if (!email || !password || !dni || !rol) {
    return res.status(400).json({
      error: "Faltan campos obligatorios",
    });
  }

  if (!["alumno", "admin"].includes(rol)) {
    return res.status(400).json({
      error: "Rol inválido",
    });
  }

  try {
    // if (rol !== "admin") {
    //   return res.status(400).json({
    //     error: "El rol debe ser exactamente 'admin'."
    //   });
    // }

      const { data: emailExiste } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .single();

    if (emailExiste) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    
    const { data: dniExiste } = await supabase
      .from('usuarios')
      .select('dni')
      .eq('dni', dni)
      .single();

    if (dniExiste) {
      return res.status(400).json({ error: "El DNI ya está registrado." });
    }


   
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { dni, rol },
      },
    });

    if (error) {

      return res.status(400).json({ error: error.message });
    }
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert({ email, dni, rol });

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(200).json({
      message: "Usuario registrado correctamente",
      user: data.user,
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({
      error: err?.message || "Error interno",
    });
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
      .from("usuarios")
      .select("email, dni, rol")
      .eq("email", email)
      .single();

    return res.status(200).json({
      message: "Login exitoso",
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

const changeUserEmailAsAdmin = async (req, res) => {
  const { dni, new_email } = req.body;
  const DNI = Number(dni);
  if (!DNI || !new_email) return;
  res.status(400).json({
    error: "Falta dni o new_email",
  });

  try {
    const { data, error } = await supabase.auth.admin.updateUserById(DNI, {
      email: new_email,
      email_confirm: false,
    });

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Email actualizado correctamente",
      user: data.user,
    });
  } catch (err) {
    console.error("changeUserEmailAsAdmin error:", err);

    return res.status(500).json({
      error: err?.message || "Error interno",
    });
  }
};

module.exports = { register, login, changeUserEmailAsAdmin };
