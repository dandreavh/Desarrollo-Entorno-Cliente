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
  $vehiculos = json_decode($request, false);

  foreach ($vehiculos as $data) {

    // Validar id vehiculo
    if (property_exists($data, 'id') && isset($data->id) && !empty(trim($data->id))) {
      $id = trim($data->id);
    } else {
      $error = $error . "Introduzca el identificador del vehiculo. ";
    }

    // Validar nombre vehiculo
    if (property_exists($data, 'name') && isset($data->name) && !empty(trim($data->name))) {
      $name = trim($data->name);
    } else {
      $error = $error . "Introduzca el nombre del vehiculo. ";
    }

    // Validar descripcion vehiculo
    if (property_exists($data, 'description') && isset($data->description) && !empty(trim($data->description))) {
      $description = trim($data->description);
    } else {
      $error = $error . "Introduzca la descripcion del vehiculo. ";
    }

    // Validar clase vehiculo
    if (property_exists($data, 'vehicle_class') && isset($data->vehicle_class) && !empty(trim($data->vehicle_class))) {
      $vehicle_class = trim($data->vehicle_class);
    } else {
      $error = $error . "Introduzca la clase del vehiculo. ";
    }

    // Si no hay errores, procedemos a insertar en la BD
    if (empty($error)) {
      // Preparar la sentencia
      $sql = "REPLACE INTO `vehiculos` (`id`,`name`, `description`,`class`) VALUES (?,?,?,?)";

      if ($stmt = $conexion->prepare($sql)) {
        // Enlaza las variables a los parámetros
        $stmt->bind_param(
          'ssss',
          $param_id,
          $param_name,
          $param_description,
          $param_vehicle_class,

        );

        // Establecer los parámetros
        $param_id = $id;
        $param_name = $name;
        $param_description = $description;
        $param_vehicle_class = $vehicle_class;

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
  }

  // Se han ejecutado todas las inserciones correctamente

  // Se ha creado corretamente, devolver json con "ok"
  $sql = "SELECT `id`, `class`, `description` FROM `vehiculos`";

  $resultado = $conexion->query($sql);

  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    $salida =  $$error = array('resultado' => "Vehículos insertados correctamente.");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('resultado' => "No es un metodo post");
  echo json_encode($error);
}
