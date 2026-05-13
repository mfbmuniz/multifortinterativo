var placas = 8;

function atualizarTela() {
    var potencia = placas * 0.55;
    var geracao = placas * 57.5;

    document.getElementById("qtdPlacas").innerText = placas;
    document.getElementById("potencia").innerText = potencia.toFixed(2);
    document.getElementById("geracao").innerText = "Gera aprox. " + Math.round(geracao) + " kWh/mês";

    if (placas >= 11) {
        document.getElementById("nomeInversor").innerText = "Inversor Growatt 8kW";
        document.getElementById("statusInversor").innerText = "Inversor Atualizado";
        document.getElementById("textoInversor").innerText =
            "Como a quantidade de placas aumentou, o sistema sugeriu um inversor maior.";
    } else {
        document.getElementById("nomeInversor").innerText = "Inversor Growatt 5kW";
        document.getElementById("statusInversor").innerText = "Compatibilidade Perfeita";
        document.getElementById("textoInversor").innerText =
            "O sistema selecionou automaticamente este inversor pois ele suporta a carga de " + placas + " painéis.";
    }
}

function aumentar() {
    placas++;
    atualizarTela();
}

function diminuir() {
    if (placas > 1) {
        placas--;
        atualizarTela();
    }
}

function solicitarProposta() {
    alert("Proposta solicitada com sucesso!");
    window.location.href = "resultado.html";
}

document.getElementById("btnDiminuir").addEventListener("click", diminuir);
document.getElementById("btnAumentar").addEventListener("click", aumentar);
document.getElementById("btnSolicitarProposta").addEventListener("click", solicitarProposta);
