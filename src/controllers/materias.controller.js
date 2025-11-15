const materiaService = require("../services/materias.service.js");

// Listar todas las materias
async function listarMaterias(req, res) {
  try {
    const materias = await materiaService.obtenerTodos();
    res.json({
      success: true,
      materias,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Crear materia
async function crearMateria(req, res) {
  try {
    const { descripcion, id_profesor } = req.body;

    if (!descripcion) {
      res.status(400).json({
        success: false,
        message: "descripcion es requerida",
      });
      return;
    }

    const nuevaMateria = await materiaService.crear({
      descripcion,
      id_profesor,
    });
    res.status(201).json({
      success: true,
      materia: nuevaMateria,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Actualizar materia (por id)
async function actualizarMateria(req, res) {
  try {
    const { id } = req.params;

    const { descripcion, id_profesor } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "id de materia es requerido en params",
      });
      return;
    }

    if (descripcion === undefined && id_profesor === undefined) {
      res.status(400).json({
        success: false,
        message: "Al menos un campo para actualizar es requerido",
      });
      return;
    }

    const materiaActualizada = await materiaService.actualizar(id, {
      descripcion,
      id_profesor,
    });

    if (!materiaActualizada) {
      res.status(404).json({
        success: false,
        message: "Materia no encontrada",
      });
      return;
    }
    res.json({
      success: true,
      materia: materiaActualizada,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// Eliminar materia (por id)
async function eliminarMateria(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "id de materia es requerido en params",
      });
      return;
    }

    const eliminado = await materiaService.eliminar(Number(id));

    if (!eliminado) {
      res.status(404).json({
        success: false,
        message: "Materia no encontrada o no eliminada",
      });
      return;
    }
    res.json({
      success: true,
      message: "Materia eliminada",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  listarMaterias,
  crearMateria,
  actualizarMateria,
  eliminarMateria,
};
