/**
 * @author dandreavh
 * Crea un programa que pida al usuario su nombre y apellidos y muestre:
 * El tamaño del nombre más los apellidos (sin contar espacios).
 * La cadena en minúsculas y en mayúsculas.
 * Que divida el nombre y los apellidos y los muestre en 3 líneas, donde ponga Nombre: / Apellido1: / Apellido 2:
 * Una propuesta de nombre de usuario, compuesto por la inicial del nombre, el 1er apellido y la inicial del 2do apellido: 
 * ej. Para José María García Durán sería jgarciad.
 * Una propuesta de nombre de usuario compuesto por las 3 primeras letras del nombre y delos dos apellidos: 
 * ej. josgardur.
 */
const fullName = prompt("Introduzca su nombre y sus apellidos");
let together =  new String(fullName.replaceAll(" ", ""));
let lenght = parseInt(together.length);
let upper = fullName.toUpperCase();
let lower = fullName.toLowerCase();
let divided = fullName.split(" ");
let nombre = divided[0].toString();
let firstSurname = divided[1].toString();
let secondSurname = divided[2].toString();
let userType1 = (nombre.charAt(0)+firstSurname+secondSurname.charAt(0)).toLowerCase();
let userType2 = (nombre.substring(0,3)+firstSurname.substring(0,3)+secondSurname.substring(0,3)).toLowerCase();

alert("RESULTADOS:\nTamaño del nombre sin espacios = "+lenght+
"\nEn mayúsculas = "+upper+
"\nEn minúsculas = "+lower+
"\nDividida = Nombre: "+nombre+"\n                 Apellido 1: "+firstSurname+"\n                 Apellido 2: "+secondSurname+
"\nPropuesta usuario 1 = "+userType1+
"\nPropuesta usuario 2 = "+userType2);