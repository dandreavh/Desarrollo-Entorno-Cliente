/**
 * @author dandreavh
 */
/**
 * Vuestro programa debe leer una cadena de teclado (puede contener número y otros caracteres).
Además debe leer por teclado la positionición donde debe cambiarse el estado de mayúscula a minúscula y viceversa. Si el valor es 3, significa que en la positionición 2, 5, 8 se cambiarán los caracteres. Recordar que se empieza en la positionición 0.
No se puede utilizar arrays.
Ejemplos de uso:
"01a01b01C01d" con el valor 3 se convierte en "01A01B01c01D"
"Hola" con valor 1 se convierte en "hOLA"
 */


function transform() {
    debugger
    let text = document.getElementById("text").value;
    let position = parseInt(document.getElementById("option").value);

    for (let i=position-1; i<text.length;i=i+position) {
        if (text.charAt(i)==text.charAt(i).toUpperCase()) {
            text=text.substr(0,i)+text.charAt(i).toLowerCase()+text.substr(i+1);
        } else {
            text=text.substr(0,i)+text.charAt(i).toUpperCase()+text.substr(i+1);
        }
    }
    document.getElementById("result").innerHTML= "Nuevo formato: " +text;
}