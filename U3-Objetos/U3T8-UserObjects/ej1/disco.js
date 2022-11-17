/**
 * @author dandreavh
 */

/**
 * Parte 1
 */
function Disco() {
  /** ------------ Propiedades ------------- */
  /**@type {String} Nombre del disco */
  this.nombre = "";
  /**@type {String} Nombre del cantante o grupo */
  this.cantante = ""
  /**@type {String} Año de publicación */
  this.publicacion = "";
  /**@type {String} Estilo musical */
  this.tipo = "";
  /**@type {Number} Estantería donde se encuentra */
  this.localizacion = 0;
  /**@type {Boolean} Indica si se encuentra prestado */
  this.prestado = false;

  /** ------------- Métodos ------------- */
  /**
   * Constructor del objeto con propiedades pasadas por parámetro
   * @param {String} nombre 
   * @param {String} cantante 
   * @param {String} publicacion 
   * @param {String} tipo 
   * @param {Number} localizacion 
   */
  this.incluirPropiedades = function incluirPropiedades(nombre, cantante, publicacion, tipo, localizacion) {
    this.nombre = nombre;
    this.cantante = cantante;
    this.publicacion = publicacion;
    /**@type {Array} constante que establece los valores permitos para el tipo de música en un array*/
    const tipos = ["rock", "pop", "punk", "indie"];
    // Evalúa si lo que ha introducido el usuario está en el array establecido anteriormente, en caso de no ser así, se dejará el valor por defecto
    if (tipos.includes(tipo.toLowerCase())) {
      this.tipo = tipo.toLowerCase();
    }
  }
  /**
   * Cambiar el número de la localización
   * @param {Number} numero 
   */
  this.cambiaLocalizacion = function cambiaLocalizacion(numero) {
    this.localizacion = numero;
  }
  /**
   * Cambiar la propiedad Prestado
   * @param {Boolean} booleano 
   */
  this.cambiaPrestado = function cambiaPrestado(booleano) {
    this.prestado = booleano;
  }
  /** 
   * Muestra toda la información de un disco 
   * @return {String} Disco completo
  */
  this.muestraDisco = function muestraDisco() {
    /**@type {String} Datos completos del disco */
    let disco = ("Nombre del disco: " + this.nombre +
      "<br>||Cantante o grupo: " + this.cantante +
      "<br>||Año de publicación: " + this.publicacion +
      "<br>||Tipo de música: " + this.tipo +
      "<br>||Localización de la estantería: " + this.localizacion +
      "<br>||¿Está prestado? " + this.prestado)
    return disco;
  }
}

/**
 * Parte 2
 */

/** @type {Array} vector vacío de discos */
let discos = [];

/** Objetos discos */
// Creación
/** @type {Disco} */
let disco1 = new Disco();
/** @type {Disco} */
let disco2 = new Disco();
/** @type {Disco} */
let disco3 = new Disco();
/** @type {Disco} */
let nuevoDisco = new Disco();
// Llama a la función que tiene el objeto para añadir las propiedades
disco1.incluirPropiedades("Más", "Alejandro Sanz", "1997", "pop", 34);
disco2.incluirPropiedades("Señora", "Rocío Jurado", "1979", "pop", 46);
disco3.incluirPropiedades("Out of Time", "R.E.M.", "1991", "rock", 12);
nuevoDisco.incluirPropiedades("Ramones", "Ramones", "1976", "punk", 58);
// Se añade cada disco al array
discos.push(disco1);
discos.push(disco2);
discos.push(disco3);

/** Cuando el usuario cargue la página, se llama a la función que muestra las opciones */
window.onload = cargarOpciones();

