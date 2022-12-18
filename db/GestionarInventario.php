<?php
include_once("inventario.php");
$operacion = $_POST["tipoOperacion"];
switch($operacion){
    case 'ListarArticulos':
        $res = inventario::ListarArticulos();
        echo $res;
        break;
}