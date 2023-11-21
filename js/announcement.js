// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.3.2';

    // DOM-Elemente
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Überprüfen, ob das Banner geschlossen wurde
    const bannerClosed = localStorage.getItem(`${bannerName}-${bannerVersion}-Closed`);

    // Funktion zum Anzeigen des Banners
    function showBanner() {
        announcementBanner.style.display = 'block';
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt.');
        }
    }

    // Überprüfen, ob das Banner aufgrund einer neuen Version oder Schließung angezeigt werden soll
    if (!bannerClosed) {
        showBanner();

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
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt, da es geschlossen wurde.');
        }
    }
});