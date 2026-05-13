function entrar(event) {
    event.preventDefault();

    alert("Login realizado com sucesso!");

    window.location.href = "simulacaoUploadPDF.html";
}

function mostrarSenha() {
    var campoSenha = document.getElementById("senha");

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
    } else {
        campoSenha.type = "password";
    }
}

function entrarComo(tipo) {
    alert("Entrando como " + tipo);

    window.location.href = "simulacaoUploadPDF.html";
}

document.getElementById("formLogin").addEventListener("submit", entrar);
document.getElementById("btnMostrarSenha").addEventListener("click", mostrarSenha);

document.querySelectorAll(".profile-buttons button").forEach(function (botao) {
    botao.addEventListener("click", function () {
        entrarComo(botao.dataset.tipo);
    });
});
