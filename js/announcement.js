// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.3.1';

    // DOM-Elemente
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Überprüfen, ob das Banner geschlossen wurde
    const bannerClosed = localStorage.getItem(`${bannerName}-${bannerVersion}-Closed`);

    // Überprüfen, ob das Banner aufgrund einer neuen Version oder Schließung angezeigt werden soll
    if (!bannerClosed) {
        // Hier könntest du weitere Bedingungen hinzufügen, z.B. Zeitintervalle
        // bevor das Banner erneut angezeigt wird, um zu verhindern, dass es bei jedem Laden erscheint.

        // Banner anzeigen
        announcementBanner.style.display = 'block';
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt.');
        }
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt, da es geschlossen wurde.');
        }
    }

    // Event-Listener für den Schließen-Button des Banners
    closeButton.addEventListener('click', function () {
        // Setzen des Flags im localStorage, dass das Banner geschlossen wurde
        localStorage.setItem(`${bannerName}-${bannerVersion}-Closed`, 'true');

        // Ausblenden des Banners
        announcementBanner.style.display = 'none';
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wurde geschlossen.');
        }
    });
});