/** ------ FUNCIONES ------ */
/** Función que carga las opciones */
function cargarOpciones() {
  /**@type {console.error} constante de ámbito general para control de dato erróneo introducido*/
  const opcionErronea = console.error("Opción errónea");
  /**@type {Number} Elección del usuario mediante prompt con nuevo tipado */
  const menu = parseInt(prompt("Indique qué acción desea realizar:" +
    "\n1-Mostrar número de discos" +
    "\n2-Mostrar listado de discos" +
    "\n3-Mostrar un intervalo de discos" +
    "\n4-Añadir un disco" +
    "\n5-Borrar un disco" +
    "\n6-Consultar un disco"));
  // Evaluación de los casos
  switch (menu) {
    case 1:
      document.getElementById("enunciado").innerHTML = "1. Muestra el número de discos que hay en la lista";
      document.getElementById("resultados").innerHTML = "Hay "+numeroDiscos(discos)+" discos en la lista";
      break;
    case 2:
      /** @type {Number} Elección del usuario mediante prompt con nuevo tipado */
      const o2 = parseInt(prompt("¿Cómo desea que se muestren?" +
        "\n1-Orden natural del array" +
        "\n2-Orden inverso" +
        "\n3-Orden alfabético"));
      // Evaluación de los casos con control de error
      if (o2 < 1 || o2 > 3) {
        opcionErronea;
      } else {
        // Llamada a la función, indicando los parámetros
        if(o2===1){
          document.getElementById("enunciado").innerHTML = "2. Muestra los discos en el orden natural";
          document.getElementById("resultados").innerHTML = mostrarOrdenNatural(discos);
        } else if(o2===2){
          document.getElementById("enunciado").innerHTML = "2. Muestra los discos en el orden inverso";
          document.getElementById("resultados").innerHTML = mostrarOrdenInverso(discos);
        } else if(o2===3){
          document.getElementById("enunciado").innerHTML = "2. Muestra los discos en orden alfabético";
          document.getElementById("resultados").innerHTML = mostrarOrdenAlfabetico(discos);
        }
      }
      break;
    case 3:
      /**@type {Array} Datos introducidos por el usuario mediante prompt con nuevo tipado*/
      const limites = (prompt("Indica el inicio y el fin sigiendo este formato: 0-3")).split("-");
      /** @type {Number} parseado del String en posición 0 del array 'limites' */
      const inicio = parseInt(limites[0]);
      /** @type {Number} parseado del String en posición 1 del array 'limites' */
      const fin = parseInt(limites[1]);
      // Llamada a la función, indicando los parámetros
      document.getElementById("enunciado").innerHTML = "3. Muestra los discos dentro de un intervalo";
      document.getElementById("resultados").innerHTML = mostrarIntervalo(inicio,fin, discos);
      break;
    case 4:
      /**@type {Number} Datos introducidos por el usuario mediante prompt con nuevo tipado*/
      const o4 = parseInt(prompt("¿Dónde desea añadir?"+
                              "\n1-Al principio"+
                              "\n2-Al final"));
      // Evaluación de los casos con control de error
      if (o4 < 1 || o4 > 2) {
        opcionErronea;
      } else {
        // Llamada a la función, indicando los parámetros
        if(o4=== 1){
          document.getElementById("enunciado").innerHTML = "4. Añade disco al principio de la lista";
          document.getElementById("resultados").innerHTML = "Se ha añadido: "+nuevoDisco.muestraDisco()+"<br>Ahora hay "+agregarPrincipio(nuevoDisco, discos)+" discos en la lista.";
        } else if(o4===2) {
          document.getElementById("enunciado").innerHTML = "4. Añade disco al principio de la lista";
          document.getElementById("resultados").innerHTML = "Se ha añadido: "+nuevoDisco.muestraDisco()+"<br>Ahora hay "+agregarFinal(nuevoDisco, discos)+" discos en la lista.";
        }
      }
      break;
    case 5:
      /**@type {Number} Datos introducidos por el usuario mediante prompt con nuevo tipado*/
      const o5 = parseInt(prompt("¿De dónde desea borrar?"+
                              "\n1-Del principio"+
                              "\n2-Del final"));
      // Evaluación de los casos con control de error                        
      if (o5 < 1 || o5 > 2) {
        opcionErronea;
      } else {
        // Llamada a la función, indicando los parámetros
        if(o5=== 1){
          document.getElementById("enunciado").innerHTML = "5. Borra el primer disco de la lista";
          document.getElementById("resultados").innerHTML = "Se ha eliminado:<br>"+(borrarPrincipio(discos)).muestraDisco()+"<br>Ahora hay "+numeroDiscos(discos)+" discos en la lista."; 
        } else if(o5===2) {
          document.getElementById("enunciado").innerHTML = "5. Borra el último disco de la lista";
          document.getElementById("resultados").innerHTML = "Se ha eliminado:<br>"+(borrarFinal(discos)).muestraDisco()+"<br>Ahora hay "+numeroDiscos(discos)+" discos en la lista."; 
        }
      }
      break;
    case 6:
      /**@type {Number} Datos introducidos por el usuario mediante prompt con nuevo tipado*/
      const o6 = parseInt(prompt("¿Cómo desea consultar el disco?"+
                              "\n1-Por nombre"+
                              "\n2-Por posición"));
      // Evaluación de los casos con control de error  
      if (o6 < 1 || o6 > 2) {
        opcionErronea;
      } else {
        // Llamada a la función, indicando los parámetros
        if(o6=== 1){
          let nombre = prompt("Indique el nombre el disco (Más, Señora o Out of Time)");
          document.getElementById("enunciado").innerHTML = "6. Consulta disco de la lista por nombre";
          document.getElementById("resultados").innerHTML = consultarXNombre(nombre, discos);
        } else if(o6===2) {
          let posicion = parseInt(prompt("Indique la posición (0-2)"));
          document.getElementById("enunciado").innerHTML = "6. Consulta disco de la lista por posición";
          document.getElementById("resultados").innerHTML = consultarXPosicion(posicion, discos);
        }
      }
      break;
    case (menu < 1 || menu > 6):
      // Control de datos erróneos
      opcionErronea;
      break;
  }
}

