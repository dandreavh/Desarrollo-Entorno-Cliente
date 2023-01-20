/**
 * @author dandreavh
 */
// Botón de llamada inicial
let boton = document.getElementsByTagName("button")[0];
boton.addEventListener("click", captureValues, false);

// Volcado de resultado
let div_resultado = document.getElementById("resultado");

function captureValues(){
    // Captura de valores
    let columns = parseInt(document.getElementById("columnas").value);
    let rows = parseInt(document.getElementById("filas").value);
    let header = document.getElementById("header").checked;
    let valor = document.getElementById("valor").value;
    let grosor = parseFloat(document.getElementById("grosor").value);
    let color = document.getElementById("color").value;
    // Comprobación de datos
    (checkValueColsRows(rows) && checkValueColsRows(columns) && checkValueGrosor(grosor)) ?
    (createTable(columns, rows, header, valor, grosor, color)) :
    alert("Datos de creación de tabla erróneos. Revísalos y vuelve a generarla.");
}
// Comprobación de los valores para filas, columnas y el grosor (valores numéricos)
function checkValueColsRows(value){
    return (!isNaN(value) && value !== null && value !== undefined && value > 0)
}
function checkValueGrosor(value){
    return (!isNaN(value) && value !== null && value !== undefined && value >= 0)
}

// Creación de los elementos básicos de la tabla
let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);

function createTable(columns, rows, header, valor, grosor, color){
    // raíz table
    div_resultado.appendChild(table);
    // header
    if(header){
        createHeader(columns);
    }
    // body
    createRows(rows);
    createColumns(columns);
    // texto y estilos a celdas
    let tds = document.getElementsByTagName("td");
    table.setAttribute("style", `border-collapse: collapse; border: ${grosor}px solid ${color}`);
    for (const td of tds) {
        td.textContent = valor;
        td.setAttribute("style", `border-collapse: collapse; border: ${grosor}px solid ${color}`);
    }  
    let ths = document.getElementsByTagName("th");
    let titles = document.getElementsByClassName("title");
    let array_titles = [];
    for (const title of titles) {
        array_titles.push(title.value);
    }
    let i = 0;
    for (const th of ths) {
        th.textContent = array_titles[i];
        i++; 
        th.setAttribute("style", `border-collapse: collapse; border: ${grosor}px solid ${color}`);
    }  
}

// Crea la fila de la cabecera con sus respectivas columnas
function createHeader(columns){
    // fila cabecera table
    let row = document.createElement("tr");
    thead.appendChild(row);
    // columnas cabecera table
    for (let i = 0; i < columns; i++) {
        let column = document.createElement("th");
        row.appendChild(column);
    }
}

// GENERAR INPUTS PARA LOS TÍTULOS
let checkbox = document.getElementById("header");
checkbox.addEventListener("change", generateTitleInputs, false);
function generateTitleInputs(){
    let div_header = document.getElementById("div_header");
    let columns = parseInt(document.getElementById("columnas").value);
    for (let i = 0; i < columns; i++) {
        let title_label = document.createElement("label");
        let title_input = document.createElement("input");
        let div = document.createElement("div");
        title_label.textContent = "Título de la columna "+(i+1);
        title_input.setAttribute("type", "text");
        title_input.setAttribute("class", "title");
        div.appendChild(title_label);
        div.appendChild(title_input);
        div_header.appendChild(div);
    }
}

// filas para el tbody
function createRows(num){
    for (let i = 0; i < num; i++) {
        let row = document.createElement("tr");
        tbody.appendChild(row);
    }
}

// columnas para el tbody
function createColumns(num){
    let trs = tbody.getElementsByTagName("tr");
    for (const tr of trs) {
        for (let i = 0; i < num; i++) {
            let column = document.createElement("td");
            tr.appendChild(column);
        }
    }
}