/**
 * @author dandreavh
 */
function knowSign() {
    debugger
    const birthday = (document.getElementById("birthday").value);
    const day = parseInt(birthday.substring(birthday.length - 2, birthday.length));
    const month = parseInt(birthday.substring(birthday.length - 5, birthday.length - 3));
    const iframe = document.querySelector("iframe");
    let sign;

    switch (month) {
        case 1:
            sign = (day >= 1 && day <= 15) ? "Anubis" : "Bastet";
            break;
        case 2:
            sign = (day >= 1 && day <= 15) ? "Bastet" : "Serket";
            break;
        case 3:
            sign = (day >= 1 && day <= 15) ? "Serket" : "Apep";
            break;
        case 4:
            sign = (day >= 1 && day <= 15) ? "Apep" : "Ptah";
            break;
        case 5:
            sign = (day >= 1 && day <= 15) ? "Ptah" : "Atum";
            break;
        case 6:
            sign = (day >= 1 && day <= 15) ? "Atum" : "Isis";
            break;
        case 7:
            sign = (day >= 1 && day <= 15) ? "Isis" : "Ra";
            break;
        case 8:
            sign = (day >= 1 && day <= 15) ? "Ra" : "Horus";
            break;
        case 9:
            sign = (day >= 1 && day <= 15) ? "Horus" : "Maat";
            break;
        case 10:
            sign = (day >= 1 && day <= 15) ? "Maat" : "Osiris";
            break;
        case 11:
            sign = (day >= 1 && day <= 15) ? "Osiris" : "Hathor";
            break;
        case 12:
            sign = (day >= 1 && day <= 15) ? "Hathor" : "Anubis";
            break;
    }

    switch(sign){
        case "Anubis":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Anubis")
            break;
        case "Bastet" :
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Bastet");
            break;
        case "Serket":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Serket");
            break;
        case "Apep":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Apofis_(mitolog%C3%ADa)");
            break;
        case "Ptah":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Ptah");
            break;
        case "Atum":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Atum");
            break;
        case "Isis":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Isis");
            break;
        case "Ra":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Ra_(mitolog%C3%ADa)");
            break;
        case "Horus":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Horus");
            break;
        case "Maat":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Maat");
            break;
        case "Osiris":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Osiris");
            break;
        case "Hathor":
            iframe.setAttribute("src","https://es.wikipedia.org/wiki/Hathor");
            break;
    }

    document.getElementById("sign").innerHTML = "Tu signo es " + sign;
}