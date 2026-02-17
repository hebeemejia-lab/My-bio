// Navegación suave al hacer clic en el menú
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Generar CV en PDF de todas las secciones usando html2pdf.js
document.addEventListener('DOMContentLoaded', function() {
    const btnCV = document.getElementById('descargar-cv');
    if (btnCV) {
        btnCV.addEventListener('click', function() {
            generarCVPDF();
        });
    }
});

function generarCVPDF() {
        // Selecciona la plantilla oculta del CV clásico
        const cvPlantilla = document.getElementById('cv-plantilla');
        if (!cvPlantilla) return;

        // Clona la plantilla para evitar modificar el DOM original
        const clone = cvPlantilla.cloneNode(true);
        clone.style.display = 'block';

        // Usa html2pdf para generar el PDF desde la plantilla
        html2pdf()
            .set({
                margin: 10,
                filename: 'Heber_Mejia_Jacobo_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
            })
            .from(clone)
            .save();
}