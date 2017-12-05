/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);

// se crearan las keys cohorts y cohortsList, las cuales representan
// el numero de cohortes y una lista de las cohortes respectivamente
var centers = [ // CREAR UN OBJETO LLAMADO CENTER (HARDCORE pero valido) AUTOMATIZA EL ANALIZIS DE LA DATA AGREGA KEYS AL OBJETO DATA
  {name: 'arequipa', // 0
    key: 'AQP'}, // 0
  {name: 'ciudad de mexico',
    key: 'CDMX'},
  {name: 'lima',
    key: 'LIM'},
  {name: 'santiago de chile',
    key: 'SCL'}
];

// se crean la cantidad de cohortes por sede
// y la lista de sus cohortes
function getCohorts() {
  for (var i = 0; i < centers.length; i++) { // RECORRE LAS SEDES
    // cohortes por sede
    keys = Object.keys(data[centers[i].key]); // OBTENGO LOS KEYS DE LAS GENERACIONES EJM(2016-2) INGRESO AL OBJETO SEDE  Y ACCEDO A LAS GENERACIONES DE CADA SEDE[i]
    // numero de cohortes
    centers[i].cohorts = keys.length; // ALMACENA LAS POSICIONES DE LOS ARRAYS (0, 1, 2 ...)
    // cohortes
    centers[i].cohortsList = keys;  // DEVUELVE LOS VALORES SEGUN SUS POSICION EJM(LIMA, 0)
  }
}

getCohorts(); // DECLARA FUNCIONES
var ZERO = 0; // POSICION CON LA QUE INICIARA
var campusDefault = centers[ZERO].key; // ACCEDERA AL KEY: AQP
var cohortDefault = centers[ZERO].cohortsList[ZERO]; // cohortsList ES 2016-1, 2016-2..

// Función que retorna estudiantes del campus y cohort seleccionado
function getStudents(data, campus = campusDefault, cohort = cohortDefault) { // EN UNA SOLA FUNCION OBTENGO EL TOTAL DE ESTUDIANTES
  return data[campus][cohort].students;
}

/* var temp = getStudents(data); */
