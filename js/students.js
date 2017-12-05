// detalle de estudiantes

function getScores(student) {
  var objScores = {};
  var sprints = student.sprints; // va a ser un arreglo CONFORMADO POR OBJETOS = SPRINGS
  var totalSprints = sprints.length;
  var techTotal = 0, hseTotal = 0;

  for (var i = 0; i < totalSprints; i++) {
    var sprint = sprints[i];
    
    techTotal += sprint.score.tech;
    hseTotal += sprint.score.hse;
  }

  objScores.tech = (techTotal / (TECH * totalSprints) * 100).toFixed(2); // CALCULA EL PORCENTAJE Y ALMACENA AL OBJETO CREADO AL INICIO
  objScores.hse = (hseTotal / (HSE * totalSprints) * 100).toFixed(2);

  return objScores;
}

function studentsDetail(data, campus = campusDefault, cohort = cohortDefault) {
  var students = getStudents(data, campus, cohort);
  var totalStudents = students.length;

  for (var i = 0; i < totalStudents; i++) {
    // referencia a un elemento
    var student = students[i];

    if (student.active) {
      // se modifica el elemento
      student.scores = getScores(student);
    }
  }
  return students;
}

/* var temp = studentsDetail(data); */
