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

$title = $url = $explanation = $date = "";

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode($request, false);

  // Validar title
  if (property_exists($data, 'title') && isset($data->title) && !empty(trim($data->title))) {
    $title = trim($data->title);
  } else {
    $error = $error . "Introduzca el título. ";
  }

  // Validar url
  if (property_exists($data, 'url') && isset($data->url) && !empty(trim($data->url))) {
    $url = trim($data->url);
  } else {
    $error = $error . "Introduzca la URL. ";
  }

  // Validar explanation
  if (property_exists($data, 'explanation') && isset($data->explanation) && !empty(trim($data->explanation))) {
    $explanation = trim($data->explanation);
  } else {
    $error = $error . "Introduzca la explicación. ";
  }

  // Validar date
  if (property_exists($data, 'date') && isset($data->date) && !empty(trim($data->date))) {
    $date = trim($data->date);
  } else {
    $error = $error . "Introduzca la fecha. ";
  }


  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "REPLACE INTO `nasa_apod` (`title`, `url`, `explanation`, `date`) VALUES (?,?,?,?)";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      $stmt->bind_param(
        'ssss',
        $param_title,
        $param_url,
        $param_explanation,
        $param_date,
      );

      // Establecer los parámetros
      $param_title = $title;
      $param_url = $url;
      $param_explanation = $explanation;
      $param_date = $date;

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
  $sql = "SELECT `title`, `url`, `date` FROM `nasa_apod` WHERE `title` = '$title'";
  $resultado = $conexion->query($sql);
  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    // Se ha creado corretamente, devolver json con "episodio registrado"
    $salida = array('resultado' => "APOD " . $title . " insertada correctamente");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('resultado' => "No es un metodo post.");
  echo json_encode($error);
}
