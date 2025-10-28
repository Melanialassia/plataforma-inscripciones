// src/controllers/login.controller.js
const supabase = require('../supabaseClient.js');

async function login(req, res) {
    const { dni } = req.body;

    if (!dni) {
        return res.status(400).json({ success: false, message: "Falta DNI" });
    }

    const { data: usuario, error } = await supabase
        .from('usuarios') // nombre de tu tabla
        .select('*')
        .eq('dni', Number(dni))
        .single();

    if (error || !usuario) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Devuelve el usuario y su rol
    res.json({ success: true, usuario });
}

module.exports = { login };
