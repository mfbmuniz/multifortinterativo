function selecionarArquivo() {
    document.getElementById("pdfInput").click();
}

document.getElementById("btnSelecionarPdf").addEventListener("click", selecionarArquivo);

document.getElementById("pdfInput").addEventListener("change", function () {
    window.location.href = "simulacaoCarregando.html";
});
