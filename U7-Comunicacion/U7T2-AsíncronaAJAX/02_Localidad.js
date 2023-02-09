const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;

let peticion_http;

let boton = document.getElementById("llamada");
boton.addEventListener("click", carga_contenido, false);

function carga_contenido() {
    if (window.XMLHttpRequest) {
        peticion_http = new XMLHttpRequest();
    } else {
        alert("No tienes soporte para AJAX");
        return;  // Salimos y no hacemos la petición
    }
    // Preparamos la petición
    if (peticion_http) {
        PHP = "http://localhost:8090/U7T2-AsíncronaAJAX/localidad.php";
        let localidad = document.getElementById("ciudad").value;
        // en la petición, me suscribo al evento "ReadyStateChange", y le 
        // digo que me llame a muestra_contenido cada vez que suceda (que cambie el estado)
        peticion_http.open("GET", (PHP+"?localidad="+localidad), true);
        peticion_http.onreadystatechange = muestra_contenido;
        peticion_http.send();
    }
}

function muestra_contenido() {
    let resultado = document.getElementById("resultado");
    let mensaje = document.createElement("p");

    if (peticion_http.readyState === READY_STATE_COMPLETE) {
        if (peticion_http.status === HTTP_STATUS_OK) {        
            if(peticion_http.responseText === "SI"){
                mensaje.textContent = `SÍ se encuentra en la lista :)`;
                mensaje.style.color = "green"
            } else if(peticion_http.responseText === "NO"){
                mensaje.textContent = `NO se encuentra en la lista :(`;
                mensaje.style.color = "red"
            }
            resultado.appendChild(mensaje);
        }
    }
}