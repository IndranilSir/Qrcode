document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('canvas-container');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Inputs
    const urlInput = document.getElementById('url-input');
    const phoneInput = document.getElementById('phone-input');
    const vcardName = document.getElementById('vcard-name');
    const vcardCompany = document.getElementById('vcard-company');
    const vcardPhone = document.getElementById('vcard-vphone');
    const vcardAddress = document.getElementById('vcard-address');
    const colorDots = document.getElementById('color-dots');
    const colorBg = document.getElementById('color-bg');

    // Buttons
    const downloadPngBtn = document.getElementById('download-png');
    const downloadSvgBtn = document.getElementById('download-svg');

    let currentType = 'url';

    // Initialize QR Code
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: urlInput.value,
        dotsOptions: {
            color: colorDots.value,
            type: "rounded"
        },
        backgroundOptions: {
            color: colorBg.value,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    });

    qrCode.append(canvasContainer);

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            formGroups.forEach(f => f.classList.remove('active'));
            
            btn.classList.add('active');
            const type = btn.getAttribute('data-type');
            document.getElementById(`form-${type}`).classList.add('active');
            currentType = type;
            updateQR();
        });
    });

    // Update function
    function updateQR() {
        let data = '';
        if (currentType === 'url') {
            data = urlInput.value;
        } else if (currentType === 'phone') {
            data = `tel:${phoneInput.value}`;
        } else if (currentType === 'vcard') {
            data = `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName.value}\nORG:${vcardCompany.value}\nTEL:${vcardPhone.value}\nADR:${vcardAddress.value}\nEND:VCARD`;
        }

        qrCode.update({
            data: data || ' ',
            dotsOptions: {
                color: colorDots.value
            },
            backgroundOptions: {
                color: colorBg.value
            }
        });
    }

    // Event Listeners for inputs
    const allInputs = [urlInput, phoneInput, vcardName, vcardCompany, vcardPhone, vcardAddress, colorDots, colorBg];
    allInputs.forEach(input => {
        input.addEventListener('input', updateQR);
    });

    // Download handlers
    downloadPngBtn.addEventListener('click', () => {
        qrCode.download({ name: "qr-code", extension: "png" });
    });

    downloadSvgBtn.addEventListener('click', () => {
        qrCode.download({ name: "qr-code", extension: "svg" });
    });
});
