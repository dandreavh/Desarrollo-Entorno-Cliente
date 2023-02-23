window.onload = () => {
    // me suscribo a los eventos
    document.getElementById("generar_usuario").addEventListener("click", generar_usuario);
    document.getElementById("guardar_usuario_XML").addEventListener("click", guardar_usuario_XML);
    document.getElementById("guardar_usuario_Fetch").addEventListener("click", guardar_usuario_Fetch);
}

// array de usuarios en tabla
let lista_usuarios = [];

/**
 * Función para obtener el usuario mediante XML con petición GET
 */
function generar_usuario(){
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            // evaluo que haya llegado al último estado y que la respuesta sea buena
            if (xhr.readyState === 4 && xhr.status === 200) {
                // guardo en variable un json con todas las personajees
                let usuario = JSON.parse(xhr.responseText);
                // actualizo la traza
                document.getElementById("trazas").innerHTML += "Usuario generado <br>";
                // llamo a la función que me muestra las fichas
                modelar_usuario(usuario.results[0]);
            }
        };
    xhr.open("GET", `https://randomuser.me/api/?nat=es`);
    xhr.send();
}

/**
 * Función que me permite guardar el array con los datos en la base de datos mediante XML
 */
function guardar_usuario_XML(){
    let xhr = new XMLHttpRequest();
    // Tipo de petición
    xhr.open("POST", "save_users.php");
    // Obligatorio para el POST, para indicar que envío un JSON en el cuerpo
    xhr.setRequestHeader("Content-type", "application/json");
    let cadena_formato_json = JSON.stringify(lista_usuarios);
    
    // Verifica el estado
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(xhr.responseText !== '"ok"'){
                // actualizo la traza
                document.getElementById("trazas").innerHTML += "Usuarios añadidos en la tabla (XML) <br>";
            }else{
                // actualizo la traza
                document.getElementById("trazas").innerHTML += "No se ha podido insertar usuarios <br>";
            }
            console.log(xhr.responseText);
        }
    };
    // Mando el documento
    xhr.send(cadena_formato_json);
}

/**
 * Función que me permite guardar el array con los datos en la base de datos mediante FETCH
 */
function guardar_usuario_Fetch(){
    // indico que uso fetch y que debe atacar al php 
    fetch("save_users.php", {
        method: "POST", // indico el método
        headers: {
            "Content-Type": "application/json", // indico lo que va a tratar
        },
        body: JSON.stringify(lista_usuarios), // hago la transformación a cadena
    })
    .then((response) => { // capturo la promesa y la trato
            if (response.ok) {
                return response.json();
            }
    })
    .then((data) => { // al generar nueva promesa, la trato y muestro mensajes
        document.getElementById("trazas").innerHTML += `${data.resultado} (Con FETCH) <br>`;
    })
    .catch((err) => document.getElementById("trazas").innerHTML += `${err}<br>`);
}

/**
 * Función para crear un modelo de usuario con los datos que me interesan
 * @param {Object} usuario 
 */
function modelar_usuario(usuario){
    // construyo el modelo con los datos que me interesan
    let modelo = {
        "name" : usuario.name.first + " " + usuario.name.last,
        "phone" : usuario.location.street.name,
        "street" : usuario.phone,
        "image" : usuario.picture.large,
        "email" : usuario.email
    }
    // invoco a la función que me genera las cards
    generar_card(modelo);
}

/**
 * Función que me crear una card con los datos de un objeto
 * @param {Object} modelo 
 */
