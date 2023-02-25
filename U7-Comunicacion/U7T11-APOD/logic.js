window.onload = () => {
    document.getElementById("cargar_apod_xml").addEventListener("click", cargar_apod_xml);
    document.getElementById("cargar_apod_fetch").addEventListener("click", cargar_apod_fetch);
}

// array con todos los datos
let array_datos = [];

function cargar_apod_xml(){
    console.log("en cargar_apod_xml()");
    // captura del valor del input
    const input_num_info = parseInt(document.getElementById("num_info").value);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200){
            // rellenar la sección de trazas
            document.getElementById("trazas").innerHTML += "Datos cargados con XML <br>";
            // obtención de los datos y transformación en JSON
            let datos = JSON.parse(xhr.responseText);
            console.log(datos);
            datos.forEach((dato) =>{
                array_datos.push(dato);
            });
            generar_options();
        }
    }
    xhr.open("GET", `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${input_num_info}`);
    xhr.send();
}

function cargar_apod_fetch(){
    console.log("en cargar_apod_fetch()");
    // captura del valor del input
    const input_num_info = parseInt(document.getElementById("num_info").value);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${input_num_info}`)
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((datos) => {
        document.getElementById("trazas").innerHTML += "Datos cargados con Fetch <br>";
        console.log(datos);
        datos.forEach((dato) =>{
            array_datos.push(dato);
        });
        generar_options();
    })
    .catch((error) => {
        document.getElementById("trazas").innerHTML += error;
    });

}

function generar_options() {
    console.log("en generar_options()");
    // capturo el select
	let select_datos = document.getElementById("datos");
    // limpio para que no se vayan añadiendo detrás
	select_datos.innerHTML = "";
    // recorro todos los personajes
	array_datos.forEach((dato) => {
        // creo el elemento option
		let option = document.createElement("option");
        // le asigno el valor y el texto a mostrar
		option.value = dato.title;
		option.text = dato.title;
        // añado la opción al select
		select_datos.appendChild(option);
	});
    select_datos.addEventListener("change", generar_modelo);
    document.getElementById("trazas").innerHTML += "Opciones cargadas en el select <br>";
}

function generar_modelo(){
    console.log("en generar_modelo()");
    const valor_select = document.getElementById("datos").value;
    let modelo = {};
    array_datos.forEach((dato) => {
        if (dato.title === valor_select){
            modelo = {
                "url" : dato.url,
                "title" : dato.title,
                "explanation" : dato.explanation,
                "date" : dato.date
            }
        }
    });
    construir_card(modelo);
}

function construir_card(modelo){
    let div_result = document.getElementById("resultado");
    div_result.innerHTML = "";

    let div_card = document.createElement('div');
    div_card.className = 'card w-100 m-2';
    
    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.src =  modelo.url;
    div_card.appendChild(img);
    
    let div_card_body = document.createElement('div');
    div_card_body.className = 'card-body';
    
    let h5_title = document.createElement('h5');
    h5_title.className = "card-title";
    h5_title.textContent = modelo.title;
    
    let p_explanation = document.createElement('p');
    p_explanation.className = 'card-text';
    p_explanation.textContent = modelo.explanation;
    
    let p_date = document.createElement('p');
    p_date.className = 'card-text';
    p_date.textContent = modelo.date;

    let button_add = document.createElement('button');
    button_add.className = 'btn btn-info';
    button_add.textContent = 'Añadir';
    button_add.addEventListener("click", () => {
        add_bd(modelo);
    });

    div_card_body.appendChild(h5_title);
    div_card_body.appendChild(p_explanation);
    div_card_body.appendChild(p_date);
    div_card_body.appendChild(button_add);
    div_card.appendChild(div_card_body);   
    div_result.appendChild(div_card);

    document.getElementById("trazas").innerHTML += `Mostrando ${modelo.title}  <br>`;
}

function add_bd(modelo){
    console.log(modelo);
    fetch("save_apod.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modelo),
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
