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
    $data = json_decode($request, false);

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
    $i_p_d_entregadas = trim($data->porcentajeEntregadas);
    if (empty($i_p_d_entregadas) || !is_numeric($i_p_d_entregadas)) {
        $error = "Introduzca un porcentaje de dosis entregadas.";
    } else {
        $p_d_entregadas = $i_p_d_entregadas;
    }

    // Validar porcentaje dosis administradas
    $i_p_d_admin = trim($data->porcentajePoblacionAdministradas);
    if (empty($i_p_d_admin) || !is_numeric($i_p_d_admin)) {
        $error = $error . "Introduzca un porcentaje de dosis administradas.";
    } else {
        $p_d_admin = $i_p_d_admin;
    }

    // Validar porcentaje dosis de pauta completa
    $i_p_d_completa = trim($data->porcentajePoblacionCompletas);
    if (empty($i_p_d_completa) || !is_numeric($i_p_d_completa)) {
        $error = $error . "Introduzca un porcentaje de dosis de de pauta completa.";
    } else {
        $p_d_completa = $i_p_d_completa;
    }

    // Si no hay errores, procedemos a insertar en la BD
    if (empty($error)) {
        // Preparar la sentencia

        $sql = "UPDATE `vacunacion` SET `ccaa`='$ccaa',`dosisAdministradas`= '$d_admin',`dosisEntregadas`='$d_entregadas',`dosisPautaCompletada`='$d_completa',`porcentajeEntregadas`='$p_d_entregadas',`porcentajePoblacionAdministradas`='$p_d_admin',`porcentajePoblacionCompletas`='$p_d_completa' WHERE `ccaa` = '$ccaa'";

        if ($stmt = $conexion->prepare($sql)) {
            // Ejecutar la sentencia
            if ($stmt->execute()) {
                // Se ha creado corretamente, devolver json con "ok"
                $sql = "SELECT `ccaa`, `dosisAdministradas`, `dosisEntregadas`, `dosisPautaCompletada`, `porcentajeEntregadas`, `porcentajePoblacionAdministradas`, `porcentajePoblacionCompletas` FROM `vacunacion` WHERE `ccaa` = '$ccaa'";

                $resultado = $conexion->query($sql);

                if ($resultado && $resultado->num_rows > 0) {
                    $salida =  $resultado->fetch_all(MYSQLI_ASSOC)[0];
                }

                echo json_encode($salida);
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
