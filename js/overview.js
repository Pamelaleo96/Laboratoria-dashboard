var TECH = 1800;
var HSE = 1200;

// inicio de funcionalidad de Enrollment

// obtiene el total de estudiantes
function getTotalStudents(students) {
  return students.length;
}

// obtiene el total de deserciones
function getDropoutStudents(students) {
  var totalDropouts = 0;
  var totalStudents = getTotalStudents(students);

  for (var i = 0; i < totalStudents; i++) {
    var student = students[i];

    if (!student.active) {
      totalDropouts++;
    }
  }
  return totalDropouts;
}

// obtiene el total de estudiantes actualmente cursando
function getStudentsCurrentEnrolled(totalStudents, totalDropouts) {
  return totalStudents - totalDropouts;
}

// obtiene el porcentaje de estudiantes con desercion
function getStudentsDropout(totalStudents, totalDropouts) {
  return (totalDropouts / totalStudents * 100).toFixed(2);
}

// crea un objeto para la funcionalidad de enrollment
// con la key studentsCurrentEnrolled y studentsDropout
function enrollment(data, campus = campusDefault, cohort = cohortDefault) {
  var objEnrollment = {};
  var students = getStudents(data, campus, cohort);

  var totalStudents = getTotalStudents(students);
  var totalDropouts = getDropoutStudents(students);

  objEnrollment.studentsCurrentEnrolled = getStudentsCurrentEnrolled(totalStudents, totalDropouts);
  objEnrollment.studentsDropout = getStudentsDropout(totalStudents, totalDropouts);

  return objEnrollment;
}

// var temp = enrollment(data);
// fin de funcionalidad de Enrollment

// inicio de funcionalidad de Achievement --ACHIEVEMENT---

// 70% de la cantidad total de puntos tech
function metTech() {
  return TECH * 0.7;
}

// 70% de la cantidad total de puntos hse
function metHse() {
  return HSE * 0.7;
}

function getTargetedStudents(students) {
  // estudiantes que superan
  var targetedStudents = 0;
  var totalStudents = getTotalStudents(students);

  metTech = metTech(); // TIENE EL VALOR 1800
  metHse = metHse(); // TIENE EL VALOR 1200 -- te permite cambiar facilmente si el cliente pide modificacion 

  for (var i = 0; i < totalStudents; i++) {
    var student = students[i];

    // si la estudiante esta activa
    if (student.active) {
      var totalTech = 0, totalHse = 0;
      var sprints = student.sprints;
      var totalSprints = sprints.length;
      var hasMetTechTarget = false;
      var hasMetHseTarget = false;

      // se recorren todos sus sprints,
      // y se suman los puntos tech y hse
      for (var j = 0; j < totalSprints; j++) {
        var sprint = sprints[j];

        totalTech += sprint.score.tech;
        totalHse += sprint.score.hse;
      }

      hasMetTechTarget = (totalTech / totalSprints) > metTech;
      hasMetHseTarget = (totalHse / totalSprints) > metHse;

      if (hasMetTechTarget && hasMetHseTarget) { // ESTUDIANTES QUE CUMPLEN CON EL PROMEDIO DE 70 % PARA TECH Y HSE
        targetedStudents++;
      }
    }
  }
  return targetedStudents;
}

// porcentaje de estudiantes que cumplen tech y hse
function getAchievementPercent(students, targetedStudents) {
  return (targetedStudents / students * 100).toFixed(2); // toFixed -> redondea
}

// obtiene el total de estudiantes activos
function getActiveStudents(students) {
  var totalActiveStudents = 0;
  var totalStudents = getTotalStudents(students); // 

  for (var i = 0; i < totalStudents; i++) {
    var student = students[i];

    if (student.active) {
      totalActiveStudents++;
    }
  }
  return totalActiveStudents;
}

// crea un objeto para la funcionalidad de achievement
// con la key targetedStudents, totalStudents y targetedStudentsPercent
function achievement(data, campus = campusDefault, cohort = cohortDefault) {
  var objAchievement = {};
  var students = getStudents(data, campus, cohort);

  var targetedStudents = getTargetedStudents(students);
  var totalStudents = getActiveStudents(students);
  var targetedStudentsPercent = getAchievementPercent(totalStudents, targetedStudents); // total de estudiantes y la cantidad de estudiantes que pasaron

  objAchievement.targetedStudents = targetedStudents;
  objAchievement.totalStudents = getActiveStudents(students);
  objAchievement.targetedStudentsPercent = targetedStudentsPercent;

  return objAchievement;
}

var temp = achievement(data);
// fin de funcionalidad de Achievement
