// Ankündigungsbanner.js

document.addEventListener('DOMContentLoaded', function () {
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Zeitpunkt der letzten Anzeige des Banners
    const lastDisplayTime = CookieUtil.getCookie('lastBannerDisplayTime');

    // Prüfen, ob das Banner geschlossen wurde
    const bannerClosed = CookieUtil.getCookie('announcementBannerClosed');

    // Aktueller Zeitpunkt
    const currentTime = new Date().getTime();

    // Zeitraum, nach dem das Banner erneut angezeigt wird (4 Tage)
    const fourDaysInMilliseconds = 4 * 24 * 60 * 60 * 1000;

    // Dateiversion (kann bei Bedarf mit der neuesten Dateiversion aktualisiert werden)
    const fileVersion = 'v0.0.0.1';

    // Wenn das Banner noch nie angezeigt wurde oder seit mehr als 4 Tagen nicht mehr angezeigt wurde und nicht geschlossen wurde
    if (!lastDisplayTime || (currentTime - lastDisplayTime > fourDaysInMilliseconds && !bannerClosed)) {
        // Hier prüfen, ob die gespeicherte Dateiversion mit der aktuellen übereinstimmt
        const savedFileVersion = CookieUtil.getCookie('fileVersion');
        if (savedFileVersion !== fileVersion) {
            announcementBanner.style.display = 'block'; // Banner anzeigen
        }
    }

    // Prüfen, ob wir uns auf der Hauptseite befinden und das Banner noch nie angezeigt wurde
    const isHomePage = window.location.pathname === '/';
    if (isHomePage && !lastDisplayTime) {
        announcementBanner.style.display = 'block'; // Banner anzeigen
    }

    // Event-Listener für den Schließen-Button des Banners
    closeButton.addEventListener('click', function () {
        announcementBanner.parentNode.removeChild(announcementBanner); // Banner ausblenden
        // Setze Cookies für geschlossenes Banner, Zeitpunkt der Schließung und Dateiversion mit Ablaufdatum
        CookieUtil.setCookie('announcementBannerClosed', 'true', 4);  // Banner wird für 4 Tage geschlossen
        CookieUtil.setCookie('lastBannerDisplayTime', currentTime, 1);  // Banner wird für 1 Tag nicht erneut angezeigt
        CookieUtil.setCookie('fileVersion', fileVersion, 365);  // Dateiversion wird für 365 Tage gespeichert (kann angepasst werden)
    });
});