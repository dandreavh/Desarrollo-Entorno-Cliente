/**
 * @author dandreavh
 * Crea un programa que muestre el número de días que quedan desde hoy hasta el fin de curso 
 * (por ejemplo, el 24 de junio).
 * Recuerda que los meses empiezan desde el número 0
 */

/**@constructor Object Date for current date */
 let fechaActual = new Date();

 /**@constructor Object Date for an specific date */
 const fechaFinCurso = new Date("Jun 24 2023");
 // se extrae la diferencia entre las dos fechas
 let restante = fechaFinCurso - fechaActual;

/**@param (remaining days / transformation time into days) */
 let dias = Math.floor(restante / (1000 * 60 * 60 * 24));
 
// Impresión del resultado
console.log("Para el día de fin de curso (24 de junio) quedan: " + dias + " días.");