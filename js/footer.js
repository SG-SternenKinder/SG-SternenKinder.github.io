// footer.js
document.addEventListener('DOMContentLoaded', function () {
    // Finde das HTML-Element, in dem der Footer angezeigt werden soll
    const footerContainer = document.getElementById('footer-container');

    // Funktion, um die aktuelle Uhrzeit im Format "Stunde:Minute" zu erhalten
    function getCurrentTime() {
        // Erstelle ein neues Date-Objekt, um die aktuelle Uhrzeit zu erhalten
        const now = new Date();

        // Extrahiere Stunden und füge eine führende Null hinzu, falls nötig
        const hours = now.getHours().toString().padStart(2, '0');

        // Extrahiere Minuten und füge eine führende Null hinzu, falls nötig
        const minutes = now.getMinutes().toString().padStart(2, '0');

        // Kombiniere Stunden und Minuten im Format "Stunde:Minute"
        return `${hours}:${minutes}`;
    }

    // Aktualisiere die Uhrzeit alle 60 Sekunden (1 Minute)
    setInterval(() => {
        const currentTime = getCurrentTime();
        footerContainer.querySelector('.footer-time').textContent = currentTime;
    }, 60000);

    // Aktuelles Jahr extrahieren
    const currentYear = new Date().getFullYear();

    // Aktuelle Uhrzeit extrahieren
    const currentTime = getCurrentTime();

    // HTML-Code für den Footer erstellen, einschließlich des aktuellen Jahres und der Uhrzeit
    const footerHtml = `
        <footer>
            <div class="footer-bottom">
                &copy; 2016 - ${currentYear} | Spiele-Gemeinschaft (SG) SternenKinder | Alle Rechte vorbehalten | Aktuelle Uhrzeit: <span class="footer-time">${currentTime}</span>
            </div>
        </footer>
    `;

    // Setze den erstellten HTML-Code in das Footer-Element ein
    footerContainer.innerHTML = footerHtml;
});