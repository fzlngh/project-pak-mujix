function generateQR() {
    const input = document.getElementById("qrInput").value;
    const qrBox = document.getElementById("qrResult");
    const qrContainer = document.getElementById("qrContainer");

    if (input.trim() === "") {
        qrBox.innerHTML = "<p style='color:red;'>Input tidak boleh kosong!</p>";
        qrContainer.style.display = "block";
        return;
    }

    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(input)}`;

    qrBox.innerHTML = `<img id="qrImage" src="${qrURL}" alt="QR Code" />`;
    qrContainer.style.display = "block";
}

// DOWNLOAD QR
function downloadQR() {
    const img = document.getElementById("qrImage");
    if (!img) return alert("QR belum dibuat!");

    fetch(img.src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "qrcode.png";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        })
        .catch(() => alert("Gagal mengunduh QR"));
}
