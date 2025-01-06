

const labelResult = document.querySelector("#result");
const btnStart = document.querySelector("#btnStart");
const btnScan = document.querySelector("#btnScan");
btnScan.style = "display: none";

function startScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.querySelector("#camera"), // Elemento donde se mostrará la cámara
            constraints: {
                width: 500,
                height: 300,
                facingMode: "environment" // Usa la cámara trasera del móvil
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "upc_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}

btnStart.addEventListener("click", function() {
    startScanner();
    btnStart.style = "display: none";
    btnScan.style = "display: block";
    labelResult.textContent = "Cuando este listo, de click en capturar";
});

btnScan.addEventListener("click", function() {
    Quagga.start();
});

// Manejar el resultado del escaneo
Quagga.onDetected(function(result) {
    btnStart.style = "display: block";
    btnScan.style = "display: none";
    console.log("Código detectado:", result.codeResult.code);
    labelResult.textContent = "Código detectado:" + result.codeResult.code;
    Quagga.stop();
});
