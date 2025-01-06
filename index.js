

const labelResult = document.querySelector("#result");
const btnStart = document.querySelector("#btnStart");

Quagga.init({
    inputStream: {
        type: "LiveStream",
        target: document.querySelector("#camera"), // Elemento donde se mostrará la cámara
        constraints: {
            width: 640,
            height: 480,
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
    // console.log("Quagga inicializado correctamente");
    // Quagga.start();
});

btnStart.addEventListener("click", function() {
    Quagga.start();
});

// Manejar el resultado del escaneo
Quagga.onDetected(function(result) {
    console.log("Código detectado:", result.codeResult.code);
    labelResult.textContent = result.codeResult.code;
    Quagga.stop();
});
