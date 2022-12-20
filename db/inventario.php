<?php
include_once("conexion.php");

class inventario{
    
    static public function ListarArticulos(){
        $connect = Conexion::conectar();
        $sql = "SELECT * FROM articulos WHERE id_articulo  ORDER BY nombre_articulo ASC";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);
    }

    static public function ListarLibrosEnBiblioteca(){
        $connect = Conexion::conectar();
        $sql = "SELECT nombre_articulo nombre, (cantidad_total - cantidad_prestada) available, cantidad_total total FROM `articulos` WHERE id_categoria = 1 ORDER BY nombre_articulo ASC;";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);
    }

    static public function ListarUsuarios(){
        $connect = Conexion::conectar();
        $sql = "SELECT usuario, password_usuario FROM usuarios ORDER BY usuario ASC";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);
    }

    static public function ListarCategorias(){
        $connect = Conexion::conectar();
        $sql = "SELECT * FROM categorias ORDER BY id_categoria ASC";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);
    }

    static public function ConsultarEstado(){
        $connect = Conexion::conectar();
        $sql = "SELECT estado FROM usuarios WHERE usuario = 'admin'";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);
    }

    static public function DarPermisos(){
        $connect = Conexion::conectar();
        $sql = "UPDATE usuarios SET estado=1 WHERE usuario='admin'";
        $resultado = $connect -> query($sql);
        return json_encode($resultado);
    }

    static public function QuitarPermisos(){
        $connect = Conexion::conectar();
        $sql = "UPDATE usuarios SET estado=0 WHERE usuario='admin'";
        $resultado = $connect -> query($sql);
        return json_encode($resultado);
    }

    static public function BuscadorSoloLibros($texto){
        $connect = Conexion::conectar();
        $sql = "SELECT nombre_articulo nombre, (cantidad_total - cantidad_prestada) available, cantidad_total total FROM articulos WHERE id_categoria = 1 AND nombre_articulo LIKE '%$texto%' ORDER BY nombre_articulo ASC";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);    
    }

    static public function BuscadorArticulos($texto){
        $connect = Conexion::conectar();
        $sql = "SELECT * FROM articulos WHERE nombre_articulo LIKE '%$texto%' ORDER BY nombre_articulo ASC;";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);    
    }

    static public function BuscadorCategorias($texto){
        $connect = Conexion::conectar();
        $sql = "SELECT * FROM categorias WHERE categoria LIKE '%$texto%' ORDER BY id_categoria ASC;";
        $resultado = $connect -> query($sql);
        $arreglo = [];
        $i = 0;
        while($fila = $resultado -> fetch_assoc()) {
            $arreglo[$i] = $fila;
            $i++;
        }
        return json_encode($arreglo);    
    }

    static public function IngresarArticulo($nombre, $cantidad, $categoria){
        $connect = Conexion::conectar();
        $sql = "INSERT INTO `articulos` (`id_articulo`, `nombre_articulo`, `id_categoria`, `cantidad_prestada`, `cantidad_total`) VALUES (NULL, '$nombre', '$categoria', '0', '$cantidad');";
        $resultado = $connect -> query($sql);
        return $resultado;    
    }

    static public function IngresarCategoria($categoria){
        $connect = Conexion::conectar();
        $sql = "INSERT INTO `categorias` (`id_categoria`, `categoria`, `imagen`) VALUES (NULL, '$categoria', '');";
        $resultado = $connect -> query($sql);
        return $resultado;    
    }

    static public function EliminarCategoria($id){
        $connect = Conexion::conectar();
        $sql = "DELETE FROM categorias WHERE `categorias`.`id_categoria` = $id";
        $resultado = $connect -> query($sql);
        return $resultado;    
    }

    static public function EliminarArticulo($id){
        $connect = Conexion::conectar();
        $sql = "DELETE FROM articulos WHERE `articulos`.`id_articulo` = $id";
        $resultado = $connect -> query($sql);
        return $resultado;    
    }

    static public function ModificarUnidad($id, $prestados){
        $connect = Conexion::conectar();
        $sql = "UPDATE articulos SET cantidad_prestada=$prestados WHERE id_articulo='$id'";
        $resultado = $connect -> query($sql);
        return $resultado;    
    }
}