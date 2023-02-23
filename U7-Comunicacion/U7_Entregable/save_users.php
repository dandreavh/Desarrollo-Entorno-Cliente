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

$name = $phone = $street = $email = $image = "";

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $usuarios = json_decode($request, false);

  foreach ($usuarios as $usuario) {

    // Validar user name
    if (property_exists($usuario, 'name') && isset($usuario->name) && !empty(trim($usuario->name))) {
      $name = trim($usuario->name);
    } else {
      $error = $error . "User name not found.";
    }

    // Validar user phone
    if (property_exists($usuario, 'phone') && isset($usuario->phone) && !empty(trim($usuario->phone))) {
      $phone = trim($usuario->phone);
    } else {
      $error = $error . "User phone not found. ";
    }

    // Validar user street
    if (property_exists($usuario, 'street') && isset($usuario->street) && !empty(trim($usuario->street))) {
      $street = trim($usuario->street);
    } else {
      $error = $error . "User street not found. ";
    }

    // Validar user email
    if (property_exists($usuario, 'email') && isset($usuario->email) && !empty(trim($usuario->email))) {
      $email = trim($usuario->email);
    } else {
      $error = $error . "User email not found. ";
    }

    // Validar user image
    if (property_exists($usuario, 'image') && isset($usuario->image) && !empty(trim($usuario->image))) {
      $image = trim($usuario->image);
    } else {
      $error = $error . "User image not found. ";
    }

    // Si no hay errores, procedemos a insertar en la BD
    if (empty($error)) {
      // Preparar la sentencia
      $sql = "REPLACE INTO `users` (`name`, `phone`, `street`, `email`, `image`) VALUES (?,?,?,?,?)";

      if ($stmt = $conexion->prepare($sql)) {
        // Enlaza las variables a los parámetros
        $stmt->bind_param(
          'sssss',
          $param_name,
          $param_phone,
          $param_street,
          $param_email,
          $param_image,

        );

        // Establecer los parámetros
        $param_name = $name;
        $param_phone = $phone;
        $param_street = $street;
        $param_email = $email;
        $param_image = $image;

        // Ejecutar la sentencia
        if (!$stmt->execute()) {
          // Ha habido algún error. Devolver json con error de insercion en BD
          $error = array('resultado' => "Error inserting into DB. ");
          echo json_encode($error);
          exit(1);
        }
      } else {
        $error = array('resultado' => "Error preparing SQL statement.");
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
  $sql = "SELECT `name`, `phone`, `street`, `email`, `image` FROM `users`";

  $resultado = $conexion->query($sql);

  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    $salida =  $$error = array('resultado' => "Users saved properly. ");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('resultado' => "Not a POST request.");
  echo json_encode($error);
}
