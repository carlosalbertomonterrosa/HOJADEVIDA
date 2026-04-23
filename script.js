const telefono = "3022930179";
const email = "carlos.diebold@hotmail.com";
const urlPagina = "https://carlosalbertomonterrosa.github.io/HOJADEVIDA/";

// ========== BOTONES FLOTANTES ==========
const whatsappBtn = document.getElementById('whatsappFloatBtn');
const emailBtn = document.getElementById('emailFloatBtn');

function openWhatsApp() {
    const mensaje = encodeURIComponent("¡Hola Carlos! Vi tu hoja de vida y me gustaría conversar contigo.");
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

function openEmail() {
    const asunto = encodeURIComponent("Me gustaría tener una entrevista contigo");
    const cuerpo = encodeURIComponent("Hola Carlos,\n\nHe visto tu perfil profesional y me interesaría coordinar una entrevista contigo.\n\nSaludos cordiales.");
    window.location.href = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
}

whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp();
});

emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openEmail();
});

// ========== BOTÓN COMPARTIR ==========
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        // Para móviles (Android/iOS) - usa el API nativo de compartir
        navigator.share({
            title: 'Carlos Monterrosa - Hoja de Vida',
            text: 'Mira mi hoja de vida profesional',
            url: urlPagina
        }).catch(err => {
            console.log('Error al compartir:', err);
            fallbackCompartir();
        });
    } else {
        // Para PC - copia al portapapeles
        fallbackCompartir();
    }
});

function fallbackCompartir() {
    navigator.clipboard.writeText(urlPagina).then(() => {
        alert("✅ Enlace copiado al portapapeles: " + urlPagina);
    }).catch(() => {
        prompt("Copia este enlace:", urlPagina);
    });
}

// ========== BOTÓN IMPRIMIR ==========
const printBtn = document.getElementById('printBtn');
printBtn.addEventListener('click', () => {
    window.print();
});

// ========== BOTÓN DESCARGAR PDF (con html3pdf - funciona en móviles) ==========
const downloadBtn = document.getElementById('downloadPDFBtn');
const element = document.getElementById('resume-card');

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Generando...';
    downloadBtn.disabled = true;

    const opt = {
        margin: 0.5,
        filename: 'Carlos_Monterrosa_HojaVida.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html3pdf().set(opt).from(element).save().then(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }).catch((error) => {
        console.error("Error:", error);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        alert("Error al generar PDF. Usa el botón 'Imprimir' y elige 'Guardar como PDF'.");
    });
});

// ========== FOTO: AL HACER CLIC SE ABRE EN GRANDE (MODAL) ==========
const fotoPerfil = document.getElementById('fotoPerfil');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

fotoPerfil.addEventListener('click', () => {
    const imgSrc = document.querySelector('#fotoPerfil img').src;
    modal.style.display = "block";
    modalImg.src = imgSrc;
});

modalClose.addEventListener('click', () => {
    modal.style.display = "none";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}