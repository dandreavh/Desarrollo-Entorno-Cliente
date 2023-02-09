<?php
header("Content-Type: application/json; charset=UTF-8");

define('DB_SERVER', 'mariadb');
define('DB_USERNAME', 'dwec');
define('DB_PASSWORD', 'dwec');
define('DB_NAME', 'dwec');

$conexion = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conexion->connect_error) {
  $error = "Error en la conexion : "  . $conexion->connect_error;
  echo json_encode($error);
  exit(1);
}

$titulo = $director = $cadena = $anyo = $terminada = "";
$error = "";

// Procesar datros cuando se realiza la petición
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, false);

  // Validar título
  $input_titulo = trim($data->titulo);
  if (empty($input_titulo)) {
    $error = "Introduzca un titulo.";
  } else {
    $titulo = $input_titulo;
  }

  // Validar director
  $input_director = trim($data->director);
  if (empty($input_director)) {
    $error = $error . "Introduzca un director.";
  } else {
    $director = $input_director;
  }

  // Validar cadena
  $input_cadena = trim($data->cadena);
  if (empty($input_cadena)) {
    $error = $error . "Introduzca una cadena.";
  } else {
    $cadena = $input_cadena;
  }

  // Validar anyo
  $input_anyo = trim($data->anyo);
  if (empty($input_anyo) || !is_numeric($input_anyo)) {
    $error = $error . "Introduzca un año. Debe ser numérico";
  } else {
    $anyo = $input_anyo;
  }

  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "INSERT INTO series (titulo, cadena, director, anyo, terminada) 
        VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      $stmt->bind_param('sssii', $param_titulo, $param_cadena, $param_director, $param_anyo, $param_terminada);

      // Establecer los parámetros
      $param_titulo = $titulo;
      $param_cadena = $cadena;
      $param_director = $director;
      $param_anyo = $anyo;
      $param_terminada = $data->terminada;

      // Ejecutar la sentencia
      if ($stmt->execute()) {
        // Se ha creado corretamente, devolver json con "ok"
        $mensaje = "ok";
        echo json_encode($mensaje);
        exit(1);
      } else {
        // Ha habido algún error. Devolver json con error de insercion en BD
        $error = "Error al insertar en la BD";
        echo json_encode($error);
        exit(1);
      }
    }
    // Cerramos la sentencia y la conexion
    mysqli_stmt_close($stmt);
    mysqli_close($link);
  } else {
    echo json_encode($error);
    exit(1);
  }
} else {
  $error = "No es un metodo post";
  echo json_encode($error);
}