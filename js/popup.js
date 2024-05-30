// popup.js
$(document).ready(function () {
    const p = $('#popup');
    const a = $('#accept-cookies');
    const c = $('#close-cookies');
    const ap = $('#accepted-popup');
    const rp = $('#rejected-popup');
    const capb = $('#close-accepted-popup');
    const crpb = $('#close-rejected-popup');

    // Überprüfen, ob das Popup bereits angezeigt wurde
    const ps = sessionStorage.getItem('popupShown');
    logToConsole('Popup wurde bereits angezeigt:', ps);

    // Überprüfe, ob Cookies akzeptiert wurden
    const ac = $.CookieUtil.getCookie('cookiesAccepted');
    logToConsole('Cookies wurden akzeptiert:', ac);

    // Überprüfe, ob Cookies abgelehnt wurden
    const rc = $.CookieUtil.getCookie('cookiesRejected');
    logToConsole('Cookies wurden abgelehnt:', rc);

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!ps && !ac && !rc && navigator.onLine) {
        logToConsole('Popup wird angezeigt.');
        p.css('display', 'flex');

        a.on('click', function () {
            $.CookieUtil.setCookie('cookiesAccepted', 'true', 4);
            p.css('display', 'none');
            ap.css('display', 'flex');
            logToConsole('Cookies wurden akzeptiert.');
        });

        c.on('click', function () {
            // Markiere das Popup als angezeigt in der Session-Speicherung
            sessionStorage.setItem('popupShown', 'true');
            p.css('display', 'none');

            // Setze ein Session-Cookie für die Ablehnung von Cookies
            sessionStorage.setItem('cookiesRejected', 'true');
            rp.css('display', 'flex');
            logToConsole('Cookies wurden abgelehnt.');
        });

        capb.on('click', function () {
            // Akzeptieren-Popup schließen
            ap.css('display', 'none');
            logToConsole('Akzeptieren-Popup wurde geschlossen.');
        });

        crpb.on('click', function () {
            // Abgelehnt-Popup schließen
            rp.css('display', 'none');
            logToConsole('Abgelehnt-Popup wurde geschlossen.');
        });
    } else {
        logToConsole('Popup wird nicht angezeigt.');
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'showOfflinePopup') {
            // Show the offline popup
            const op = $('#offline-popup');
            op.css('display', 'flex');
            logToConsole('Offline-Popup wird angezeigt.');
        }
    });

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