/**
 * Función para calcular la cantidad de discos que hay en el array
 * @param {Array} discos 
 * @returns {Number} tamaño del array = cantidad de discos
 */
function numeroDiscos(discos){
  console.log("En la función que devuelve el tamaño del array de discos");
  return discos.length;
}

/**
 * Función para mostrar los discos que hay en el array con el orden que tienen por defecto
 * @param {Array} discos 
 * @returns {String} Muestra todo lo que contiene el array = lista de discos
 */
function mostrarOrdenNatural(discos){
  console.log("En la función que muestra los objetos en el orden natural de almacenamiento y devuelve un string para ser impreso en html");
  /** @type {String} lista para poder visualizar */
  let lista = "";
  for (let i=0; i<discos.length; i++) {
    // incorpora un salto de línea para que sea más legible
    lista += discos[i].muestraDisco()+"<br><br>";    
  }
  return lista;
}

/**
 * Función para mostrar los discos que hay en el array ordenados a la inversa
 * @param {Array} discos 
 * @returns {String} Muestra todo lo que contiene el array = lista de discos
 */
function mostrarOrdenInverso(discos){
  console.log("En la función que muestra los objetos ordenados al contrario de como han sido almacenados y devuelve un string para ser impreso en html");
  /** @type {String} lista para poder visualizar */
  let lista = "";
  // hace la inversión de orden
  discos.reverse();
  for (let i=0; i<discos.length; i++) {
    // incorpora un salto de línea para que sea más legible
    lista += discos[i].muestraDisco()+"<br><br>";    
  }
  return lista;
}

/**
 * Función para mostrar los discos que hay en el array ordenados alfabéticamente
 * @param {Array} discos 
 * @returns {String} Muestra todo lo que contiene el array = lista de discos
 */
