// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.2.8';

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

    // Überprüfen, ob die Seite innerhalb von 1 Sekunde neu geladen wurde und der Benutzer von einer anderen Seite zurückkehrt
    const reloadTime = performance.timeOrigin;
    const currentTime = new Date().getTime();
    const isReload = currentTime - reloadTime < 1000;

    // Überprüfen, ob die Seite innerhalb von 1 Sekunde neu geladen wurde und es einen Referrer gibt (z.B. der Benutzer kehrt von einer anderen Seite zurück)
    if (isReload && document.referrer) {
        // Seite wurde innerhalb von 1 Sekunde neu geladen und es gibt einen Referrer (z.B. der Benutzer kehrt von einer anderen Seite zurück)
        // Banner wieder anzeigen
        showBanner();
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt, da die Seite innerhalb von 1 Sekunde neu geladen wurde.');
        }
    } else {
        // Überprüfen, ob das Banner geschlossen wurde
        if (!bannerClosed) {
            showBanner();
        } else {
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
                    console.log('Banner wird nicht angezeigt, da die Version gleich ist und das Banner geschlossen wurde.');
                }
            }
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