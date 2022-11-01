/**
 * @author dandreavh
 * Trabajo con el objeto Window de Javascript
 */

/**
 * VARIABLES
 */
let newWindow, x, y;
/**
 * FUNCIONES
 */

/**
 * abre una ventana solo si se acepta la confirmación
 */
function openWindow(){
    let option = confirm("¿Quieres abrir una ventana nueva?");
    if (option) {
        let properties = "width=80,height=200,top=500,left=500,menubar=no,resizable=no,toolbar=no,location=no";
        newWindow = open("", "", properties);
    
        newWindow.document.write('<p>Esta es una nueva ventana, abierta con una función del objeto Window</p>'+
        '</br></br>'+'<button type="button" onclick="window.close()">Cerrar ventana</button>');
    } else{
        alert('No se puede abrir una nueva ventana')
    }
}

/**
 * cierra la ventana, comprobando previamente si hay o ha habido una ventana abierta
 */
function closeWindow(){
    let message = "";
    if (!newWindow) {
        message = "No hay ventana abierta";
    } else {
        newWindow.closed ? message = "Ventana cerrada" : message = "Ventana abierta";
    }
    alert(message);
}

/**
 * desplaza de 10px en 10px
 */
 function move(){
    newWindow.moveBy(10, 10);
}

/**
 * mueve a esa posición exacta
 */
function replace(){
    newWindow.moveTo(100,100);
}

/**
 * aumenta la venta de 10px en 10px
 */
function increase(){
    newWindow.resizeBy(10,10);
}

/**
 * cambia el tamaño a ese fijo
 */
function resize(){
    newWindow.resizeTo(400,200);
}

/**
 * manda el scroll a esa posición indicada en los ejes x e y
 * @param {eje horizontal} x 
 * @param {eje vertical} y 
 */
function scrollto(x, y){
    newWindow.scrollTo(x, y);
}