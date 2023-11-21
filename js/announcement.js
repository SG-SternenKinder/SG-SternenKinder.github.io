// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.3.0';

    // DOM-Elemente
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Überprüfen, ob das Banner geschlossen wurde
    const bannerClosed = localStorage.getItem(`${bannerName}-${bannerVersion}-Closed`);

    // Überprüfen, ob sich die Banner-Version geändert hat und das Banner anzeigen
    const savedBannerVersion = localStorage.getItem(`${bannerName}-LastVersion`);
    if (!bannerClosed || savedBannerVersion !== bannerVersion) {
        announcementBanner.style.display = 'block';

        // Aktualisierte Banner-Version speichern
        localStorage.setItem(`${bannerName}-LastVersion`, bannerVersion);
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt.');
        }
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt, da die Version gleich ist und das Banner geschlossen wurde.');
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