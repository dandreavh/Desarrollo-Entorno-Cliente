/**
 * @author dandreavh
 * Crea un programa que pida por parámetro tu cumpleaños (no hace falta el año) y 
 * saque todos los años en que tu cumpleaños va a caer en domingo desde este año hasta el año 2100.
 * Recuerda que los meses empiezan desde el número 0.
 */
// Permite capturar un parámetro introducido de un array de elementos
const arguments = process.argv.slice(2);

// De la currentDate (que es el primer elemento del array anterior) que se pasa con este formato: dd/mm/aaaa, se transforma en un array de 3 elementos
let separatedDate = arguments[0].split("/");

// Instancia de un objeto Date
let birthday = new Date();

// Se cambia el día, que se captura del anterior array, en la primera posición (necesita un incremento)
birthday.setDate(separatedDate[0]+1);

// Se cambia el mes, que se captura del anterior array, en la segunda posición (necesita el decremento)
birthday.setMonth(separatedDate[1]-1);

// Se captura el día
const day = birthday.getDate();

// Se captura el mes
const month = birthday.getMonth();

// Se pone por defecto el año
let year = 2022;

// Se declara el contador de las veces que ocurrirá que caiga en domingo
let counter = 0;

// se ejecutrá hasta que llegue a la fecha límite (2100)
while (birthday.getFullYear() != 2100) { 
  // cuando coincida que el día sea 0 = domingo, el primer día de la semana
  if (birthday.getDay() === 0) {
    // se incrementa el valor del contador
    counter++;
  }
  // independiente de la condición, se incrementa el valor del año (punto de control del bucle)
  year++;
  // se actualiza el valor del año en la fecha del cumpleaños
  birthday.setFullYear(year);
}
// Impresión por consola del valor
console.log("Desde ahora, su cumpleaños caerá en domingo " + counter + " veces");