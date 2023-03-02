const API_KEY = "8a44dfd06e56ad4a2c8362100f2e652c";
const TRENDING_MOVIES_URL = "trending/movie/week";
const API_BASE_URL = `https://api.themoviedb.org/3/${TRENDING_MOVIES_URL}?api_key=${API_KEY}`;

let all_peliculas = [];

window.onload = () => {
    document.getElementById("carga_peliculas").addEventListener("click", carga_peliculas);
    document.getElementById("guardar_favoritos").addEventListener("click", guardar_favoritos);
    document.getElementById("obtener_favoritos").addEventListener("click", obtener_favoritos);
    document.getElementById("limpiar_fichas").addEventListener("click", limpiar_fichas);
}

function carga_peliculas(){
    console.log("en carga_peliculas");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("trazas").innerHTML += "Películas cargadas <br/>";
            let peliculas = JSON.parse(xhr.responseText);
            console.log(peliculas);
            construir_card(peliculas.results);
        }
    }
    xhr.open('GET', API_BASE_URL);
    xhr.send();
}

function construir_card(peliculas){
    console.log("en construir_card");
    console.log(peliculas);
    let div_resultado = document.getElementById("resultado");
    
    peliculas.forEach(pelicula => {
        let div_card = document.createElement("div");
        div_card.className = "card mb-3 w-75";
        let div_fila = document.createElement("div");
        div_fila.className = "row g-0";
        // IMAGEN
        let div_img = document.createElement("div");
        div_img.className = "col-md-4";
        let img = document.createElement("img");
        img.className = "img-fluid rounded-start h-100";
        img.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
        div_img.appendChild(img);
        div_fila.appendChild(div_img);
        // CONTENIDO
        let div_content = document.createElement("div");
        div_content.className = "col-md-8";
        let div_cardbody = document.createElement("div");
        div_cardbody.className = "card-body";

        let div_cabecera = document.createElement("div");
        div_cabecera.className = "d-flex justify-content-between";
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerHTML = pelicula.original_title;

        let img_fav = document.createElement("img");
        img_fav.style = "width: 50px";
        img_fav.id = pelicula.id;
        img_fav.src = "./heart_border.png";
        img_fav.addEventListener("click", () => {
            if(img_fav.src !== "http://localhost:8090/U7_Examen/heart_filled.png"){
                img_fav.src = "./heart_filled.png";
                img_fav.className = "favorita";
            } else{
                img_fav.src = "http://localhost:8090/U7_Examen/heart_border.png";
                img_fav.className = "";
            }
        });

        if(img_fav.src !== "http://localhost:8090/U7_Examen/heart_filled.png"){
            all_peliculas.push(pelicula);
        }

        div_cabecera.appendChild(h5);
        div_cabecera.appendChild(img_fav);

        let p_id = document.createElement("p");
        p_id.innerHTML = pelicula.id;
        let p_overview = document.createElement("p");
        p_overview.innerHTML = pelicula.overview;
        let p_release_date = document.createElement("p");
        p_release_date.innerHTML = pelicula.release_date;
        let p_vote_average = document.createElement("p");
        p_vote_average.innerHTML = pelicula.vote_average;

        div_cardbody.appendChild(div_cabecera);
        div_cardbody.appendChild(p_id);
        div_cardbody.appendChild(p_overview);
        div_cardbody.appendChild(p_release_date);
        div_cardbody.appendChild(p_vote_average);

        div_content.appendChild(div_cardbody);
        div_fila.appendChild(div_content);
        div_card.appendChild(div_fila);
        div_resultado.appendChild(div_card);
    });
}

function guardar_favoritos(){
    console.log("en guardar_favoritos");

    let lista_peliculas_favoritas = captura_favoritas();

    fetch("save_movies.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lista_peliculas_favoritas)
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => { 
        document.getElementById("trazas").innerHTML += `${data.results}<br>`;
    })
    .catch((err) => document.getElementById("trazas").innerHTML += `${err}<br>`);
}

function captura_favoritas(){
    let lista_peliculas_favoritas = [];
    let favoritas = document.getElementsByClassName("favorita");
    let ids = [];
    
    for (const fav of favoritas) {
        ids.push(fav.id);
    };
    for (let i = 0; i < ids.length; i++) {
        all_peliculas.forEach((peli) => {
            if(peli.id === ids[i]){
                console.log(peli);
                lista_peliculas_favoritas.push(peli);
            }
        });  
    }
    return lista_peliculas_favoritas;
}

function obtener_favoritos(){
    console.log("en obtener_favoritos");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            document.getElementById("trazas").innerHTML += "Películas favoritas obtenidas <br/>";
            let peliculas_favoritas = JSON.parse(xhr.responseText);
            document.getElementById("resultado").innerHTML = "";
            construir_card(peliculas_favoritas);
        }
    }
    xhr.open("GET", "get_favs.php");
    xhr.send();
}

function limpiar_fichas(){
    console.log("en limpiar_fichas");
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("trazas").innerHTML += "Fichas limpias <br/>";
}