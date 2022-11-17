/**
 * @author dandreavh
 * Crea un programa que muestre la fecha actual en diferentes formatos, 
 * según el valor que introduzca el usuario por parámetro:
 *      15/10/2020
 *      Jueves, 15 de octubre de 2020.
 *      Thursday, October 15, 2020.
 */
// Permite capturar un parámetro introducido de un array de elementos
const arguments = process.argv.slice(2);
// Captura de la elección del usuario del array anterior
const choise = arguments[0];
let date = new Date();
// Del objeto creado se obtienen los valores de interés: día, mes, año y día de la semana
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
let weekDay = date.getDay();

// Evaluación de la opción para la ejecución de las distintas estructuras
if(choise==1){
    console.log("op1: "+day+"/"+month+"/"+year);
}else if(choise==2){
    switch(weekDay){
        case 0: weekDay = "Domingo"; break;
        case 1: weekDay = "Lunes"; break;
        case 2: weekDay = "Martes"; break;
        case 3: weekDay = "Miércoles"; break;
        case 4: weekDay = "Jueves"; break;
        case 5: weekDay = "Viernes"; break;
        case 6: weekDay = "Sábado"; break;
    }
    switch(month){
        case 1: month = "enero"; break;
        case 2: month = "febrero"; break;
        case 3: month = "marzo"; break;
        case 4: month = "abril"; break;
        case 5: month = "mayo"; break;
        case 6: month = "junio"; break;
        case 7: month = "julio"; break;
        case 8: month = "agosto"; break;
        case 9: month = "septiembre"; break;
        case 10: month = "octubre"; break;
        case 11: month = "noviembre"; break;
        case 12: month = "diciembre"; break;
    }
    console.log("op2: "+weekDay+", "+day+" de "+month+" de "+year+".");

}else if(choise==3){
    // PREGUNTAR SI ES ESTE FORMATO O LITERALMENTE EL OTRO
    console.log("op3: " + date.toDateString());

}else{
    // Control de error del dato introducido como parámetro
    console.error("Wrong choise");
}