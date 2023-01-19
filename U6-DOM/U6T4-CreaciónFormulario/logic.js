// botones
let input_text = document.getElementById("input_text");
let input_password = document.getElementById("input_password");
let input_checkbox = document.getElementById("input_checkbox");
let input_radio = document.getElementById("input_radio");
let textarea = document.getElementById("textarea");
let label = document.getElementById("label");
let image = document.getElementById("image");
let button_submit = document.getElementById("button_submit");
// listeners
input_text.addEventListener("click", createInputText, false);
input_password.addEventListener("click", createInputPassword, false);
input_checkbox.addEventListener("click", createInputCheckbox, false);
input_radio.addEventListener("click", createInputRadio, false);
textarea.addEventListener("click", createTextarea, false);
label.addEventListener("click", createLabel, false);
image.addEventListener("click", createImage, false);
button_submit.addEventListener("click", createButtonSubmit, false);
// --- funciones ---
let body = document.getElementsByTagName("body")[0];
let form = document.createElement("form");
body.appendChild(form);
// funciones de llamada
function createInputText(){
    let att_name = askAttName();
    let input_txt = document.createElement("input");
    input_txt.setAttribute("type", "text");
    input_txt.setAttribute("name", att_name);
    form.appendChild(input_txt);
    breakLine();
}
function createInputPassword(){
    let att_name = askAttName();
    let input_pw = document.createElement("input");
    input_pw.setAttribute("type", "password");
    input_pw.setAttribute("name", att_name);
    form.appendChild(input_pw);
    breakLine();
}
function createInputCheckbox(){
    let att_name = askAttName();
    let att_value = askAttValue();
    let text_content = askTextContent();
    let input_cb = document.createElement("input");
    let label = document.createElement("label");
    input_cb.setAttribute("type", "checkbox");
    input_cb.setAttribute("name", att_name);
    input_cb.setAttribute("value", att_value);  
    label.setAttribute("for", att_name);
    label.textContent = text_content;
    form.appendChild(input_cb);
    form.appendChild(label);
    breakLine();
}
function createInputRadio(){
    let att_name = askAttName();
    let att_value = askAttValue();
    let text_content = askTextContent();
    let input_rd = document.createElement("input");
    let label = document.createElement("label");
    input_rd.setAttribute("type", "radio");
    input_rd.setAttribute("name", att_name);
    input_rd.setAttribute("value", att_value);  
    label.setAttribute("for", att_name);
    label.textContent = text_content;
    form.appendChild(input_rd);
    form.appendChild(label);
    breakLine();
}
function createTextarea(){
    let att_name = askAttName();
    let txtarea = document.createElement("textarea");
    txtarea.setAttribute("name", att_name);
    txtarea.setAttribute("cols", "40");
    txtarea.setAttribute("rows", "5");
    form.appendChild(txtarea);
    breakLine();
}
function createLabel(){
    let att_for = prompt("Indique a qué input (name) se refiere");
    let label = document.createElement("label");
    let text = askTextContent();
    label.setAttribute("for", att_for);
    label.textContent = text;
    form.appendChild(label);
    breakLine();
}
function createImage(){
    let att_src = prompt("Indique la ruta de la imagen");
    let img = document.createElement("img");
    img.setAttribute("src", att_src);
    form.appendChild(img);
    breakLine();
}
function createButtonSubmit(){
    let att_name = askAttName();
    let att_value = askAttValue();
    let btn = document.createElement("button");
    btn.setAttribute("type", "submit");
    btn.setAttribute("name", att_name);
    btn.setAttribute("value", att_value);
    btn.textContent = "Enviar";
    form.appendChild(btn);
    breakLine();
}
// funciones de operación
function askAttName(){
    return prompt("Indique el nombre que se asignará al atributo 'name'");
}
function askAttValue(){
    return prompt("Indique el valor que se asignará al atributo 'value'");
}
function askTextContent(){
    return prompt("Indique qué texto desea que acompañe al elemento");
}
function breakLine(){
    let br = document.createElement("br");
    form.appendChild(br);
}