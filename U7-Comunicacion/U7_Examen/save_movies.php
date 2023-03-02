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

$id = $original_title = $overview = $original_language = $release_date = $vote_average = $poster_path = "";

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $movies = json_decode($request, false);

  foreach ($movies as $movie) {

    // Validar movie id
    if (property_exists($movie, 'id') && isset($movie->id) && !empty(trim($movie->id))) {
      $id = trim($movie->id);
    } else {
      $error = $error . "Movie ID not found.";
    }

    // Validar movie original_title
    if (property_exists($movie, 'original_title') && isset($movie->original_title) && !empty(trim($movie->original_title))) {
      $original_title = trim($movie->original_title);
    } else {
      $error = $error . "Movie original_title not found. ";
    }

    // Validar movie overview
    if (property_exists($movie, 'overview') && isset($movie->overview) && !empty(trim($movie->overview))) {
      $overview = trim($movie->overview);
    } else {
      $error = $error . "Movie overview not found. ";
    }

    // Validar movie original_language
    if (property_exists($movie, 'original_language') && isset($movie->original_language) && !empty(trim($movie->original_language))) {
      $original_language = trim($movie->original_language);
    } else {
      $error = $error . "Movie original_language not found. ";
    }

    // Validar movie release_date
    if (property_exists($movie, 'release_date') && isset($movie->release_date) && !empty(trim($movie->release_date))) {
      $release_date = trim($movie->release_date);
    } else {
      $error = $error . "Movie release_date not found. ";
    }

    // Validar movie vote_average
    if (property_exists($movie, 'vote_average') && isset($movie->vote_average) && !empty(trim($movie->vote_average))) {
      $vote_average = trim($movie->vote_average);
    } else {
      $error = $error . "Movie vote_average not found. ";
    }

    // Validar movie poster_path
    if (property_exists($movie, 'poster_path') && isset($movie->poster_path) && !empty(trim($movie->poster_path))) {
      $poster_path = trim($movie->poster_path);
    } else {
      $error = $error . "Movie poster_path not found. ";
    }

    // Si no hay errores, procedemos a insertar en la BD
    if (empty($error)) {
      // Preparar la sentencia
      $sql = "REPLACE INTO `movies_favs` (`id`,`original_title`, `overview`, `original_language`, `release_date`, `vote_average`, `poster_path`) VALUES (?,?,?,?,?,?,?)";

      if ($stmt = $conexion->prepare($sql)) {
        // Enlaza las variables a los parámetros
        $stmt->bind_param(
          'sssssss',
          $param_id,
          $param_original_title,
          $param_overview,
          $param_original_language,
          $param_release_date,
          $param_vote_average,
          $param_poster_path,
        );

        // Establecer los parámetros
        $param_id = $id;
        $param_original_title = $original_title;
        $param_overview = $overview;
        $param_original_language = $original_language;
        $param_release_date = $release_date;
        $param_vote_average = $vote_average;
        $param_poster_path = $poster_path;

        // Ejecutar la sentencia
        if (!$stmt->execute()) {
          // Ha habido algún error. Devolver json con error de insercion en BD
          $error = array('results' => "Error inserting into DB. ");
          echo json_encode($error);
          exit(1);
        }
      } else {
        $error = array('results' => "Error preparing SQL statement.");
        echo json_encode($error);
        exit(1);
      }
      // Cerramos la sentencia y la conexion
      mysqli_stmt_close($stmt);
    } else {
      $error = array('results' => $error);
      echo json_encode($error);
      exit(1);
    }
  }

  // Se han ejecutado todas las inserciones correctamente

  $id = $original_title = $overview = $original_language = $release_date = $vote_average = $poster_path = "";

  // Se ha creado corretamente, devolver json con "ok"
  $sql = "SELECT `id`, `original_title`, `overview`, `original_language`, `release_date`, 
          `vote_average`, `poster_path` FROM `movies_favs`";

  $resultado = $conexion->query($sql);

  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    $salida =  $$error = array('results' => "Movies saved properly. ");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('results' => "Not a POST request.");
  echo json_encode($error);
}
