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
    case 'ListarCategorias':
        $res = inventario::ListarCategorias();
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
    case 'BuscarUnArticulo':
        $texto = $_POST["texto"];
        $categoria = $_POST["categoria"];
        $res = inventario::BuscadorArticulos($texto, $categoria);
        echo $res;
        break;
    case 'BuscarUnaCategoria':
        $texto = $_POST["texto"];
        $res = inventario::BuscadorCategorias($texto);
        echo $res;
        break;
    case 'IngresarUnArticulo':
        $nombre = $_POST["nombre"];
        $cantidad = $_POST["cantidad"];
        $categoria = $_POST["categoria"];
        $res = inventario::IngresarArticulo($nombre, $cantidad, $categoria);
        echo $res;
        break;
    case 'IngresarUnaCategoria':
        $categoria = $_POST["categoria"];
        $res = inventario::IngresarCategoria($categoria);
        echo $res;
        break;
    case 'EliminarUnArticulo':
        $id = $_POST["id"];
        $res = inventario::EliminarArticulo($id);
        echo $res;
        break;
    case 'EliminarUnaCategoria':
        $id = $_POST["id"];
        $res = inventario::EliminarCategoria($id);
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
    case 'actualizarUnidadDelArticulo':
        $id = $_POST["id"];
        $prestados = $_POST["prestados"];
        $res = inventario::ModificarUnidad($id, $prestados);
        echo $res;
        break;
    case 'ActualizarUnaCategoria':
        $id = $_POST["id"];
        $categoria = $_POST["categoria"];
        $res = inventario::ActualizarCategoria($id, $categoria);
        echo $res;
        break;
    case 'ActualizarUnArticulo':
        $id = $_POST["id"];
        $total = $_POST["total"];
        $titulo = $_POST["titulo"];
        $categoria = $_POST["categoria"];
        $res = inventario::ActualizarArticulo($id, $titulo, $total, $categoria);
        echo $res;
        break;
}