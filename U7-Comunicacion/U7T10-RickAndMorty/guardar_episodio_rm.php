<?php
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

$name = $description = $class = "";

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode($request, false);

  // Validar nombre
  if (property_exists($data, 'name') && isset($data->name) && !empty(trim($data->name))) {
    $name = trim($data->name);
  } else {
  $error = $error . "Introduzca el nombre. ";
  }

  // Validar fecha
  if (property_exists($data, 'air_date') && isset($data->air_date) && !empty(trim($data->air_date))) {
    $air_date = trim($data->air_date);
  } else {
    $error = $error . "Introduzca la fecha. ";
  }

  // Validar teléfono
  if (property_exists($data, 'episode') && isset($data->episode) && !empty(trim($data->episode))) {
    $episode = trim($data->episode);
  } else {
    $error = $error . "Introduzca el episodio. ";
  }

  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "REPLACE INTO `episodios` (`name`, `air_date`, `episode`) VALUES (?,?,?)";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      $stmt->bind_param(
        'sss',
        $param_name,
        $param_air_date,
        $param_episode
      );

      // Establecer los parámetros
      $param_name = $name;
      $param_air_date = $air_date;
      $param_episode = $episode;

      // Ejecutar la sentencia
      if (!$stmt->execute()) {
        // Ha habido algún error. Devolver json con error de insercion en BD
        $error = array('resultado' => "Error al insertar en la BD. ");
        echo json_encode($error);
        exit(1);
      }
    } else {
      $error = array('resultado' => "Error al preparar la sentencia");
      echo json_encode($error);
      exit(1);
    }
    // Cerramos la sentencia y la conexion
    mysqli_stmt_close($stmt);
  } else {
    $error = array('resultado' => $error);
    echo json_encode($error);
    exit(1);
  }

  // Se han ejecutado todas las inserciones correctamente
  $sql = "SELECT `name`, `air_date`, `episode` FROM `episodios` WHERE `name` = '$name'";
  $resultado = $conexion->query($sql);
  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    // Se ha creado corretamente, devolver json con "episodio registrado"
    $salida = array('resultado' => "Episodio ". $name . " insertado correctamente");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('resultado' => "No es un metodo post.");
  echo json_encode($error);
}
