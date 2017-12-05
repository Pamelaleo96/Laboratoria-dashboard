// inicio de funcionalidad de Enrollment

// obtiene el total de estudiantes
function getTotalStudents(students) {
  return students.length;
}

// obtiene el total de deserciones
function getDropoutStudents(students) {
  var totalDropouts = 0;
  var studentsLength = getTotalStudents(students);

  for (var i = 0; i < studentsLength; i++) {
    var student = students[i];

    if (!student.active) {
      totalDropouts++;
    }
  }
  return totalDropouts;
}

// obtiene el total de estudiantes actualmente cursando
function getStudentsCurrentEnrolled(totalStudents, totalDropouts) {
  return totalStudents - totalDropouts; // OBTIENE A LAS ALUMNAS ACTIVAS  
}

// obtiene el porcentaje de estudiantes con desercion
function getStudentsDropout(totalStudents, totalDropouts) {
  return (totalDropouts / totalStudents * 100).toFixed(2); // CALCULA EL PORCENTAJE DE LAS ALUMNAS DESERTADAS toFixed => convierte number a string
}

// crea un objeto para la funcionalidad de enrollment
// con la key studentsCurrentEnrolled y studentsDropout
function enrollment(data, campus = campusDefault, cohort = cohortDefault) { // CON ESTA FUNCION OBTENDREMOS ESTUDIANTES ACTIVOS Y DESERTADOS
  var objEnrollment = {};
  var students = getStudents(data, campus, cohort); // OJO: getStudents-->obtenemos a las estudiantes mediante la funcion creada en app.js

  var totalStudents = getTotalStudents(students); // TOTAL DE ESTUDIANTES ACTIVAS
  var totalDropouts = getDropoutStudents(students); // TOTAL DE ESTUDIANTES DESERTADAS

  objEnrollment.studentsCurrentEnrolled = getStudentsCurrentEnrolled(totalStudents, totalDropouts); // 2 parametros y una sola funcion VOTARA UN SOLO VALOR (ACTIVAS)
  objEnrollment.studentsDropout = getStudentsDropout(totalStudents, totalDropouts);

  return objEnrollment;
}

var temp = enrollment(data);
// fin de funcionalidad de Enrollment