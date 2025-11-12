const materiaService = require('../services/materias.service.js');

// 📚 Listar todas las materias
async function listarMaterias(req, res) {
  try {
    const materias = await materiaService.obtenerTodos();
    res.json({ success: true, materias });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  listarMaterias,
};
