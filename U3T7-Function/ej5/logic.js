/**
 * @author dandreavh
 */
/**
 * Reloj digital. Visualizar en una página html un reloj digital que se va actualizando cada segundo.
Vuestro programa debe generar dicho reloj a partir del objeto Date
El reloj debe mostrarse en un campo de texto
Utilizar la función setInterval para programar que se actualice el campo de texto cada segundo.
 */
setInterval(changeSeconds, 1000);

function changeSeconds() {
    let currentHour = new Date();
    let hour = currentHour.getHours();
    let minute = currentHour.getMinutes();
    let second = currentHour.getSeconds();
    let format = hour + ":" + minute + ":" + second;
    document.getElementById("reloj").value = format;
}