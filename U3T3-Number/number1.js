/**
 * @author dandreavh
 * Crea un programa que pida al usuario un número entero por pantalla y muestre:
 * Su valor exponencial.
 * El número con 4 decimales.
 * El número en binario.
 * El número en octal.
 * El número en hexadecimal.
 * Utiliza para ello los métodos del objeto Number.
 * Como datos de muestra, si metes 50, deberías obtener: 5e1 / 50.0000 / 00110010 / 62 / 0x32
 */
const num = new Number(parseInt(prompt("Introduzca un número entero")));
let exponencial = num.toExponential();
let decimales = num.toFixed(4);
let binario = num.toString(2);
let octal = num.toString(8);
let hexadecimal = num.toString(16);
alert("RESULTADOS:\n-Valor exponencial = "+exponencial+
"\n-4 decimales = "+decimales+
"\n-Binario = "+binario+
"\n-Octal = "+octal+
"\n-Hexadecimal = "+hexadecimal);