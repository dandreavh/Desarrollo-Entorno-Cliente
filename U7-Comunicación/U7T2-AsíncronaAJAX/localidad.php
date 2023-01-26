<?php
$a = array(
  "Cádiz", "Algeciras", "Los Barrios", "Sevilla", "Tomares", "Manilva", "Castilleja de la Cuesta",
  "Zahara de los Atunes", "El Puerto", "Chipiona", "Tocina"
);

$localidad = $_REQUEST["localidad"];
$ciudad = "";

if ($localidad !== "") {
  $localidad = strtolower($localidad);
  $long = strlen($localidad);

  foreach ($a as $loc) {
    if (stristr($localidad, substr($loc, 0, $long))) {
      if ($ciudad === "") {
        $ciudad = $loc;
      } else {
        $ciudad = "$ciudad, $loc";
      }
    }
  }
}

//echo $localidad;
echo ($ciudad === "") ? "NO" : "SI";
