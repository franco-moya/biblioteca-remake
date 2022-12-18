let ruta = '../db/GestionarInventario.php';
var token = false;

function objetoFetch(datos) {
    return {
        method: "POST",
        body: datos
    }
}
let btn = document.getElementById("btn-validar");
if (btn) {
    btn.addEventListener("click", validarUsuarios);
}


function validarUsuarios() {
    
    let userInput = document.getElementById("usuario");
    let passInput = document.getElementById("password");

    let invitado = userInput.value;
    let passInvitado = passInput.value;

    let datos = new FormData()
    datos.append("tipoOperacion", "ListarUsuarios")
    fetch(ruta, objetoFetch(datos))
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                validar(user, invitado, passInvitado)
            });
        })
}

function validar(user, inv, passInv) {
    let usuario = user["usuario"]
    let pass = user["password_usuario"]
    let esValido = usuario == inv && pass == passInv
    if (esValido) {
        window.location.href = "../index.html";
        darPermisos();
        
    } else {
        console.log("Sesión incorrecta")
        token = false
    }
    console.log("token: ", token)
}


