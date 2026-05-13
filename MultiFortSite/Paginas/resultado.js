function verDetalhes(tipo) {
    window.location.href = "detalheSetup.html?tipo=" + tipo;
}

function falarEspecialista() {
    alert("Um especialista entrará em contato com você.");
}

document.querySelectorAll(".setup-card button[data-setup]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        verDetalhes(botao.dataset.setup);
    });
});

document.getElementById("btnEspecialista").addEventListener("click", falarEspecialista);
