//http://localhost:8090/U7T4-JSON/index.html
const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;

let boton_cargar_datos = document.getElementById("cargar_datos");
boton_cargar_datos.addEventListener("click", cargar_contenido, false);
let peticion_http;

// Obtención del JSON
function cargar_contenido(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == READY_STATE_COMPLETE && this.status == HTTP_STATUS_OK){
            let objeto = JSON.parse(this.responseText);
            
            tratar_objeto(objeto);
        }
    };
    xhr.open("GET", "series.json");
    xhr.send();
}

// Creación de la tabla con los datos del Objeto JSON
function tratar_objeto(objeto){
    // Creación del elemento tabla
    let table = document.createElement("table");
    table.setAttribute("id", "tabla");
    // Cabecera de la tabla con sus respectivas columnas para los títulos
    tr_header = document.createElement("tr");
    th_header_titulo = document.createElement("th");
    th_header_titulo.appendChild(document.createTextNode("Título"));
    th_header_director = document.createElement("th");
    th_header_director.appendChild(document.createTextNode("Director"));
    th_header_year = document.createElement("th");
    th_header_year.appendChild(document.createTextNode("Año"));
    th_header_terminada = document.createElement("th");
    th_header_terminada.appendChild(document.createTextNode("Terminada"));
    // Carga de la cabecera en la tabla
    tr_header.appendChild(th_header_titulo);
    tr_header.appendChild(th_header_director);
    tr_header.appendChild(th_header_year);
    tr_header.appendChild(th_header_terminada);
    table.appendChild(tr_header);
    // Captura del array de series del objeto JSON
    const arraySeries = objeto.Series[0].Serie;

    // Recorro cada elemento del array, es decir, obtengo cada serie
    for (let i = 0; i < arraySeries.length; i++) {
        // Creación de una fila y sus respectivas columnas en cada iteración
        let tr = document.createElement("tr");
        let td_titulo = document.createElement("td");
        let td_director = document.createElement("td");
        let td_year = document.createElement("td");
        let td_terminada = document.createElement("td");
        // Captura de los datos en cada celda
        debugger;
        td_titulo.appendChild(document.createTextNode(arraySeries[i].Titulo));
        td_director.appendChild(document.createTextNode(arraySeries[i].Director));
        td_year.appendChild(document.createTextNode(arraySeries[i].Año));

        // Clase para título
        td_titulo.setAttribute("class", "text-bold");
        // Clase para director
        td_director.setAttribute("class", "text-italic");

        // Añade una imagen en las celdas de 'terminada'
        let img = document.createElement("img");
        if(arraySeries[i].Terminada === "Sí"){
            img.src = "./images/si.png";
        } else{
            img.src = "./images/no.png";
        }
        img.width = "25";
        td_terminada.appendChild(img);

        // Colores para los años
        if(parseInt(arraySeries[i].Año) <= 2000){
            td_year.setAttribute("class", "text-red");
        } else if(parseInt(arraySeries[i].Año) >= 2001 && 
                    parseInt(arraySeries[i].Año) <= 2010){
            td_year.setAttribute("class", "text-yellow");
        } else if(parseInt(arraySeries[i].Año) >= 2011){
            td_year.setAttribute("class", "text-green");
        }

        // Carga de los datos obtenidos en cada celda
        tr.appendChild(td_titulo);
        tr.appendChild(td_director);
        tr.appendChild(td_year);
        tr.appendChild(td_terminada);
        // Carga de la fila en la tabla
        table.appendChild(tr);
    }
    // Espacio en el HTML para volcar el resultado
    document.getElementById("resultado").appendChild(table);
}