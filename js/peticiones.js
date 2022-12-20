// Ventana: Biblioteca
// Proceso: Mostrar Libros y Disponibles
let ruta = '../db/GestionarInventario.php'

TablaLibros = document.getElementById("TablaLibros");
ListarLibros();

function objetoFetch(datos) {
    return {
        method: "POST",
        body: datos
    }
}

function ListarLibros() {
    let datos = new FormData()
    datos.append("tipoOperacion", "ListarLibrosEnBiblioteca")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(libros => {
            imprimirLibros(libros)
        })
}

function imprimirLibros(libros) {
    TablaLibros.innerHTML = ` `
    libros.forEach(libro => {
        nombre = libro["nombre"]
        disponible = libro["available"]
        total = libro["total"]
        TablaLibros.innerHTML += `
            <tr>
                    <td><i class="fa-solid fa-book fa-2x"></i></td>
                    <td class="titulo">${nombre}</td>
                    <td class="disponibilidad">${disponible} / ${total}</td>
            </tr>
        `
    })
}

function BuscarLibrosPorSuNombre(texto){
    let datos = new FormData()
    datos.append("tipoOperacion", "BuscarUnLibro")
    datos.append("texto",texto)
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(libros => {
            imprimirLibros(libros)
        })
}

let buscador = document.querySelector('#buscador')
buscador.addEventListener('keyup', e => {
    let cadena = buscador.value
    BuscarLibrosPorSuNombre(cadena)
})