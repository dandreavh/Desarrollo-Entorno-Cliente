window.onload = () => {
    // me suscribo a los eventos de los botones
    document.getElementById("modificar_datos").addEventListener("click", modificar_datos);
    document.getElementById("cargar_xhr").addEventListener("click", cargar_xhr);
    document.getElementById("cargar_fetch").addEventListener("click", cargar_fetch);
}

let lista_comunidades = [];

function modificar_datos(){
    console.log("En modificar_datos()");
    // creo un objeto con los datos recogidos
	const comunidad = {
		ccaa: document.getElementById("ccaa").value,
		dosisEntregadas: document.getElementById("d_entregadas").value,
		dosisAdministradas: document.getElementById("d_admin").value,
		dosisPautaCompletada: document.getElementById("d_completa").value,
		porcentajeEntregadas: document.getElementById("p_entregadas").value,
		porcentajePoblacionAdministradas: document.getElementById("p_admin").value,
		porcentajePoblacionCompletas: document.getElementById("p_completa").value,
	};
    // uso fetch para hacer las peticiones 
    fetch("actualizar_comunidad.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(comunidad),
	})
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidad) => {
            // vuelco las trazas en el apartado de resultados
			resultados = document.getElementById("resultados");
			resultados.innerHTML = "Comunidad actualizada";
            // muestro el dato actualizado en mi tabla
			actualizar_datos_tabla(comunidad);
		});
}

function actualizar_datos_tabla(comunidad) {
    console.log("En actualizar_datos_tabla()");
    // recorro todas las comunidades
	lista_comunidades.forEach((ca) => {
        // filtro la comunidad que se ha modificado y actualizo sus datos
		if (ca.ccaa === comunidad.ccaa) {
			ca.dosisEntregadas = comunidad.dosisEntregadas;
			ca.dosisAdministradas = comunidad.dosisAdministradas;
			ca.dosisPautaCompletada = comunidad.dosisPautaCompletada;
			ca.porcentajeEntregadas = comunidad.porcentajeEntregadas;
			ca.porcentajePoblacionAdministradas =
				comunidad.porcentajePoblacionAdministradas;
			ca.porcentajePoblacionCompletas = comunidad.porcentajePoblacionCompletas;
		}
	});
    // llamo a la función que me crea la tabla, para que la genere con los datos actualizados
	construir_tabla(lista_comunidades);
}

function cargar_xhr(){
	console.log("En cargar_xml()");
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
        // evaluo que haya llegado al último estado y que la respuesta sea buena
		if (xhr.readyState === 4 && xhr.status === 200) {
            // actualizo la traza
			document.getElementById("resultados").innerHTML = "Datos actualizados (XML)";
            // guardo en variable un json con todas las comunidades
			let comunidades = JSON.parse(xhr.responseText);
			// llamo a la función que filtra los datos
			procesar_comunidades(comunidades);
            // llamo a la función que rellena las opciones del select
			generar_options();
			// llamo a la función que hace la petición POST al php para insertarlo en la BD
			enviar_insertar_comunidades(lista_comunidades);
		}
	};
	xhr.open("GET", "latest.json");
	xhr.send();
}

function cargar_fetch(){
	console.log("En cargar_fetch()");
    // realizamos el mismo proceso ahora con fetch, como es un get no necesita más parámetros
	fetch("latest.json")
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidades) => {
            // actualizo la traza
			document.getElementById("resultados").innerHTML = "Datos actualizados (Fetch)";
            // llamo a la función que filtra los datos
			procesar_comunidades(comunidades);
            // llamo a la función que rellena las opciones del select
			generar_options();
			// llamo a la función que hace la petición POST al php para insertarlo en la BD
			enviar_insertar_comunidades(lista_comunidades);
		})
		.catch((error) => {
			document.getElementById("resultados").innerHTML = error;
		});
}

function generar_options() {
    // capturo el select
	let select_comunidades = document.getElementById("ccaa");
    // limpio para que no se vayan añadiendo detrás
	select_comunidades.innerHTML = "";
    // recorro todas las comunidades
	lista_comunidades.forEach((comunidad) => {
        // creo el elemento option
		let option = document.createElement("option");
        // le asigno el valor y el texto a mostrar
		option.value = comunidad.ccaa;
		option.text = comunidad.ccaa;
        // añado la opción al select
		select_comunidades.appendChild(option);
	});
}

function procesar_comunidades(comunidades) {
    console.log("En procesar_comunidades()");
	// limpio para que no se vayan añadiendo detrás
	lista_comunidades = [];
	// recorro todas las comunidades
	comunidades.forEach((comunidad) => {
        // filtro la que no quiero ("Totales")
		if (comunidad.ccaa != "Totales") {
            // creo un modelo con solo los datos que me interesan de cada comunidad
			let item = {
				ccaa: comunidad.ccaa,
				dosisEntregadas: comunidad.dosisEntregadas,
				dosisAdministradas: comunidad.dosisAdministradas,
				dosisPautaCompletada: comunidad.dosisPautaCompletada,
				porcentajeEntregadas: comunidad.porcentajeEntregadas,
				porcentajePoblacionAdministradas:
					comunidad.porcentajePoblacionAdministradas,
				porcentajePoblacionCompletas: comunidad.porcentajePoblacionCompletas,
			};
            // una vez tengo el modelo creado, lo añado al array
			lista_comunidades.push(item);
		}
	});
    // devuelvo el array
	return lista_comunidades;
}

function enviar_insertar_comunidades(comunidades) {
	console.log("En enviar_insertar_comunidades()");
    // guardo los datos haciendo un post a al php
	fetch("insertar_comunidades.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(comunidades),
	})
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidades) => {
			construir_tabla(comunidades);
		});
}

function construir_tabla(comunidades) {
    console.log("En contruir_tabla()");
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
		"Comunidad",
		"D. Entregadas",
		"D. Admin",
		"D. Completa",
		"% Entregadas",
		"% Pobl. Admin",
		"% Pobl. Completa",
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
	comunidades.forEach((comunidad) => {
        // creo la fila
		let tr = document.createElement("tr");
        // como cada comunidad tiene distintos datos, hago el recorrido para coger cada uno
		for (const campo in comunidad) {
            // creo el td para cada celda
			let td = document.createElement("td");
            // asigno como texto el valor del campo capturado
			td.appendChild(document.createTextNode(comunidad[campo]));
            // añado cada td en la fila
			tr.appendChild(td);
		}
        // añado la fila al tbody
		tbody.appendChild(tr);
	});
    // añado el tbody a la tabla
    tabla.appendChild(tbody);
    // añado la tabla al div donde quiero visualizarla
	div_tabla.appendChild(tabla);
}