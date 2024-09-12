// banner.js
$(document).ready(function () {
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.3.5';

    const announcementBanner = $('#announcement-banner');
    const closeButton = $('#close-announcement');

    const bannerClosed = localStorage.getItem(`${bannerName}-${bannerVersion}-Closed`);
    $.consoleManager.logToConsoleOnce(`Banner geschlossen Status: ${bannerClosed}`, 'banner-status');

    if (!bannerClosed) {
        showBanner();

        closeButton.on('click', function () {
            localStorage.setItem(`${bannerName}-${bannerVersion}-Closed`, 'true');
            announcementBanner.fadeOut(500);  // Banner mit sanftem Ausblendeffekt schließen
            $.consoleManager.logToConsoleOnce('Banner wurde geschlossen.', 'banner-closed');
        });
    } else {
        $.consoleManager.logToConsoleOnce('Banner wird nicht angezeigt, da es geschlossen wurde.', 'banner-not-shown');
    }

    /**
     * Zeigt das Ankündigungsbanner an.
     */
    function showBanner() {
        announcementBanner.fadeIn(500);  // Sanfter Einblendeffekt für das Banner
        $.consoleManager.logToConsoleOnce('Banner wird angezeigt.', 'banner-shown');
    }
});
