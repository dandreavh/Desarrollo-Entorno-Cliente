/**
 * Crea una página web que tenga un listado de tipo <ul> con un <li> de muestra.
 * Introduce un botón en la página que, cuando lo pulses, te muestre un prompt para que el usuario introduzca un texto.
 * Una vez cerrado el prompt el valor se añadirá como un nuevo <li> a la lista creada.
 * Añade dos botones más con texto “Borrar primer li” y “Borrar último li”
 */
const add = document.getElementById("add");
const deleteFirst = document.getElementById("deleteFirst");
const deleteLast = document.getElementById("deleteLast");
listeners();

function listeners(){
    add.addEventListener("click", captureInfo, false);
    deleteFirst.addEventListener("click", removeFirst, false);
    deleteLast.addEventListener("click", removeLast, false);
}

function captureInfo() {
    let text = prompt("Introduzca un texto para añadirlo en la lista");
    addListItem(text);
}

function addListItem(text){
    let ul = document.getElementById("lista");
    let li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
}

function removeFirst() {
    let ul = document.getElementById("lista");
    if(ul.hasChildNodes()){
        ul.removeChild(ul.firstElementChild);
    } else{
        console.log("No hay items");
    }
}

function removeLast() {
    let ul = document.getElementById("lista");
    if(ul.hasChildNodes()){
        ul.removeChild(ul.lastElementChild);
    } else{
        console.log("No hay items");
    }
}