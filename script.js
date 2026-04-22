// Configuración de contacto
const telefono = "3022930179";
const email = "carlos.diebold@hotmail.com";

// Botones flotantes
const whatsappBtn = document.getElementById('whatsappFloatBtn');
const emailBtn = document.getElementById('emailFloatBtn');

// Abrir WhatsApp
function openWhatsApp() {
    const mensaje = encodeURIComponent("¡Hola Carlos! Vi tu hoja de vida y me gustaría conversar contigo.");
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

// Abrir correo
function openEmail() {
    const asunto = encodeURIComponent("Me gustaría tener una entrevista contigo");
    const cuerpo = encodeURIComponent("Hola Carlos,\n\nHe visto tu perfil profesional y me interesaría coordinar una entrevista contigo.\n\nQuedo atento a tu respuesta.\n\nSaludos cordiales.");
    window.location.href = `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
}

// Eventos clicks
whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp();
});

emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openEmail();
});

// Generar PDF
const downloadBtn = document.getElementById('downloadPDFBtn');
const elementToPrint = document.getElementById('resume-card');

const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'Hoja_de_Vida_Carlos_Monterrosa.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
};

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Generando PDF...';
    downloadBtn.disabled = true;

    html2pdf().set(opt).from(elementToPrint).save().then(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }).catch(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        alert("Error al generar PDF, intenta de nuevo.");
    });
});