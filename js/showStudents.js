var studentCardTemplate = '<article class="card-student">' +
'<div class="inline-block student-photo">' +
  '<img src="__photo__" alt="__name__">' +
'</div>' +
'<div class="inline-block width-40 student-name">' +
  '<h3>__name__</h3>' +
  '<button class="btn-dropout destructive">Dropout</button>' +
'</div>' +
'<div class="inline-block width-40 student-scores">' +
  '<div class="skills-small inline-block">' +
    '<h4>__tech__%</h4>' +
    '<p>Tech skills</p>' +
  '</div>' +
  '<div class="skills-small inline-block">' +
    '<h4>__hse__%</h4>' +
    '<p>Life skills</p>' +
  '</div>' +
'</div>' +
'</article>';

function showStudentDetail(data, campus = campusDefault, cohort = cohortDefault) {
  var studentsContainer = document.getElementById('container-students');
  
  var students = studentsDetail(data, campus, cohort);

  studentsContainer.innerHTML = ''; // VACIAMOS EL CONTENEDOR PARA VOLVER A USAR EL EVENTO

  students.forEach(student => {
    if (student.active) {
      var studentCard = studentCardTemplate.replace('__photo__', student.photo)
        .replace(/__name__/g, student.name) // G= REMPLAZO LOS NAME
        .replace('__tech__', student.scores.tech)
        .replace('__hse__', student.scores.hse);

      studentsContainer.innerHTML += studentCard; // ACUMULAR EL VALOR DE LOS ESTUDIANTES
    }
  });
}

showStudentDetail(data);
