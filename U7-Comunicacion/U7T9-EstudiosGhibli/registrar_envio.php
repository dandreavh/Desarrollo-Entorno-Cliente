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

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode($request, false);

  // Validar nombre
  if (property_exists($data, 'nombre') && isset($data->nombre) && !empty(trim($data->nombre))) {
    $nombre = trim($data->nombre);
  } else {
    $error = $error . "Introduzca un nombre. ";
  }

  // Validar dirección
  if (property_exists($data, 'direccion') && isset($data->direccion) && !empty(trim($data->direccion))) {
    $direccion = trim($data->direccion);
  } else {
    $error = $error . "Introduzca la dirección. ";
  }

  // Validar teléfono
  if (property_exists($data, 'telefono') && isset($data->telefono) && !empty(trim($data->telefono))) {
    $telefono = trim($data->telefono);
  } else {
    $error = $error . "Introduzca el teléfono. ";
  }

  // Validar correo
  if (property_exists($data, 'correo') && isset($data->correo) && !empty(trim($data->correo))) {
    $correo = $data->correo;
  } else {
    $error = $error . "Introduzca el correo.";
  }

  // Validar vehículos
  $string_vehiculos = "";
  if (property_exists($data, 'vehiculos') && isset($data->vehiculos) && !empty($data->vehiculos)) {
    foreach ($data->vehiculos as $vehiculo) {
      $string_vehiculos = $string_vehiculos . strval($vehiculo) . ",";
    }
    $vehiculos = rtrim($string_vehiculos, ",");
  } else {
    $error = $error . "Introduzca algún vehículo. ";
  }

  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "REPLACE INTO `envios` (`nombre`, `direccion`, `telefono`,`correo`, `vehiculos`) VALUES (?,?,?,?,?)";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      $stmt->bind_param(
        'sssss',
        $param_nombre,
        $param_direccion,
        $param_telefono,
        $param_correo,
        $param_vehiculos,

      );

      // Establecer los parámetros
      $param_nombre = $nombre;
      $param_direccion = $direccion;
      $param_telefono = $telefono;
      $param_correo = $correo;
      $param_vehiculos = $vehiculos;

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
  $sql = "SELECT `nombre`, `direccion`, `telefono`, `correo`, `vehiculos` FROM `envios` WHERE `nombre` = '$nombre'";
  $resultado = $conexion->query($sql);
  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    // Se ha creado corretamente, devolver json con "envio registrado"
    $salida = array('resultado' => "envio registrado");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('resultado' => "No es un metodo post");
  echo json_encode($error);
}
