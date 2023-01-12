// root
const obj_html = document.documentElement;
// body
const obj_body = obj_html.childNodes[1];
// número de párrafos
const num_parrafos = obj_html.getElementsByTagName("p").length;
// texto del segundo párrafo
const texto_segundo_parrafo = obj_html.getElementsByTagName("p")[1].textContent;
// número de enlaces de la página
const num_enlaces = obj_html.getElementsByTagName("a").length;
// dirección del primer enlace
const direccion_primer_enlace = obj_html.getElementsByTagName("a")[0].getAttribute("href"); // .href
// La dirección del penúltimo enlace
const direccion_penultimo_enlace = obj_html.getElementsByTagName("a")[obj_html.getElementsByTagName("a").length-2].getAttribute("href"); //.href
// número de enlaces que apuntan a /wiki/Municipio
const elm_a = obj_html.getElementsByTagName("a");
let num_enlaces_municipio = contador();
function contador() {
    let contador = 0;
    for (const i of elm_a) {
        if(i.href.includes("/wiki/Municipio")){
            contador++;
        }
    }
    return contador;
}
// número de enlaces del primer párrafo
const elms_primer_parrafo = obj_html.getElementsByTagName("p")[0];
const num_enlaces_primer_parrafo = elms_primer_parrafo.getElementsByTagName("a").length;