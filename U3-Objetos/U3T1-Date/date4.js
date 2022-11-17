/**
 * @author dandreavh
 * Crea un programa que muestre la hora actual en diferentes formatos, 
 * según el valor que introduzca el usuario por parámetro:
 *      14:35:07 (hora detallada con minutos y segundos)
 *      02:35 PM o 02:35:07 AM (hora con minutos y AM o PM según sea antes o después del medio día)
 */
// Permite capturar un parámetro introducido de un array de elementos
const arguments = process.argv.slice(2);
// Captura de la elección del usuario del array anterior
const choise = arguments[0];
let date = new Date();
// Del objeto creado se obtienen los valores de interés: día, mes, año y día de la semana
let hour = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

// Evaluación de la opción para la ejecución de las distintas estructuras
if(choise==1){
    console.log("op1: "+hour+":"+minutes+":"+seconds);
}else if(choise==2){
    // Comprobación AM o PM
    let format = hour >= 12 ? 'PM' : 'AM'; 
    // Cálculo a 12horas
    hour = hour%12; 
    // Cambio a 12horas
    hour = hour ? hour : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    console.log("op2: "+hour+":"+minutes+" "+format);

}else{
    // Control de error del dato introducido como parámetro
    console.error("Wrong choise");
}