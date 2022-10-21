/**
 * @author dandreavh
 * Crea un programa que pida al usuario el valor del radio y muestre por pantalla:
 * El valor del radio.
 * El valor del diámetro.
 * El valor del perímetro de la circunferencia.
 * El valor del área del círculo.
 * El valor del área de la esfera.
 * El valor del volumen de la esfera.
 * 
 * El valor de Pi debes obtenerlo del objeto Math, no introducirlo manualmente. 
 * Debes escribir al lado si son cm, o cm2, o cm3. 
 * Como datos de muestra, si metes 5, deberías obtener aproximadamente: / 10 / 31,41 /78,54 / 314,15 / 523,59.
 */
const value = parseFloat(prompt("Indique un valor para el radio en cm"));
const pi = (Math.PI).toFixed(2);
let radio = (pi*Math.pow(value, 2)).toFixed(2);
let diametro = (value*2).toFixed(2);
let perimetro = (pi*diametro).toFixed(2);
let areaCirculo = (pi*Math.pow(radio, 2)).toFixed(2);
let areaEsfera = (4*pi*Math.pow(radio, 2)).toFixed(2);
let volumen = (4/3*pi*Math.pow(radio, 3)).toFixed(2);
alert("RESULTADOS:\n-Radio = "+radio+"cm\n-Diámetro = "+diametro+
"cm\n-Perímetro circunsferencia = "+perimetro+"cm2\n-Área círculo = "+areaCirculo+
"cm2\n-Área esfera = "+areaEsfera+"cm2\n-Volumen esfera = "+volumen+"cm3");