function generar_card(modelo){
    // capturo el div donde va la tarjeta
    let div_result = document.getElementById("tarjeta");
    // limpio para que no se añadan uno debajo de otro
    div_result.textContent = "";
    // creo el div con la class card de bootstrap
    let div_card = document.createElement('div');
    div_card.setAttribute('class', 'card w-25 m-2');
    // creo el elemento img para que muestre la imagen del usuario, estipulo los atributos src y clss
    let img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.setAttribute('src', modelo.image);
    // añado la imagen al div de la card
    div_card.appendChild(img);
    // creo el div para el body de la card con su class
    let div_card_body = document.createElement('div');
    div_card_body.setAttribute('class', 'card-body');
    // creo un h1 para poner el nombre del usuario
    let h1_nombre = document.createElement('h1');
    h1_nombre.textContent = modelo.name;
    // creo los p y es añado los demás datos del usuario
    let p_direccion = document.createElement('p');
    p_direccion.textContent = "Dirección: "+ modelo.street;
    let p_telefono = document.createElement('p');
    p_telefono.textContent = "Teléfono: "+ modelo.phone;
    let p_email = document.createElement('p');
    p_email.textContent = "Email: "+ modelo.email;
    // creo un botón con un id para luego hacer la llamada a función
    let boton_add = document.createElement('button');
    boton_add.setAttribute('class', 'btn btn-info');
    boton_add.setAttribute('id', 'add_tabla');
    boton_add.textContent = "Añadir a tabla";
    // añado todos los elementos creados al div de la card
    div_card_body.appendChild(h1_nombre);
    div_card_body.appendChild(p_direccion);
    div_card_body.appendChild(p_telefono);
    div_card_body.appendChild(p_email);
    div_card_body.appendChild(boton_add);
    div_card.appendChild(div_card_body);
    // añado el div de la card al div donde se muestra   
    div_result.appendChild(div_card);

    // capturo el botón que e creado en la card y le añado un listener
    document.getElementById("add_tabla").addEventListener("click", () => {
        // añado solo aquellos usuarios donde les he dado click
        lista_usuarios.push(modelo);
        // llamo a la función que me crea la tabla
        add_tabla(lista_usuarios);
    });
}

/**
 * Función que me permite crear de forma dinámica una tabla a partir de los datos que tiene el array de objetos
 * @param {Array} lista_usuarios 
 */
function add_tabla(lista_usuarios){
    // capturo el lugar donde quiero crear la tabla
	let div_tabla = document.getElementById("tabla");
    // limpio para que no se vayan añadiendo detrás
	div_tabla.innerHTML = "";
    // creo un elemento table
	let tabla = document.createElement("table");
    // le añado atributos a la tabla para que tenga estilos de Bootstrap
    tabla.setAttribute("class", "table table-striped");
	// pongo en un array los títulos de la cabecera
	let titulos = [
		"Nombre",
		"Dirección",
		"Teléfono",
		"Email"
	];
    // creo el thead
    let thead = document.createElement("thead");
	// creo el elemento fila tr
	let tr = document.createElement("tr");
    // recorro los títulos para crear la cabecera de forma dinámica
	titulos.forEach((titulo) => {
        // creo el th para cada celda de la fila
		th = document.createElement("th");
        // le añado como texto lo que capturo del array
		th.appendChild(document.createTextNode(titulo));
        // lo añado a la fila
		tr.appendChild(th);
	});
    // añado la fila al thead
    thead.appendChild(tr);
    // añado el thead a la tabla
	tabla.appendChild(thead);
    
    // creo el tbody donde van todos los datos
    let tbody = document.createElement("tbody");

	// genero los datos de la tabla
	lista_usuarios.forEach((usuario) => {
        // creo la fila
		let tr = document.createElement("tr");
        // como cada usuario tiene distintos datos, hago el recorrido para coger cada uno
		for (const campo in usuario) {
            if(campo != "image"){ // cojo todos menos la foto
                // creo el td para cada celda
                let td = document.createElement("td");
                // asigno como texto el valor del campo capturado
                td.appendChild(document.createTextNode(usuario[campo]));
                // añado cada td en la fila
                tr.appendChild(td);
            }
		}
        // añado la fila al tbody
		tbody.appendChild(tr);
	});
    // añado el tbody a la tabla
    tabla.appendChild(tbody);
    // añado la tabla al div donde quiero visualizarla
	div_tabla.appendChild(tabla);

    // actualizo la traza
    document.getElementById("trazas").innerHTML += "Usuario añadido en la tabla <br>";
}