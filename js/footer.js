// footer.js
document.addEventListener('DOMContentLoaded', function () {
    // Finde das HTML-Element, in dem der Footer angezeigt werden soll
    const footerContainer = document.getElementById('footer-container');

    if (!footerContainer) {
        console.error('Das HTML-Element für den Footer wurde nicht gefunden.');
        return;
    }

    // Aktuelles Jahr extrahieren
    const currentYear = new Date().getFullYear();

    // HTML-Code für den Footer erstellen, einschließlich des aktuellen Jahres
    const footerHtml =
        `
        <footer>
            <div class="footer-bottom">
                &copy; 2016 - ${currentYear} | Spiele-Gemeinschaft (SG) SternenKinder | Alle Rechte vorbehalten
            </div>
        </footer>
    `;

    // Setze den erstellten HTML-Code in das Footer-Element ein
    footerContainer.innerHTML = footerHtml;

    if (consoleManager.getConsoleOutput()) {
        console.log('Der Footer wurde erfolgreich erstellt und angezeigt.');
    }
});