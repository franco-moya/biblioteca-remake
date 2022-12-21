let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0];

let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-container")[0];

abrir.addEventListener("click", function (e) {
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", function() {
    modal.classList.toggle("modal-close");
    setTimeout(function() {
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden";
    }, 550);
    
});

window.addEventListener("click", function(e) {
    // console.log(e.target);

    if (e.target == modalC) {
        modal.classList.toggle("modal-close");
        setTimeout(function() {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 550);
    };
    
});


// modal para actualizar los registros
let cerrarModal = document.querySelectorAll(".close-2")[0];
let modalA = document.querySelectorAll(".modal-2")[0];
let modalB = document.querySelectorAll(".modal-container-2")[0];

cerrarModal.addEventListener("click", function() {
    modalA.classList.toggle("modal-close-2");
    setTimeout(function() {
        modalB.style.opacity = "0";
        modalB.style.visibility = "hidden";
    }, 550);
    
});

window.addEventListener("click", function(e) {
    if (e.target == modalB) {
        modalA.classList.toggle("modal-close-2");
        setTimeout(function() {
            modalB.style.opacity = "0";
            modalB.style.visibility = "hidden";
        }, 550);
    };
    
});

function abrirModal() {
    modalB.style.opacity = "1";
    modalB.style.visibility = "visible";
    modalA.classList.toggle("modal-close-2");
}