// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.2.5';

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

    // Überprüfen, ob das Banner geschlossen wurde
    if (!bannerClosed) {
        showBanner();
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt.');
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

    // Überprüfen, ob sich die Banner-Version geändert hat und das Banner anzeigen
    const savedBannerVersion = localStorage.getItem(`${bannerName}-LastVersion`);
    if (savedBannerVersion !== bannerVersion) {
        showBanner();
        // Aktualisierte Banner-Version speichern
        localStorage.setItem(`${bannerName}-LastVersion`, bannerVersion);
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt, da sich die Version geändert hat.');
        }
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt, da die Version gleich ist.');
        }
    }

    // Überprüfen, ob die Seite neu geladen wurde
    const reloadTime = performance.timeOrigin;
    const currentTime = new Date().getTime();
    if (currentTime - reloadTime < 1000) {
        // Seite wurde innerhalb von 1 Sekunde neu geladen
        // Banner wieder anzeigen
        showBanner();
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt, da die Seite neu geladen wurde.');
        }
    }
});