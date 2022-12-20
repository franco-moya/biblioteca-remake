<?php
include_once("inventario.php");
$operacion = $_POST["tipoOperacion"];
switch($operacion){
    case 'ListarArticulos':
        $res = inventario::ListarArticulos();
        echo $res;
        break;
    case 'ListarUsuarios':
        $res = inventario::ListarUsuarios();
        echo $res;
        break;
    case 'ListarLibrosEnBiblioteca':
        $res = inventario::ListarLibrosEnBiblioteca();
        echo $res;
        break;
    case 'BuscarUnLibro':
        $texto = $_POST["texto"];
        $res = inventario::BuscadorSoloLibros($texto);
        echo $res;
        break;
    case 'EstadoAdmin':
        $res = inventario::ConsultarEstado();
        echo $res;
        break;
    case 'darPermisos':
        $res = inventario::DarPermisos();
        echo $res;
        break;
    case 'quitarPermisos':
        $res = inventario::QuitarPermisos();
        echo $res;
        break;
}