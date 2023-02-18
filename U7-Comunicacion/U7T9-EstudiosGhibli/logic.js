window.onload = () => {
    // subscribir eventos
    document.getElementById("carga_vehiculos").addEventListener("click", cargar_vehiculos);
    document.getElementById("registrar_envio").addEventListener("click", registrar_envio);
}

function cargar_vehiculos(){
    console.log("en cargar_vehiculos()");
    let xhr = new XMLHttpRequest();
    // controlar estado de la petición
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200){
            // rellenar la sección de trazas
            trazas = document.getElementById("trazas");
            trazas.innerHTML = "Vehículos cargados";

            // obtención de los datos y transformación en JSON
            let vehiculos = JSON.parse(xhr.responseText);
            // modelo los datos
            procesar_vehiculos(vehiculos);
            // función que se encargará con un fetch de insertar los datos en el php (que los añade a la bd)
            insertar_vehiculos_bd(vehiculos);
        }
    };
    // configurar la petición
	xhr.open("GET", "vehiculos.json");
	// realizar la petición
	xhr.send();
}

function procesar_vehiculos(vehiculos){
    console.log("en procesar_vehiculos");
    let vehiculos_procesados = [];
    // recorrido del la respuesta en formato JSON y para cada elemento del array...
    vehiculos.forEach(vehiculo => {
        // creación de un modelo con los datos que me interesa almacenar
        let model = {
            id : vehiculo.id,
            name : vehiculo.name,
            description : vehiculo.description,
            vehicle_class : vehiculo.vehicle_class
        };
        // agragación en el array los modelos que se van creando
        vehiculos_procesados.push(model);
    });
    crear_tabla(vehiculos_procesados);
    // se devuelve el array con los modelos creados
    return vehiculos_procesados;
}

function insertar_vehiculos_bd(vehiculos){
    console.log("en insertar_vehiculos_bd");
    // fetch requiere el archivo que procesa, y si es != a GET, indicar el método...
    fetch("insertar_vehiculos.php", { // se indica el php encargado de añadir a la bd
		method: "POST",
		headers: {
			"Content-type": "application/json", // se indica que se usará json
		},
		body: JSON.stringify(vehiculos), // se convierte el json en una cadena
	})
		.then((response) => {
			if (response.ok) return response.json(); // si la promesa devuelve un ok, devuelve el resultado en json y genera nueva promesa
		})
		.then((vehiculos) => {
            trazas = document.getElementById("trazas");
            trazas.innerHTML = "Vehículos insertados";
		});
}

function crear_tabla(vehiculos) {
    console.log("En crear_tabla()");
    // capturo el lugar donde se va a añadir la tabla en el html
    let div_table = document.getElementById("tabla");
    div_table.innerHTML = "";
    // creo el elemento table
    let table = document.createElement("table");
    // añado estilos bootstrap a la tabla
    table.setAttribute("class", "table table-striped");
    // al crear un array con las cabeceras, puedo recorrerlo y crearlo dinámicamente
    const cabecera = ["ID", "Name", "Description", "Class", "Enviar"];
    // creo el elemento thead
    let thead = document.createElement("thead");
    // creo la fila donde va la cabecera
    let tr = document.createElement("tr");
    // generar en bucle todas las cabeceras
    cabecera.forEach((titulo) => {
        // creo un elemento th para cada celda
        let th = document.createElement("th");
        // añado el texto del array creado
        th.appendChild(document.createTextNode(titulo));
        // añado en la fila cada th creada
        tr.appendChild(th);
    });
    // al terminar de rellenarse toda la fila, lo añado en el thead
    thead.appendChild(tr);
    // añado el thead a la tabla
    table.appendChild(thead);

    // creo el elemento tbody
    let tbody = document.createElement("tbody");
    vehiculos.forEach((vehiculo) =>{
        // crear la fila para cada vehículo
        let tr = document.createElement("tr");
        // rellenar cada celda con los datos del vehículo
        // como el vehículo está compuesto por varios campos, hago un recorrido y los añado dinámicamente
		for (const campo in vehiculo) {
            // creo el elemento td para tener una celda en la fila
			let td = document.createElement("td");
            // añado el texto valor del campo (clave)
			td.appendChild(document.createTextNode(vehiculo[campo]));     
            // añado el td en la fila
			tr.appendChild(td);
		}
        // creo el td para el checkbox, le añado atributos y lo incluyo en la fila
        let td_checkbox = document.createElement("td");
        let checkbox_enviar = document.createElement("input");
        checkbox_enviar.setAttribute("type", "checkbox");
        checkbox_enviar.setAttribute("id", vehiculo.id);
        checkbox_enviar.setAttribute("name", "envio");
        checkbox_enviar.setAttribute("value", vehiculo.id);
        td_checkbox.appendChild(checkbox_enviar);
        tr.appendChild(td_checkbox);

        // añado la fila creada al tbody
        tbody.appendChild(tr);
    });
    // añado el tbody a la tabla
    table.appendChild(tbody);
    // añado al div la tabla creada
    div_table.appendChild(table);
}

function registrar_envio(){
    console.log("En registrar_envio()");
    // creo un objeto con los datos que se capturan del formulario, en el caso de los vehículos, llamo a la función
    let datos = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        vehiculos: obtener_vehiculos_seleccionados(),
    };
    // hago el fetch para que me guarde los datos en el php
    fetch("registrar_envio.php", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    })
        .then((response) => {
            if (response.ok) {
                // primera promesa, que genera nueva promesa con el json
                return response.json();
            }
        })
        .then((data) => {
            // evalúo si la propiedad 'resultado' (en el php) está registrado
            if (data.resultado !== null && data.resultado === "envio registrado") {
                document.getElementById("trazas").innerHTML = 
                `Envío registrado: ${datos.nombre}, ${datos.direccion}, ${datos.telefono}, ${datos.correo}, ${datos.vehiculos}`;
                // una vez enviados, se limpia el formulario
                document.getElementById("formulario").reset();
                // capturo el id de la tabla
                let tabla = document.getElementById("tabla");
                // recojo todos los checkbox por la etiqueta input para deseleccionarlos
                let checkboxes = tabla.getElementsByTagName("input");
                for (let checkbox of checkboxes) {
                    checkbox.checked = false;
                }
            } else {
                document.getElementById("trazas").innerHTML =
                "Error al registrar envío: " + data.resultado;
            }
            })
        .catch((err) => console.log(err));
}

function obtener_vehiculos_seleccionados() {
    console.log("En obtener_vehiculos_seleccionados()");
    // creo un array vacío donde se almacenarán los seleccionados
    let vehiculos_seleccionados = [];
    // capturo la tabla
    let tabla = document.getElementById("tabla");
    // recojo todo los inputs de la tabla por el nombre de la etiqueta
    let checkboxes = tabla.getElementsByTagName("input");
    // con el buche, miro si el checkbox está seleccionado, y si lo está añado el id al array
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            vehiculos_seleccionados.push(checkbox.id);
        }
    }
    // devuelvo el array que contiene el id de los vehículos seleccionados
    return vehiculos_seleccionados;
}