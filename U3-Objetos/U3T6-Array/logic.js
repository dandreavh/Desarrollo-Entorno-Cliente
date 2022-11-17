/**
 * @author dandreavh
*/

/**
 * VARIABLES GLOBALES
 */
let myArray = ["España", "Portugal", "Francia", "Canadá", "Venezuela", "Argentina", "Madagascar", "Sudáfrica", "Japón", "Australia", "NuevaZelanda", "Indonesia"];
let choose;
let option = parseInt(prompt("Elija una opción:\n1-Mostrar número de países\n2-Mostrar listado de países\n3-Mostrar un intervalo de países\n4-Añadir un país\n5-Borrar un país\n6-Consultar un país"));

/**
 * Acceso a la distintas opciones del menú, con las que se llama a la función correspondiente
 */
switch(option){
    case 1:{
        alert("Hay "+numItems(myArray)+" países");
        break;
    }
    case 2:{
        choose = parseInt(prompt("Indique:\n1-Si quiere que se muestre en el orden natural\n2-Si quiere que se muestre del revés\n3-Si quiere que esté ordenado alfabéticamente"))
        /**
         * Opciones anidadas
         */
        if(choose===1){
            alert("Listado de países (orden natural):\n"+showItems(myArray));
        } else if(choose===2){
            alert("Listado de países (orden inverso):\n"+showReverseItems(myArray));
        } else if(choose===3){
            alert("Listado de países (orden alfabético):\n"+showInAlphabeticalOrder(myArray));
        } else{
            alert("Opción errónea");
        }
        break;
    }
    case 3:{
        alert("Listado de países en el rango indicado:\n"+showIntervalItems(myArray));
        break;
    }
    case 4:{
        choose = parseInt(prompt(("Indique:\n1-Si quiere añadir al principio\n2-Si quiere añadir al final")));
        /**
         * Opciones anidadas
         */
        if(choose===1){
            addStart(myArray);
            alert("Listado de países con un elemento más al principio:\n"+showItems(myArray));
        } else if(choose===2){
            addEnd(myArray);
            alert("Listado de países con un elemento más al final:\n"+showItems(myArray));
        }else{
            alert("Opción errónea");
        }
        break;
    }
    case 5:{
        choose = parseInt(prompt(("Indique:\n1-Si quiere eliminar el primer país\n2-Si quiere eliminar el último país")));
        /**
         * Opciones anidadas
         */
        if(choose===1){
            alert("Se ha eliminado " + deleteStartItem(myArray));
            alert("Listado de países con un elemento menos al principio:\n"+showItems(myArray));
        } else if(choose===2){
            alert("Se ha eliminado " + deleteEndItem(myArray));
            alert("Listado de países con un elemento menos al final:\n"+showItems(myArray));
        }else{
            alert("Opción errónea");
        }
        break;
    }
    case 6:{
        choose = parseInt(prompt(("Indique:\n1-Si quiere ver el país en la posición indicada\n2-Si quiere ver la posición de un país indicado")));
        /**
         * Opciones anidadas
         */
        if(choose===1){
            alert("Su país en la posición indicada es:\n"+showXItem(myArray));
        } else if(choose===2){
            alert("La posición en la lista del país indicado es:\n"+showPositionItem(myArray));
        }else{
            alert("Opción errónea");
        }
        break;
    }
    case (option<1 || option>6):{
        /**
         * Control de error
         */
        alert("Opción errónea");
        break;
    }
}
/**
 * Mostrar número de elementos del array
 * @param {array} myArray 
 * @returns número entero
 */
function numItems(myArray){
    return myArray.length;
}
/**
 * Mostrar los elementos del array con el orden por defecto
 * @param {array} myArray 
 * @returns array
 */
function showItems(myArray){
    return myArray;
}
/**
 * Muestra los elementos del array en sentido inverso.
 * @param {array} myArray 
 * @returns array
 */
function showReverseItems(myArray){
    return myArray.reverse();
}
/**
 * Muestra los elementos del array ordenados alfabéticamente
 * @param {array} myArray 
 * @returns array
 */
function showInAlphabeticalOrder(myArray){
    return myArray.sort();
}
/**
 * Muestra los elementos que se encuentran en un intervalo que el usuario indica.
 * @param {array} myArray 
 * @returns array
 */
function showIntervalItems(myArray){
    let start = parseInt(prompt("Indique el inicio del intervalo; recuerde que se cuenta desde 0 inclusive"));
    let end = parseInt(prompt("Indique el fin del intervalo; recuerde que es exclucivo"));
    return myArray.slice(start, end);
}
/**
 * Añadir un elemento al principio del array.
 * @param {array} myArray 
 * @returns número entero (length)
 */
function addStart(myArray){
    let country = prompt("Indique un país");
    return myArray.unshift(country);
}
/**
 * Añadir un elemento al final del array.
 * @param {array} myArray 
 * @returns número entero (length)
 */
function addEnd(myArray){
    let country = prompt("Indique un país");
    return myArray.push(country);
}
/**
 * Borrar un elemento al principio del array (y decir cuál se ha borrado).
 * @param {array} myArray 
 * @returns elemento / undefined
 */
function deleteStartItem(myArray){
    return myArray.shift();
}
/**
 * Borrar un elemento al final del array (y decir cuál se ha borrado).
 * @param {array} myArray 
 * @returns elemento / undefined
 */
function deleteEndItem(myArray){
    return myArray.pop();
}
/**
 * Muestra el elemento que se encuentra en una posición que el usuario indica.
 * @param {array} myArray 
 * @returns elemento / undefined
 */
function showXItem(myArray){
    let position = parseInt(prompt("Indique una posición; recuerde que se cuenta desde 0"));
    return myArray.at(position);
}
/**
 * Muestra la posición en la que se encuentra un elemento que le indica el usuario.
 * @param {array} myArray 
 * @returns número entero / -1
 */
function showPositionItem(myArray){
    let country = prompt("Escriba el nombre de un país");
    return myArray.indexOf(country);
}