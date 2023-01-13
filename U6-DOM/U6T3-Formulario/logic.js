/**
 * Crea de manera dinámica (es decir, al cargarse la página) el
 * formulario que definimos en el tema anterior (tarea U4T1).
 */
window.onload = loadForm();

function loadForm(){
    // body
    let body = document.getElementsByTagName("body")[0];
    // form
    let form = document.createElement("form");
    body.appendChild(form);
    let h1 = document.createElement("h1");
    h1.textContent = "· Registro de discos ·";
    form.appendChild(h1);
    // nombre
    let div_name = document.createElement("div");
    let label_name = document.createElement("label");
    let input_name = document.createElement("input");
    label_name.textContent = "Nombre del disco";
    label_name.setAttribute("for", "nombreDisco");
    input_name.setAttribute("type","text");
    input_name.setAttribute("name","nombreDisco");
    input_name.setAttribute("id","nombreDisco");
    input_name.setAttribute("minlength","1");
    input_name.setAttribute("maxlength","20");
    input_name.setAttribute("required", "true");
    input_name.setAttribute("autofocus", "true");
    div_name.appendChild(label_name);
    div_name.appendChild(input_name);
    form.appendChild(div_name);
    // grupo
    let div_group = document.createElement("div");
    let label_group = document.createElement("label");
    let input_group = document.createElement("input");
    label_group.textContent = "Grupo o cantante";
    label_group.setAttribute("for", "cantante");
    input_group.setAttribute("type", "text");
    input_group.setAttribute("name", "cantante");
    input_group.setAttribute("id", "cantante");
    input_group.setAttribute("required", "true");
    div_group.appendChild(label_group);
    div_group.appendChild(input_group);
    form.appendChild(div_group);
    // publicación
    let div_publi = document.createElement("div");
    let label_publi = document.createElement("label");
    let input_publi = document.createElement("input");
    label_publi.textContent = "Año de publicación";
    label_publi.setAttribute("for", "publicacion");
    input_publi.setAttribute("type", "number");
    input_publi.setAttribute("name", "publicacion");
    input_publi.setAttribute("id", "publicacion");
    input_publi.setAttribute("max", "2023");
    input_publi.setAttribute("step", "1");
    div_publi.appendChild(label_publi);
    div_publi.appendChild(input_publi);
    form.appendChild(div_publi);
    // estilo
    let div_estilo = document.createElement("div");
    let label_estilo = document.createElement("label");
    let input_estilo = document.createElement("input");
    let datalist_estilo = document.createElement("datalist");
    let option_rock = document.createElement("option");
    let option_pop = document.createElement("option");
    let option_punk = document.createElement("option");
    let option_indie = document.createElement("option");
    label_estilo.textContent = "Estilo musical";
    label_estilo.setAttribute("for", "estilo");
    input_estilo.setAttribute("list", "estilos");
    input_estilo.setAttribute("name", "estilo");
    input_estilo.setAttribute("id", "estilo");
    datalist_estilo.setAttribute("id", "estilos");
    option_rock.setAttribute("value", "rock");
    option_pop.setAttribute("value", "pop");
    option_punk.setAttribute("value", "punk");
    option_indie.setAttribute("value", "indie");
    datalist_estilo.appendChild(option_rock);
    datalist_estilo.appendChild(option_pop);
    datalist_estilo.appendChild(option_punk);
    datalist_estilo.appendChild(option_indie);
    div_estilo.appendChild(label_estilo);
    div_estilo.appendChild(input_estilo);
    div_estilo.appendChild(datalist_estilo);
    form.appendChild(div_estilo);
    // localización
    let div_localizacion = document.createElement("div");
    let label_localizacion = document.createElement("label");
    let input_localizacion = document.createElement("input");
    label_localizacion.textContent = "Estantería de localización";
    label_localizacion.setAttribute("for", "localizacion");
    input_localizacion.setAttribute("type", "number");
    input_localizacion.setAttribute("name", "localizacion");
    input_localizacion.setAttribute("id", "localizacion");
    input_localizacion.setAttribute("step", "1");
    div_localizacion.appendChild(label_localizacion);
    div_localizacion.appendChild(input_localizacion);
    form.appendChild(div_localizacion);
    // prestado
    let div_prestado = document.createElement("div");
    let label_prestado = document.createElement("label");
    let input_prestado = document.createElement("input");
    label_prestado.textContent = "¿Prestado?";
    label_prestado.setAttribute("for", "prestado");
    input_prestado.setAttribute("type", "checkbox");
    input_prestado.setAttribute("name", "prestado");
    input_prestado.setAttribute("id", "prestado");
    input_prestado.setAttribute("checked", "true");
    div_prestado.setAttribute("id", "divPrestado");
    div_prestado.appendChild(label_prestado);
    div_prestado.appendChild(input_prestado);
    form.appendChild(div_prestado);
    // botones
    let div_botones = document.createElement("div");
    let boton_submit = document.createElement("button");
    let boton_reset = document.createElement("button");
    boton_submit.textContent = "Enviar";
    boton_reset.textContent = "Resetear";
    boton_submit.setAttribute("type", "submit");
    boton_submit.setAttribute("id", "enviar");
    boton_submit.setAttribute("name", "enviar");
    boton_reset.setAttribute("type", "reset");
    boton_reset.setAttribute("id", "resetear");
    boton_reset.setAttribute("name", "resetear");
    div_botones.setAttribute("id", "divBotones")
    div_botones.appendChild(boton_submit);
    div_botones.appendChild(boton_reset);
    form.appendChild(div_botones);
}
