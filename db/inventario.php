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
}