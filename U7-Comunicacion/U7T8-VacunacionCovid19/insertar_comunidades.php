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

$ccaa = $d_entregadas = $d_admin = $d_completa = "";
$p_entregadas = $p_admin = $p_completa = "";
$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $comunidades = json_decode($request, false);
    // var_dump($comunidades);
    foreach ($comunidades as $data) {

        // Validar cc.aa.
        $i_ccaa = trim($data->ccaa);
        if (empty($i_ccaa)) {
            $error = $error . "Introduzca el nombre de comunidad autónoma";
        } else {
            $ccaa = $i_ccaa;
        }

        // Validar dosis entregadas
        $i_d_entregadas = trim($data->dosisEntregadas);
        if (empty($i_d_entregadas) || !is_numeric($i_d_entregadas)) {
            $error = "Introduzca una cantidad de dosis entregadas.";
        } else {
            $d_entregadas = $i_d_entregadas;
        }

        // Validar dosis administradas
        $i_d_admin = trim($data->dosisAdministradas);
        if (empty($i_d_admin) || !is_numeric($i_d_admin)) {
            $error = $error . "Introduzca una cantidad de dosis administradas.";
        } else {
            $d_admin = $i_d_admin;
        }

        // Validar dosis de pauta completa
        $i_d_completa = trim($data->dosisPautaCompletada);
        if (empty($i_d_completa || !is_numeric($i_d_completa))) {
            $error = $error . "Introduzca una cantida de dosis en pauta completa.";
        } else {
            $d_completa = $i_d_completa;
        }

        // Validar porcentaje dosis entregadas
        if (property_exists($data, 'porcentajeEntregadas') && isset($data->porcentajeEntregadas)) {
            $i_p_d_entregadas = trim((string)$data->porcentajeEntregadas);
            if (empty($i_p_d_entregadas) || !is_numeric($i_p_d_entregadas)) {
                $error = "Introduzca un porcentaje de dosis entregadas.";
            } else {
                $p_d_entregadas = $i_p_d_entregadas;
            }
        }

        // Validar porcentaje dosis administradas
        if (property_exists($data, 'porcentajePoblacionAdministradas') && isset($data->porcentajePoblacionAdministradas)) {
            $i_p_d_admin = trim((string)$data->porcentajePoblacionAdministradas);
            if (empty($i_p_d_admin) || !is_numeric($i_p_d_admin)) {
                $error = $error . "Introduzca un porcentaje de dosis administradas.";
                var_dump($data);
            } else {
                $p_d_admin = $i_p_d_admin;
            }
        }

        // Validar porcentaje dosis de pauta completa
        if (property_exists($data, 'porcentajePoblacionCompletas') && isset($data->porcentajePoblacionCompletas)) {
            $i_p_d_completa = trim((string)$data->porcentajePoblacionCompletas);
            if (empty($i_p_d_completa) || !is_numeric($i_p_d_completa)) {
                $error = $error . "Introduzca un porcentaje de dosis de de pauta completa.";
            } else {
                $p_d_completa = $i_p_d_completa;
            }
        }

        // Si no hay errores, procedemos a insertar en la BD
        if (empty($error)) {
            // Preparar la sentencia
            $sql = "REPLACE INTO `vacunacion` (`ccaa`, `dosisAdministradas`, `dosisEntregadas`, `dosisPautaCompletada`, `porcentajeEntregadas`, `porcentajePoblacionAdministradas`, `porcentajePoblacionCompletas`) VALUES (?,?,?,?,?,?,?)";

            if ($stmt = $conexion->prepare($sql)) {
                // Enlaza las variables a los parámetros
                $stmt->bind_param(
                    'siiiddd',
                    $param_ccaa,
                    $param_d_admin,
                    $param_d_entregadas,
                    $param_d_completa,
                    $param_p_entregadas,
                    $param_p_admin,
                    $param_p_completa,
                );

                // Establecer los parámetros
                $param_ccaa = $ccaa;
                $param_d_admin = $d_admin;
                $param_d_entregadas = $d_entregadas;
                $param_d_completa = $d_completa;
                $param_p_entregadas = $p_d_entregadas;
                $param_p_admin = $p_d_admin;
                $param_p_completa = $p_d_completa;

                // Ejecutar la sentencia
                if (!$stmt->execute()) {
                    // Ha habido algún error. Devolver json con error de insercion en BD
                    $error = "Error al insertar en la BD";
                    echo json_encode($error);
                    exit(1);
                }
            } else {
                $error = "Error al preparar la sentencia";
                echo json_encode($error);
                exit(1);
            }
            // Cerramos la sentencia y la conexion
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode($error);
            exit(1);
        }
    }

    // Se han ejecutado todas las inserciones correctamente

    // Se ha creado corretamente, devolver json con "ok"
    $sql = "SELECT `ccaa`, `dosisAdministradas`, `dosisEntregadas`, `dosisPautaCompletada`, `porcentajeEntregadas`, `porcentajePoblacionAdministradas`, `porcentajePoblacionCompletas` FROM `vacunacion`";

    $resultado = $conexion->query($sql);

    $salida = array();

    if ($resultado && $resultado->num_rows > 0) {
        $salida =  $resultado->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($salida);
    exit(1);
} else {
    $error = "No es un metodo post";
    echo json_encode($error);
}
