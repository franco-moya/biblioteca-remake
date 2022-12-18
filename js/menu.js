let btn = document.getElementById("btn");
let menu = document.getElementById("menu");

btn.addEventListener("click", function () {
    
    if (menu.style.left == "-15px") {
        menu.style.left = "-300px"
    } else {
        menu.style.left = "-15px";
    }
});