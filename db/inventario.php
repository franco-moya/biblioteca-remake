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
}