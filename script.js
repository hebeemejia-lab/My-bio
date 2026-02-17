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
    // Selecciona el contenido principal a exportar (puedes ajustar el selector para incluir futuras secciones)
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Opcional: puedes agregar el perfil y contacto al PDF
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const container = document.createElement('div');
    if (header) container.appendChild(header.cloneNode(true));
    container.appendChild(mainContent.cloneNode(true));
    if (footer) container.appendChild(footer.cloneNode(true));

    // Usa html2pdf para generar el PDF directamente del HTML
    html2pdf()
      .set({
        margin: 0,
        filename: 'Heber_Mejia_Jacobo_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      })
      .from(container)
      .save();
}