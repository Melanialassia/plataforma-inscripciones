// src/middlewares/auth.middleware.js
const supabase = require('../supabaseClient.js');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token no enviado' });

  const token = authHeader.split(' ')[1];
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }

  req.user = data.user.user_metadata; // guardamos el rol y dni
  next();
}

function adminMiddleware(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  if (req.user.rol !== 'admin') return res.status(403).json({ message: 'Solo para administradores' });
  next();
}

module.exports = { authMiddleware, adminMiddleware };
