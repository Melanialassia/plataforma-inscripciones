const supabase = require('../supabaseClient.js');

/**
 * Crear inscripción de un alumno a una materia verificando requisitos
 */
async function crearInscripcion(dniAlumno, idMateria) {
  const dni = Number(dniAlumno);

  // 1️⃣ Verificar alumno
  const { data: alumno, error: errorAlumno } = await supabase
    .from('Alumnos')
    .select('*')
    .eq('dni', dni)
    .single();

  if (errorAlumno || !alumno) {
    return { success: false, message: 'Alumno no encontrado', error: errorAlumno };
  }

  // 2️⃣ Verificar materia
  const { data: materia, error: errorMateria } = await supabase
    .from('Materias')
    .select('*')
    .eq('id', idMateria)
    .single();

  if (errorMateria || !materia) {
    return { success: false, message: 'Materia no encontrada', error: errorMateria };
  }

  // 3️⃣ Verificar si ya está inscripto
  const { data: inscripcionExistente, error: errorExistente } = await supabase
    .from('Inscripcion_Alumnos')
    .select('*')
    .eq('dni_alumno', dni)
    .eq('id_materia', idMateria);

  if (errorExistente) {
    return { success: false, message: 'Error al verificar inscripción existente', error: errorExistente };
  }

  if (inscripcionExistente.length > 0) {
    return { success: false, message: 'El alumno ya está inscripto en esta materia' };
  }

  // 4️⃣ Verificar correlativas
  const materiasAprobadas = alumno.materias_aprobadas || [];
  const correlativas = materia.correlativas || [];
  const cumpleCorrelativas = correlativas.every(c => materiasAprobadas.includes(c));
  const estadoInscripcion = cumpleCorrelativas ? 'pre_aprobado' : 'pendiente';

  // 5️⃣ Crear inscripción
  const { data: nuevaInscripcion, error: errorCrear } = await supabase
    .from('Inscripcion_Alumnos')
    .insert([{
      dni_alumno: dni,
      nombre_alumno: alumno.nombre,
      id_materia: idMateria,
      estado: estadoInscripcion,
      fecha_solicitud: new Date().toISOString(),
    }])
    .select();

  if (errorCrear) {
    return { success: false, message: 'Error al crear inscripción', error: errorCrear };
  }

  return { success: true, message: 'Inscripción creada correctamente', inscripcion: nuevaInscripcion[0] };
}

/**
 * Aprobar inscripción por admin
 */
async function aprobarInscripcion(dniAlumno, idMateria) {
  const dni = Number(dniAlumno);

  // 1️⃣ Buscar inscripción
  const { data: inscripcion, error: errorBuscar } = await supabase
    .from('Inscripcion_Alumnos')
    .select('*')
    .eq('dni_alumno', dni)
    .eq('id_materia', idMateria)
    .single();

  if (errorBuscar || !inscripcion) {
    return { success: false, message: 'Inscripción no encontrada', error: errorBuscar };
  }

  // 2️⃣ Actualizar estado a "aprobado"
  const { data: inscripcionActualizada, error: errorActualizar } = await supabase
    .from('Inscripcion_Alumnos')
    .update({ estado: 'aprobado', fecha_aprobacion: new Date().toISOString() })
    .eq('dni_alumno', dni)
    .eq('id_materia', idMateria)
    .select();

  if (errorActualizar) {
    return { success: false, message: 'Error al aprobar inscripción', error: errorActualizar };
  }

  return { success: true, message: 'Inscripción aprobada', inscripcion: inscripcionActualizada[0] };
}

module.exports = { crearInscripcion, aprobarInscripcion };
