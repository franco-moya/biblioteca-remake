let ruta = './db/GestionarInventario.php'

TablaArticulos = document.getElementById("TablaArticulos")


function objetoFetch(datos) {
    return {
        method: "POST",
        body: datos
    }
}

ListarArticulos()

function ListarArticulos() {
    let datos = new FormData()
    datos.append("tipoOperacion", "ListarArticulos")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(data => {
            CargarArticulos(data)
        })
}

function CargarArticulos(arr) {
    TablaArticulos.innerHTML = ` `
    arr.forEach(articulo => {
        prestada = articulo["cantidad_prestada"]
        total = articulo["cantidad_total"]
        TablaArticulos.innerHTML += `
            <tr>
                    <td><i class="fa-solid fa-book fa-2x"></i></td>
                    <td class="titulo">${articulo["nombre_articulo"]}</td>
                    <td class="disponibilidad">${articulo["cantidad_prestada"]} / ${articulo["cantidad_total"]}</td>
                    <td class="opciones">
                        <i class="fa-solid fa-plus fa-lg"></i>
                        <i class="fa-solid fa-square-minus fa-lg"></i>
                        <i class="fa-sharp fa-solid fa-pen-to-square fa-lg"></i>
                        <i class="fa-solid fa-trash fa-lg"></i>
                    </td>
            </tr>
        `
    })
}