function mostrarOrdenAlfabetico(discos){
  console.log("En la función que muestra los objetos ordenados alfabéticamente y devuelve un string para ser impreso en html");
  /** @type {String} lista para poder visualizar */
  let lista = "";
  // hace la reordenación con una función flecha por el nombre del disco
  discos.sort((a,b)=>a.nombre-b.nombre);
  for (let i=0; i<discos.length; i++) {
    // incorpora un salto de línea para que sea más legible
    lista += discos[i].muestraDisco()+"<br><br>";    
  }
  return lista;
}

/**
 * Función para mostrar solo algunos discos, es decir, los que se encuentren dentro del intervalo indicado
 * @param {Number} inicio posición inclusiva
 * @param {Number} fin posición exclusiva
 * @param {Array} discos 
 * @returns {String} Muestra todo lo que haya dentro del intervalo
 */
function mostrarIntervalo(inicio,fin, discos){
  console.log("En la función que muestra los objetos que haya dentro de un intervalo y devuelve un string para ser impreso en html");
  /** @type {String} lista para poder visualizar */
  let lista = "";
  // hace la división del array
  let intervalo = discos.slice(inicio, fin);
  for (let i=0; i<intervalo.length; i++) {
    // incorpora un salto de línea para que sea más legible
    lista += intervalo[i].muestraDisco()+"<br><br>";    
  }
  return lista;
}

/**
 * Función para añadir un nuevo objeto disco al principio del array
 * @param {Disco} nuevoDisco disco a introducir
 * @param {Array} discos lugar donde se almacena
 * @returns {Number} Longitud del nuevo array con el nuevo elemento(+1)
 */
function agregarPrincipio(nuevoDisco, discos){
  console.log("En la función que añade un objeto al principio del array, devuelve la nueva longitud del array");
  return discos.unshift(nuevoDisco);
}

/**
 * Función para añadir un nuevo objeto disco al final del array
 * @param {Disco} nuevoDisco disco a introducir
 * @param {Array} discos lugar donde se almacena
 * @returns {Number} Longitud del nuevo array con el nuevo elemento(+1)
 */
function agregarFinal(nuevoDisco, discos){
  console.log("En la función que añade un objeto al final del array, devuelve la nueva longitud del array");
  return discos.push(nuevoDisco);
}

/**
 * Función para borrar el primer elemento del array
 * @param {Array} discos 
 * @returns {Disco} | {Undefined} si el array está vacío. Devuelve el disco eliminado
 */
function borrarPrincipio(discos){
  console.log("En la función que elimina el primer objeto del array, devuelve el objeto eliminado o indifinido si está vacío");
  return discos.shift();
}

/**
 * Función para borrar el último elemento del array
 * @param {Array} discos 
 * @returns {Disco} | {Undefined} si el array está vacío. Devuelve el disco eliminado
 */
function borrarFinal(discos){
  console.log("En la función que elimina el último objeto del array, devuelve el objeto eliminado o indifinido si está vacío");
  return discos.pop();
}

/**
 * Función para consultar un disco del array por su nombre
 * @param {String} nombre nombre del disco
 * @param {Array} discos listado donde buscar
 * @returns {Disco} llama a la función del objeto para mostrar sus propiedades
 */
function consultarXNombre(nombre, discos){
  console.log("En la función que extrae un Disco del Array y lo devuelve invocando a la función que muestra sus propiedades");
  /** @type {Number} ubicación del disco que tiene tiene ese nombre */
  let result = discos.filter(disco => disco.nombre === nombre);
  return result[0].muestraDisco();
}

/**
 * Función para consultar un disco del array por su posición
 * @param {String} nombre nombre del disco
 * @param {Array} discos listado donde buscar
 * @returns {Disco} llama a la función del objeto para mostrar sus propiedades
 */
function consultarXPosicion(posicion, discos){
  console.log("En la función que extrae un Disco del Array y lo devuelve invocando a la función que muestra sus propiedades");
  return discos[posicion].muestraDisco();
}