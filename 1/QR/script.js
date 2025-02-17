let qrCodeCanvas;
let links = [];

function generateQRCode() {
    const url = document.getElementById("url").value;
    QRCode.toCanvas(document.getElementById('qr-code'), url, { errorCorrectionLevel: 'H' }, function (error, canvas) {
        if (error) console.error(error);
        document.getElementById("downloadBtn").style.display = "block";
        qrCodeCanvas = canvas;

        // Store and display the link
        storeLink(url, canvas.toDataURL());
        displayLinks();
    });
}

function downloadQRCode() {
    const link = document.createElement('a');
    link.href = qrCodeCanvas.toDataURL();
    link.download = 'qrcode.png';
    link.click();
}

function storeLink(url, dataUrl) {
    links.push({ url, dataUrl });
    localStorage.setItem('links', JSON.stringify(links));
}

function displayLinks() {
    const container = document.getElementById('link-container');
    container.innerHTML = '';
    links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.className = 'link-item';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = link.url;
        input.onchange = function () {
            links[index].url = input.value;
            localStorage.setItem('links', JSON.stringify(links));
        };

        const img = document.createElement('img');
        img.src = link.dataUrl;

        linkItem.appendChild(input);
        linkItem.appendChild(img);
        container.appendChild(linkItem);
    });
}

window.onload = function() {
    if (localStorage.getItem('links')) {
        links = JSON.parse(localStorage.getItem('links'));
        displayLinks();
    }
};
