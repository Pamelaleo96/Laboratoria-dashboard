var TECH = 1800;
var HSE = 1200;

// inicio de funcionalidad de Enrollment

// obtiene el total de deserciones
function getDropoutStudents(students) {
  var totalDropouts = 0;
  var totalStudents = students.length;

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

  var totalStudents = students.length;
  var totalDropouts = getDropoutStudents(students);

  objEnrollment.studentsCurrentEnrolled = getStudentsCurrentEnrolled(totalStudents, totalDropouts);
  objEnrollment.studentsDropout = getStudentsDropout(totalStudents, totalDropouts);

  return objEnrollment;
}

// var temp = enrollment(data);
// fin de funcionalidad de Enrollment

// inicio de funcionalidad de Achievement

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
  var totalStudents = students.length;

  metTech = metTech();
  metHse = metHse();

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

      if (hasMetTechTarget && hasMetHseTarget) {
        targetedStudents++;
      }
    }
  }
  return targetedStudents;
}

// porcentaje de estudiantes que cumplen tech y hse
function getAchievementPercent(students, targetedStudents) {
  return (targetedStudents / students * 100).toFixed(2);
}

// obtiene el total de estudiantes activos
function getActiveStudents(students) {
  var totalActiveStudents = 0;
  var totalStudents = students.length;

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
  var targetedStudentsPercent = getAchievementPercent(totalStudents, targetedStudents);

  objAchievement.targetedStudents = targetedStudents;
  objAchievement.totalStudents = getActiveStudents(students);
  objAchievement.targetedStudentsPercent = targetedStudentsPercent;

  return objAchievement;
}

// var temp = achievement(data);
// fin de funcionalidad de Achievement

// inicio de funcionalidad de Net promoter score ----NPS---

function getProPasDet(ratings) { 
  var obj = {};
  var promoters = 0, passive = 0, detractors = 0;
  var totalSprints = ratings.length; // TOTAL SPRING SEGUN RATINGS

  for (var i = 0; i < totalSprints; i++) {
    var sprint = ratings[i];

    promoters += sprint.nps.promoters; // INGRESA AL OBJETO PROMOTERS Y ACUMULA SU VALOR DEL 1ER PROMOTERS  
    passive += sprint.nps.passive;
    detractors += sprint.nps.detractors;
  }

  obj.promotersPercent = (promoters / totalSprints).toFixed(2); // CALCULAMOS CADA PROPIEDAD Y GUARDAMOS AL OBJETO
  obj.passivePercent = (passive / totalSprints).toFixed(2);
  obj.detractorsPercent = (detractors / totalSprints).toFixed(2);

  return obj;
}

function getNetPrometerScore(data, campus = campusDefault, cohort = cohortDefault) { // FUNCION CON 3 PARAMETORS
  var objNetPrometerScore = null;
  var ratings = getRatings(data, campus, cohort); // TRAE EL VALOR DEL RATING POR SEDE (SE OBTIENE UN ARRAY DE RATINGS)

  objNetPrometerScore = getProPasDet(ratings); // SUS PROPIEDADES DE objNetPrometerScore ->PROMETERS, PASSIVE Y DETRACTORS

  return objNetPrometerScore;
}

function calcNetPrometerScore(promotersPercent, detractorsPercent) {
  return promotersPercent - detractorsPercent; // ESTA FUNCION CALCULA calcNetPrometerScore
}

function netPrometerScore(data, campus = campusDefault, cohort = cohortDefault) {
  var objNetPrometerScore = getNetPrometerScore(data, campus, cohort);

  objNetPrometerScore.nps = calcNetPrometerScore(objNetPrometerScore.promotersPercent, objNetPrometerScore.detractorsPercent); // SE REALIZA EL CALCULO  POR SEPARADO PARA NO AFECTAR LA FUNCION
  
  return objNetPrometerScore;
}

var temp = netPrometerScore(data); // 
// fin de funcionalidad de Net promoter score
