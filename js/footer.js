// footer.js
document.addEventListener('DOMContentLoaded', async function () {
    const footerContainer = document.getElementById('footer-container');

    const currentYear = new Date().getFullYear();

    try {
        // Zeitzone des Besuchers abrufen
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Optionen für die Formatierung der Zeit
        const timeOptions = {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: timeZone
        };

        // Aktuelle Zeit in der Zeitzone des Besuchers
        const currentTime = new Date().toLocaleTimeString('de-DE', timeOptions);

        const footerHtml = 
        `
            <footer>
                <div class="footer-bottom">
                    &copy; 2016 - ${currentYear} | Spiele-Gemeinschaft (SG) SternenKinder | Alle Rechte vorbehalten | Aktuelle Zeit: ${currentTime}
                </div>
            </footer>
        `;

        footerContainer.innerHTML = footerHtml;
    } catch (error) {
        console.error('Fehler beim Abrufen der Zeitzone:', error);
    }
});