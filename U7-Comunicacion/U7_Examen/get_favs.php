<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  $error = array('result' => "Error: Method not allowed");
  echo json_encode($error);
  exit(1);
}

header("Content-Type: application/json; charset=UTF-8");

define('DB_SERVER', 'mariadb');
define('DB_USERNAME', 'dwec');
define('DB_PASSWORD', 'dwec');
define('DB_NAME', 'dwec');

$conexion = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$conexion->set_charset("utf8");

if ($conexion->connect_error) {
  $error = "Error en la conexion : "  . $conexion->connect_error;
  echo json_encode($error);
  exit(1);
}

$sql = "SELECT `id`,`original_title`, `overview`, `original_language`, `release_date`, `vote_average`, `poster_path`  FROM `movies_favs`";

$resultado = $conexion->query($sql);

$salida = array();

if ($resultado && $resultado->num_rows > 0) {
  while ($r = mysqli_fetch_assoc($resultado)) {
    $salida[] = $r;
  }
}

echo json_encode($salida);
exit(1);
