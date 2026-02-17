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

// Generar CV en PDF de todas las secciones
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

    // Clona el contenido para evitar modificar el DOM original
    const clone = mainContent.cloneNode(true);
    // Opcional: puedes agregar el perfil y contacto al PDF
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const container = document.createElement('div');
    if (header) container.appendChild(header.cloneNode(true));
    container.appendChild(clone);
    if (footer) container.appendChild(footer.cloneNode(true));

    // Usa html2canvas para capturar el contenido y jsPDF para generar el PDF
    html2canvas(container, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        // Ajusta el tamaño de la imagen al tamaño de la página
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let position = 0;

        // Si la imagen es más alta que una página, dividir en varias páginas
        if (imgHeight < pageHeight) {
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        } else {
            let remainingHeight = imgHeight;
            let y = 0;
            while (remainingHeight > 0) {
                pdf.addImage(imgData, 'PNG', 0, y ? 0 : position, imgWidth, Math.min(pageHeight, remainingHeight), 0, y * pageHeight, imgWidth, Math.min(pageHeight, remainingHeight));
                remainingHeight -= pageHeight;
                if (remainingHeight > 0) pdf.addPage();
                y++;
            }
        }
        pdf.save('Heber_Mejia_Jacobo_CV.pdf');
    });
}