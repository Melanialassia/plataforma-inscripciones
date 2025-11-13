// src/services/materias.service.js
const supabase = require("../supabaseClient.js");
// 🔹 Ejemplo de datos simulados (puedes conectar a BD después)
const materias = [
  { id: 1, nombre: "Matemática", profesor: "Juan Pérez" },
  { id: 2, nombre: "Programación", profesor: "Ana Gómez" },
  { id: 3, nombre: "Base de Datos", profesor: "Carlos López" },
];

// 🔹 Función para obtener todas las materias
async function obtenerTodos() {
  // En un sistema real, aquí iría la consulta a la base de datos
  return materias;
}

module.exports = {
  obtenerTodos,
};
