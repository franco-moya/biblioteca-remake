ListarCategorias()

function ListarCategorias() {
    let datos = new FormData()
    datos.append("tipoOperacion", "ListarCategorias")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(categorias => {
            imprimirCategorias(categorias)
        })
}

Tabla = document.querySelector('#TablaCategorias')
function imprimirCategorias(categorias) {
    Tabla.innerHTML = ` `
    categorias.forEach(categoria => {
        nombre = categoria["categoria"]
        Tabla.innerHTML += `
        <tr>
            <td>${categoria["id_categoria"]}</td>
            <td class="titulo">${nombre}</td>
            <td class="opciones">
                <i onclick="testear()" class="fa-sharp fa-solid fa-pen-to-square fa-lg"></i>
                <i class="fa-solid fa-trash fa-lg"></i>
            </td>
        </tr>
        `
    })
}

let buscador = document.querySelector('#buscador')
buscador.addEventListener('keyup', e => {
    let cadena = buscador.value
    BuscarCategoriaPorSuNombre(cadena)
})

function BuscarCategoriaPorSuNombre(texto) {
    let datos = new FormData()
    datos.append("tipoOperacion", "BuscarUnaCategoria")
    datos.append("texto",texto)
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(categorias => {
            imprimirCategorias(categorias);
        })
}