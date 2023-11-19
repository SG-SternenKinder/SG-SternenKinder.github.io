// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    // Banner-Informationen
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.2.2';

    // DOM-Elemente
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Cookies und Zeitpunkte
    const bannerClosed = CookieUtil.getCookie(`${bannerName}-${bannerVersion}Closed`);
    const lastCloseTime = parseInt(CookieUtil.getCookie(`${bannerName}-${bannerVersion}LastCloseTime`));
    const currentTime = new Date().getTime();
    const reloadTime = performance.timeOrigin;

    // Funktion zur Überprüfung, ob die Seite neu geladen wurde
    function isPageReloaded() {
        return currentTime - reloadTime < 1000; // Annahme: Wenn die Seite innerhalb von 1 Sekunde neu geladen wurde
    }

    // Funktion zum Anzeigen des Banners
    function showBanner() {
        announcementBanner.style.display = 'block';
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt.');
        }
    }

    // Überprüfen, ob das Banner geschlossen wurde und nicht für die aktuelle Sitzung angezeigt werden soll
    if (!bannerClosed || (lastCloseTime && currentTime - lastCloseTime > 1000 * 60 * 60 * 24 && !isPageReloaded())) {
        showBanner();
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt.');
        }
    }

    // Event-Listener für den Schließen-Button des Banners
    closeButton.addEventListener('click', function () {
        // Setzen der Cookies und Zeitpunkte
        CookieUtil.setCookie(`${bannerName}-${bannerVersion}Closed`, 'true', 1); // Banner wird für 1 Tag geschlossen
        CookieUtil.setCookie(`${bannerName}-${bannerVersion}LastCloseTime`, currentTime.toString(), 365); // Zeitpunkt der Schließung für 1 Jahr speichern

        // Ausblenden des Banners
        announcementBanner.style.display = 'none';
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wurde geschlossen.');
        }
    });

    // Überprüfen, ob sich die Banner-Version geändert hat und das Banner anzeigen
    const savedBannerClosed = CookieUtil.getCookie(`${bannerName}-${bannerVersion}Closed`);
    if (savedBannerClosed !== 'true') {
        showBanner();
        // Aktualisierte Banner-Version speichern
        CookieUtil.setCookie(`${bannerName}-${bannerVersion}Closed`, 'true', 1); // Banner wird für 1 Tag geschlossen
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird angezeigt, da sich die Version geändert hat.');
        }
    } else {
        if (consoleManager.getConsoleOutput()) {
            console.log('Banner wird nicht angezeigt, da die Version gleich ist.');
        }
    }
});