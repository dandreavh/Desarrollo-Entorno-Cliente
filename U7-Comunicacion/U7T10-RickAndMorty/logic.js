window.onload = () => {
    document.getElementById("carga_personajes_XML").addEventListener("click",cargar_personajes_XML);
    document.getElementById("carga_personajes_Fetch").addEventListener("click",cargar_personajes_Fetch);
    document.getElementById("obtener_guardar_episodios").addEventListener("click",obtener_guardar_episodios);
}

// array de personajes
let lista_personajes = [];

function cargar_personajes_XML() {
    // datos mín y max
    const minimo = parseInt(document.getElementById("minimo").value);
    const maximo = parseInt(document.getElementById("maximo").value);
    // con el bucle hago tantas peticiones como personajes tenga en el rango
    for (let i = minimo; i <= maximo; i++) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            // evaluo que haya llegado al último estado y que la respuesta sea buena
            if (xhr.readyState === 4 && xhr.status === 200) {
                // guardo en variable un json con todas las personajees
                let personaje = JSON.parse(xhr.responseText);
                // añado a cada personaje al array
                lista_personajes.push(personaje);
                // llamo a la función que rellena las opciones del select
                generar_options();
                // actualizo la traza
                document.getElementById("trazas").innerHTML += `Personaje ${personaje.name} cargado<br>`;
                // llamo a la función que me muestra las fichas
                generar_ficha(personaje);
            }
        };
        xhr.open("GET", `https://rickandmortyapi.com/api/character/${i}`);
        xhr.send();
    }
}

function cargar_personajes_Fetch() {
    // datos mín y max
    const minimo = parseInt(document.getElementById("minimo").value);
    const maximo = parseInt(document.getElementById("maximo").value);
    // con el bucle hago tantas peticiones como personajes tenga en el rango
    for (let i = minimo; i <= maximo; i++) {
        fetch(`https://rickandmortyapi.com/api/character/${i}`)
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((personajes) => {
            // añado a cada personaje al array
            lista_personajes.push(personajes);
            // llamo a la función que rellena las opciones del select
            generar_options();
            // actualizo la traza
            document.getElementById("trazas").innerHTML += `Personaje ${personajes.name} cargado<br>`;
            // llamo a la función que me muestra las fichas
            generar_ficha(personajes);
		})
		.catch((error) => {
			document.getElementById("trazas").innerHTML += error;
		});
    }
}

function generar_options(){
    // capturo el select
	let select_personajes = document.getElementById("personajes");
    // limpio para que no se vayan añadiendo detrás
	select_personajes.innerHTML = "";
    // recorro todos los personajes
	lista_personajes.forEach((personaje) => {
        // creo el elemento option
		let option = document.createElement("option");
        // le asigno el valor y el texto a mostrar
		option.value = personaje.id;
		option.text = personaje.name;
        // añado la opción al select
		select_personajes.appendChild(option);
	});
}

function generar_ficha(personaje){
    // construyo el modelo con los datos que me interesan
    let modelo = {
        "nombre" : personaje.name,
        "especie" : personaje.species,
        "localizacion" : personaje.location.name,
        "foto" : personaje.image,
        "fecha_creacion" : personaje.created
    }
    // invoco a la función que me genera las cards
    generar_card(modelo);
}

function generar_card(modelo){
    let div_result = document.getElementById("resultado");
    let div_card = document.createElement('div');
    div_card.setAttribute('class', 'card w-25 m-2');
    let img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.setAttribute('src', modelo.foto);
    div_card.appendChild(img);
    let div_card_body = document.createElement('div');
    div_card_body.setAttribute('class', 'card-body');
    let p_nombre = document.createElement('p');
    p_nombre.textContent = "Nombre: "+ modelo.nombre;
    let p_especie = document.createElement('p');
    p_especie.textContent = "Especie: "+ modelo.especie;
    let p_localizacion = document.createElement('p');
    p_localizacion.textContent = "Localización: "+ modelo.localizacion;
    let p_fechaCreacion = document.createElement('p');
    p_fechaCreacion.textContent = "Fecha de creación: "+ modelo.fecha_creacion;
    div_card_body.appendChild(p_nombre);
    div_card_body.appendChild(p_especie);
    div_card_body.appendChild(p_localizacion);
    div_card_body.appendChild(p_fechaCreacion);
    div_card.appendChild(div_card_body);   
    div_result.appendChild(div_card);
}

function obtener_guardar_episodios() {
    // capturo los valores en el select
	let id_personaje = document.getElementById("personajes").value;
    // recorro mi array con los personajes
    lista_personajes.forEach((personaje) => {
        // busco el personaje que coincida con el que está seleccionado
        if(personaje.id == id_personaje){
            // capturo los episodios de la propiedad
            let episodes = personaje.episode;
            // al ser objeto, lo itero para capturar cada uno
            episodes.forEach((episode)=>{
                fetch(episode)
                .then((response)=>{
                    if (response.ok) return response.json();
                })
                .then((ep)=>{
                    document.getElementById("trazas").innerHTML += `Episodio ${ep.name} cargado <br>`;
                    // llamo a la función que me guarda esta info en la base de datos
                    guardar_en_bd(ep);
                })
            })
        }
    });
}

function guardar_en_bd(ep) {
    fetch("guardar_episodio_rm.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ep),
    })
    .then((response) => {
            if (response.ok) {
                return response.json();
            }
    })
    .then((data) => {
        document.getElementById("trazas").innerHTML += `${data.resultado}<br>`;
    })
    .catch((err) => document.getElementById("trazas").innerHTML += err);
}