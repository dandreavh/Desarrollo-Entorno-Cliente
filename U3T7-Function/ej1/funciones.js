/**
 * @authon dandreavh
 */
/**
 * Captura los valores de altura y peso del input del html
 * Vuelca los resultados directamente en el id de referencia
 */
function calcularIMC(){
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    let imc = (weight / Math.pow(height, 2)).toFixed(2);
    document.getElementById("result").innerHTML = "Tu IMC es de " + imc;
}
/**
 * Captura la edad del input del html
 * Utiliza la fórmula de referencia con el número 220
 * Vuelca los resultados directamente en el id de referencia
 */
function calcularFCM(){
    const age = parseInt(document.getElementById("age").value);
    let fcm = 220 - age;
    document.getElementById("result").innerHTML = "Tu FCM es de " + fcm;
}