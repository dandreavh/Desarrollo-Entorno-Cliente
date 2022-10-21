/**
 * @author dandreavh
 * Crea un programa que pida al usuario una propuesta de contraseña y compruebe si cumple con los siguientes requisitos.
 * Tiene entre 8 y 16 caracteres.
 * Tiene una letra mayúscula.
 * Tiene una letra minúscula.
 * Tiene un número.
 * Tiene uno de los siguientes valores: guión alto, guión bajo, arroba,  almohadilla, dólar, tanto por ciento o ampersand.
 * Si cumple con todos los requisitos se considera una contraseña segura, de lo  contrario mostrará que es una contraseña no segura.
 */
// Vuelque en variable el valor capturado en formato String
let userPassword = (prompt("Introduzca una contraseña")).toString();

// Llamada a la función con parámetro
if(isValidPassword(userPassword)){
    alert("Contraseña segura");
} else{
    alert("Contraseña no segura");
}

/**
 * 
 * @param {*} password 
 * @returns true or false
 */
function isValidPassword(password){
    if(password.length>=8 && password.length<=16){
        let mayuscula = false;
        let minuscula = false;
        let digito = false;
        let caracter = false;
        // Bucle para el recorrido de la contraseña
        for (let i = 0; i < password.length; i++) {
            // Comprueba mayúsculas
            if (password[i].match(/^[A-Z]$/)){
               mayuscula=true;
            } 
            // Comprueba minúsculas
            if(password[i].match(/^[a-z]$/)){
               minuscula=true;
            }
            // Comprueba dígito
            if(password[i].match(/^\d$/)){
                digito = true;
            }
            // Comprueba caracter especial
            if(password[i].match(/^\w$/)){
                caracter=true;
            }
        }
        // Si se cumplen todos los requisitos
        if(mayuscula && minuscula && digito && caracter){
            return true;
        } 
    } else{
        // Si no se cumplen los requisitos (uno o ninguno)
        return false;
    }
}