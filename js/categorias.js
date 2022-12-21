let cadena = ''
BuscarCategoriaPorSuNombre(cadena)

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
        id = categoria["id_categoria"]
        nombre = categoria["categoria"]
        Tabla.innerHTML += `
        <tr id="fila-${id}">
            <td>${categoria["id_categoria"]}</td>
            <td class="titulo">${nombre}</td>
            <td class="opciones">
                <i onclick="abrirModal(), rellenarModal(${id},'${nombre}')" class="fa-sharp fa-solid fa-pen-to-square fa-lg"></i>
                <i onclick="confirmarEliminar(${id})" class="fa-solid fa-trash fa-lg"></i>
            </td>
        </tr>
        `
    })
}

let buscador = document.querySelector('#buscador')
buscador.addEventListener('keyup', e => {
    cadena = buscador.value
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

function ingresarCategoria() {
    let input = document.getElementById("input-categoria")
    let categoria = input.value
    let datos = new FormData()
    datos.append("tipoOperacion", "IngresarUnaCategoria")
    datos.append("categoria", categoria)
    fetch(ruta, objetoFetch(datos))
    .then(r => {
        if (r.ok) {
            console.log("Ingreso exitoso")
            BuscarCategoriaPorSuNombre(cadena)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Categoria Ingresada!',
                showConfirmButton: false,
                timer: 1500
              })
        } else {
            console.log("Hubo un error al ingresar")
        }
    })
}

function eliminarCategoria(id) {
    let datos = new FormData()
    datos.append("tipoOperacion", "EliminarUnaCategoria")
    datos.append("id",id)
    fetch(ruta, objetoFetch(datos))
        .then(r => {
            if (r.ok) {
                console.log("Categoria eliminada")
                BuscarCategoriaPorSuNombre(cadena)
            } else {
                console.log("Hubo un error al eliminar")
            }
        })
}

function confirmarEliminar(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', 
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí ¡borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
            eliminarCategoria(id)
            Swal.fire(
                '¡Eliminado!',
                'La categoría ya no existe en este sitio',
                'success'
            )
        }
      })
}

let inputCategoria = document.getElementById("input-categoria-2")
let inputIdCategoria = document.getElementById("id-categoria")
function rellenarModal(id, titulo) {
    inputCategoria.value = titulo
    inputIdCategoria.value = id
}

function actualizarCategoria() {
    let input = document.getElementById("input-categoria-2")
    let inputID = document.getElementById("id-categoria")
    let categoria = input.value
    let id = inputID.value
    let datos = new FormData()
    datos.append("tipoOperacion", "ActualizarUnaCategoria")
    datos.append("categoria", categoria)
    datos.append("id", id)
    fetch(ruta, objetoFetch(datos))
    .then(r => {
        if (r.ok) {
            console.log("Actualización exitosa")
            BuscarCategoriaPorSuNombre(cadena)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Categoria Actualizada!',
                showConfirmButton: false,
                timer: 1500
              })
        } else {
            console.log("Hubo un error al actualizar")
        }
    })
}