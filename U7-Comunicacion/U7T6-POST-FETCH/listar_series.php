<?php
header("Content-Type: application/json; charset=UTF-8");

$servidor = "mariadb";
$usuario = "dwec";
$password = "dwec";
$bbdd = "dwec";

//Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $bbdd);
mysqli_set_charset($conexion, "utf8");

//Comprobamos la conexión
if ($conexion->connect_error) {
    die("Error en la conexion: " + $conexion->connect_error);
} else {
    //Conexión correcta

    //Creamos la consulta SQL
    $sql = "SELECT `id`, `titulo`, `cadena`, `director`, `anyo`, `terminada` FROM `series`";

    $resultado = $conexion->query($sql);

    $salida = array();

    if ($resultado && $resultado->num_rows > 0) {
        $salida =  $resultado->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($salida);
}

$conexion->close();
