//http://localhost:8090/U7T3-XML/03_XML-Series.html
const READY_STATE_COMPLETE = 4;
const HTTP_STATUS_OK = 200;

let boton_cargar_datos = document.getElementById("cargar_datos");
boton_cargar_datos.addEventListener("click", cargar_contenido, false);
let peticion_http;

// Obtención del XML
function cargar_contenido(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // Comprueba que se haya cargado y que la respuesta sea exitosa
        if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === HTTP_STATUS_OK) {
            procesar_xml(xhr.responseXML);
        }
    };
    // hace el GET al documento XML de los datos
    xhr.open("GET", "recurso.xml", true);
    xhr.send();
}

// Se manejan los datos del XML y se construye en el HTML
function procesar_xml(docXML) {
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

    // Capturamos las etiquetas del XML
    let series = docXML.getElementsByTagName("serie");
    // Se recorren todos los elementos del array de series
    for (let i = 0; i < series.length; i++) {
        // Creación de una fila y sus respectivas columnas en cada iteración
        let tr = document.createElement("tr");
        let td_titulo = document.createElement("td");
        let td_director = document.createElement("td");
        let td_year = document.createElement("td");
        let td_terminada = document.createElement("td");
        // Captura de los datos en cada celda
        td_titulo.appendChild(document.createTextNode(series[i].getElementsByTagName("titulo")[0].firstChild.nodeValue));
        td_director.appendChild(document.createTextNode(series[i].getElementsByTagName("director")[0].firstChild.nodeValue));
        td_year.appendChild(document.createTextNode(series[i].getElementsByTagName("año")[0].firstChild.nodeValue));

        // Clase para título
        td_titulo.setAttribute("class", "text-bold");
        // Clase para director
        td_director.setAttribute("class", "text-italic");

        // Añade una imagen en las celdas de 'terminada'
        let img = document.createElement("img");
        if(series[i].getElementsByTagName("terminada")[0].firstChild.nodeValue === "Sí"){
            img.src = "./images/si.png";
        } else{
            img.src = "./images/no.png";
        }
        img.width = "25";
        td_terminada.appendChild(img);

        // Colores para los años
        if(parseInt(series[i].getElementsByTagName("año")[0].firstChild.nodeValue) <= 2000){
            td_year.setAttribute("class", "text-red");
        } else if(parseInt(series[i].getElementsByTagName("año")[0].firstChild.nodeValue) >= 2001 && 
                    parseInt(series[i].getElementsByTagName("año")[0].firstChild.nodeValue) <= 2010){
            td_year.setAttribute("class", "text-yellow");
        } else if(parseInt(series[i].getElementsByTagName("año")[0].firstChild.nodeValue) >= 2011){
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