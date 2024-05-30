// banner.js
$(document).ready(function () {
    const bannerName = 'Aktion';
    const bannerVersion = 'v0.0.0.3.4';

    const announcementBanner = $('#announcement-banner');
    const closeButton = $('#close-announcement');

    const bannerClosed = localStorage.getItem(`${bannerName}-${bannerVersion}-Closed`);
    logToConsole(`Banner geschlossen Status: ${bannerClosed}`);

    if (!bannerClosed) {
        showBanner();

        closeButton.on('click', function () {
            localStorage.setItem(`${bannerName}-${bannerVersion}-Closed`, 'true');
            announcementBanner.hide();
            logToConsole('Banner wurde geschlossen.');
        });
    } else {
        logToConsole('Banner wird nicht angezeigt, da es geschlossen wurde.');
    }

    /**
     * Zeigt das Ankündigungsbanner an.
     */
    function showBanner() {
        announcementBanner.show();
        logToConsole('Banner wird angezeigt.');
    }

    /**
     * Loggt Nachrichten in die Konsole, falls der consoleManager aktiviert ist.
     * @param {string} message - Die zu loggende Nachricht.
     */
    function logToConsole(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(message);
        }
    }
});
