var TECH = 1800;
var HSE = 1200;

// *** inicio de funcionalidad de Enrollment

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
// --- fin de funcionalidad de Enrollment

// *** inicio de funcionalidad de Achievement

// 70% de la cantidad total de puntos tech
function calcMetTech() {
  return TECH * 0.7;
}

// 70% de la cantidad total de puntos hse
function calcMetHse() {
  return HSE * 0.7;
}

function getTargetedStudents(students) {
  // estudiantes que superan
  var targetedStudents = 0;
  var totalStudents = students.length;

  metTech = calcMetTech();
  metHse = calcMetHse();

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
// --- fin de funcionalidad de Achievement

// *** inicio de funcionalidad de Net promoter score

function getProPasDet(ratings) {
  var obj = {};
  var promoters = 0, passive = 0, detractors = 0;
  var totalSprints = ratings.length;

  for (var i = 0; i < totalSprints; i++) {
    var sprint = ratings[i];

    promoters += sprint.nps.promoters;
    passive += sprint.nps.passive;
    detractors += sprint.nps.detractors;
  }

  obj.promotersPercent = (promoters / totalSprints).toFixed(2);
  obj.passivePercent = (passive / totalSprints).toFixed(2);
  obj.detractorsPercent = (detractors / totalSprints).toFixed(2);

  return obj;
}

function getNetPrometerScore(data, campus = campusDefault, cohort = cohortDefault) {
  var objNetPrometerScore = null;
  var ratings = getRatings(data, campus, cohort);

  objNetPrometerScore = getProPasDet(ratings);

  return objNetPrometerScore;
}

function calcNetPrometerScore(promotersPercent, detractorsPercent) {
  return promotersPercent - detractorsPercent;
}

function netPrometerScore(data, campus = campusDefault, cohort = cohortDefault) {
  var objNetPrometerScore = getNetPrometerScore(data, campus, cohort);

  objNetPrometerScore.nps = calcNetPrometerScore(objNetPrometerScore.promotersPercent, objNetPrometerScore.detractorsPercent);

  return objNetPrometerScore;
}

var temp = netPrometerScore(data);
// --- fin de funcionalidad de Net promoter score

// *** inicio funcionalidad de Tech Skills

function getTechTargetedStudents(students) {
  var targetedStudents = 0;
  var totalStudents = students.length;
  var metTech = calcMetTech();

  for (var i = 0; i < totalStudents; i++) {
    var student = students[i];

    if (student.active) {
      var techTotal = 0;
      var sprints = student.sprints;
      var totalSprints = sprints.length;
      var averageTech = 0;

      for (var j = 0; j < totalSprints; j++) {
        var sprint = sprints[j];

        techTotal += sprint.score.tech;
      }

      averageTech = techTotal / totalSprints;

      if (averageTech > metTech) {
        targetedStudents++;
      }
    }
  }
  return targetedStudents;
}

function getTechTargetedPercent(targetedStudents, totalStudents) {
  return (targetedStudents / totalStudents * 100).toFixed(2);
}

function techSkills(data, campus = campusDefault, cohort = cohortDefault) {
  var objTechSkills = {};
  var students = getStudents(data, campus, cohort);

  objTechSkills.targetedStudents = getTechTargetedStudents(students);
  objTechSkills.totalStudents = getActiveStudents(students);
  objTechSkills.targetedStudentsPercent = getTechTargetedPercent(objTechSkills.targetedStudents, objTechSkills.totalStudents);

  return objTechSkills;
}

// var temp = techSkills(data);

// --- fin funcionalidad de Tech Skills

// *** inicio funcionalidad de Life Skills

function getHseAverage(students) {
  var targetedStudents = 0, overallHse = 0;
  var totalStudents = students.length;

  for (var i = 0; i < totalStudents; i++) {
    var student = students[i];

    if (student.active) {
      var totalHse = 0;
      var sprints = student.sprints;
      var totalSprints = sprints.length;

      for (var j = 0; j < totalSprints; j++) {
        var sprint = sprints[j];

        totalHse += sprint.score.hse;
      }

      overallHse += Number((totalHse / totalSprints).toFixed(2));
      targetedStudents++;
    }
  }
  return (overallHse / targetedStudents).toFixed(2);
}

function getHseTargetedStudents(students) {
  var targetedStudents = 0;

  for (var i = 0, l = students.length; i < l; i++) {
    var student = students[i];

    if (student.active) {
      var hseTotal = 0;
      var sprints = student.sprints;

      for (var j = 0, sl = sprints.length; j < sl; j++) {
        var sprint = sprints[j];

        hseTotal += sprint.score.hse;
      }

      var averageHse = hseTotal / sprints.length;

      if (averageHse > 840) {
        targetedStudents++;
      }
    }
  }
  return targetedStudents;
}

function lifeSkills(data, campus = campusDefault, cohort = cohortDefault) {
  var objLifeSkills = {};
  var students = getStudents(data, campus, cohort);

  objLifeSkills.avgHse = getHseAverage(students);
  objLifeSkills.targetedStudents = getHseTargetedStudents(students);

  return objLifeSkills;
}

/* var temp = lifeSkills(data); */
// --- fin funcionalidad de Life Skills

// *** inicio funcionalidad de Student satisfaction

function getLastStudentSatisfaction(ratings) {
  var studentSatisfaction = 0;
  // ultimo sprint
  var lastSprint = ratings.length - 1;

  var studentRating = ratings[lastSprint].student;
  studentSatisfaction = studentRating.cumple + studentRating.supera;

  return studentSatisfaction.toFixed(2);
}

function studentSatisfaction(data, campus = campusDefault, cohort = cohortDefault) {
  var ratings = getRatings(data, campus, cohort);

  return getLastStudentSatisfaction(ratings);
}

/* var temp = studentSatisfaction(data); */
// --- fin funcionalidad de Student satisfaction

// *** inicio funcionalidad de Teacher reating

function getLastTeacherRating(ratings) {
  var teacherRating = 0;
  // ultimo sprint
  var lastSprint = ratings.length - 1;

  teacherRating = ratings[lastSprint].teacher;

  return teacherRating.toFixed(2);
}

function teacherRating(data, campus = campusDefault, cohort = cohortDefault) {
  var ratings = getRatings(data, campus, cohort);

  return getLastTeacherRating(ratings);
}

var temp = teacherRating(data); // argumento para que ejecute la funcion
// --- fin funcionalidad de Teacher reating
