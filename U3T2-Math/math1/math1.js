/**
 * @author dandreavh
 * Crea un programa que pida al usuario que elija una opción del siguiente menú:
 *      Potencia.
 *      Raíz.
 *      Redondeo.
 *      Trigonometría.
 * Si el usuario introduce 1, se le deberá pedir una base y un exponente y se mostrará el resultado en pantalla (La potencia de X elevado a Y es: )
 * Si el usuario introduce 2, se le pedirá un número (no negativo) y se mostrará el resultado en pantalla (La raíz de X es: )
 * Si el usuario introduce 3, se le pedirá un decimal por pantalla y se mostrará el redondeo al entero más próximo, al alta y a la baja.
 * Si el usuario introduce 4, se le pedirá un ángulo (entre 0 y 360) y se le mostrarán por pantalla los valores trigonométricos del seno, coseno y tangente.
 */
// Menú de opciones, transformado en un número entero
const choise = parseInt(prompt("Indique del 1 al 4:\n1) Potencia\n2) Raíz\n3) Redondeo\n4) Trigonometría"))

if(choise<1 && choise>4){
    // Captura de error
    console.error("Wrong choise");
} else{
    let result;
    let num;
    switch(choise){
        case 1: // Potencia
            let base = parseFloat(prompt("Indique una base"));
            let exponente = parseFloat(prompt("Indique un exponente"));
            result = Math.pow(base, exponente);
            alert("La potencia de "+base+" por el exponente "+exponente+" = "+result);
            break;
        case 2: // Raíz
            num = parseFloat(prompt("Indique un número positivo"));
            result = (num>0) ? alert("La raíz cuadrada de "+num+" es "+Math.sqrt(num)) : alert("Debe ser un número positivo. Recargue");
            break;
        case 3: // Redondeo
            num = parseFloat(prompt("Indique un número decimal"));
            result = Math.round(num);
            alert("El redondeo del número "+num+" es "+result);
            break;
        case 4: // Trigonometría
            num = parseFloat(prompt("Indique un ángulo entre 0 y 360"));
            let seno = Math.sin(num);
            let coseno = Math.cos(num);
            let tangente = Math.tan(num);
            result = (num>=0 && num<=360) ? 
            alert("Trigonometría de "+num+":\n"+"seno = "+seno+"\ncoseno = "+coseno+"\ntangente = "+tangente) : 
            alert("El ángulo debe ser entre 0 y 360. Recargue");
            break;
    }
}
