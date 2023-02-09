// Me suscribo a los eventos
window.onload = iniciar();

// función de llamadas
function iniciar() {
    document.getElementById("enviar").addEventListener("click", guardar, false);
    document.getElementById("listar").addEventListener("click", mostrar, false);
}

function guardar() {
    // Hago petición POST al php con info y creo objeto JS
    console.log("Entrando en guardar");
    // 1. Capturo los valores
    let serie = {
        titulo: document.getElementById("titulo").value,
        director: document.getElementById("director").value,
        cadena: document.getElementById("cadena").value,
        anyo: document.getElementById("anyo").value,
        terminada: document.getElementById("terminada").checked,
    }

    // 2. Convertimos el objeto capturado en una cadena válida
    let serie_formato_JSON = JSON.stringify(serie);

    // 3. Realizamos la petición al php de tipo fetch con los parámetros (php, objeto(3 parámetros))
    fetch("create_serie.php", {
        method: "POST",
        headers: {
            // especifico que lo que envío es un JSON
            "Content-Type": "application/json; charset=utf-8",
        },
        // lo que enviamos por el cuerpo
        body: serie_formato_JSON
    })
    .then((response) => {
        // tenemos un objeto response
        if (response.ok) {
            // devuelve un promesa, por lo que tengo que hacer un then
            return response.text();
        }
    })
    .then((data) => {
        mostrar();
    })
    .catch((err) => console.log(err));
}

function mostrar(){
    // 1. Petición GET desde el php. No necesita más parámetros porque es un get
    fetch("listar_series.php").then((response) => {
        if(response.ok) {
            // este sí devuelve un json
            return response.json();
        }
    }).then((listado_series) => {
        let tabla = crear_tabla();
        document.getElementById("resultado").innerHTML = "";
        document.getElementById("resultado").appendChild(tabla);
        listado_series.forEach(serie => {
            tabla.appendChild(construir_fila_serie(serie));            
        });
    });
}

function crear_tabla(){
    // Construcción esqueleto tabla
    let table = document.createElement("table");
    table.setAttribute("id", "tabla");
    let tr_header = document.createElement("tr");
    let th_header_titulo = document.createElement("th");
    th_header_titulo.appendChild(document.createTextNode("Título"));
    let th_header_director = document.createElement("th");
    th_header_director.appendChild(document.createTextNode("Director"));
    let th_header_year = document.createElement("th");
    th_header_year.appendChild(document.createTextNode("Año"));
    let th_header_terminada = document.createElement("th");
    th_header_terminada.appendChild(document.createTextNode("Terminada"));

    // Carga de la cabecera en la tabla
    tr_header.appendChild(th_header_titulo);
    tr_header.appendChild(th_header_director);
    tr_header.appendChild(th_header_year);
    tr_header.appendChild(th_header_terminada);
    table.appendChild(tr_header);
    return table;
}

function construir_fila_serie(serie){
    let tr = document.createElement("tr");
    let td_titulo = document.createElement("td");
    let td_director = document.createElement("td");
    let td_year = document.createElement("td");
    let td_terminada = document.createElement("td");

    td_titulo.appendChild(document.createTextNode(serie.titulo));
    td_director.appendChild(document.createTextNode(serie.director));
    td_year.appendChild(document.createTextNode(serie.anyo));

    // Clase para título
    td_titulo.setAttribute("class", "text-bold");
    // Clase para director
    td_director.setAttribute("class", "text-italic");

    // Añade una imagen en las celdas de 'terminada'
    let img = document.createElement("img");
    if(serie.Terminada === "Sí"){
        img.src = "./images/si.png";
    } else{
        img.src = "./images/no.png";
    }
    img.width = "25";
    td_terminada.appendChild(img);

    // Colores para los años
    if(parseInt(serie.anyo) <= 2000){
        td_year.setAttribute("class", "text-red");
    } else if(parseInt(serie.anyo) >= 2001 && 
            parseInt(serie.anyo) <= 2010){
        td_year.setAttribute("class", "text-yellow");
    } else if(parseInt(serie.anyo) >= 2011){
        td_year.setAttribute("class", "text-green");
    }

    // Carga de los datos obtenidos en cada celda
    tr.appendChild(td_titulo);
    tr.appendChild(td_director);
    tr.appendChild(td_year);
    tr.appendChild(td_terminada);
    return tr;
}