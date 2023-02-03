const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;
const boton_enviar = document.getElementById("enviar")
                            .addEventListener("click", guardar, false);
const div_respuesta = document.getElementById("respuesta");

function guardar() {
    const titulo = document.getElementById("titulo").value;
    const director = document.getElementById("director").value;
    const cadena = document.getElementById("cadena").value;
    const anyo = document.getElementById("anyo").value;
    const terminada = document.getElementById("terminada").checked;

    // Creo el objeto JSON
    const dato = {
        titulo: titulo,
        director: director,
        cadena: cadena,
        anyo: anyo,
        terminada: terminada
    };
    let xhr = new XMLHttpRequest();
    // Tipo de petición
    xhr.open("POST", "create_serie.php");
    // Obligatorio para el POST, para indicar que envío un JSON en el cuerpo
    xhr.setRequestHeader("Content-type", "application/json");
    let cadena_formato_json = JSON.stringify(dato);
    
    // Verifica el estado
    xhr.onreadystatechange = () => {
        if (this.readyState == READY_STATE_COMPLETE &&
            this.status == HTTP_STATUS_OK) {
                let respuesta = document.getElementById("respuesta");
                respuesta.innerHTML = this.responseText;
            if(this.responseText === '"ok"'){
                respuesta.style.color = "green";
            }else{
                respuesta.style.color = "red";
            }
        }
    };
    // Mando el documento (siempre lo dejo al final)
    xhr.send(cadena_formato_json);
}