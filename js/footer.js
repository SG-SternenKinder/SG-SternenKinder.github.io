// footer.js
$(document).ready(function () {
    const footerContainer = $('#footer-container');

    if (!footerContainer.length) {
        if (typeof consoleManager !== 'undefined') {
            consoleManager.error('Das HTML-Element für den Footer wurde nicht gefunden.');
        } else {
            console.error('Das HTML-Element für den Footer wurde nicht gefunden.');
        }
        return;
    }

    const currentYear = new Date().getFullYear();

    const footerHtml = `
        <footer>
            <div class="footer-bottom">
                &copy; 2016 - ${currentYear} | Spiele-Gemeinschaft (SG) SternenKinder | Alle Rechte vorbehalten
            </div>
        </footer>
    `;

    footerContainer.html(footerHtml);

    if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
        console.log('Der Footer wurde erfolgreich erstellt und angezeigt.');
    }
});
