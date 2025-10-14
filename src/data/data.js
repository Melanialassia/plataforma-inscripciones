import { CourseDTO, StudentDTO } from "../models/models.js";


export const LIST_STUDENTS = [
  {
    id: 1,
    name: "Juan",
    last_name: "Perez",
    quota_day: false,
    approved_subject: ["Matematica", "Fisica"],
    courses: [
      {
        id: 12,
        cuorse_name: "Fisica Cuántica",
        start_hour: 20,
        end_hour: 22,
        professor: "Leon",
      },
    ],
  },
  {
    id: 2,
    name: "María",
    last_name: "Gómez",
    quota_day: true,
    approved_subject: ["Química", "Biología"],
    courses: [
      {
        id: 21,
        course_name: "Bioquímica Avanzada",
        start_hour: 18,
        end_hour: 20,
        professor: "Laura",
      },
      {
        id: 22,
        course_name: "Genética Molecular",
        start_hour: 14,
        end_hour: 16,
        professor: "Pedro",
      },
    ],
  },
  {
    id: 3,
    name: "Carlos",
    last_name: "López",
    quota_day: false,
    approved_subject: ["Historia", "Lengua"],
    courses: [
      {
        id: 31,
        course_name: "Historia Contemporánea",
        start_hour: 10,
        end_hour: 12,
        professor: "Ana",
      },
    ],
  },
  {
    id: 4,
    name: "Lucía",
    last_name: "Fernández",
    quota_day: true,
    approved_subject: ["Matematica", "Estadística"],
    courses: [
      {
        id: 41,
        course_name: "Probabilidades y Estadística",
        start_hour: 8,
        end_hour: 10,
        professor: "Sergio",
      },
      {
        id: 42,
        course_name: "Álgebra Lineal",
        start_hour: 16,
        end_hour: 18,
        professor: "Carla",
      },
    ],
  },
  {
    id: 5,
    name: "Diego",
    last_name: "Ramírez",
    quota_day: false,
    approved_subject: ["Programación", "Bases de Datos"],
    courses: [
      {
        id: 51,
        course_name: "Desarrollo Web Avanzado",
        start_hour: 19,
        end_hour: 21,
        professor: "Matías",
      },
    ],
  },
  {
    id: 6,
    name: "Sofía",
    last_name: "Martínez",
    quota_day: true,
    approved_subject: ["Arte", "Diseño Gráfico"],
    courses: [
      {
        id: 61,
        course_name: "Diseño UX/UI",
        start_hour: 9,
        end_hour: 11,
        professor: "Valeria",
      },
    ],
  },
];

export const LIST_SUBJECTS = [
  {
    id: 1,
    subject: "Biología II",
    correlative: ["Biología I"],
  },
  {
    id: 2,
    subject: "Física Cuántica",
    correlative: ["Física Clásica", "Matemática Avanzada"],
  },
  {
    id: 3,
    subject: "Programación II",
    correlative: ["Programación I"],
  },
  {
    id: 4,
    subject: "Álgebra Lineal",
    correlative: ["Matemática I"],
  },
  {
    id: 5,
    subject: "Estadística Aplicada",
    correlative: ["Probabilidades"],
  },
  {
    id: 6,
    subject: "Química Orgánica",
    correlative: ["Química General"],
  },
  {
    id: 7,
    subject: "Historia Contemporánea",
    correlative: ["Historia Moderna"],
  },
  {
    id: 8,
    subject: "Diseño UX/UI",
    correlative: ["Diseño Gráfico"],
  },
  {
    id: 9,
    subject: "Genética Molecular",
    correlative: ["Biología II", "Química Orgánica"],
  },
  {
    id: 10,
    subject: "Bases de Datos Avanzadas",
    correlative: ["Bases de Datos I", "Programación II"],
  },
];

const new_course = new CourseDTO(12, "Leon", "Física Cuántica", 20, 22);

const new_student = new StudentDTO( 1,  "Juan",  "Perez",  false,);

console.log("NUEVA MATERIA:", new_course)

console.log("NUEVO ESTUDIANTE:", new_student)
