// models.js

class StudentDTO {
  constructor(dni, name, last_name, quota_day) {
    this.dni = dni; // ahora DNI como identificador
    this.name = name;
    this.last_name = last_name;
    this.quota_day = quota_day;
  }
}

class TeacherDTO {
  constructor(id, name, last_name, password, email, speciality, active = false, availability = false) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
    this.speciality = speciality;
    this.active = active;
    this.availability = availability;
  }
}

class CourseDTO {
  constructor(id, teacher, course_name, start_hour, end_hour) {
    this.id = id;
    this.teacher = teacher;
    this.course_name = course_name;
    this.start_hour = start_hour;
    this.end_hour = end_hour;
  }
}

class SubjectDTO {
  constructor(id, subject, correlative = []) {
    this.id = id;
    this.subject = subject;
    this.correlative = correlative; // array de IDs de materias requeridas
  }
}

// Nuevo DTO para inscripciones
class InscripcionDTO {
  constructor(id, dni_alumno, id_materia, estado = 'pre_aprobado', fecha = new Date().toISOString()) {
    this.id = id;
    this.dni_alumno = dni_alumno;
    this.id_materia = id_materia;
    this.estado = estado; // pre_aprobado, aprobado, rechazado
    this.fecha = fecha;
  }
}

module.exports = { StudentDTO, TeacherDTO, CourseDTO, SubjectDTO, InscripcionDTO };
