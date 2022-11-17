/**
 * @author dandreavh
 */


function posicionesNumero(){
    const arrayNumeros = [4,0,3,4,7,3,5,8,1,8,8,0,2,3,1,2,5,7,3,2,5,1];
    const numero = 3;
    let posiciones = [];
    let indiceX = arrayNumeros.indexOf(numero);
    while (indiceX != -1) {
        posiciones.push(indiceX);
        indiceX = arrayNumeros.indexOf(3, indiceX+1);
    }
    alert("El número "+numero+" aparece en las posiciones "+posiciones+" del array "+arrayNumeros);
}

function ordenarArray(){
    const arrayNumeros = [4,0,3,4,7,3,5,8,1,8,8,0,2,3,1,2,5,7,3,2,5,1];
    let arrayPares = [];
    let arrayImpares = [];
    let arrayOrdenado = [];
    for (let i = 0; i < arrayNumeros.length; i++) {
        arrayNumeros[i] % 2 === 0 ? arrayPares.push(arrayNumeros[i]) : arrayImpares.push(arrayNumeros[i])
    }
    arrayPares.sort();
    arrayImpares.sort();
    arrayOrdenado = arrayPares.concat(arrayImpares);
    alert("Original: "+arrayNumeros+"\nOrdenados: "+arrayOrdenado);
}

// PREGUNTAR SI ES ASÍ
function calculaMasAlto(){
    const arrayNumeros =  [232,56,33,876,32,985,729,36,184];
    let arrayOrdenado = structuredClone(arrayNumeros).sort();
    let numMasAlto = arrayOrdenado[arrayOrdenado.length-1];
    alert("Original: "+arrayNumeros+"\nOrdenado: "+arrayOrdenado+"\nNúmero más alto: "+numMasAlto);
}

function calculaNacimiento(){
    const nacimiento = new Date("December 27, 1994 15:25:00:156");
    const milisegundos = nacimiento.getTime();
    const transformado = new Date(milisegundos);
    alert("Original: "+nacimiento.toString()+"\nMilisegundos: "+milisegundos+"\nTransformación de milisegundos: "+transformado.toString());
}

function calculaCumple(){
    const cumple = new Date("December 27, 2022 00:00:00:00");
    const ahora = new Date();
    const milisegundos = (cumple.getTime()-ahora.getTime());
    console.info(milisegundos);
    alert("Cumpleaños: "+cumple.toString()+"\nMilisegundos hasta esa fecha: "+milisegundos);
}

// PREGUNTAR SI ES ASÍ
function calculaTiempoCarga(){   
    console.time("tiempo");
    document.getElementById("tiempo").onclick = (e) => {
        console.timeEnd("tiempo");
    };
}

function crearConSet(){
    const ahora = new Date();
    ahora.setHours(26);
    // hace un cambio de día, contando el tiempo hasta el siguiente del actual, porque cuenta las horas que debe incrementar
    console.log(ahora);
    ahora.setMinutes(65);
    // hace un cambio de hora, contando el tiempo hasta el siguiente del actual, porque cuenta los minutos totales a incrementar
    console.log(ahora);
}

function crearconMonth(){
    let fecha = new Date(2018,01,20);
    fecha.setDate(35);
    // Hace el cálculo de total de días
    console.log(fecha);
}