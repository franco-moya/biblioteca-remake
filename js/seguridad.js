function objetoFetch(datos) {
    return {
        method: "POST",
        body: datos
    }
}

function traerEstado() {
    let datos = new FormData()
    datos.append("tipoOperacion", "EstadoAdmin")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(data => {
            let estadoUsuario = data[0].estado;
            expulsarUsuarios(estadoUsuario)
        })
}

function expulsarUsuarios(tienePermiso) {
    let estoyEnLogin = window.location.href == "http://localhost/biblioteca-remake/src/login.html";

    if (tienePermiso == 1) {
        console.log("tienes permiso, te quedas", tienePermiso)
    } else if (estoyEnLogin) {
        console.log("estasEnLogin")
    } else if (tienePermiso == 0 && !estoyEnLogin) {
        window.location.href = "http://localhost/biblioteca-remake/src/login.html";
    }
}

function darPermisos() {
    let datos = new FormData()
    datos.append("tipoOperacion", "darPermisos")
    fetch(ruta, objetoFetch(datos))
        .then(response => response())
        .then(data => {
            console.log("Cambio de estado", data)
        })
}

function quitarPermisos() {
    let datos = new FormData()
    datos.append("tipoOperacion", "quitarPermisos")
    fetch(ruta, objetoFetch(datos))
        .then(response => response())
        .then(data => {
            console.log("Cambio de estado", data)
        })
}

traerEstado()