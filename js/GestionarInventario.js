TablaArticulos = document.getElementById("TablaArticulos")
ListarArticulos()

function objetoFetch(datos) {
    return {
        method: "POST",
        body: datos
    }
}

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
        disponible = total - prestada
        TablaArticulos.innerHTML += `
            <tr>
                    <td><i class="fa-solid fa-book fa-2x"></i></td>
                    <td class="titulo">${articulo["nombre_articulo"]}</td>
                    <td class="disponibilidad">${disponible} / ${total}</td>
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

function BuscarArticuloPorSuNombre(texto){
    let datos = new FormData()
    datos.append("tipoOperacion", "BuscarUnArticulo")
    datos.append("texto",texto)
    fetch('./db/GestionarInventario.php', objetoFetch(datos))
        .then(response => response.json())
        .then(libros => {
            CargarArticulos(libros);
        })
}

let buscador = document.querySelector('#buscador')
buscador.addEventListener('keyup', e => {
    let cadena = buscador.value
    BuscarArticuloPorSuNombre(cadena)
})