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

document.addEventListener("DOMContentLoaded", () => {
    const about = document.querySelector(".about-container");
    about.style.opacity = 0;
    about.style.transition = "opacity 0.7s ease-in-out";

    setTimeout(() => {
        about.style.opacity = 1;
    }, 150);
});

document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".tutorial-container");
    box.style.opacity = 0;
    box.style.transform = "translateY(20px)";
    box.style.transition = "all 0.6s ease";

    setTimeout(() => {
        box.style.opacity = 1;
        box.style.transform = "translateY(0)";
    }, 150);
});

document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("feedbackStatus");

    if (email === "" || message === "") {
        status.style.color = "red";
        status.textContent = "Semua kolom harus diisi!";
        return;
    }

    const params = {
        email: email,
        message: message
    };

    emailjs
        .send("service_61ze56h", "template_cx819m6", params)
        .then(() => {
            status.style.color = "green";
            status.textContent = "Feedback berhasil dikirim! Terima kasih 😊";
            document.getElementById("feedbackForm").reset();
        })
        .catch(() => {
            status.style.color = "red";
            status.textContent = "Gagal mengirim feedback. Silakan coba lagi!";
        });
});
