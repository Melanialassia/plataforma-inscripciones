const supabase = require('../supabaseClient.js');

async function login(req, res) {
    const { dni } = req.body;

    if (!dni) {
        return res.status(400).json({ success: false, message: "Falta DNI" });
    }

    const { data: usuario, error } = await supabase
        .from('usuarios') 
        .select('*')
        .eq('dni', Number(dni))
        .single();

    if (error || !usuario) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    
    res.json({ success: true, usuario });
}

module.exports = { login };
