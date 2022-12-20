let TablaArticulos = document.getElementById("TablaArticulos")

let selectInventario = document.getElementById("select")
let selectModal = document.getElementById("select-categorias")

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
        id = articulo["id_articulo"]
        titulo = articulo["nombre_articulo"]
        prestada = articulo["cantidad_prestada"]
        total = articulo["cantidad_total"]
        disponible = total - prestada
        TablaArticulos.innerHTML += `
            <tr id="fila-${id}">
                    <td>${id}</i></td>
                    <td class="titulo">${titulo}</td>
                    <td class="disponibilidad" id="dato-${id}">${disponible} / ${total}</td>
                    <td class="opciones">
                        <i onclick="sumarUnidad(${id}, ${disponible}, ${total}, ${prestada})" class="fa-solid fa-plus fa-lg"></i>
                        <i onclick="restarUnidad(${id}, ${disponible}, ${total}, ${prestada})" class="fa-solid fa-square-minus fa-lg"></i>
                        <i class="fa-sharp fa-solid fa-pen-to-square fa-lg"></i>
                        <i onclick="eliminarArticulo(${id})" class="fa-solid fa-trash fa-lg"></i>
                    </td>
            </tr>
        `
    })
}

function BuscarArticuloPorSuNombre(texto){
    let select = document.getElementById("select")
    let categoria = select.value
    if (categoria == "") {
        categoria = 0
    }
    let datos = new FormData()
    datos.append("tipoOperacion", "BuscarUnArticulo")
    datos.append("texto",texto)
    datos.append("categoria", categoria)
    fetch('./db/GestionarInventario.php', objetoFetch(datos))
        .then(response => response.json())
        .then(libros => {
            CargarArticulos(libros);
        })
}

let buscador = document.querySelector('#buscador')
let cadena = ''
BuscarArticuloPorSuNombre(cadena)

buscador.addEventListener('keyup', e => {
    cadena = buscador.value
    BuscarArticuloPorSuNombre(cadena)
})

function ingresarArticulo() {
    let inputNombre = document.getElementById("input-nombre")
    let inputCantidad = document.getElementById("input-cantidad")
    let selectCategory = document.getElementById("select-categorias")

    let nombre =  inputNombre.value
    let cantidad = inputCantidad.value 
    let categoria = selectCategory.value
    let datos = new FormData()
    datos.append("tipoOperacion", "IngresarUnArticulo")
    datos.append("nombre", nombre)
    datos.append("cantidad", cantidad)
    datos.append("categoria", categoria)
    fetch(ruta, objetoFetch(datos))
    .then(r => {
        if (r.ok) {
            console.log("Ingreso exitoso")
            BuscarArticuloPorSuNombre(cadena)
        } else {
            console.log("Hubo un error al ingresar")
        }
    })
}

function eliminarArticulo(id) {
    let datos = new FormData()
    datos.append("tipoOperacion", "EliminarUnArticulo")
    datos.append("id",id)
    fetch(ruta, objetoFetch(datos))
        .then(r => {
            if (r.ok) {
                console.log("Articulo eliminado")
                BuscarArticuloPorSuNombre(cadena)
            } else {
                console.log("Hubo un error al eliminar")
            }
        })
}

function restarUnidad(id, disponible, total, prestados) {

    idDisponibles = "dato-" + id
    element = document.getElementById(idDisponibles)
    
    if (total > prestados > 0) {
        prestados = prestados + 1
        disponible = disponible - 1
        element.innerHTML = `${disponible} / ${total}`

        let datos = new FormData()
        datos.append("tipoOperacion", "actualizarUnidadDelArticulo")
        datos.append("id",id)
        datos.append("prestados",prestados)
        
        fetch(ruta, objetoFetch(datos))
            .then(r => {
                if (r.ok) {
                    console.log("Resta exitosa")
                    BuscarArticuloPorSuNombre(cadena)
                } else {
                    console.log("Hubo un error al restar")
                }
            })

    }
}

function sumarUnidad(id, disponible, total, prestados) {

    idDisponibles = "dato-" + id
    element = document.getElementById(idDisponibles)
    
    if (total > disponible) {
        prestados = prestados - 1 
        disponible = disponible + 1
        element.innerHTML = `${disponible} / ${total}`

        let datos = new FormData()
        datos.append("tipoOperacion", "actualizarUnidadDelArticulo")
        datos.append("id",id)
        datos.append("prestados",prestados)
        
        fetch(ruta, objetoFetch(datos))
            .then(r => {
                if (r.ok) {
                    console.log("suma exitosa")
                    BuscarArticuloPorSuNombre(cadena)
                } else {
                    console.log("Hubo un error al sumar")
                }
            })

    }
}

rellenarSelectCategorias()
function rellenarSelectCategorias() {
    let datos = new FormData()
    datos.append("tipoOperacion", "ListarCategorias")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(categorias => {
            rellenarOpciones(categorias, selectInventario, true)
            rellenarOpciones(categorias, selectModal, false)
        })
}

function rellenarOpciones(categorias, select, ok) {
    if (ok) {
        select.innerHTML = '<option value="0" selected>Categorias</option>'
    }
    categorias.forEach(categoria => {
        id = categoria["id_categoria"]
        nombre = categoria["categoria"]
        select.innerHTML += `
        <option value="${id}">${nombre}</option>
        `
    })
}
