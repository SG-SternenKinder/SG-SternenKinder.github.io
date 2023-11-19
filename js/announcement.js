// Ankündigungsbanner.js
document.addEventListener('DOMContentLoaded', function () {
    const announcementBanner = document.getElementById('announcement-banner');
    const closeButton = document.getElementById('close-announcement');

    // Überprüfe, ob das Banner in den letzten 4 Tagen angezeigt wurde oder geschlossen wurde
    const lastDisplayTime = CookieUtil.getCookie('lastBannerDisplayTime');
    const bannerClosed = CookieUtil.getCookie('announcementBannerClosed');
    const currentTime = new Date().getTime();
    const fourDaysInMilliseconds = 4 * 24 * 60 * 60 * 1000;

    if (!lastDisplayTime || (currentTime - lastDisplayTime > fourDaysInMilliseconds && !bannerClosed)) {
        // Das Banner anzeigen, da es entweder noch nie angezeigt wurde oder seit mehr als 4 Tagen nicht mehr angezeigt wurde und nicht geschlossen wurde
        announcementBanner.style.display = 'block';
    }

    // Überprüfe, ob wir uns auf der Hauptseite befinden
    const isHomePage = window.location.pathname === '/'; // Passe dies entsprechend deiner URL-Struktur an

    // Zeige das Banner nur auf der Hauptseite an und wenn es nicht geschlossen wurde
    if (isHomePage && !lastDisplayTime) {
        announcementBanner.style.display = 'block';
    }

    closeButton.addEventListener('click', function () {
        // Schließe das Banner und speichere dies in der Session
        announcementBanner.style.display = 'none';
        CookieUtil.setCookie('announcementBannerClosed', 'true');
        CookieUtil.setCookie('lastBannerDisplayTime', currentTime);
    });
});