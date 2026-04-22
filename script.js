const telefono = "3022930179";
const email = "carlos.diebold@hotmail.com";

const whatsappBtn = document.getElementById('whatsappFloatBtn');
const emailBtn = document.getElementById('emailFloatBtn');

function openWhatsApp() {
    const mensaje = encodeURIComponent("¡Hola Carlos! Vi tu hoja de vida y me gustaría conversar contigo.");
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

function openEmail() {
    const asunto = encodeURIComponent("Me gustaría tener una entrevista contigo");
    const cuerpo = encodeURIComponent("Hola Carlos,\n\nHe visto tu perfil profesional y me interesaría coordinar una entrevista contigo.\n\nQuedo atento a tu respuesta.\n\nSaludos cordiales.");
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

// Botón IMPRIMIR (nativo)
const printBtn = document.getElementById('printBtn');
printBtn.addEventListener('click', () => {
    window.print();
});

// Botón DESCARGAR PDF (html2canvas + jspdf)
const downloadBtn = document.getElementById('downloadPDFBtn');
const element = document.getElementById('resume-card');

downloadBtn.addEventListener('click', async () => {
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Generando...';
    downloadBtn.disabled = true;

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Carlos_Monterrosa_HojaVida.pdf');
        
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    } catch (error) {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        alert("Error al generar PDF. Usa el botón 'Imprimir' y elige 'Guardar como PDF'.");
    }
});