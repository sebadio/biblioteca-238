// user:        eljose1960@mail.com
// password:    pepe1960


document.getElementById("submitBtn").addEventListener("click", function () {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    let seCumple = true;

    if (email == "") {
        seCumple = false;
        alert("Falta el email");
    }

    if (password == "") {
        seCumple = false;
        alert("Falta el password");
    }

    if (seCumple) {
        window.location.href = "index.html";
        
    }
})